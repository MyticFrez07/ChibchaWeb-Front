import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env} from '../../../environments/environment'
import { TokenService } from './token.service';
import { StorageService } from './storage.service';

@Injectable({
	providedIn: 'root'
})
export class DomainsService {
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

	getDomainr(domain:string, clientId:string='db46dc62ffmshcac46342eef2383p1cb292jsn796d182b66ce') {
		//(`https://api.domainr.com/v3/search?client_id=d03abf08787645d4a17386782f11b0b7&h=966&language=es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3&query=pepecom.co&token=01hf2rcm7tx0x7hdwv7ksb1d1h&w=556&_h=772b7cb8`)
		return this.http.get(`https://api.domainr.com/v2/status?client_id=${clientId}&query=${domain}&token=01hf2rcm7tx0x7hdwv7ksb1d1h&w=556&_h=772b7cb8`)
		//return this.http.get(`https://api.domainr.com/v2/status?client_id=${clientId}&domain=${domain}`)
	}

	getNamecheap() {}

	getNameCom(domain:string, ) {
		const headers = new HttpHeaders({
			'Authorization': 'Basic ' + btoa(env.namecom.username + ':' + env.namecom.token)
		});
		const params = {page: '1',};
		return this.http.get(`https://api.dev.name.com/v4/domains/${domain}`,{ headers })
	}

	getWhoisInfo(domain: string) {
		const headers = new HttpHeaders({
			'X-Api-Key': env.tokenNinjaAPI
		});
		const apiUrl = env.whois;
		return this.http.get(`${apiUrl}?domain=${domain}`,{ headers });
	}

	buyDomain(data:any){
		return this.http.post(`${this.apiUrl}/domains/${this.user_id}`,data,{ headers: this.headers })
	}
}
