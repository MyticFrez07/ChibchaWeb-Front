import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-recuadro',
  templateUrl: './recuadro.component.html',
  styleUrls: ['./recuadro.component.scss']
})
export class RecuadroComponent {
  @Input() numero: number = 0;
  @Input() nombre: string = "";
}
