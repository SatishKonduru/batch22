import { Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
// import * as jwt_decode from 'jwt-decode'; 

import { AuthService } from './auth.service';
import { SnackbarService } from './snackbar.service';
import { globalProperties } from '../shared/globalProperties';

import { jwtDecode } from "jwt-decode";
// const jwt_decode = require('jwt-decode');

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {
public auth: any;
  constructor(private _router: Router, 
    private _injector: Injector,
    private _snackbar: SnackbarService
    ) {
    this.auth = this._injector.get(AuthService)
   }

  canActivate(route: ActivatedRouteSnapshot): boolean{
    let expectedRoleArray = route.data.expectedRole
    const token = localStorage.getItem('token')
    console.log('Token in Gaurd: ', token)

    var tokenPayload : any;
    try{
      // tokenPayload = jwt_decode(token)
      tokenPayload = jwtDecode(token)
      console.log('Token Payload: ', tokenPayload.role)
    }
    catch(err){
      localStorage.clear()
      this._router.navigate(['/'])
    }
    let checkRole = false
    for(let i=0; i < expectedRoleArray.length ; i++){
      if(expectedRoleArray[i] == tokenPayload.role){
        checkRole = true
      }
    }

    if(tokenPayload.role = 'user' || tokenPayload.role=='admin'){
      if(this.auth.isAuthenticated() && checkRole){return true}
      else{
        this._snackbar.openSnackbar(globalProperties.unauthorized, globalProperties.error)
      }
      this._router.navigate(['/rsk/dashboard'])
      return true
    }
    else{
      this._router.navigate(['/home'])
      localStorage.clear()
      return false
    }


  }


}