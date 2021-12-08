import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usuarios: Usuario[] = [];

  constructor() {}
  
  getUsuarios(){    
    return this.usuarios;
  }

  addUsuario(usuario: Usuario){
    let i = this.usuarios.length;
    usuario.id = i;
    this.usuarios.push(usuario);
  }
 
  
  login(email: string, password: string){
    let i = 0;    
    this.usuarios.forEach(function(usuario){
      if(usuario.email != email && usuario.password != password )
      {
        i++;
      }
    });    
      return this.usuarios[i];
  }


}