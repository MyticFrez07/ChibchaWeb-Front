import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  cartShopping: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private storageService:StorageService) {
    /*let items = this.storageService.getCartItems()
    if (items) this.setCartShopping(items)*/
  }

  setCartShopping(msg: any): void {
      //this.storageService.saveCartShopping(msg)
      this.cartShopping.next(msg);
	}
}
