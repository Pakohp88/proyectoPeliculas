import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { SingupComponent } from './components/singup/singup.component';
import { LoginComponent } from './components/login/login.component';
import { PeliculasComponent } from './components/peliculas/peliculas.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { AuthService } from './services/auth.service';
import { AdminComponent } from './components/admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
    SingupComponent,
    LoginComponent,
    PeliculasComponent,
    NavbarComponent,
    CarritoComponent,
    AdminComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
