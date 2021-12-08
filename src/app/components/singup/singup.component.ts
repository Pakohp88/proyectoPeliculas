import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  usuario: Usuario;
  form: FormGroup;
  formValid: boolean = true;

  constructor(private formBuilder: FormBuilder, 
              private usuarioService: UsuariosService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: 0,
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      apellido: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.listener();    
  }

  get nombreNoValido() {
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }

  get apellidoNoValido() {
    return this.form.get('apellido').invalid && this.form.get('apellido').touched;
  }

  get emailNoValido() {
    return this.form.get('email').invalid && this.form.get('email').touched;
  }

  get passwordNoValido() {
    return this.form.get('password').invalid && this.form.get('password').touched;
  }


  registrar(){
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
         this.usuario = {id: 0, nombre: this.form.get('nombre').value, apellido: this.form.get('apellido').value,
                            email: this.form.get('email').value, password: this.form.get('password').value };
        this.usuarioService.addUsuario(this.usuario);      
        console.log(this.usuarioService.getUsuarios());
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
