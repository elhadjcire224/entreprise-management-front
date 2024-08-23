import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/')({
  beforeLoad: async ({ location }) => {
    if (1) {
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
  component: () => <div>Hello /admin/!</div>
})
