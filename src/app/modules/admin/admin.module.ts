import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeAdminComponent } from './home/home.component';
import { AdminRoutingModule } from './admin-routing.module';
import { TicketsComponent } from './tickets/tickets.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TicketManagementComponent } from './ticket-management/ticket-management.component';
import { MaterialModule } from 'src/app/material/material.module';
import { SearchDomainComponent } from './search-domain/search-domain.component';
import { CartSummaryComponent } from './cart-summary/cart-summary.component';
import { CardsOptionsComponent } from '../../helpers/shared/components/cards-options/cards-options.component';
import { NameserversComponent } from './nameservers/nameservers.component';
import { DashboardRoutingModule } from '@modules/dashboard/dashboard-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ManagmentUsersComponent } from './managment-users/managment-users.component';
import { HostingComponent } from './hosting/hosting.component';
import { ExpansionTableComponent } from './expansion-table/expansion-table.component';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { CreditCardManagmentComponent } from './credit-card-managment/credit-card-managment.component';
import { TicketsDetailsComponent } from './tickets-details/tickets-details.component';
import { AuthInterceptorService } from '@service/auth-interceptor.service';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { CreditCardsComponent } from './credit-cards/credit-cards.component';
import { InvoicingComponent } from './invoicing/invoicing.component';
import { BoyoutComponent } from '@shared/components/boyout/boyout.component';
import { InvoicingUpdatedComponent } from './invoicing-updated/invoicing-updated.component';
import { DistributorsComponent } from './distributors/distributors.component';
import { DistributorManagmentComponent } from './distributor-managment/distributor-managment.component';
import { RolesManagmentComponent } from './roles-managment/roles-managment.component';
import { RolComponent } from './rol/rol.component';
import { TicketsUpdatedComponent } from './tickets-updated/tickets-updated.component';

@NgModule({
  declarations: [
    HomeAdminComponent,
    TicketsComponent,
    TicketManagementComponent,
    SearchDomainComponent,
    CartSummaryComponent,
    CardsOptionsComponent,
    NameserversComponent,
    ExpansionTableComponent,
    HostingComponent,
    CreditCardManagmentComponent,
    TicketsDetailsComponent,
    UserDetailComponent,
    CreditCardsComponent,
    InvoicingComponent,
    InvoicingUpdatedComponent,
    DistributorsComponent,
    DistributorManagmentComponent,
    RolesManagmentComponent,
    RolComponent,
    TicketsUpdatedComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DashboardRoutingModule,
    ManagmentUsersComponent,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
  ],
  bootstrap: [ExpansionTableComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],

})
export class AdminModule { }
