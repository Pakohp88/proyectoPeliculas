import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  public peliculas : any = [];
  public precioTotal: number = 0;


  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.cartService.getPeliculas()
    .subscribe(res=>{
      this.peliculas = res;
      this.precioTotal = this.cartService.getPrecioTotal();
    })
  }

  borraraPelicula(pelicula: any){
    this.cartService.borraraPelicula(pelicula);
  }

  vaciarCarrito(){
    this.cartService.borrarCarrito();
  }


}
