import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  panelOpenState = false;
  @Input() title: string = "";
  @Input() descripcion: string = "";
  @Input() boton: boolean = false;
  @Input() NombreBoton: String = ""
}
