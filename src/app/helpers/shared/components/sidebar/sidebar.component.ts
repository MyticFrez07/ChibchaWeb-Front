import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  ticketName: string = this.codeTicket();

  constructor(){
    this.ticketName = this.codeTicket()
  }
  aceptarTicket(){}

  codeTicket():string{
    const fechaHoraActual = new Date();
    const año = fechaHoraActual.getFullYear();
    const mes = (fechaHoraActual.getMonth() + 1).toString().padStart(2, '0'); // Agrega ceros a la izquierda si es necesario
    const dia = fechaHoraActual.getDate().toString().padStart(2, '0');
    const hora = fechaHoraActual.getHours().toString().padStart(2, '0');
    const minutos = fechaHoraActual.getMinutes().toString().padStart(2, '0');
    //const segundos = fechaHoraActual.getSeconds().toString().padStart(2, '0');

    let name = `TK-${dia}${mes}${año}${hora}${minutos}`;

    return name;
  }
}
