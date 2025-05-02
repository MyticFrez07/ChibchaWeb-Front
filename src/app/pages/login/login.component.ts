import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@service/auth.service';
import { QueriesService } from '@service/queries.service';
import { CustomValidators } from '@utils/validators';
import { RequestStatus } from 'src/app/helpers/models/request-status';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  signupForm: FormGroup;
  loginForm: FormGroup;
  isCreateAccount:boolean = false
  status:RequestStatus='init'
  countriesList: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService:AuthService,
    private queriesService:QueriesService
    ){
      this.queriesService.getCountries().subscribe({
        next:(response)=>{
          this.countriesList = response
        }
      })
    }

  ngOnInit() {
    this.signupForm = this.fb.nonNullable.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      idDocument:['1024356987', ],
      documentType:['CC',],
      confirPassword: ['', [Validators.required, Validators.minLength(5)]],
      phone:[30030030,[Validators.required]],
      countryID:[1,[Validators.required]],
      rol_id:[3]
    },
    {
      validators:[CustomValidators.MatchValidator('password','confirPassword')]
    });
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value)
      let {name,
        email,
        password,
        idDocument,
        documentType,
        confirPassword,
        phone,
        rol_id,
        country_id = +this.signupForm['controls']['countryID'].value} = this.signupForm.value
      this.authService.registerAndLogin({name,
        email,
        password,
        idDocument,
        documentType,
        confirPassword,
        phone,rol_id,
        country_id})
      .subscribe({
        next:(response)=>{
          console.log(response)
          this.router.navigate(['/admin/panel']);
        },
        error:(err)=>{console.log(err)}
      })
    }
  }

  onSubmitLogin() {
    this.status = 'loading'
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)
      this.authService.login(this.loginForm.value)
      .subscribe({
        next:(response)=>{
          this.status = 'success'
          console.log(response)
        },
        complete:()=>{
          this.router.navigate(['/admin/panel']);
        },
        error:(err)=>{
          this.status = 'failed'
          console.log(err)
        }
      })
    }else{
      this.loginForm.markAllAsTouched();
    }
  }
}
