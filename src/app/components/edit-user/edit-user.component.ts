import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UserService } from 'src/app/services/user.service';

enum roles{
  ADMINISTRADOR = 3,
  AUDITOR = 4,
  AUXILIAR = 7,
  
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  regForm: FormGroup;
  roles = roles

  constructor(private fb:FormBuilder, @Inject(MAT_DIALOG_DATA) public data,
  private userService: UserService) { }

  ngOnInit(){
    this.regForm = this.fb.group({
      idUsuario: [""],
      nombre: ["", Validators.compose([Validators.required, Validators.minLength(3)])],
      activo: ["", Validators.required],
      rol: this.fb.group({
        idRol: [Validators.required],
        nombre: [""]
      })
    })
    this.regForm.patchValue(this.data.user)
    console.log(this.regForm.value["rol"]["nombre"]);
  }

  editUser(){
    console.log(this.regForm.value);
    this.userService.editUser(this.regForm.value).subscribe(data => console.log(data))
  }

}
