import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { tenantAdminGuard } from './tenant-admin-guard';

describe('tenantAdminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => tenantAdminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
