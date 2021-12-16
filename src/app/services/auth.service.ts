import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL = 'https://identitytoolkit.googleapis.com/v1/accounts:';  
  API_Key = 'AIzaSyBBH6ARH2jiOOsA6NIBHqxxCbFxfVQverE';
  userToken: string;

  constructor(private htttpClient: HttpClient) { }


  login(usuario: Usuario){
    const authData = {
      ... usuario,
      returnSecureToken: true
    }  

    return this.htttpClient.post(`${ this.URL }signInWithPassword?key= ${ this.API_Key }`, authData)
                           .pipe(map( resp => { this.guardarToken(resp['idToken']); return resp; }));
  }
  
  guardarUsuario(usuario: Usuario){
    const authData = {
      ... usuario,
      returnSecureToken: true
    }    

    return this.htttpClient.post(`${ this.URL }signUp?key= ${ this.API_Key }`, authData)
                           .pipe(map( resp => { this.guardarToken(resp['idToken']); return resp; }));
  }


  private guardarToken(idToken: string){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    let today = new Date();
    today.setSeconds( 3600 );
    localStorage.setItem('expira', today.getTime().toString())
  }

  leerToken(){
    if( localStorage.getItem('token') ){
      this.userToken = localStorage.getItem('token');
    }
    else{
      this.userToken = '';
    }
    
    return this.userToken;
  }


  estaAutenticado(): boolean{

    if(this.userToken.length < 2){
      return false;
    }   

    let expira = Number( localStorage.getItem('expira') );
    const expiraDate = new Date();
    expiraDate.setTime( expira );

    if(expiraDate > new Date()){
      return true;
    }
    else{
      return false;      
    }
  }


  logout(){
    localStorage.removeItem('token');
    localStorage.clear();    
  }

}