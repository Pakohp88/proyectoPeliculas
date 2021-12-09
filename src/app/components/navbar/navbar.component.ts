import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public totalPeliculas : number = 0;
  public autenticado = false;

  constructor(private cartService : CartService,
              private usuarioService: UsuariosService,
              private router: Router) {
                
              }

  ngOnInit(): void {
    this.cartService.getPeliculas()
    .subscribe(res=>{
      this.totalPeliculas = res.length;
    })    
  }


  logOut(){
    this.totalPeliculas = 0;
    this.usuarioService.salir();
    this.router.navigateByUrl('/login')
  }

}
