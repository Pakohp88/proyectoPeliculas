import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';

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
    Swal.fire({ allowOutsideClick: false, icon: 'success',  text: 'Película eliminda exitosamente', timer: 1600});
    Swal.showLoading();
  }

  vaciarCarrito(){
    this.cartService.borrarCarrito();
    Swal.fire({ allowOutsideClick: false, icon: 'success',  text: 'Carrito vacío', timer: 1600});
    Swal.showLoading();
  }


}
