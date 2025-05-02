import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import domains from './../../../../assets/js/domains-list.json'
import { DomainsService } from '@service/domains.service';
import { ShoppingService } from '@service/shopping.service';
import { UsersService } from '@service/users.service';
import { StorageService } from '@service/storage.service';
const providerImage = [
  {name:".CO", img:'client-1'},
  {name:".com", img:'client-2'},
  {name:".info", img:'client-3'},
  {name:".net", img:'client-4'},
  {name:".online", img:'client-5'},
  {name:".org", img:'client-6'},
  {name:".site", img:'client-7'},
  {name:".store", img:'client-8'},
  {name:".xyz", img:'client-9'}]
let suggestedDomains = ['com', 'org', 'edu', 'mil', 'net', 'xyz', 'info'];
const domainsCountries = [
  { pais: 'Argentina', domain: 'ar' },
  { pais: 'Brazil', domain: 'br' },
  { pais: 'Canada', domain: 'ca' },
  { pais: 'China', domain: 'cn' },
  { pais: 'Colombia', domain: 'co' },
  { pais: 'France', domain: 'fr' },
  { pais: 'Germany', domain: 'de' },
  { pais: 'India', domain: 'in' },
  { pais: 'Italy', domain: 'it' },
  { pais: 'Japan', domain: 'jp' },
  { pais: 'United States', domain: 'us' }
];
const prices =[52500,54500,49500,98500,47500]
const subtitle =["Únicamente el primer año con un plazo de 2 años","Por el primer año","Oferta especial","Descuento del 10%"]

@Component({
  selector: 'app-search-domain',
  templateUrl: './search-domain.component.html',
  styleUrls: ['./search-domain.component.scss']
})
export class SearchDomainComponent {
  searchForm: FormGroup;
  activeTab: string = 'resultados';
  isDomainExist:any[]=[]
  domains:any[] = []
  newDomainList:any[] = []
  domainSelected:any[]=[]
  listdomains: any = [];
  existingDomains: any[] = [];
  domainExistsInWhois:any=null;
  countryUser:any

  constructor(private fb: FormBuilder,
  private domainsService:DomainsService,
  private shoppingService:ShoppingService,public usersService:UsersService, private storageService:StorageService) {
    this.searchForm = this.fb.group({
      searchQuery: ['', [Validators.required, this.customDotValidator()]]
    });
    this.shoppingService.cartShopping.subscribe({
      next:(response)=>{
        this.newDomainList = response
      },
      complete:()=>{},
      error:(err)=>{}
    })
    this.getUserDetail()
  }

  /**
   * Validar pais del usuario para ofrecer únicamente los dominios de ese país
   */
  getUserDetail(){
    this.usersService.getUserDetails(this.storageService.getUserID()).subscribe({
      next:(response)=>{
        this.countryUser = response['country'].name
      }, complete:()=>{
        let index = domainsCountries.findIndex(el => el['pais'] == this.countryUser)
        suggestedDomains.map(el => {
          suggestedDomains.push(`${el}.${domainsCountries[index].domain}`)
        })
        suggestedDomains.push(domainsCountries[index].domain)
      },
      error:(err)=>{
        console.error(err)
      }
    })
  }

  // Función de validación personalizada de formulario de búsqueda
  private customDotValidator() {
    return (control) => {
      const value = control.value as string;
      if (value && !value.includes('.')) {
        return { noDot: true };
      }
      return null;
    };
  }
  getErrorMessage() {
    const control = this.searchForm.get('searchQuery');
    if (control.hasError('required')) {
      return 'Este campo es requerido.';
    }
    if (control.hasError('noDot')) {
      return 'Debe contener al menos un punto.';
    }
    return '';
  }

  onSubmit() {
    this.domains = []
    this.isDomainExist = []
    this.domainExistsInWhois = null
    const searchQuery = this.searchForm.get('searchQuery').value;
    this.domainsService.getWhoisInfo(searchQuery).subscribe({
      next:(response: any) => {
        if (response) {
          this.domainExistsInWhois = response;
          console.log(response,response['domain_name'][0].split('.')[1])
          this.isDomainExist=(response['domain_name'][0])
        }
        let domainName = searchQuery.split('.')[0];
        suggestedDomains.forEach((tld) => {
          let randomPriceIndex = Math.floor(Math.random() * prices.length);
          let randomSubtitleIndex = Math.floor(Math.random() * subtitle.length);
          let randomProvider = Math.floor(Math.random() * providerImage.length);
          this.existingDomains.push({
            name: `${domainName}.${tld}`,
            uso: false,
            costDomain: prices[randomPriceIndex],
            subtitle: subtitle[randomSubtitleIndex],
            inCart: false,
            provider: providerImage[randomProvider]['name'],
            distributor_id: randomProvider+1,
            discount: subtitle[randomSubtitleIndex] === "Descuento del 10%" ? 10 : 0,
            providerImage:`/assets/img/clients/${providerImage[randomProvider]['img']}.png`
        });
        });
        if (this.domainExistsInWhois) {
          const existingDomain = this.existingDomains.find((d) => d.dominio === searchQuery);
          if (existingDomain) existingDomain.uso = true;
        }
      },
      complete:()=>{
        this.domains = this.existingDomains;
        console.log(this.domains)
      },
      error:(err)=>{}
    })
  }

  ngOnInit() {
  }

  addToCart(domain:any){
    const { name, costDomain = domain.discount, distributor_id, buyout_id = 1, discount, providerImage} = domain;
    if (!this.domainSelected.includes(domain)) this.domainSelected.push({ name, costDomain, distributor_id,buyout_id,discount,providerImage })
    this.shoppingService.setCartShopping(Object.assign(this.shoppingService.cartShopping,{domainList:this.domainSelected}));
  }

  removeToCart(domain:any){
    let index = this.domainSelected.findIndex(d => d !== domain);
    this.domainSelected.splice(index,1)
    this.shoppingService.setCartShopping(Object.assign(this.shoppingService.cartShopping,{domainList:this.domainSelected}));
  }
}
