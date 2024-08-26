import api from '@/lib/api'
import { columns } from '@/lib/company/colums'

import { CompanyDataTableType, companyStatus } from '@/lib/company/company_types'
import { DataTable } from '@/lib/company/datatable'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { PaginationInfo } from './pagination_info'


const fetchCompanies = async ({ page, limit, search, status }) => {
  const { data } = await api.get('/companies', {
    params: { page, limit, search, status }
  })
  return data.companies
}

export function CompaniesTable() {
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<companyStatus | ''>('')

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['companies', page, limit, search, status],
    queryFn: () => fetchCompanies({ page, limit, search, status }),
    placeholderData: keepPreviousData,
  })

  const handlePaginationChange = (newPage: number) => {
    setPage(newPage + 1)
  }

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch)
    setPage(1)
  }

  const handleStatusFilterChange = (newStatus: companyStatus | '') => {
    setStatus(newStatus)
    setPage(1)
  }

  if (isError) {
    return <div>Une erreur est survenue : {error.message}</div>
  }

  return (
    <div>
         <DataTable<CompanyDataTableType, any>
           columns={columns}
           data={data?.data || []}
           onPaginationChange={handlePaginationChange}
           onSearchChange={handleSearchChange}
           onStatusFilterChange={handleStatusFilterChange}
           pageCount={data?.meta.lastPage || 1}
           pageIndex={page - 1}
           isLoading={isPending}
         />
         {data && (
           <div className="mt-4">
             <PaginationInfo
               currentPage={page}
               totalPages={data.meta.lastPage}
               totalItems={data.meta.total}
               itemsPerPage={10}
             />
           </div>
         )}
       </div>
  )
}
