import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import api from '@/lib/api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table"
import React from 'react'

type Company = {
  id: number
  companyName: string
  status: 'PENDING' | 'VALIDATED' | 'REJECTED'
  createdAt: string
  administrator: { name: string } | null
  businessSector: { name: string }
}

type PaginationMeta = {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  firstPage: number
  firstPageUrl: string
  lastPageUrl: string
  nextPageUrl: string | null
  previousPageUrl: string | null
}

type PaginatedResponse = {
  meta: PaginationMeta
  data: Company[]
}

const columns: ColumnDef<Company>[] = [
  // ... (colonnes comme définies précédemment)
]

const fetchCompanies = async ({ pageParam = 1 }): Promise<PaginatedResponse> => {
  const { data } = await api.get(`/companies?page=${pageParam}`)
  return data.companies
}

export function CompaniesManagement() {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const {
    data,
    isLoading,
    error,
    isPreviousData,
    isFetching,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useQuery({
    queryKey: ['companies'],
    queryFn: fetchCompanies,
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.currentPage < lastPage.meta.lastPage) {
        return lastPage.meta.currentPage + 1
      }
      return undefined
    },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.meta.currentPage > 1) {
        return firstPage.meta.currentPage - 1
      }
      return undefined
    },
  })

  const table = useReactTable({
    data: data?.pages[0]?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    manualPagination: true,
  })

  if (isLoading) return <div>Chargement...</div>
  if (error) return <div>Une erreur est survenue : {error.message}</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gestion des Entreprises</h1>
      {isFetching && !isPreviousData && <div>Mise à jour des données...</div>}
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
                Aucun résultat.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div>
          Page {data?.pages[0]?.meta.currentPage} sur {data?.pages[0]?.meta.lastPage}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchPreviousPage()}
            disabled={!hasPreviousPage || isPreviousData}
          >
            Précédent
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isPreviousData}
          >
            Suivant
          </Button>
        </div>
      </div>
    </div>
  )
}
