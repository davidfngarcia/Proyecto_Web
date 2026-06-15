import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Seccion1 } from './seccion-1';

describe('Seccion1', () => {
  let component: Seccion1;
  let fixture: ComponentFixture<Seccion1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Seccion1],
    }).compileComponents();

    fixture = TestBed.createComponent(Seccion1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
