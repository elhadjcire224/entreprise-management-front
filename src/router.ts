
// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Importez votre hook useAuth
import { createRouter } from '@tanstack/react-router'

// Définissez le type pour le contexte d'authentification



// Create a new router instance
export const router = createRouter({
  routeTree ,
  context: {
    auth: undefined!
  }
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
//Render the app
