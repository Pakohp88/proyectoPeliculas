import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pelicula } from './peliculas.service';
import { Pedido } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartPeliculasList : Pelicula[] =[]
  public peliculastList = new BehaviorSubject<any>([]);
  private URL = 'https://peliculasapp-448a4-default-rtdb.firebaseio.com';  
  
  
  constructor(private httpClient: HttpClient) { }


  agregarPedido(pedido: Pedido){
    return this.httpClient.post(`${ this.URL }/pedidos.json`, pedido);
  }
  
  modificarPedido(pedido: Pedido){
    return this.httpClient.put(`${ this.URL }/pedidos.json`, pedido);
  }

  obtenerPedidos(){
    return this.httpClient.get(`${ this.URL }/pedidos.json`)
  }

  obtenerPedido( id: string ){
    return this.httpClient.get(`${ this.URL }/pedidos/${ id }.json`);
  }


  borrarPedido( id: string){
    return this.httpClient.delete(`${ this.URL }/pedidos/${ id }.json`);

  }

  getPeliculas(){
    return this.peliculastList.asObservable();
  }

  agregarPelicula(pelicula : Pelicula){
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

  borraraPelicula(pelicula: Pelicula){    
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


