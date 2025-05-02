import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-boyout',
  templateUrl: './boyout.component.html',
  styleUrls: ['./boyout.component.scss']
})
export class BoyoutComponent {
  @Input() buyoutData: any;
}
