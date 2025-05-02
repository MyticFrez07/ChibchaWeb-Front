import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueriesService {
	apiUrl:any = env.host
  headers: HttpHeaders;

  constructor(private http: HttpClient,private tokenService:TokenService) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Basic ${this.tokenService.getToken()}`,
      "ngrok-skip-browser-warning": "69420",
    });
  }

  getCategories():Observable<any>{
    return this.http.get(`${this.apiUrl}/categories/`, { headers: this.headers })
  }

  postCategories(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/categories/`, data, { headers: this.headers })
  }

  getDetailsCategories(id:any):Observable<any>{
    return this.http.get(`${this.apiUrl}/category/${id}`, { headers: this.headers })
  }

  updateCategories(id:any,payload):Observable<any>{
    return this.http.patch(`${this.apiUrl}/category/${id}`,payload, { headers: this.headers })
  }

  deleteCategories(id:any):Observable<any>{
    return this.http.delete(`${this.apiUrl}/category/${id}`, { headers: this.headers })
  }

  /** Countries **/

  getCountries():Observable<any>{
    return this.http.get(`${this.apiUrl}/countries/`, { headers: this.headers })
  }

  postCountries(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/countries/`, data, { headers: this.headers })
  }

  getDetailsCountries(id:any):Observable<any>{
    return this.http.get(`${this.apiUrl}/country/${id}`, { headers: this.headers })
  }

  updateCountries(id:any, payload:any):Observable<any>{
    return this.http.patch(`${this.apiUrl}/country/${id}`,payload, { headers: this.headers })
  }

  deleteCountries(id:any):Observable<any>{
    return this.http.delete(`${this.apiUrl}/country/${id}`, { headers: this.headers })
  }

  /** roles **/

  getRoles():Observable<any>{
    return this.http.get(`${this.apiUrl}/rols/`, { headers: this.headers })
  }

  postRoles(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/rols/`, data, { headers: this.headers })
  }

  getDetailsRol(id:any):Observable<any>{
    return this.http.get(`${this.apiUrl}/rol/${id}`, { headers: this.headers })
  }

  updateRol(id:any,payload:any):Observable<any>{
    return this.http.patch(`${this.apiUrl}/rol/${id}`, payload, { headers: this.headers })
  }

  deleteRol(id:any):Observable<any>{
    return this.http.delete(`${this.apiUrl}/rol/${id}`, { headers: this.headers })
  }

  /** plans */

  getPlans():Observable<any>{
    return this.http.get(`${this.apiUrl}/plans/`, { headers: this.headers })
  }

  postPlans(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/plans/`, data, { headers: this.headers })
  }

  getDetailsPlan(id:any):Observable<any>{
    return this.http.get(`${this.apiUrl}/plan/${id}`, { headers: this.headers })
  }

  updatePlan(id:any, payload:any):Observable<any>{
    return this.http.patch(`${this.apiUrl}/plan/${id}`, payload, { headers: this.headers })
  }

  deletePlan(id:any):Observable<any>{
    return this.http.delete(`${this.apiUrl}/plan/${id}`, { headers: this.headers })
  }

  /** Plataforms */

  getPlatforms():Observable<any>{
    return this.http.get(`${this.apiUrl}/platforms/`, { headers: this.headers })
  }

  postPlatforms(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/platforms/`, data, { headers: this.headers })
  }

  getDetailsPlatform(id:any):Observable<any>{
    return this.http.get(`${this.apiUrl}/platform/${id}`, { headers: this.headers })
  }

  updatePlatform(id:any, payload:any):Observable<any>{
    return this.http.patch(`${this.apiUrl}/platform/${id}`, payload, { headers: this.headers })
  }

  deletePlatform(id:any):Observable<any>{
    return this.http.delete(`${this.apiUrl}/platform/${id}`, { headers: this.headers })
  }
}
