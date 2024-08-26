/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AdminImport } from './routes/admin'
import { Route as IndexImport } from './routes/index'
import { Route as AdminIndexImport } from './routes/admin/index'
import { Route as AdminUsersImport } from './routes/admin/users'
import { Route as AdminCompaniesImport } from './routes/admin/companies'
import { Route as AdminBusinessSectorsImport } from './routes/admin/business-sectors'
import { Route as authRegisterImport } from './routes/(auth)/register'
import { Route as authLoginImport } from './routes/(auth)/login'

// Create/Update Routes

const AdminRoute = AdminImport.update({
  path: '/admin',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AdminIndexRoute = AdminIndexImport.update({
  path: '/',
  getParentRoute: () => AdminRoute,
} as any)

const AdminUsersRoute = AdminUsersImport.update({
  path: '/users',
  getParentRoute: () => AdminRoute,
} as any)

const AdminCompaniesRoute = AdminCompaniesImport.update({
  path: '/companies',
  getParentRoute: () => AdminRoute,
} as any)

const AdminBusinessSectorsRoute = AdminBusinessSectorsImport.update({
  path: '/business-sectors',
  getParentRoute: () => AdminRoute,
} as any)

const authRegisterRoute = authRegisterImport.update({
  path: '/register',
  getParentRoute: () => rootRoute,
} as any)

const authLoginRoute = authLoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/admin': {
      id: '/admin'
      path: '/admin'
      fullPath: '/admin'
      preLoaderRoute: typeof AdminImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof authLoginImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof authRegisterImport
      parentRoute: typeof rootRoute
    }
    '/admin/business-sectors': {
      id: '/admin/business-sectors'
      path: '/business-sectors'
      fullPath: '/admin/business-sectors'
      preLoaderRoute: typeof AdminBusinessSectorsImport
      parentRoute: typeof AdminImport
    }
    '/admin/companies': {
      id: '/admin/companies'
      path: '/companies'
      fullPath: '/admin/companies'
      preLoaderRoute: typeof AdminCompaniesImport
      parentRoute: typeof AdminImport
    }
    '/admin/users': {
      id: '/admin/users'
      path: '/users'
      fullPath: '/admin/users'
      preLoaderRoute: typeof AdminUsersImport
      parentRoute: typeof AdminImport
    }
    '/admin/': {
      id: '/admin/'
      path: '/'
      fullPath: '/admin/'
      preLoaderRoute: typeof AdminIndexImport
      parentRoute: typeof AdminImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  AdminRoute: AdminRoute.addChildren({
    AdminBusinessSectorsRoute,
    AdminCompaniesRoute,
    AdminUsersRoute,
    AdminIndexRoute,
  }),
  authLoginRoute,
  authRegisterRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/admin",
        "/login",
        "/register"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/admin": {
      "filePath": "admin.tsx",
      "children": [
        "/admin/business-sectors",
        "/admin/companies",
        "/admin/users",
        "/admin/"
      ]
    },
    "/login": {
      "filePath": "(auth)/login.tsx"
    },
    "/register": {
      "filePath": "(auth)/register.tsx"
    },
    "/admin/business-sectors": {
      "filePath": "admin/business-sectors.tsx",
      "parent": "/admin"
    },
    "/admin/companies": {
      "filePath": "admin/companies.tsx",
      "parent": "/admin"
    },
    "/admin/users": {
      "filePath": "admin/users.tsx",
      "parent": "/admin"
    },
    "/admin/": {
      "filePath": "admin/index.tsx",
      "parent": "/admin"
    }
  }
}
ROUTE_MANIFEST_END */
