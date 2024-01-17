import { Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from './auth.service';
import { SnackbarService } from './snackbar.service';
import { globalProperties } from '../shared/globalProperties';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {
  public auth: any
  constructor(private _router: Router,
     private _injector: Injector,
     private _snackbar: SnackbarService) { 
    this.auth = this._injector.get(AuthService)
  }
  canActivate(route: ActivatedRouteSnapshot){
    let expectedRoleArray = route.data.expectedRole
    const token: any = localStorage.getItem('token')
    var tokenPayload: any;
    try{
      tokenPayload = jwtDecode(token)
    }
    catch(err){
      localStorage.clear()
      this._router.navigate(['/'])
    }
    let checkRole = false
    for(let i=0; i < expectedRoleArray.legth ; i++){
      if(expectedRoleArray[i] == tokenPayload.role){
        checkRole = true
      }
    }
    if(tokenPayload.role=='user' || tokenPayload.role=='admin'){
      if(this.auth.isAuthenticated() && checkRole){return true}
      else{
        this._snackbar.openSnackbar(globalProperties.unauthorized, globalProperties.error)
      }
      this._router.navigate(['/rsk/dashboard'])
    }
    else{
      this._router.navigate(['/home'])
      localStorage.clear()
      return false
    }
  }
}
