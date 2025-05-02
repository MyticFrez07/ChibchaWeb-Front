import { Component } from '@angular/core';
import { ShoppingService } from '@service/shopping.service';

@Component({
  selector: 'app-shopping-cart-banner',
  templateUrl: './shopping-cart-banner.component.html',
  styleUrls: ['./shopping-cart-banner.component.scss']
})
export class ShoppingCartBannerComponent {

  selectedDomains: any[] = [];
  selectedhosting: any[] = [];
  totalPrice: number = 0;

  constructor(private shoppingService:ShoppingService){
    this.shoppingService.cartShopping.subscribe({
      next:(response)=>{
        console.log(response)
        if (response) {
          this.totalPrice = 0
          this.selectedDomains = response
          if (response.domainList) {
            response.domainList.map(el=>{
              this.totalPrice += el.costDomain
            })
          }
          if(response.hosting){
            response.hosting.map(el=>{
              this.totalPrice += el.currency
            })
          }
        }
      },
      complete:()=>{},
      error:(err)=>{}
    })
  }

  calculateTotalPrice() {
    this.totalPrice = this.selectedDomains.reduce((total, domain) => total + domain.costDomain, 0);
    this.totalPrice = this.totalPrice +this.selectedhosting.reduce((total, hosting) => total + hosting.currency, 0);
  }
}
