import { Component } from '@angular/core';
import { ConnectionService } from '@service/connection.service';
import { StorageService } from '@service/storage.service';
import { TicketsService } from '@service/tickets.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {
  searchText: any;
  tokenCount:number=0
  tiketInfo: any={}
  hostingCount:number=0
  domainCount:number=0
  invoice:number=0
  responseInfo:any=[]
  username:string='Anónimo'

  constructor(private ticketsService:TicketsService,private connectionService: ConnectionService,private storageService:StorageService){
    this.ticketsService.getTickets().subscribe({
      next:(response)=>{
        this.tokenCount = response['length'];
        console.log(response[this.tokenCount-1])
        this.tiketInfo = response[this.tokenCount-1]
      }
    })
    this.username = this.storageService.getUser()
  }

  ngOnInit(){
    this.connectionService.getInvoicing().subscribe({
      next:(response)=>{
        this.responseInfo = response;
        this.hostingCount = response[0].buyoutsHosting.length
        this.domainCount = response[0].buyoutsDomains.length
        this.invoice = this.responseInfo.length
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
