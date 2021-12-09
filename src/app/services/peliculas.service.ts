import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor(private httpClient:HttpClient) {}

  getPeliculas() {
    return this.httpClient.get("../../assets/peliculas.json").pipe(map( this.arreglo ));
  }

  getPeliculaByID(id: number){
    return this.httpClient.get("../../assets/peliculas.json").pipe(map( resp => { this.arregloById(resp, id) }));    
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

  private arregloById(peliculasObj: object, id: number){     
    let pelicula: Pelicula;

     Object.keys( peliculasObj ).forEach(
       key => { 
         const p: Pelicula = peliculasObj[key]        

         if(p.id == id){          
          pelicula = p;          
         }
         
       });

       return pelicula;
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