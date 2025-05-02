import { Component } from '@angular/core';
import { StorageService } from '@service/storage.service';
import { UsersService } from '@service/users.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls:[ './menu.component.scss']
})
export class MenuComponent {
  username:string='Anónimo'
  userId:any='1'
  data:any={}

  constructor(private storageService:StorageService, private  usersService:UsersService){
    this.username = this.storageService.getUser()
    this.userId = this.storageService.getUserID()
  }
  updateRole(){
    this.usersService.getUserDetails(this.userId).subscribe({
      next(value) {
          this.data = value['user']
      },
    })
    if (this.data) {
      this.usersService.updateUser(this.userId, {rol_id:3, ...this.data}).subscribe({
        next(value) {
            console.log(value)
            this.storageService.saveRol(3)
        },
      })
    }
  }
}
