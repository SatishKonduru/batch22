import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
URL = environment.apiURL;
  constructor(private _http: HttpClient) { }

  add(data: any){
  return  this._http.post(this.URL+'/category/add', data, {
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }
  update(data: any){
    return this._http.patch(this.URL+'/category/update', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

 getCategories(){
  return this._http.get(this.URL+'/category/get')
 }


}
