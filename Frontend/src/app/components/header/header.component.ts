import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { LogoutComponent } from '../logout/logout.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

constructor(private _userDialog: MatDialog,
   private _userService: UserService,
  private _router: Router){}
ngOnInit(): void {
 if(localStorage.getItem('token') != null){
  this._userService.checkToken()
  .subscribe((res: any) => {
    this._router.navigate(['/dashboard'])
  }, (err: any)=> {
    console.log(err)

  })
 }
 else{
  this._router.navigate(['/home']) //this._router.navigate(['/'])
 }
}
  userSignup(){
    const dialogConfig = new MatDialogConfig()

    dialogConfig.width = '70rem'
    dialogConfig.position ={
      right: '10px',
      top: '5px'
    }
    dialogConfig.disableClose =true
    dialogConfig.autoFocus = true
    this._userDialog.open(SignupComponent, dialogConfig)
  }

  userLogin(){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '70rem'
    dialogConfig.position = {
      right: '10px',
      top: '5px'
    }
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    this._userDialog.open(LoginComponent, dialogConfig)
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

changePassword(){
  const dialogConfig = new MatDialogConfig()
  dialogConfig.width = '70rem'
    dialogConfig.position = {
      right: '10px',
      top: '5px'
    }
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    this._userDialog.open(ChangePasswordComponent, dialogConfig)
}

logout(){
  const dialogConfig = new MatDialogConfig()
  dialogConfig.width = '50rem'
  dialogConfig.disableClose = true
  dialogConfig.autoFocus = true
  let dialogRef = this._userDialog.open(LogoutComponent, dialogConfig)
  dialogRef.afterClosed().subscribe((res:any) => {
    if(res === 'true'){
      localStorage.clear()
      this._router.navigate(['/home'])
    }
    else{ }
  })
}

}
