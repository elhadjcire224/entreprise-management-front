import { AdminDashboard } from '@/components/admin_dashbord';
import { AdminLayout } from '@/components/admin_layout';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/')({
  beforeLoad: async ({ location, context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {

          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      })
    }
  },
  component: () => <AdminDashboardPage />,
})

function AdminDashboardPage() {
  return (
    <AdminLayout>
          <AdminDashboard />
    </AdminLayout>
  );
}
