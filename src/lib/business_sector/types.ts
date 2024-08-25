export type BusinessSectorDataTable = {
  id: number
  name: string
  createdAt: string
  updatedAt: string
  companies_count: number
}

export type BusinessSector = Omit<BusinessSectorDataTable, 'companies_count'>
