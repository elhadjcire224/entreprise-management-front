// hooks/useCompanies.ts
 // Assurez-vous que le chemin d'importation est correct
import api from '@/lib/api';
import { Company } from '@/lib/company/colums';
import { useQuery } from '@tanstack/react-query';

type PaginationParams = {
  page: number
  limit: number
}

type PaginatedResponse = {
  meta: {
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
  data: Company[]
}

const fetchCompanies = async ({ page, limit }: PaginationParams): Promise<PaginatedResponse> => {
  const { data } = await api.get(`/companies?page=${page}&limit=${limit}`)
  return data.companies
}

export function useCompanies({ page = 1, limit = 10 }: PaginationParams) {
  return useQuery<PaginatedResponse, Error>({
    queryKey: ['companies', page, limit],
    queryFn: () => fetchCompanies({ page, limit }),
  })
}
