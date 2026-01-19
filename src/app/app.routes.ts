
import { Routes } from '@angular/router';
import { tenantResolver } from './core/services/tenant-resolver-resolver';
import { usersResolver } from './core/services/users-resolver';
import { UnsavedChangesGuard } from './core/guards/unsaved-changes-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./Pages/home/home').then(m => m.Home) },
  { path: 'Contracts', loadComponent: () => import('./Pages/contarcts/contarcts').then(m => m.Contarcts) },
  { path: 'Privacy', loadComponent: () => import('./Pages/privacy/privacy').then(m => m.Privacy) },


  { path: 'login', loadComponent: () => import('./core/features/login/login').then(m => m.Login) },
  { path: 'change-password', loadComponent: () => import('./core/features/change-password/change-password').then(m => m.ChangePassword) },
  { path: 'firstpage', loadComponent: () => import('./core/features/SuperAdmin/firstpage/firstpage').then(m => m.Firstpage) },
  { path: 'dashboard', loadComponent: () => import('./core/features/SuperAdmin/dashboard/dashboard').then(m => m.Dashboard) },
  { path: 'maindashboard', loadComponent: () => import('./core/features/SuperAdmin/maindashboard/maindashboard').then(m => m.Maindashboard) },
  { path: 'profile', loadComponent: () => import('./core/features/SuperAdmin/profile/profile').then(m => m.Profile) },
  { path: 'AdminDetails', loadComponent: () => import('./core/features/SuperAdmin/admin-view/admin-view').then(m => m.AdminView) },
  { path: 'AdminService', loadComponent: () => import('./core/features/SuperAdmin/admin-service/admin-service').then(m => m.AdminService) },
  {
    path: 'tenant-create', loadComponent: () => import('./core/features/SuperAdmin/tenant-create/tenant-create').then(m => m.TenantCreate), resolve: { tenants: tenantResolver },
    canDeactivate: [UnsavedChangesGuard]
  },
  {
    path: 'tenant-details',
    loadComponent: () => import('./core/features/SuperAdmin/tenant-details/tenant-details').then(m => m.TenantDetails),
    resolve: { tenants: tenantResolver }
  },

  {
    path: 'tenant/view/:id',
    loadComponent: () =>
      import('./core/features/SuperAdmin/tenant-view/tenant-view')
        .then(m => m.TenantView)
  },
  {
    path: 'tenant/update/:id',
    loadComponent: () =>
      import('./core/features/SuperAdmin/tenant-update/tenant-update')
        .then(m => m.TenantUpdate)
  },

  { path: 'tenatadminmain', loadComponent: () => import('./core/features/tenant-admin/maindashboard/maindashboard').then(m => m.Maindashboard) },
  {
    path: 'tenant-dashboard', loadComponent: () => import('./core/features/tenant-admin/dashboard/dashboard').then(m => m.Dashboard),
    resolve: { users: usersResolver }
  },
  {
    path: 'users-create', loadComponent: () => import('./core/features/tenant-admin/users-create/users-create').then(m => m.UsersCreate),
    canDeactivate: [UnsavedChangesGuard]
  },
  // ✅ REQUIRED ROUTES
  {
    path: 'user-view/:id',
    loadComponent: () =>
      import('./core/features/tenant-admin/user-view/user-view')
        .then(m => m.UserView)
  },
  {
    path: 'user-edit/:id',
    loadComponent: () =>
      import('./core/features/tenant-admin/user-edit/user-edit')
        .then(m => m.UserEdit)
  },

  {
    path: 'citizens',
    loadComponent: () =>
      import('./core/features/citizens/citizens-list.component')
        .then(m => m.CitizensListComponent)
  }

];
