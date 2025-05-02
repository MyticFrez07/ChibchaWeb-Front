import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter-domains',
  templateUrl: './filter-domains.component.html',
  styleUrls: ['./filter-domains.component.scss']
})
export class FilterDomainsComponent {
  @Input('domains') domains:any[];
  @Output() domainsFiltered:  EventEmitter<any> = new EventEmitter();
  newDomainList: any[]=[]
  filterForm: FormGroup;
  industries: string[] = ['Educación', 'Gubernamental', 'Tecnología'];
  domainTerminations: string[] = ['com', 'co', 'edu', 'net', 'org'];
  minPrice: number = 0;
  maxPrice: number = 1000;
  minCharacters: number = 0;
  maxCharacters: number = 20;

  constructor(private fb: FormBuilder){
    this.filterForm = this.fb.group({
      termination: [''],
      industry: [''],
      price: [0],
      characters: [0]
    });
  }

  onSubmit(){
    const termination = this.filterForm.get('termination').value;
    const industry = this.filterForm.get('industry').value;
    const price = this.filterForm.get('price').value;
    const characters = this.filterForm.get('characters').value;
    this.newDomainList = this.domains.filter(domain => {
      let match = true;
      if (termination && domain.name.endsWith(termination)) {
        match = false;
      }
      if (industry && domain.industry !== industry) {
        match = false;
      }
      if (price && domain.price > price) {
        match = false;
      }
      if (characters && domain.name.length > characters) {
        match = false;
      }
      return match;
    });
    this.domainsFiltered.emit(this.newDomainList)
  }
}
