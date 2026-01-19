import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Contarcts } from './contarcts';

describe('Contarcts', () => {
  let component: Contarcts;
  let fixture: ComponentFixture<Contarcts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contarcts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Contarcts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
