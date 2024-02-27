import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _URL = environment.apiURL; //locahost:8080
  constructor(private _http: HttpClient) { }


  signup(data: any): Observable<any>{
  return  this._http.post(this._URL+'/user/signup', data, {
    headers: new HttpHeaders().set('Content-Type','application/json')
  })
  }

  forgotPassword(data: any): Observable<any>{
   return this._http.post(this._URL+'/user/forgotPassword', data, {
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }

  login(data: any): Observable<any>{
   return this._http.post(this._URL+'/user/login', data, {
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }

  checkToken(){
    return this._http.get(this._URL+'/user/checkToken')
  }

  changePassword(data: any){
    return this._http.post(this._URL+'/user/changePassword', data, {
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }


  getUsers(){
    return this._http.get(this._URL+'/user/get')
  }

  update(data: any){
    return this._http.patch(this._URL+'/user/update', data, {
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }


}
