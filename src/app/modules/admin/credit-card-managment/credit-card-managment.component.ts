import { Component } from '@angular/core';
import { TarjetaCredito } from '@interfaces/TarjetaCredito';
import { CreditCardsService } from '@service/credit-cards.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-credit-card-managment',
  templateUrl: './credit-card-managment.component.html',
  styleUrls: ['./credit-card-managment.component.scss']
})
export class CreditCardManagmentComponent {
  tarjetasPrueba: TarjetaCredito[] = [
    { id: 1, numero: '1234-5678-9012-3456', nombreTitular: 'John Doe', fechaVencimiento: '12/24', cvc: '123', proveedor: 'Visa' },
    { id: 2, numero: '9876-5432-1098-7654', nombreTitular: 'Jane Doe', fechaVencimiento: '06/23', cvc: '456', proveedor: 'MasterCard' },
  ];
  tarjetas:any=[]

  constructor(
    private creditCardsService:CreditCardsService,
    ){
      this.creditCardsService.getCreditCard().subscribe({
        next:(response)=>{
          console.log(response)
          this.tarjetas = response
        },
        complete() {
          this.router.navigate(['/admin/credit-card-managment/',]);
        },
        error(err) {
            console.log(err)
        },
      })
    }

  maskCreditCard(creditCardNumber:any):string{
    return this.creditCardsService.maskCreditCard(creditCardNumber)
  }

  confirmDeleteCard(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "¿Está seguro?",
      text: "¿Desea eliminar esta tarjeta?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Eliminado!",
          text: "La tarjeta se ha eliminado con éxito",
          icon: "success"
        }).then((r)=>{
          this.deleteCard(id)
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "Se ha cancelado el proceso",
          icon: "error"
        });
      }
    });
  }

  deleteCard(id){
    this.tarjetas = this.tarjetas.filter(tarjeta => tarjeta.id !== id);
    this.creditCardsService.deleteCreditCard(id).subscribe({
      next:(response)=>{
        console.log(response)
      }
    })
  }
}
