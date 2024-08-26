import { useAuth } from '@/hooks/useAuth'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'

interface AuthContext {
  user: ReturnType<typeof useAuth>['user']
  login: ReturnType<typeof useAuth>['login']
  logout: ReturnType<typeof useAuth>['logout']
  register: ReturnType<typeof useAuth>['register']
  isAdmin: ReturnType<typeof useAuth>['isAdmin']
  isValidator: ReturnType<typeof useAuth>['isValidator']
}
interface MyRouterContext {
  // The ReturnType of your useAuth hook or the value of your AuthContext
  auth: AuthContext
}
export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => <Outlet />,
})
