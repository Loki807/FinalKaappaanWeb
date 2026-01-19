import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantUpdate } from './tenant-update';

describe('TenantUpdate', () => {
  let component: TenantUpdate;
  let fixture: ComponentFixture<TenantUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
