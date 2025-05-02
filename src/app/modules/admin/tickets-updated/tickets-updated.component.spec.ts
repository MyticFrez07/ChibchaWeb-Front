import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsUpdatedComponent } from './tickets-updated.component';

describe('TicketsUpdatedComponent', () => {
  let component: TicketsUpdatedComponent;
  let fixture: ComponentFixture<TicketsUpdatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsUpdatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsUpdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
