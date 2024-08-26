import { BusinessSectorsTable } from '@/lib/business_sector/datatable';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/business-sectors')({
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
  component: () => <BusinessSectorsPage />,
})

function BusinessSectorsPage() {
  return (

      <div>
          <h1 className="text-2xl font-bold mb-4">Gestion des secteurs d'activité</h1>
          <BusinessSectorsTable />
      </div>

  );
}
