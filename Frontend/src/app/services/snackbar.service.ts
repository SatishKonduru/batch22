import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackbar: MatSnackBar) { }

  openSnackbar(msg: string, action: string){
    if(action === 'error'){
      this._snackbar.open(msg, '',{
        horizontalPosition: 'end',
        verticalPosition: "top",
        duration: 2000,
        panelClass: ['error-snackbar']
      })
    }
    else{
      this._snackbar.open(msg, '',{
        horizontalPosition: 'end',
        verticalPosition: "top",
        duration: 2000,
        panelClass: ['success-snackbar']
      })
    }
  }



}
