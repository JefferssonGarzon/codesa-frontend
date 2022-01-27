import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${environment.URL}/api/usuarios/listar`)
  }

  addUsers(user){
    return this.http.post(`${environment.URL}/api/usuarios/crear`, user)
  }

  editUser(user){
    return this.http.put(`${environment.URL}/api/usuarios/actualizar/${user["idUsuario"]}`, user)
  }

  deleteUser(user){
    return this.http.delete(`${environment.URL}/api/usuarios/eliminar/${user["idUsuario"]}`)
  }
}
