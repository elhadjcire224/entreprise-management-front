import { AdminLayout } from '@/components/admin_layout';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/users')({
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
  component: () => <UsersPage />,
})

function UsersPage() {
  return (
    <AdminLayout>
      <div>Hello /admin/users!</div>
    </AdminLayout>
  );
}
