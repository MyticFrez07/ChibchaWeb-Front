import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HostingService {
	apiUrl:any = env.host
	headers: HttpHeaders;
	user_id:number = +this.storageService.getUserID()

	constructor(private http: HttpClient, private tokenService:TokenService,
		private storageService:StorageService) {
		this.headers = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: `Basic ${this.tokenService.getToken()}`,
      "ngrok-skip-browser-warning": "69420",
		});
	}

  getHostings(id:string, ):Observable<any>{
    return this.http.get(`${this.apiUrl}/hostings/${id}`)
  }

  postHostingIds(id:string, data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/hostings/${id}`, data)
  }
  postHostings(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/hostings/${this.user_id}`, data,{ headers: this.headers })
  }

  /* getHosting():Observable<any>{
    return this.http.get(`${this.apiUrl}/hostings/`)
  }

  postHosting(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/hostings/`, data)
  }*/

  getHostingDetails(id:string):Observable<any>{
    return this.http.get(`${this.apiUrl}/hosting/${id}`)
  }

  updateHosting( payload:any,id:string):Observable<any>{
    return this.http.patch(`${this.apiUrl}/hosting/${id}`, payload)
  }

  deleteHosting(id:string):Observable<any>{
    return this.http.delete(`${this.apiUrl}/hosting/${id }`)
  }
}
