import { Component } from '@angular/core';
import { StorageService } from '@service/storage.service';
import { TokenService } from '@service/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isTokenExist;
  typeRol:any='1';

  constructor(private tokenService:TokenService, private storageService:StorageService){
    this.isTokenExist = this.tokenService.getToken()
    this.typeRol = this.storageService.getRol()
  }
}
