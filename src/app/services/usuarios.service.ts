import { Injectable, Output, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  @Output() usuarios: EventEmitter<any> = new EventEmitter();
  users: Usuario[] = [ { id: 1, nombre: "Francisco", apellido: "Hernandez", email: "pako@mail.com", password: "1234567890" } ];

  constructor() {  
    
  }
  
  /*getUsuarios(){    
    return this.usuarios;
  }*/

  /*addUsuario(usuario: Usuario){
    let i = this.usuarios.length;
    usuario.id = i;
    this.usuarios.push(usuario);        
  }*/
 
  
  login(email: string, password: string){            
    let i = 0;    
    this.users.forEach(function(usuario){
      if(usuario.email != email && usuario.password != password )
      {
        i++;
      }
    });    
      return this.usuarios[i];
  }

  autenticado(): boolean{  

    let user = localStorage.getItem('user');

    if(user === null){
      return false;
    }
    else{
      return true;      
    }
    
  }


}