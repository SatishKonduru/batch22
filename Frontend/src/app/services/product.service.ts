import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _URL = environment.apiURL;
  constructor(private _http: HttpClient) { }

  add(data: any){
    console.log("Data: ", data)
  return   this._http.post(this._URL+'/product/add', data, {
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }

  update(data: any){
    return this._http.patch(this._URL+'/product/update', data, {
      headers: new HttpHeaders().set('Content-type','application/json')
    })
  }

  getProducts(){
    return this._http.get(this._URL+'/product/get')
  }

  updateStatus(data: any){
    return this._http.patch(this._URL+'/product/updateStatus', data, {
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }

  delete(id:any){
    return this._http.delete(this._URL+'/product/delete/'+id, {
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }



}
