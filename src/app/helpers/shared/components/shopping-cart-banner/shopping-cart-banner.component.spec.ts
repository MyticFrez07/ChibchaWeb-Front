import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartBannerComponent } from './shopping-cart-banner.component';

describe('ShoppingCartBannerComponent', () => {
  let component: ShoppingCartBannerComponent;
  let fixture: ComponentFixture<ShoppingCartBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingCartBannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingCartBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
