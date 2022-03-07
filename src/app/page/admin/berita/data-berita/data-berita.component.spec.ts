import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataBeritaComponent } from './data-berita.component';

describe('DataBeritaComponent', () => {
  let component: DataBeritaComponent;
  let fixture: ComponentFixture<DataBeritaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataBeritaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataBeritaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
