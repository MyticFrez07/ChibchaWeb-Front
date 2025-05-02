import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CreditCardsService } from '@service/credit-cards.service';
import { UsersService } from '@service/users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  response:any = {}

  constructor(private route: ActivatedRoute,public usersService:UsersService,
    private creditCardsService:CreditCardsService,
    private router: Router){  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const idUser = params['id'];
        console.log('Parámetro 1:', idUser);
        this.getUserDetail(idUser)
    });
  }

  getUserDetail(idUser:number){
    this.usersService.getUserDetails(idUser).subscribe({
      next:(response)=>{
        this.response = response
      }
    })
  }

  maskCreditCard(creditCardNumber:any):string{
    return this.creditCardsService.maskCreditCard(creditCardNumber)
  }
}
