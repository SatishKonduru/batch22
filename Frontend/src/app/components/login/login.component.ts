import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { globalProperties } from 'src/app/shared/globalProperties';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm : any = FormGroup

  constructor(private _formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(globalProperties.emailRegx)]],
      password: [null, [Validators.required]]
    })
}
  onLogin(){

  }

  forgotPassword(){
    
  }
}
