import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __await } from 'tslib';

@Injectable({
  providedIn: 'root',
})
export class RcaFormService {
  _url = 'http://localhost:8080/rca';
  constructor(private _http: HttpClient) {}

  register(rcaData: any) {
    console.log(rcaData);
    return this._http.post<any>(this._url, rcaData);
  }

  update(rcaData: any, rca_id: any) {
    console.log('********************************************');
    console.log(rca_id);
    console.log(rcaData);
    return this._http.put<any>(this._url + '/' + rca_id, rcaData);
  }
}
