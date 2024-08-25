import useAuth from '@/hooks/useAuth'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'

interface AuthContext {
  isAuthenticated: boolean
  user: ReturnType<typeof useAuth>['user']
  login: ReturnType<typeof useAuth>['login']
  logout: ReturnType<typeof useAuth>['logout']
  register: ReturnType<typeof useAuth>['register']
}
interface MyRouterContext {
  // The ReturnType of your useAuth hook or the value of your AuthContext
  auth: AuthContext
}
export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => <Outlet />,
})
