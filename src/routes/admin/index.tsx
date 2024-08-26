import { AdminDashboard } from '@/components/admin_dashbord';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/')({
  component: () => <AdminDashboardPage />,
})

function AdminDashboardPage() {
  return (

          <AdminDashboard />

  );
}
