// src/environments/environment.ts
export const environment = {
  production: false,
  apiBase: 'https://uncomplying-carlee-unregurgitated.ngrok-free.dev/api',

  // Define the endpoints related to tenants and tenant users
  endpoints: {
    admin: {
      tenant: {
        create: 'admin/tenant/create',   // Create a new tenant
        all: 'admin/tenant/all',         // Get all tenants
        byId: (id: string) => `admin/tenant/${id}`,  // Get a single tenant by ID
        update: (id: string) => `admin/tenant/${id}`,  // Update tenant info
        delete: (id: string) => `admin/tenant/${id}`,  // Delete tenant
      },
      tenantUser: {
        create: 'admin/tenant/user/create',
        allByTenant: (tenantId: string) => `admin/tenant/user/all/${tenantId}`,
        byId: (id: string) => `admin/tenant/user/${id}`,
        update: (id: string) => `admin/tenant/user/update/${id}`,
        delete: (id: string) => `admin/tenant/user/delete/${id}`,
      }
    }
  }
};
