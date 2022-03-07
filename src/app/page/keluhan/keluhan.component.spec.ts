import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeluhanComponent } from './keluhan.component';

describe('KeluhanComponent', () => {
  let component: KeluhanComponent;
  let fixture: ComponentFixture<KeluhanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeluhanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeluhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
