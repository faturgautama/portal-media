import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCardReadMoreComponent } from './single-card-read-more.component';

describe('SingleCardReadMoreComponent', () => {
  let component: SingleCardReadMoreComponent;
  let fixture: ComponentFixture<SingleCardReadMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleCardReadMoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCardReadMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
