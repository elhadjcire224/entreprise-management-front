import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { FilterIcon, SearchIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { companyStatus } from "./company_types"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onPaginationChange: (page: number) => void
  onSearchChange: (search: string) => void
  onStatusFilterChange: (status: companyStatus | '') => void
  pageCount: number
  pageIndex: number
  isLoading: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onPaginationChange,
  onSearchChange,
  onStatusFilterChange,
  pageCount,
  pageIndex,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<companyStatus | ''>('')

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount,
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(search)
    }, 300)

    return () => clearTimeout(timer)
  }, [search])

  const handleStatusFilterChange = (status: companyStatus | '') => {
    setStatusFilter(status)
    onStatusFilterChange(status)
  }

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <div className="relative max-w-sm">
          <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="pl-8"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <FilterIcon className="mr-2 h-4 w-4" />
              Filtrer par statut
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
              checked={statusFilter === ''}
              onCheckedChange={() => handleStatusFilterChange('')}
            >
              Tous
            </DropdownMenuCheckboxItem>
            {Object.values(companyStatus).map((status) => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={statusFilter === status}
                onCheckedChange={() => handleStatusFilterChange(status)}
              >
                {status}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Chargement...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
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
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPaginationChange(pageIndex - 1)}
          disabled={pageIndex === 0}
        >
          Précédent
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPaginationChange(pageIndex + 1)}
          disabled={pageIndex === pageCount - 1}
        >
          Suivant
        </Button>
      </div>
    </div>
  )
}
