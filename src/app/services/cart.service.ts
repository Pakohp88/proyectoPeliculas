import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartPeliculasList : any =[]
  public peliculastList = new BehaviorSubject<any>([]);
  
  constructor() { }


  getPeliculas(){
    return this.peliculastList.asObservable();
  }

  setProduct(pelicula : any){
    this.cartPeliculasList.push(...pelicula);
    this.peliculastList.next(pelicula);
  }

  agregarPelicula(pelicula : any){
    this.cartPeliculasList.push(pelicula);
    this.peliculastList.next(this.cartPeliculasList);
    this.getPrecioTotal();    
  }

  getPrecioTotal() : number{
    let Total = 0;
    this.cartPeliculasList.map((a:any)=>{
      Total += a.precio;
    })
    return Total;
  }

  borraraPelicula(pelicula: any){    
    this.cartPeliculasList.map((a:any, index:any)=>{
      if(pelicula.id=== a.id){
        this.cartPeliculasList.splice(index,1);
      }
    })
    this.peliculastList.next(this.cartPeliculasList);
  }

  borrarCarrito(){
    this.cartPeliculasList = []
    this.peliculastList.next(this.cartPeliculasList);
  }
}
