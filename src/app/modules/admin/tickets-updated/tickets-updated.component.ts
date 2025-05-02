import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TicketsService } from '@service/tickets.service';

@Component({
  selector: 'app-tickets-updated',
  templateUrl: './tickets-updated.component.html',
  styleUrls: ['./tickets-updated.component.scss']
})
export class TicketsUpdatedComponent {
  response:any = {}
  ticketForm: FormGroup;

  constructor(private route: ActivatedRoute,private ticketsService:TicketsService,
    private router: Router,private fb: FormBuilder,){
      this.ticketForm = this.fb.group({
        description: ['', [Validators.required, Validators.maxLength(100)]],
        state: [false, [Validators.required]],
        services: [''],
        priority: [1, [Validators.required]],
        message: ['', [Validators.required, Validators.maxLength(500)]],
      });
    }

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
        this.ticketForm.patchValue({
          description:this.response.description,
          state:this.response.state,
          services:this.response.services,
          priority:this.response.priority,
          message:this.response.message,
        })
      }
    })
  }

  onSubmit() {
    if (this.ticketForm.valid) {
      const priorityValue = +this.ticketForm.get('priority').value;
      const stateValue = this.ticketForm.get('state').value === 'true';
      this.ticketForm.patchValue({
        priority: priorityValue,
        state: stateValue
      });
      this.ticketsService.updateTicket(this.response.id,this.ticketForm.value).subscribe({
        next:(response)=>{
          console.log(response)
        },
        complete:()=>{
          this.router.navigate(['/admin/ticket-management/',]);
        }
      })
    }
  }

}
