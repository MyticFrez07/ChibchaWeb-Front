import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreditCardsService } from '@service/credit-cards.service';
import { StorageService } from '@service/storage.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent {
  tarjetaForm: FormGroup;

  constructor(private fb: FormBuilder, private creditCardsService:CreditCardsService, private storageService:StorageService,
    private router: Router) {
    this.tarjetaForm = this.fb.group({
      card_number: ['', [Validators.required, this.creditCardsService.validarNumeroTarjeta, Validators.maxLength(19)]],
      user_id: [this.storageService.getUserID(),],
      expiration_date: ['', [Validators.required, this.validarFechaVencimiento]],
      cvscard: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
      cardholder_name : ['',], //Proveedor
      owner : ['',], //titular
    });
  }
  // Método para formatear el número de tarjeta
  onCardNumberInput(event: any) {
    let inputVal = event.target.value;
    // Eliminar cualquier caracter no numérico
    inputVal = inputVal.replace(/\D/g, '');
    // Dividir el número en bloques de 4
    const formattedValue = inputVal.replace(/(\d{4})(?=\d)/g, '$1 ');
    // Actualizar el valor del input formateado
    this.tarjetaForm.patchValue({ card_number: formattedValue });
  }

  validarNumeroTarjeta(control) {
    const numeroTarjeta = control.value;

    // Lógica de validación para identificar el tipo de tarjeta
    // Agrega más casos según sea necesario
    if (/^4/.test(numeroTarjeta)) {
      return null; // Visa
    } else if (/^5[1-5]/.test(numeroTarjeta)) {
      return null; // MasterCard
    } else if (/^3[47]/.test(numeroTarjeta)) {
      return null; // American Express
    } else {
      return { 'tarjetaInvalida': true };
    }
  }

  validarFechaVencimiento(control) {
    const fechaVencimiento = control.value;
    const fechaActual = new Date();

    if (fechaVencimiento) {
      const partesFecha = fechaVencimiento.split('/');
      const mes = parseInt(partesFecha[0], 10);
      const anio = parseInt(partesFecha[1], 10) + 2000;

      if (mes < 1 || mes > 12 || anio < fechaActual.getFullYear() || (anio === fechaActual.getFullYear() && mes < fechaActual.getMonth() + 1)) {
        return { 'fechaInvalida': true };
      }
    }

    return null;
  }

  enviarFormulario() {
    if (this.tarjetaForm.valid) {
      console.log('Formulario válido:', this.tarjetaForm.value);
      let {card_number,user_id,expiration_date,cvscard,cardholder_name} = this.tarjetaForm.value
      this.creditCardsService.postCreditCard({card_number,user_id,expiration_date,cvscard,cardholder_name}).subscribe({
        next:(response)=>{
          console.log(response)
          this.router.navigate(['/admin/credit-card-managment/',]);
        },
        complete() {
        },
        error(err) {
            console.log(err)
        },
      })
    } else {
      console.log('Formulario no válido. Por favor, corrija los errores.');
    }
  }
}
