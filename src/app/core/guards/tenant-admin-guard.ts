import { CanActivateFn } from '@angular/router';

export const tenantAdminGuard: CanActivateFn = (route, state) => {
  return true;
};
