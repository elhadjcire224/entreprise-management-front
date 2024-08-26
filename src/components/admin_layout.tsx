import { useUserRole } from "@/hooks/useUserRole";
import { cn } from "@/lib/utils";
import { Link, Outlet, useLocation } from '@tanstack/react-router';
import {
    Briefcase,
    Building2,
    LayoutDashboard,
    Users
} from 'lucide-react';
import { ReactNode } from 'react';
import Header from "./header";


interface AdminLayoutProps {
  children?: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const { isAdmin } = useUserRole();

  const sidebarItems = [

      ...(isAdmin
        ? [
            { icon: LayoutDashboard, label: 'Dashboard', to: '/admin' },
          { icon: Building2, label: 'Companies', to: '/admin/companies' },
            { icon: Briefcase, label: 'Business Sectors', to: '/admin/business-sectors' },
            { icon: Users, label: 'Users', to: '/admin/users' },
          ]
        : [{ icon: Building2, label: 'Companies', to: '/admin/companies' }]),

    ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground dark:bg-[#1e1e1e] dark:text-white">
      <Header />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 border-r border-muted/20 bg-muted/40 p-6 dark:border-muted/40 dark:bg-[#1a1a1a] hidden md:block">
          <nav className="grid gap-2">
            {sidebarItems.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className={cn(
                  "flex items-center gap-2 rounded-md",
                  location.pathname === item.to
                    ? "bg-primary px-3 py-2 text-primary-foreground transition-colors hover:bg-primary/80 dark:bg-primary dark:text-primary-foreground"
                    : "px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground dark:hover:bg-muted/20"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}
