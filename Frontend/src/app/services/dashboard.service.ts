import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
private _URL = environment.apiURL;
  constructor(private _http: HttpClient) { }

  getDetails(){
  return  this._http.get(this._URL+'/dashboard/details')
  }



}
