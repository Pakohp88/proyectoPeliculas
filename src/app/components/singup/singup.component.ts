import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {  
  form: FormGroup;
  formValid: boolean = true;
  flag = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,      
              private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: 0,
      nombre: ['', [Validators.required, Validators.minLength(4)]],      
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.listener();    
  }

  get nombreNoValido() {
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }

  get emailNoValido() {
    return this.form.get('email').invalid && this.form.get('email').touched;
  }

  get passwordNoValido() {
    return this.form.get('password').invalid && this.form.get('password').touched;
  }

  lenghtPassword(){    
    this.flag = this.form.get('password').value.length < 8;    
  }

  registrar(){
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    else{
      let usuario: Usuario = {
        nombre: this.form.get('nombre').value,
        email: this.form.get('email').value,        
        password: this.form.get('password').value
      };

      Swal.fire({ allowOutsideClick: false, icon: 'info', text: 'Espere por favor...', timer: 1600 });
      Swal.showLoading();

      this.authService.guardarUsuario(usuario).subscribe(
        resp => {          
          this.router.navigateByUrl('/peliculas');
        },
        (err) => {           
          Swal.fire({ allowOutsideClick: false, title: "Error de registro" , icon: 'error',  text: err.error.error.message });
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
