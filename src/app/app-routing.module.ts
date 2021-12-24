import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingupComponent } from './components/singup/singup.component';
import { LoginComponent } from './components/login/login.component';
import { PeliculasComponent } from './components/peliculas/peliculas.component';
import { AuthGuard } from './guards/auth.guard';
import { CarritoComponent } from './components/carrito/carrito.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  { path: 'singup', component: SingupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'peliculas', component: PeliculasComponent, canActivate: [AuthGuard]},
  { path: 'carrito', component: CarritoComponent, canActivate: [AuthGuard]},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  { path: '**', pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
