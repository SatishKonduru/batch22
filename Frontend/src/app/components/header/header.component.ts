import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

constructor(private _userDialog: MatDialog){}

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
}
