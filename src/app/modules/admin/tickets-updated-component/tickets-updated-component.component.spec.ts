import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsUpdatedComponentComponent } from './tickets-updated-component.component';

describe('TicketsUpdatedComponentComponent', () => {
  let component: TicketsUpdatedComponentComponent;
  let fixture: ComponentFixture<TicketsUpdatedComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsUpdatedComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsUpdatedComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
