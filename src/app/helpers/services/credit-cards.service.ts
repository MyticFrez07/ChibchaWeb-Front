import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { StorageService } from './storage.service';
import { environment as env } from '../../../environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditCardsService {
	apiUrl:any = env.host
	headers: HttpHeaders;
	user_id:number = +this.storageService.getUserID()

	constructor(private http: HttpClient, private tokenService:TokenService,
		private storageService:StorageService) {
		this.headers = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: `Basic ${this.tokenService.getToken()}`,
      "ngrok-skip-browser-warning": "69420",
		});
	}

  validarNumeroTarjeta(numeroTarjeta: string): boolean {
    // Eliminar espacios en blanco y guiones de la cadena
    const numeroLimpio = String(numeroTarjeta).replace(/\s+/g, '').replace(/-/g, '');

    // Comprobar si la cadena contiene solo números
    if (!/^[0-9]+$/.test(numeroLimpio)) {
      return false;
    }

    // Comprobar si la tarjeta es de Visa, MasterCard, American Express, etc.
    if (!this.validarProveedorTarjeta(numeroLimpio)) {
      return false;
    }

    // Aplicar el algoritmo de Luhn (módulo 10)
    return this.validarAlgoritmoLuhn(numeroLimpio);
  }

  private validarProveedorTarjeta(numeroTarjeta: string): boolean {
    // Comprobar patrones para diferentes proveedores de tarjetas
    if (/^4/.test(numeroTarjeta)) {
      return true; // Visa
    } else if (/^5[1-5]/.test(numeroTarjeta)) {
      return true; // MasterCard
    } else if (/^3[47]/.test(numeroTarjeta)) {
      return true; // American Express
    } // Agregar más casos según sea necesario

    return false;
  }

  private validarAlgoritmoLuhn(numeroTarjeta: string): boolean {
    let suma = 0;
    let doble = false;

    for (let i = numeroTarjeta.length - 1; i >= 0; i--) {
      let digito = parseInt(numeroTarjeta.charAt(i), 10);

      if (doble) {
        digito *= 2;
        if (digito > 9) {
          digito -= 9;
        }
      }

      suma += digito;
      doble = !doble;
    }

    return suma % 10 === 0;
  }

  maskCreditCard(creditCard: string): string {
    if (creditCard && creditCard.length >= 4) {
      const lastFourDigits = creditCard.slice(-4);
      const maskedCreditCard = '*'.repeat(creditCard.length - 4) + lastFourDigits;
      return maskedCreditCard
    }
    return creditCard;
  }

  postCreditCard(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/creditCards/`,data,{ headers: this.headers })
  }

  getCreditCard():Observable<any>{
    return this.http.get(`${this.apiUrl}/creditCards/${this.user_id}`,{ headers: this.headers })
  }

  deleteCreditCard(idCard):Observable<any>{
    return this.http.delete(`${this.apiUrl}/creditCard/${idCard}`,{ headers: this.headers })
  }
}
