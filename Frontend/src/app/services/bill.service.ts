import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private _URL = environment.apiURL;
  constructor(private _http: HttpClient) { }

  generateReport(data: any){
    return this._http.post(this._URL+'/bill/generateReport',data, {
      headers: new HttpHeaders().set('Content-Type','application/json')
    } )
  }

  getPdf(data: any): Observable<Blob>{
    return this._http.post(this._URL+'/bill/getPdf', data, {responseType: 'blob'})
  }


}
