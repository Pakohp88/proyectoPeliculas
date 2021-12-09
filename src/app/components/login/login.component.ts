import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  formValid: boolean = true;
  public usuarios: Array<any> = [];
  
  constructor(private formBuilder: FormBuilder, 
              private usuarioService: UsuariosService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({                  
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });    
    this.listener();    
    this.usuarioService.usuarios.subscribe( data => { this.usuarios.push(data); });
     console.log(this.usuarios);
  }

  get emailNoValido() {
    return this.form.get('email').invalid && this.form.get('email').touched;
  }

  get passwordNoValido() {
    return this.form.get('password').invalid && this.form.get('password').touched;
  }

  login(){
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
        Swal.fire({ allowOutsideClick: false, icon: 'success',  text: 'Espere por favor...', timer: 1600});
        Swal.showLoading();
        this.router.navigateByUrl('/peliculas');
        let email = this.form.get('email').value;
        localStorage.setItem('user', email);      
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
