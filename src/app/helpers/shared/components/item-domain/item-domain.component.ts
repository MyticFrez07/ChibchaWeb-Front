import { Component, EventEmitter, Input, Output } from '@angular/core';

interface Domain {
  name: string;
  price: number;
  subtitle: string;
  inCart: boolean;
}
@Component({
  selector: 'app-item-domain',
  templateUrl: './item-domain.component.html',
  styleUrls: ['./item-domain.component.scss']
})
export class ItemDomainComponent {
  @Output() addProduct = new EventEmitter();
  @Output() removeProduct = new EventEmitter();
  @Input('domain') domain:Domain;
  @Input('isExist') isDomainExist:any;
  selectedDomains: Domain[] = [];
  totalPrice: number = 0;

  constructor(){
  }

  addToCart(domain: Domain) {
    domain.inCart = true;
    this.addProduct.emit(domain)
  }

  removeFromCart(domain: Domain) {
    domain.inCart = false;
    this.removeProduct.emit(this.selectedDomains)
  }
}
