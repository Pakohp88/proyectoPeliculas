import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  formValid: boolean = true;
  flag = false;  
  
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,        
              private router: Router) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({                  
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rol: false
    });    
    this.listener();        
  }

  get emailNoValido() {
    return this.form.get('email').invalid && this.form.get('email').touched;
  }

  get passwordNoValido() {
    return this.form.get('password').invalid && this.form.get('password').touched ;
  }

  lenghtPassword(){    
    this.flag = this.form.get('password').value.length < 8;    
  }


  login(){
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{      
      let usuario: Usuario  = {  nombre: null, 
      email: this.form.get('email').value,
      rol: this.form.get('rol').value,
      password: this.form.get('password').value } 

      Swal.fire({ allowOutsideClick: false, icon: 'info',  text: 'Espere por favor...', timer: 1600});
      Swal.showLoading();

      this.authService.login(usuario).subscribe(
        resp => {          
          this.router.navigateByUrl('/peliculas');    
        },
        (err) => {           
          Swal.fire({ allowOutsideClick: false, title: "Error de autenticación" , icon: 'error',  text: err.error.error.message });
        }
      ); 
    }
  }

  listener() {
    this.form.statusChanges.subscribe( status => {      
      if(status =="VALID"){             
        this.formValid = false;
      }
      else{
        this.formValid = true;
      }  
    });  
  }

}
