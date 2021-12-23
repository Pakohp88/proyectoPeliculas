import { Component, OnInit } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Pelicula } from '../../services/peliculas.service';
import { CartService } from '../../services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {

  peliculaArray: Pelicula[] = [];

  constructor(private peliculasService: PeliculasService,
              private carritoService: CartService ) { }

  ngOnInit(): void {
      this.peliculasService.getPeliculas().subscribe(resp => { this.peliculaArray = resp;  } );
  }

  agregarAlCarrito(pelicula: Pelicula){
    this.carritoService.agregarPelicula(pelicula);
    Swal.fire({ allowOutsideClick: false, icon: 'success',  text: 'Película agregada al carrito exitosamente', timer: 1600});
    Swal.showLoading();
  }

}


