import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { User } from 'src/app/models/user.model';
import { RolService } from 'src/app/services/rol.service';
import { UserService } from 'src/app/services/user.service';

enum roles {
  ADMINISTRADOR = 3,
  AUDITOR = 4,
  AUXILIAR = 7
}

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  form: FormGroup;
  roles = roles
  RolesCount;

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data,
    private userService: UserService, private rolService: RolService) { }


  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ["", Validators.compose([Validators.required, Validators.minLength(3)])],
      activo: ["", Validators.required],
      rol: this.fb.group({
        idRol: [, Validators.required],
        nombre: [""]
      })
    })

    this.showRoles()
  }

  addUser() {
    this.userService.addUsers(this.form.value).subscribe(data => console.log(data))
  }

  showRoles() {
    this.rolService.getRoles().subscribe(data => {
      console.log(data)
      this.RolesCount = data;
    });
  }

}
