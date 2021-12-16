import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public totalPeliculas : number = 0;
  

  constructor(private cartService : CartService,
              private authService: AuthService,
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
    this.authService.logout();
    this.router.navigateByUrl('/login')
  }

}
