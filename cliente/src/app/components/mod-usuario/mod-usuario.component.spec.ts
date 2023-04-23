import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModUsuarioComponent } from './mod-usuario.component';

describe('ModUsuarioComponent', () => {
  let component: ModUsuarioComponent;
  let fixture: ComponentFixture<ModUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
