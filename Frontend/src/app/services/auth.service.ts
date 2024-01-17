import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _router: Router) { }
  isAuthenticated(){
    const token = localStorage.getItem('token')
    if(!token){
      this._router.navigate(['/home'])
      return false
    }
    else{
      return true
    }
  }

}
