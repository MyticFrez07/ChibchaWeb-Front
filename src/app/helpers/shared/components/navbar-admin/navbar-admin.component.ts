import { Component } from '@angular/core';
import { StorageService } from '@service/storage.service';
import { TokenService } from '@service/token.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss']
})
export class NavbarAdminComponent {
  typeRol:any='1';

  constructor(private tokenService:TokenService,private storageService:StorageService
    ){
      this.typeRol = Number(this.storageService.getRol())
    }

  logout(){
    this.tokenService.removeToken()
    this.storageService.removeRol()
    this.storageService.removeUser()
    this.storageService.removeUserID()
  }
}
