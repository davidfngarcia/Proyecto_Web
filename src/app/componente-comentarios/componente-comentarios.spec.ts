import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteComentarios } from './componente-comentarios';

describe('ComponenteComentarios', () => {
  let component: ComponenteComentarios;
  let fixture: ComponentFixture<ComponenteComentarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteComentarios],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponenteComentarios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
