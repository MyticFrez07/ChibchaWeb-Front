import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { NavbarAdminComponent } from './components/navbar-admin/navbar-admin.component';
import { TableComponent } from './components/table/table.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ItemDomainComponent } from './components/item-domain/item-domain.component';
import { FilterDomainsComponent } from './components/filter-domains/filter-domains.component';
import { ShoppingCartBannerComponent } from './components/shopping-cart-banner/shopping-cart-banner.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PaypalComponent } from './components/paypal/paypal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelComponent } from '@modules/admin/panel/panel.component';
import { MenuComponent } from './components/menu/menu.component';
import { RecuadroComponent } from './components/recuadro/recuadro.component';
import { CuadrosComponent } from './components/cuadros/cuadros.component';
import { ChartComponent } from './components/chart/chart.component';
import { CheckDomainComponent } from './components/check-domain/check-domain.component';
import { ButtonComponent } from './components/button/button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardHostingComponent } from './components/card-hosting/card-hosting.component';
import { JsonToXmlComponent } from './components/json-to-xml/json-to-xml.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SkeletonCardComponent } from './components/skeleton-card/skeleton-card.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { BoyoutComponent } from './components/boyout/boyout.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    NavbarAdminComponent,
    TableComponent,
    ItemDomainComponent,
    FilterDomainsComponent,
    ShoppingCartBannerComponent,
    SidebarComponent,
    PaypalComponent,
    PanelComponent,
    MenuComponent,
    RecuadroComponent,
    CuadrosComponent,
    ChartComponent,
    CheckDomainComponent,
    ButtonComponent,
    CardHostingComponent,
    JsonToXmlComponent,
    LoaderComponent,
    SkeletonCardComponent,
    CreditCardComponent,
    BoyoutComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  exports:[
    NavbarComponent,
    FooterComponent,
    NavbarAdminComponent,
    TableComponent,
    ItemDomainComponent,
    FilterDomainsComponent,
    ShoppingCartBannerComponent,
    SidebarComponent,
    PaypalComponent,
    PanelComponent,
    MenuComponent,
    RecuadroComponent,
    CuadrosComponent,
    ChartComponent,
    CheckDomainComponent,
    ButtonComponent,
    CardHostingComponent,
    JsonToXmlComponent,
    LoaderComponent,
    SkeletonCardComponent,
    CreditCardComponent,
  ]
})
export class SharedModule { }
