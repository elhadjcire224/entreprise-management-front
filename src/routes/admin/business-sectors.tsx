import { AdminLayout } from '@/components/admin_layout';
import { BusinessSectorsTable } from '@/lib/business_sector/datatable';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/business-sectors')({
  beforeLoad: async ({ location, context }) => {
      if (!context.auth.isAuthenticated) {
        throw redirect({
          to: "/login",
          search: {
            redirect: location.href,
          },
        })
      }
    },
  component: () => <BusinessSectorsPage />,
})

function BusinessSectorsPage() {
  return (
    <AdminLayout>
      <div>
          <h1 className="text-2xl font-bold mb-4">Gestion des secteurs d'activité</h1>
          <BusinessSectorsTable />
      </div>
    </AdminLayout>
  );
}
