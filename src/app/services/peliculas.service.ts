import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private URL = "https://peliculasapp-448a4-default-rtdb.firebaseio.com";

  constructor(private httpClient:HttpClient) {}

  getPeliculas() {
    return this.httpClient.get(`${ this.URL }/peliculas.json`).pipe(map( this.arreglo ));
  }

  getPelicula(id: string ){
    return this.httpClient.get(`${ this.URL }/peliculas/${ id }.json`);      
  }

  agregarPelicula(pelicula: Pelicula){
    return this.httpClient.post(`${ this.URL }/peliculas.json`, pelicula);

  }

  modificarPelicula(pelicula: Pelicula){
    return this.httpClient.put(`${ this.URL }/peliculas.json`, pelicula);
  }

  borrarPelicula(id: string){
    return this.httpClient.delete(`${ this.URL }/peliculas/${ id }.json`);
  }

  private arreglo(peliculasObj: object){
   const peliculas: Pelicula[] = [];    
    Object.keys( peliculasObj ).forEach(
      key => { 
        const pelicula: Pelicula = peliculasObj[key]        
        peliculas.push(pelicula);
      });
      return peliculas;
  }    

}


export interface Pelicula{
  id: number,
  titulo: string,
  director: string,
  anio: string,
  fechaEstreno: string,
  reparto: string,
  sinopsis: string,
  img: string,
  precio: number
}