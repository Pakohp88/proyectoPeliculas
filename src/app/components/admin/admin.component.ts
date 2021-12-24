import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  pedidos: any[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.obtenerPedidos().subscribe(
      resp => { this.pedidos = resp; console.log(resp); }          
    );
  }

}
