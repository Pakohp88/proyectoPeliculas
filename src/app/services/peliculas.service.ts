import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  

  constructor(private httpClient:HttpClient) { }

  getPeliculas() {
    return this.httpClient.get("../../assets/peliculas.json").pipe(map( this.arreglo ));
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