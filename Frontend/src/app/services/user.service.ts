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




}
