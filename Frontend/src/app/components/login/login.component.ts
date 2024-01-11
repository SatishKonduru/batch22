import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { globalProperties } from 'src/app/shared/globalProperties';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm : any = FormGroup

  constructor(private _formBuilder: FormBuilder,
    private _dialogRef : MatDialogRef<LoginComponent>, 
    private _userDialog: MatDialog){}

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(globalProperties.emailRegx)]],
      password: [null, [Validators.required]]
    })
}
  onLogin(){

  }

  forgotPassword(){
    this._dialogRef.close()
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '70rem'
    dialogConfig.position = {
      top: '5px',
      right: '10px'
    }
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    this._userDialog.open(ForgotPasswordComponent, dialogConfig)
  }
}
