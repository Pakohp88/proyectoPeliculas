import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  formValid: boolean = true;
  
  constructor(private formBuilder: FormBuilder, 
    private usuarioService: UsuariosService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({                  
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });    
    this.listener();    
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
        let email = this.form.get('email').value;
        let password = this.form.get('password').value;        
        let user = this.usuarioService.login(email, password);      
        console.log(user);
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
