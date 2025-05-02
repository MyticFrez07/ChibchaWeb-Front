import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QueriesService } from '@service/queries.service';
import { TicketsService } from '@service/tickets.service';
import { v4 as uuidv4 } from 'uuid';
//import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent {
  newTicket: any = { title: '', description: '' };
  tickets: any[] = [];
  message:string='';
  //Editor = ClassicEditor;
  predefinedMessage:string=`
  <p>
    Bogotá, noviembre 12 de 2023
    <br/>
    Sr: Paula Andrea Pérez Gómez
    <br/>
    Email: Paula@gmail.com
  </p>
  <br/>
  <p>Asunto:	Respuesta a su radicado SNR2022EE064904.</p>
  <br/>
  <p>
    Respetada Paula Andrea:
    En atención a su requerimiento de Cambio de propietario del dominio <<dominio>>, me permito informarle que el trámite solicitado no procede por las siguientes razones:
  </p>
  `;

  createTicket() {
    if (this.newTicket.title && this.newTicket.description) {
      this.tickets.push(this.newTicket);
      this.newTicket = { title: '', description: '' };
    }
  }
  ticketForm: FormGroup;

  constructor(private fb: FormBuilder, private ticketsService:TicketsService, private queriesService:QueriesService,private router: Router) {
    this.ticketForm = this.fb.group({
      //id:[null],
      //nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      //email: ['', [Validators.required, Validators.email]],
      description: ['', [Validators.required, Validators.maxLength(100)]],
      state: [false, [Validators.required]],
      services: [''],
      priority: [1, [Validators.required]],
      message: ['', [Validators.required, Validators.maxLength(500)]],
      //adjunto: [''],
      //user_id
    });
    this.queriesService.getCategories().subscribe({
      next:(request)=>{
        console.log(request)
      }
    })
    this.queriesService.getCountries().subscribe({
      next:(request)=>{
        console.log(request)
      }
    })
    this.queriesService.getPlans().subscribe({
      next:(request)=>{
        console.log(request)
      }
    })
    this.queriesService.getRoles().subscribe({
      next:(request)=>{
        console.log(request)
      }
    })
  }
  onSubmit() {
    if (this.ticketForm.valid) {
      //this.ticketForm.patchValue({id: uuidv4()});
      //console.log(this.ticketForm.value);
      const priorityValue = +this.ticketForm.get('priority').value;
      const stateValue = this.ticketForm.get('state').value === 'true';
      this.ticketForm.patchValue({
        priority: priorityValue,
        state: stateValue
      });
      this.ticketsService.createTicket(this.ticketForm.value).subscribe({
        next:(response)=>{
          console.log(response)
        },
        complete:()=>{
          this.router.navigate(['/admin/ticket-management/',]);
        }
      })
    }
  }

  loadMessage(){
    this.message = this.predefinedMessage;
  }

  /* onChange( { editor }: ChangeEvent ) {
    const data = editor.getData();
    this.predefinedMessage = data;
  } */
}
