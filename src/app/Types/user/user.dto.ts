import type { AppRole } from './role.type';

export interface UserDto {
  id: string;
  tenantId: string;
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
  roles: AppRole[];   // e.g. ["Police"]
}