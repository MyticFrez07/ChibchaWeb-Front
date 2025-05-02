import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

export interface compra {
  id_cliente: number;
  id_compra: number;
  valor_compra: number;
  fecha_compra: string;
}

const list_compra: compra[] = [
  {id_compra: 1, id_cliente: 8, valor_compra: 120000, fecha_compra: "19/11/2023"},
{id_compra: 2, id_cliente: 13, valor_compra: 130000, fecha_compra: "20/11/2023"},
{id_compra: 3, id_cliente: 5, valor_compra: 110000, fecha_compra: "21/11/2023"},
{id_compra: 4, id_cliente: 14, valor_compra: 140000, fecha_compra: "22/11/2023"},
{id_compra: 5, id_cliente: 9, valor_compra: 125000, fecha_compra: "23/11/2023"},
{id_compra: 6, id_cliente: 12, valor_compra: 115000, fecha_compra: "24/11/2023"},
{id_compra: 7, id_cliente: 7, valor_compra: 135000, fecha_compra: "25/11/2023"},
{id_compra: 8, id_cliente: 3, valor_compra: 105000, fecha_compra: "26/11/2023"},
{id_compra: 9, id_cliente: 11, valor_compra: 145000, fecha_compra: "27/11/2023"},
{id_compra: 10, id_cliente: 6, valor_compra: 130000, fecha_compra: "28/11/2023"}

  
];

@Component({
  selector: 'app-buy-register',
  templateUrl: './buy-register.component.html',
  styleUrls: ['./buy-register.component.scss'],
  standalone: true,
  imports: [CommonModule,MatTableModule,MatIconModule, MatSortModule, MatInputModule, MatFormFieldModule, MatPaginatorModule],
})
export class BuyRegisterComponent {
  displayedColumns: string[] = ['id_compra', 'id_cliente', 'valor_compra', 'fecha_compra' ,'acciones' ];
  clickedRows = new Set<compra>();
  dataSource = new MatTableDataSource(list_compra);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
