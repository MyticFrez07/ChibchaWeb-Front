import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cards-options',
  templateUrl: './cards-options.component.html',
  styleUrls: ['./cards-options.component.scss']
})
export class CardsOptionsComponent {
  @Output() addProduct = new EventEmitter();
  @Output() removeProduct = new EventEmitter();
  @Input('domain') domain:any;
  selectedDomains: any[] = [];

  cardsList = [
      {
        "dominio": ".com",
        "price": 52500,
        "botonDisponible": "Añadir",
        "botonSoporte": "Contactar con Soporte para Comprar"
      },
      {
        "dominio": ".net",
        "price": 54500,
        "botonDisponible": "Añadir",
        "botonSoporte": "Contactar con Soporte para Comprar"
      },
      {
        "dominio": ".org",
        "price": 49500,
        "botonDisponible": "Añadir",
        "botonSoporte": "Contactar con Soporte para Comprar"
      },
      {
        "dominio": ".co",
        "price": 98500,
        "botonDisponible": "Añadir",
        "botonSoporte": "Contactar con Soporte para Comprar"
      },
      {
        "dominio": ".com.co",
        "price": 47500,
        "botonDisponible": "Añadir",
        "botonSoporte": "Contactar con Soporte para Comprar"
      }
    ]

  addToCart(domain: any) {
    domain.inCart = true;
    this.addProduct.emit(domain)
  }

  removeFromCart(domain: any) {
    domain.inCart = false;
    this.removeProduct.emit(this.domain)
  }
}
