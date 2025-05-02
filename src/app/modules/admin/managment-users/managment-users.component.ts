import { Component, ViewChild } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion';
import { usuario } from '@interfaces/usuario';
import { UsersService } from '@service/users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StorageService } from '@service/storage.service';
import { QueriesService } from '@service/queries.service';

const list_usuarios: usuario[] = [
  {id: 1, nombre: 'Juan', correo: "Juan@gmail.com"},
  {id: 2, nombre: 'Samuel', correo: "Samuel@gmail.com"},
  {id: 3, nombre: 'Felipe', correo: "Felipe@gmail.com"},
  {id: 4, nombre: 'Santiago', correo: "Santiago@gmail.com"},
  {id: 5, nombre: 'Miguel', correo: "Miguel@gmail.com"},
  {id: 6, nombre: 'Leidy', correo: "Leidy@gmail.com"},
];

@Component({
  selector: 'app-managment-users',
  templateUrl: './managment-users.component.html',
  styleUrls: ['./managment-users.component.scss'],
  standalone: true,
  imports: [MatTableModule,MatIconModule, MatSortModule, MatInputModule, MatFormFieldModule, MatPaginatorModule, MatExpansionModule],
})

export class ManagmentUsersComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['id', 'nombre', 'correo', 'rol', 'pais', 'acciones' ];
  clickedRows = new Set<usuario>();
  typeRol:any;
  roleList:any;
  userId:any;
  rolSelected:any;
  //dataSource = new MatTableDataSource(list_usuarios);
  dataSource:any =[];

  constructor(private usersService:UsersService,private router: Router,private storageService:StorageService,
    private queriesService:QueriesService
    ){
      this.userId = this.storageService.getUserID()
      this.typeRol = Number(this.storageService.getRol())
      this.usersService.getUsers().subscribe({
        next:(response)=>{
          this.dataSource = response
          this.rolSelected = Number(this.storageService.getRol())
        },
        complete:()=>{},
        error:(err)=>{}
      })
      this.queriesService.getRoles().subscribe({
        next:(request)=>{
          this.roleList =(request)
        }
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
    this.router.navigate(['/admin/user-detail/', data.user.id]);
  }

  updateRole(usuario,event){
    this.usersService.updateUser(usuario.user.id, {rol_id:event['target'].value}).subscribe({
      next(value) {
          console.log(value)
      },
    })
  }
  updateUser(data:any){}

  confirmDeleteUser(id){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "¿Está seguro?",
      text: "¿Desea eliminar este usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Eliminado!",
          text: "El usuario se ha eliminado con éxito",
          icon: "success"
        }).then((r)=>{
          this.deletUser(id)
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

  deletUser(id:any){
    this.usersService.deleteUser(id).subscribe({
      next:(response)=>{
        console.log(response)
      },
      complete:()=>{},
      error:(err)=>{}
    })
  }

}



