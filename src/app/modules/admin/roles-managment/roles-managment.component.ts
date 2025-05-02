import { Component, ViewChild } from '@angular/core';
import {MatSort, } from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { usuario } from '@interfaces/usuario';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StorageService } from '@service/storage.service';
import { QueriesService } from '@service/queries.service';

@Component({
  selector: 'app-roles-managment',
  templateUrl: './roles-managment.component.html',
  styleUrls: ['./roles-managment.component.scss']
})
export class RolesManagmentComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['id', 'name', 'description','acciones' ];
  clickedRows = new Set<usuario>();
  typeRol:any;
  roleList:any;
  userId:any;
  rolSelected:any;
  //dataSource = new MatTableDataSource(list_usuarios);
  dataSource:any =[];

  constructor(private router: Router,private storageService:StorageService,
    private queriesService:QueriesService
    ){
      this.queriesService.getRoles().subscribe({
        next:(response)=>{
          this.dataSource = response
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
    this.router.navigate(['/admin/rol/', data.user.id]);
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
      text: "¿Desea eliminar este rol?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Eliminado!",
          text: "El rol se ha eliminado con éxito",
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
    this.queriesService.deleteRol(id).subscribe({
      next:(response)=>{
        console.log(response)
      },
      complete:()=>{},
      error:(err)=>{}
    })
  }
}
