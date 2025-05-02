import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveRol(rol:string){
    localStorage.setItem('rol', rol);
  }

  getRol(){
    const rol = localStorage.getItem('rol')
    return rol;
  }

  removeRol(){
    localStorage.removeItem('rol')
  }

  saveUser(user:string){
    localStorage.setItem('user', user);
  }

  saveUserID(id:string){
    localStorage.setItem('user_id', id);
  }

  getUser(){
    const user = localStorage.getItem('user')
    return user;
  }
  getUserID(){
    const user = localStorage.getItem('user_id')
    return user;
  }

  removeUser(){
    localStorage.removeItem('user')
  }

  removeUserID(){
    localStorage.removeItem('user_id')
  }

  /**  */
  getCartItems() {
    const cartItemsJson = localStorage.getItem('cartShopping');
    return cartItemsJson ? JSON.parse(cartItemsJson) : [];
  }

  saveCartShopping(cartShopping:string){
    localStorage.setItem('cartShopping',cartShopping);
  }

  getCartShopping(){
    const cart = localStorage.getItem('cartShopping')
    return cart;
  }

  removeCartShopping(){
    localStorage.removeItem('cartShopping')
  }
}
