import type { AppRole } from './role.type';

export interface CreateUserRequest {
  tenantId: string;    // we’ll fill from Storage/JWT for the logged-in TenantAdmin
  name: string;
  email: string;
  phone: string;
  role: AppRole;   
   password?: string;    // single role to assign initially
  // password?: string; // optional: if your API accepts a temporary password
}