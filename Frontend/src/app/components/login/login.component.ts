import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { globalProperties } from 'src/app/shared/globalProperties';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { UserService } from 'src/app/services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm : any = FormGroup
  responseMsg: any =''
  constructor(private _formBuilder: FormBuilder,
    private _dialogRef : MatDialogRef<LoginComponent>,
    private _userDialog: MatDialog,
    private _userService: UserService,
    private _ngxService: NgxUiLoaderService,
    private _router: Router,
    private _snackbar: SnackbarService){}

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(globalProperties.emailRegx)]],
      password: [null, [Validators.required]]
    })
}
  onLogin(){
    this._ngxService.start()
    var formData = this.loginForm.value
    var data ={
      email: formData.email,
      password: formData.password
    }
    this._userService.login(data)
    .subscribe((res: any) => {
      this._ngxService.stop()
      this._dialogRef.close()
      localStorage.setItem('token', res.token)
      this._router.navigate(['/dashboard'])
    }, (err: any) => {
      this._ngxService.stop()
      this._dialogRef.close()
      if(err.error?.message){
        this.responseMsg = err.error?.message
      }
      else{
        this.responseMsg = globalProperties.genericError
      }
      this._snackbar.openSnackbar(this.responseMsg, globalProperties.error)
    })
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

  changePassword(){
    this._dialogRef.close()
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '70rem'
    dialogConfig.position = { right: '10px', top: '5px'}
    dialogConfig.disableClose = true
    this._userDialog.open(ChangePasswordComponent, dialogConfig)
  }

  check(){
    const token = localStorage.getItem('token')
    if(token){
      return true
    }
    else{
      return false
    }
  }

}
