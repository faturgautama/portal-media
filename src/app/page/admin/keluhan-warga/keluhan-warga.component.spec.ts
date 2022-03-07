import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeluhanWargaComponent } from './keluhan-warga.component';

describe('KeluhanWargaComponent', () => {
  let component: KeluhanWargaComponent;
  let fixture: ComponentFixture<KeluhanWargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeluhanWargaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeluhanWargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
