import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { CreateUserComponent } from "../../components/create-user/create-user.component";
import { EditUserComponent } from '../edit-user/edit-user.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  search: string = "";
  users$: Observable<User[]>;
  usersList:User[];
  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getUsers()
  }

  getUsers(){
    this.userService.getUsers().subscribe(data => {
      this.usersList = data
      console.log(this.usersList);
    })
  }

  deleteUser(user){
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Confirma si deseas eliminar al empleado',
      showDenyButton: true,
      confirmButtonColor: '#3085d6',
      denyButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo',
      denyButtonText: 'No, cancelar',
    }).then(result => {
      if(result.value){
        this.userService.deleteUser(user).subscribe(() => {
          this.getUsers()
          Swal.fire(
            'Usuario eliminado',
            'El usuario ha sido eliminado con exito',
            'success'
          )
           
        })
      }
    })
  }

  openDialogEdit(user: User) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: "400px",
      data: {
        user: user
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getUsers()
        Swal.fire(
          'Usuario actualizado',
          'El usuario ha sido actualizado con exito',
          'success'
        )
      }
    })
  }

  openDialogAdd() {
    const dialogRef = this.dialog.open(CreateUserComponent, {

      width: "400px"
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getUsers()
        Swal.fire(
          'Usuario creado',
          'El usuario ha sido creado con exito',
          'success'
        )
      }
    })
  }



}
