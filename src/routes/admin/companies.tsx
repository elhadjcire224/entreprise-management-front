import { createFileRoute } from '@tanstack/react-router';

import { useCompanies } from '@/hooks/useCompanies';
import { columns } from '@/lib/company/colums';
import { DataTable } from '@/lib/company/datatable';
import { useState } from 'react';

export const Route = createFileRoute('/admin/companies')({

  component: () => <AdminCompaniesPage />,
})

function AdminCompaniesPage() {
  return (

    <CompaniesTable />

  );
}



export function CompaniesTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, error } = useCompanies({ page, limit });

  const handlePaginationChange = (newPage: number) => {
    setPage(newPage + 1);
  };

  if (isLoading) return <div>Chargement des entreprises...</div>;
  if (error) return <div>Une erreur est survenue : {error.message}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Liste des Entreprises</h2>
      <DataTable
        columns={columns}
        data={data?.data || []}
        onPaginationChange={handlePaginationChange}
        pageCount={data?.meta.lastPage || 1}
        pageIndex={page - 1}
        filterColumn="status"
        filterOptions={['PENDING', 'ACCEPTED', 'REJECTED', 'INCOMPLETE']}
      />
    </div>
  );
}
