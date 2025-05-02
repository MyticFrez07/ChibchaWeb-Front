import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from '@guards/auth.guard'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent},
      { path: 'login', component: LoginComponent},
    ]
  },
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule), canActivate:[AuthGuard]},
  { path: '**', redirectTo: '/'},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  //providers:[AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
