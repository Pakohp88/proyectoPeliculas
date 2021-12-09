import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _userService: UsuariosService){

  }

  canActivate():boolean 
  {    
    return this._userService.autenticado();
  }
  
}
