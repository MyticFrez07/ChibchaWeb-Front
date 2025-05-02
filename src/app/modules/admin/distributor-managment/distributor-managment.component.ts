import { Component, ViewChild } from '@angular/core';
import {MatSort, } from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { usuario } from '@interfaces/usuario';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StorageService } from '@service/storage.service';
import { DistributorService } from '@service/distributor.service';
@Component({
  selector: 'app-distributor-managment',
  templateUrl: './distributor-managment.component.html',
  styleUrls: ['./distributor-managment.component.scss']
})
export class DistributorManagmentComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['id', 'categoria', 'nombre', 'dominios','acciones' ];
  clickedRows = new Set<usuario>();
  typeRol:any;
  roleList:any;
  userId:any;
  rolSelected:any;
  //dataSource = new MatTableDataSource(list_usuarios);
  dataSource:any =[];

  constructor(private router: Router,private storageService:StorageService,
    private distributorService:DistributorService
    ){
      this.distributorService.getDistributors().subscribe({
        next:(response)=>{
          this.dataSource = response
          this.rolSelected = Number(this.storageService.getRol())
        },
        complete:()=>{},
        error:(err)=>{}
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  showDetails(data:any){
    this.router.navigate(['/admin/distributors/', data.user.id]);
  }

  confirmDelete(id){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "¿Está seguro?",
      text: "¿Desea eliminar este distribuidor?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Eliminado!",
          text: "El distribuidor se ha eliminado con éxito",
          icon: "success"
        }).then((r)=>{
          this.delete(id)
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "Se ha cancelado el proceso",
          icon: "error"
        });
      }
    });
  }

  delete(id:any){
    this.distributorService.deleteDistributor(id).subscribe({
      next:(response)=>{
        console.log(response)
      },
      complete:()=>{},
      error:(err)=>{}
    })
  }
}
