import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '@service/connection.service';

@Component({
  selector: 'app-invoicing',
  templateUrl: './invoicing.component.html',
  styleUrls: ['./invoicing.component.scss']
})
export class InvoicingComponent  implements OnInit{

  response:any;
  isLoading:boolean=true
  constructor(private connectionService: ConnectionService){
  }

  ngOnInit(){
    this.isLoading = true
    this.connectionService.getInvoicing().subscribe({
      next:(response)=>{
        this.response = response;
        console.log(response)
      },
      complete() {
          this.isLoading = false
      },
      error(err) {
          console.error(err)
      },
    })
  }
}
