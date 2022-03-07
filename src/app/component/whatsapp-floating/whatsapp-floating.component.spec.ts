import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappFloatingComponent } from './whatsapp-floating.component';

describe('WhatsappFloatingComponent', () => {
  let component: WhatsappFloatingComponent;
  let fixture: ComponentFixture<WhatsappFloatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsappFloatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatsappFloatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
