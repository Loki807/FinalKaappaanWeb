import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantView } from './tenant-view';

describe('TenantView', () => {
  let component: TenantView;
  let fixture: ComponentFixture<TenantView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
