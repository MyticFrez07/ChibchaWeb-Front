import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import domains from './../../../../assets/js/domains-list.json'
import { ShoppingService } from '@service/shopping.service';
import { DomainsService } from '@service/domains.service';
import { HostingService } from '@service/hosting.service';
import { StorageService } from '@service/storage.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ConnectionService } from '@service/connection.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent {
  @Input() selectedDomains: any[] = domains;
  cartForm: FormGroup;
  discount: number = 18;
  plan: string = 'Premium'
  productSelected: any = [];
  hostingSelected: any = [];
  iva: number = 0;
  subtotal: number = 0;
  jsonXML: any;
  response: any;

  constructor(private fb: FormBuilder, private shoppingService: ShoppingService, private domainsService: DomainsService,
    private hostingService: HostingService,private storageService:StorageService,private router: Router,
    private connectionService: ConnectionService) {
    this.shoppingService.cartShopping.subscribe({
      next: (response) => {
        this.jsonXML = Object.assign({ domainList: response.domainList, hosting: response.hosting })
        this.response = response
        if (response.domainList) this.productSelected = response.domainList
        if (response.hosting) this.hostingSelected = response.hosting
        if (this.productSelected) this.calcImpuestos()
      },
      complete: () => { },
      error: (err) => { }
    })
  }

  ngOnInit() {
  }

  calcImpuestos() {
    this.iva = 0
    let subtotal = 0
    this.subtotal = 0
    if (this.productSelected) {
      this.productSelected.map(el => {
        subtotal += el['costDomain'] * (1 - (el.discount / 100))
      })
    }
    if (this.hostingSelected) {
      this.hostingSelected.map(el => {
        subtotal += el.currency
      })
    }
    this.iva = subtotal * 0.19
    this.subtotal = subtotal
    console.log(this.iva, this.subtotal)
  }

  payment() {
    if (this.productSelected) {
      this.productSelected.map(el => {
        const { id = 1, name, costDomain = el.discount, distributor_id, buyout_id } = el;
        this.domainsService.buyDomain({ name, costDomain, distributor_id, buyout_id }).subscribe({
          next: (response) => {
            console.log(response)
          },
          complete: () => { },
          error: (err) => {
            console.log(err)
          },
        })
      })
    }
    if (this.hostingSelected) {
      this.hostingSelected.map(el => {
        const { hosting_name, isActive, platform_id, plan_id, buyout_id = 0 } = el;
        this.hostingService.postHostings({ hosting_name, isActive, platform_id, plan_id, buyout_id }).subscribe({
          next: (response) => {
            console.log(response)
          },
          complete: () => { },
          error: (err) => {
            console.log(err)
          },
        })
      })
    }
    /*
    this.connectionService.getInvoicing().subscribe({
      next:(response)=>{
        this.connectionService.putInvoicing(response[0], response[0]['buyouts'].id).subscribe({
          next:(response)=>{
            console.log(response);
          },
          error(err) {
              console.error(err)
          },
        })
      },
      error(err) {
          console.error(err)
      },
    })*/
  }

  confirmPayment(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "¿Está seguro?",
      text: "¿Desea confirmar la compra?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Comprar",
      cancelButtonText: "Cancelar",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Pago realizado!",
          text: "El pago se ha realizado con éxito",
          icon: "success"
        }).then((r)=>{
          this.payment()
          setTimeout(() => {
            this.router.navigate(['/admin/invoicing/',]);
          }, 5000);
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "Se ha cancelado el proceso de pago",
          icon: "error"
        });
      }
    });
  }

}
