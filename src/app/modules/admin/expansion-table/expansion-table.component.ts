import { Component, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
/**
 * @title Table with expandable rows
 */
@Component({
  selector: 'app-expansion-table',
  templateUrl: './expansion-table.component.html',
  styleUrls: ['./expansion-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ExpansionTableComponent {
  title = 'angularmaterial';
  //Columns names, table data from datasource, pagination and sorting
  columnsToDisplay: string[] = ['id', 'name', 'correo'];
  dataSource = new MatTableDataSource<Users>(ELEMENT_DATA);
  @ViewChild(MatPaginator, {static: true}) paginator:any = MatPaginator;
  expandedElement: Users | null | undefined;
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
//Columns data types
export interface Users {
  id: number;
  name: string;
  correo: string;
  country: string;
  rol: string;
  payMode: string;
}
const ELEMENT_DATA: Users[] = [
  {
    id: 1,
    name: 'Samuel',
    correo: 'sam@gmail.com',
    country: 'Colombia',
    rol: 'Admin',
    payMode: 'Debit Card'

  }, {
    id: 2,
    name: 'Juan',
    correo: 'ju@gmail.com',
    country: 'Ecuador',
    rol: 'User',
    payMode: 'Account'
  }
  
];
