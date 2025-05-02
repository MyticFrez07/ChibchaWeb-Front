import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-cuadros',
  templateUrl: './cuadros.component.html',
  styleUrls: ['./cuadros.component.scss']
})
export class CuadrosComponent {
  @Input() title:String = "";
  @Input() boton:String = "";
  @Input() def:String = "";
  @Input() clase:String = "";
  @Input() content:any;


}
