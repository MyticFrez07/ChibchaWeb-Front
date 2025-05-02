import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyRegisterComponent } from './buy-register.component';

describe('BuyRegisterComponent', () => {
  let component: BuyRegisterComponent;
  let fixture: ComponentFixture<BuyRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuyRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
