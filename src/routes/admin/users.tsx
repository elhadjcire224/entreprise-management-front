import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import api from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { useState } from 'react';
import { toast } from 'react-hot-toast';



 type User = {
  id: number
  name: string
  email: string
  role: 'ADMIN' | 'VALIDATOR'
  createdAt: string
  validatedCompaniesCount: number
  assignedCompaniesCount: number
}


export const Route = createFileRoute('/admin/users')({
  beforeLoad: ({ context }) => {
      if (!context.auth.user) {
        throw redirect({
          to: '/login',

        });
      }
      if (!context.auth.isAdmin) {
        throw redirect({ to: '/admin/companies' });
      }
    },
  component: () => <UsersPage />,
})

function UsersPage() {
  return (

      <UsersTable />

  );
}




export function UsersTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [deletingUser, setDeletingUser] = useState<User | null>(null)
  const queryClient = useQueryClient()

  const { data: users, isLoading, error } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await api.get('/users')
      return response.data.users
    },

  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/users/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['users']})
      toast.success('Utilisateur supprimé avec succès')
      setDeletingUser(null)
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Une erreur est survenue lors de la suppression'
      toast.error(errorMessage)
      setDeletingUser(null)
    },
  })

  const updateRoleMutation = useMutation({
    mutationFn: ({ id }: { id: number }) =>
      api.put(`/users/${id}/toggle-role`),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['users']})
      toast.success('Rôle de l\'utilisateur mis à jour avec succès')
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Une erreur est survenue lors de la mise à jour du rôle'
      toast.error(errorMessage)
    },
  })

  const handleDelete = (user: User) => {
    setDeletingUser(user)
  }

  const confirmDelete = () => {
    if (deletingUser) {
      deleteMutation.mutate(deletingUser.id)
    }
  }

  const handleRoleChange = (userId: number )=> {
    updateRoleMutation.mutate({ id: userId})
  }

  const table = useReactTable({
    data: users || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    meta: {
      deleteUser: handleDelete,
      updateRole: handleRoleChange,
    },
  })

  if (isLoading) return <div>Chargement des utilisateurs...</div>
  if (error) return <div>Une erreur est survenue : {(error as Error).message}</div>

  return (
    <div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <Input
          placeholder="Rechercher un utilisateur par nom..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Aucun utilisateur trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deletingUser} onOpenChange={() => setDeletingUser(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action supprimera l'utilisateur "{deletingUser?.name}". Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? 'Suppression...' : 'Supprimer'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}


 const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Nom",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Rôle",
    cell: ({ row, table }) => {
      const user = row.original
      return (
        <Select
          defaultValue={user.role}
          onValueChange={() =>
            table.options.meta?.updateRole(user.id)
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sélectionner un rôle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="VALIDATOR">Validateur</SelectItem>
          </SelectContent>
        </Select>
      )
    },
  },
  {
    accessorKey: "validatedCompaniesCount",
    header: "Entreprises validées",
  },
  {
    accessorKey: "assignedCompaniesCount",
    header: "Entreprises assignées",
  },
  {
    accessorKey: "createdAt",
    header: "Date de création",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const user = row.original
      return (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => table.options.meta?.deleteUser(user)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      )
    },
  },
]
