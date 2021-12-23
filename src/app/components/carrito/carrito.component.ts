import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';
import { Pelicula } from '../../services/peliculas.service';
import { AuthService } from '../../services/auth.service';
import { Pedido } from '../../models/pedido.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  public peliculas : Pelicula[] = [];
  public precioTotal: number = 0;
  pedido: Pedido = new Pedido();


  constructor(private cartService : CartService,
              private authService : AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.cartService.getPeliculas()
    .subscribe(res=>{
      this.peliculas = res;
      this.precioTotal = this.cartService.getPrecioTotal();
    })
  }

  agregarPedido(peliculas: Pelicula[]){    
    Swal.fire({ allowOutsideClick: false, icon: 'info',  text: 'Espere por favor...', timer: 1600});
    Swal.showLoading();
    this.pedido = { idCliente: this.authService.leerToken(), fecha: new Date(), peliculas: peliculas, precio: this.precioTotal }          
    this.cartService.agregarPedido(this.pedido).subscribe(resp => {       
      console.log(resp);
      Swal.fire({ allowOutsideClick: true, title: "Compra exitosa" , icon: 'success', text: "Tu compra se ha generado de manera exitosa con el id: " + resp['name'] });
      this.cartService.borrarCarrito();
      this.router.navigateByUrl('/peliculas'); 
    },
      (err) => {           
        Swal.fire({ allowOutsideClick: false, title: "Error en la compra, intentalo mas tarde" , icon: 'error',  text: err.error.error.message });
      });    
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
