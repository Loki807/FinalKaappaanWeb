import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { tenantByIdResolver } from './tenant-by-id-resolver';

describe('tenantByIdResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => tenantByIdResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
