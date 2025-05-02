import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomainsService } from '@service/domains.service';
import { ShoppingService } from '@service/shopping.service';

@Component({
  selector: 'app-check-domain',
  templateUrl: './check-domain.component.html',
  styleUrls: ['./check-domain.component.scss']
})
export class CheckDomainComponent {
  searchForm: FormGroup;
  isExist:any=null;
  isResult:boolean = false;

  constructor(private fb: FormBuilder,
    private domainsService:DomainsService,
    private shoppingService:ShoppingService) {
    this.searchForm = this.fb.group({
      domain: [''],
    });
  }

  onSubmit() {
    this.isExist = null
    const domain = this.searchForm.get('domain').value;
    this.domainsService.getWhoisInfo(domain).subscribe({
      next:(response)=>{
        if (response && response['domain_name']) this.isExist = true
        else this.isExist = false
      },
      complete:()=>{
        this.isResult = true
      },
      error:(err)=>{
      },
    })

  }
}
