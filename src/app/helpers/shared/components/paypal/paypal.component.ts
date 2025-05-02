import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment as env} from '../../../../../environments/environment'
declare var paypal;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit{
  paymentStatus:any=''
  @ViewChild('paypal', {static:true}) paypalElement: ElementRef;
  title='angular-paypal-payment'
  producto = {
    descripcion:'Dominio',
    precio: 56300,
    img: 'imagen producto'
  }

  constructor() { }

  ngOnInit() {
    paypal
    .Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            description: 'Descripción del producto',
            amount: {
              currency_code: "USD",
              value: this.producto.precio
            }
          }]
        });
      },
      //pago exitoso
      onApprove: (data, actions) => {
        return actions.order.capture().then(details => {
          console.log('Pago exitoso', details);
        });
      },
      // Manejar errores
      onError: err => {
        console.error('Error en el pago', err);
      }
    })
    .render(this.paypalElement.nativeElement);
  }
}
