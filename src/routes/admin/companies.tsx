import { createFileRoute } from '@tanstack/react-router';

import { CompaniesTable } from '@/components/companies_table';

export const Route = createFileRoute('/admin/companies')({

  component: () => <AdminCompaniesPage />,
})

function AdminCompaniesPage() {
  return (

    <CompaniesTable />

  );
}
