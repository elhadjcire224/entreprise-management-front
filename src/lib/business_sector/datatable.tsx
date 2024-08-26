import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import api from '@/lib/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table"
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { columns } from './columns'

export type BusinessSector = {
  id: number
  name: string
  createdAt: string
  updatedAt: string
  companies_count: number
}

export function BusinessSectorsTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSector, setEditingSector] = useState<BusinessSector | null>(null)
  const [deletingSector, setDeletingSector] = useState<BusinessSector | null>(null)
  const [sectorName, setSectorName] = useState('')
  const queryClient = useQueryClient()

  const { data: sectors, isLoading, error } = useQuery<BusinessSector[]>({
    queryKey: ['businessSectors'],
    queryFn: async () => {
      const response = await api.get('/business-sectors')
      return response.data.map((sector: any) => ({
        ...sector,
        companies_count: parseInt(sector.companies_count, 10)
      }))
    },
  })

  const mutation = useMutation({
    mutationFn: (sector: { id?: number, name: string }) => {
      if (sector.id) {
        return api.put(`/business-sectors/${sector.id}`, { name: sector.name })
      } else {
        return api.post('/business-sectors', { name: sector.name })
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['businessSectors']})
      toast.success(editingSector ? 'Secteur modifié avec succès' : 'Secteur ajouté avec succès')
      setIsModalOpen(false)
      setEditingSector(null)
      setSectorName('')
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.errors?.[0]?.message
      if (errorMessage === "The name has already been taken") {
        toast.error('Ce nom de secteur existe déjà')
      } else {
        toast.error('Une erreur est survenue')
      }
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/business-sectors/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['businessSectors']})
      toast.success('Secteur supprimé avec succès')
      setDeletingSector(null)
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Une erreur est survenue lors de la suppression'
      toast.error(errorMessage)
      setDeletingSector(null)
    },
  })

  const handleSubmit = () => {
    if (editingSector) {
      mutation.mutate({ id: editingSector.id, name: sectorName })
    } else {
      mutation.mutate({ name: sectorName })
    }
  }

  const handleEdit = (sector: BusinessSector) => {
    setEditingSector(sector)
    setSectorName(sector.name)
    setIsModalOpen(true)
  }

  const handleDelete = (sector: BusinessSector) => {
    setDeletingSector(sector)
  }

  const confirmDelete = () => {
    if (deletingSector) {
      deleteMutation.mutate(deletingSector.id)
    }
  }

  const table = useReactTable({
    data: sectors || [],
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
      editSector: handleEdit,
      deleteSector: handleDelete,
    },
  })

  if (isLoading) return <div>Chargement des secteurs d'activité...</div>
  if (error) return <div>Une erreur est survenue : {(error as Error).message}</div>

  return (
    <div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <Input
          placeholder="Filtrer par nom..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button onClick={() => setIsModalOpen(true)}>
          Ajouter un secteur
        </Button>
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
                  Aucun secteur d'activité.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingSector ? 'Modifier le secteur' : 'Ajouter un secteur'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom
              </Label>
              <Input
                id="name"
                value={sectorName}
                onChange={(e) => setSectorName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit} disabled={mutation.isPending}>
              {editingSector ? 'Modifier' : 'Ajouter'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletingSector} onOpenChange={() => setDeletingSector(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce secteur ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action supprimera le secteur <strong>"{deletingSector?.name} </strong>" et ses <strong> {deletingSector?.companies_count}</strong> entreprises associées. Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction  onClick={confirmDelete} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? 'Suppression...' : 'Supprimer'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
