import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicingUpdatedComponent } from './invoicing-updated.component';

describe('InvoicingUpdatedComponent', () => {
  let component: InvoicingUpdatedComponent;
  let fixture: ComponentFixture<InvoicingUpdatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicingUpdatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicingUpdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
