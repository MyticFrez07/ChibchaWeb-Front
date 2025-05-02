import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TicketsService } from '@service/tickets.service';

@Component({
  selector: 'app-tickets-details',
  templateUrl: './tickets-details.component.html',
  styleUrls: ['./tickets-details.component.scss']
})
export class TicketsDetailsComponent implements OnInit {
  response:any = {}

  constructor(private route: ActivatedRoute,private ticketsService:TicketsService,
    private router: Router){  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const idTicket = params['id'];
        console.log('Parámetro 1:', idTicket);
        this.getTicketDetail(idTicket)
    });
  }

  getTicketDetail(id:number){
    this.ticketsService.getTicket(id).subscribe({
      next:(response)=>{
        this.response = response
      }
    })
  }

  getPriorityLabel(priority: number): string {
    switch (priority) {
      case 1:
        return 'Bajo';
      case 2:
        return 'Medio';
      case 3:
        return 'Alto';
      default:
        return 'Desconocido';
    }
  }
}
