export const environment = {
    production: true,
    siteUrl: 'https://d12q3zkftvfo29.cloudfront.net',
    apiBase: 'https://d12q3zkftvfo29.cloudfront.net/api',

    endpoints: {
        admin: {
            tenant: {
                create: 'admin/tenant/create',
                all: 'admin/tenant/all',
                byId: (id: string) => `admin/tenant/${id}`,
                update: (id: string) => `admin/tenant/${id}`,
                delete: (id: string) => `admin/tenant/${id}`,
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
