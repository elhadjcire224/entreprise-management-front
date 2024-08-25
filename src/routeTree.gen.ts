/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as CompanyregisterImport } from './routes/company_register'
import { Route as IndexImport } from './routes/index'
import { Route as AdminIndexImport } from './routes/admin/index'
import { Route as AdminUsersImport } from './routes/admin/users'
import { Route as AdminCompaniesImport } from './routes/admin/companies'
import { Route as AdminBusinessSectorsImport } from './routes/admin/business-sectors'
import { Route as AdminAdminImport } from './routes/admin/admin'
import { Route as authRegisterImport } from './routes/(auth)/register'
import { Route as authLoginImport } from './routes/(auth)/login'

// Create/Update Routes

const CompanyregisterRoute = CompanyregisterImport.update({
  path: '/company_register',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AdminIndexRoute = AdminIndexImport.update({
  path: '/admin/',
  getParentRoute: () => rootRoute,
} as any)

const AdminUsersRoute = AdminUsersImport.update({
  path: '/admin/users',
  getParentRoute: () => rootRoute,
} as any)

const AdminCompaniesRoute = AdminCompaniesImport.update({
  path: '/admin/companies',
  getParentRoute: () => rootRoute,
} as any)

const AdminBusinessSectorsRoute = AdminBusinessSectorsImport.update({
  path: '/admin/business-sectors',
  getParentRoute: () => rootRoute,
} as any)

const AdminAdminRoute = AdminAdminImport.update({
  path: '/admin/admin',
  getParentRoute: () => rootRoute,
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
    '/company_register': {
      id: '/company_register'
      path: '/company_register'
      fullPath: '/company_register'
      preLoaderRoute: typeof CompanyregisterImport
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
    '/admin/admin': {
      id: '/admin/admin'
      path: '/admin/admin'
      fullPath: '/admin/admin'
      preLoaderRoute: typeof AdminAdminImport
      parentRoute: typeof rootRoute
    }
    '/admin/business-sectors': {
      id: '/admin/business-sectors'
      path: '/admin/business-sectors'
      fullPath: '/admin/business-sectors'
      preLoaderRoute: typeof AdminBusinessSectorsImport
      parentRoute: typeof rootRoute
    }
    '/admin/companies': {
      id: '/admin/companies'
      path: '/admin/companies'
      fullPath: '/admin/companies'
      preLoaderRoute: typeof AdminCompaniesImport
      parentRoute: typeof rootRoute
    }
    '/admin/users': {
      id: '/admin/users'
      path: '/admin/users'
      fullPath: '/admin/users'
      preLoaderRoute: typeof AdminUsersImport
      parentRoute: typeof rootRoute
    }
    '/admin/': {
      id: '/admin/'
      path: '/admin'
      fullPath: '/admin'
      preLoaderRoute: typeof AdminIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  CompanyregisterRoute,
  authLoginRoute,
  authRegisterRoute,
  AdminAdminRoute,
  AdminBusinessSectorsRoute,
  AdminCompaniesRoute,
  AdminUsersRoute,
  AdminIndexRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/company_register",
        "/login",
        "/register",
        "/admin/admin",
        "/admin/business-sectors",
        "/admin/companies",
        "/admin/users",
        "/admin/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/company_register": {
      "filePath": "company_register.tsx"
    },
    "/login": {
      "filePath": "(auth)/login.tsx"
    },
    "/register": {
      "filePath": "(auth)/register.tsx"
    },
    "/admin/admin": {
      "filePath": "admin/admin.tsx"
    },
    "/admin/business-sectors": {
      "filePath": "admin/business-sectors.tsx"
    },
    "/admin/companies": {
      "filePath": "admin/companies.tsx"
    },
    "/admin/users": {
      "filePath": "admin/users.tsx"
    },
    "/admin/": {
      "filePath": "admin/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
