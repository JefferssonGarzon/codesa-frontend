import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';

@Pipe({
  name: 'filtrarUsuarioPorNombre'
})
export class FiltrarUsuarioPorNombrePipe implements PipeTransform {

  transform(value: User[], filter:string = ""): User[]{
    if(filter){
      return value.filter(user => user.nombre.toLowerCase().indexOf(filter.toLowerCase()) != -1)
    }
    return value
  }
}
