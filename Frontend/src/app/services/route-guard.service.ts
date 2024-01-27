import { Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from './auth.service';
import { SnackbarService } from './snackbar.service';
import { globalProperties } from '../shared/globalProperties';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{
  public auth: any
  constructor(private _router: Router,
     private _injector: Injector,
     private _snackbar: SnackbarService) {
    this.auth = this._injector.get(AuthService)
  }
  canActivate(route: ActivatedRouteSnapshot){
    let expectedRoleArray = route.data.expectedRole
    const token: any = localStorage.getItem('token')
    console.log("Roles and token: ", expectedRoleArray, token)
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
      if(this.auth.isAuthenticated() && checkRole){
        this._router.navigate(['/dashboard'])
        return true
      }
      else{
        console.log("ROLE: ",tokenPayload.role)
        this._snackbar.openSnackbar(globalProperties.unauthorized, globalProperties.error)
      }

    }
    else{
      this._router.navigate(['/home'])
      localStorage.clear()
      return false
    }
  }
}
