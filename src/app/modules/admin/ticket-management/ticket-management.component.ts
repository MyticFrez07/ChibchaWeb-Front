import { Component, Input } from '@angular/core';
import { TicketsService } from '@service/tickets.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-management',
  templateUrl: './ticket-management.component.html',
  styleUrls: ['./ticket-management.component.scss']
})
export class TicketManagementComponent {
  @Input() tickets: any[] = [];
  dataSource:any;
  displayedColumns: string[] = ['id','asunto', 'mensaje', 'estado', 'prioridad', 'acciones'];
  pageSizeOptions: number[] = [5, 10, 20];
  pageSize = 5;

  constructor(private ticketsService:TicketsService,private router: Router){
    this.ticketsService.getTickets().subscribe({
      next:(response)=>{
        console.log(response)
        this.dataSource = response;
      }
    })
  }

  verDetalles(ticket: any) {
    this.router.navigate(['/admin/ticket-detail/', ticket.id]);
  }

  cambiarEstado(ticket: any) {
    this.router.navigate(['/admin/ticket-updated/', ticket.id]);
  }

  getPriorityClass(priority: number): string {
    if (priority === 1) {
      return 'success';
    } else if (priority === 2) {
      return 'warning';
    } else {
      return 'danger';
    }
  }

  generateRange(end: number): number[] {
    return Array.from({ length: end }, (_, index) => index + 1);
  }
}
