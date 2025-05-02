import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QueriesService } from '@service/queries.service';

@Component({
  selector: 'app-card-hosting',
  templateUrl: './card-hosting.component.html',
  styleUrls: ['./card-hosting.component.scss']
})
export class CardHostingComponent {
  @Input('data') data:any;
  @Output() addProduct = new EventEmitter();
  @Output() removeProduct = new EventEmitter();
  platform:any=[]
  platformSelected:any=1
  discount:number =0.8
  hostingRef:any

  constructor( private queriesService:QueriesService){
    this.queriesService.getPlatforms().subscribe({
      next:(request)=>{
        this.platform = request
      }
    })
  }

  addToCart(hosting: any) {
    hosting.inCart = true;
    this.hostingRef = JSON.parse(JSON.stringify(hosting));
    let hostingNew = JSON.parse(JSON.stringify(hosting));
    let {platform_id=+this.platformSelected, plan_id=hosting.id, isActive=true,hosting_name=hostingNew.name, currency=hosting.cost_per_year} = hosting
    if (hostingNew.platform === 'Linux OS') hostingNew.currency = hostingNew.currency*this.discount
    if (hostingNew.platform === 'Microsoft Windows') hostingNew.currency = hostingNew.currency*this.discount
    console.log({platform_id, plan_id, isActive,hosting_name})
    this.addProduct.emit({platform_id, plan_id, isActive,hosting_name,currency})
  }

  removeFromCart(hosting: any) {
    hosting = this.hostingRef
    if (hosting.platform === 'Linux OS') hosting.currency = hosting.currency+((this.discount^(-1) )*hosting.currency )
    hosting.inCart = false;
    this.removeProduct.emit(hosting)
  }

}
