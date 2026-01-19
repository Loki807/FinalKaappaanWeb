import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserDto } from '../../Types/user';
import { EMPTY, catchError } from 'rxjs';

export const usersResolver: ResolveFn<UserDto[]> = () => {

  const service = inject(UserService);
  const router = inject(Router);

  // ⭐ STEP 1: tenantId must exist
  const tenantId = localStorage.getItem('tenantId');

  if (!tenantId) {
    console.error("❌ No tenant ID found!");
    router.navigateByUrl('/error');
    return EMPTY;
  }

  // ⭐ STEP 2: Return USER LIST
  return service.getTenantUsers().pipe(
    catchError(err => {
      console.error("❌ Resolver failed:", err);
      router.navigateByUrl('/error');
      return EMPTY;
    })
  );
};
