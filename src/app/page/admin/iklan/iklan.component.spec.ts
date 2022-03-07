import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IklanComponent } from './iklan.component';

describe('IklanComponent', () => {
  let component: IklanComponent;
  let fixture: ComponentFixture<IklanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IklanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IklanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
