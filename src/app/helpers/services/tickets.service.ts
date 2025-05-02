import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import { StorageService } from './storage.service';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
	apiUrl:any = env.host
  headers: HttpHeaders;

  constructor(private http: HttpClient,private storageService:StorageService, private tokenService:TokenService) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Basic ${this.tokenService.getToken()}`,
      "ngrok-skip-browser-warning": "69420",
    });
  }

  createTicket(data:any):Observable<any>{
    let id = parseInt(this.storageService.getUserID())
    return this.http.post(`${this.apiUrl}/tickets/`, Object.assign(data, {user_id: id, user_it_id : null}), { headers: this.headers })
  }

  getTickets():Observable<any>{
    return this.http.get(`${this.apiUrl}/tickets/`, { headers: this.headers })
  }

  getTicket(id:any):Observable<any>{
    return this.http.get(`${this.apiUrl}/ticket/${id}`, { headers: this.headers })
  }

  updateTicket(id:any, payload:any):Observable<any>{
    return this.http.put(`${this.apiUrl}/ticket/${id}`, payload, { headers: this.headers })
  }

  deleteTicket(id:any):Observable<any>{
    return this.http.delete(`${this.apiUrl}/ticket/${id}`, { headers: this.headers })
  }
}
