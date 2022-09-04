import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _rcaDataSource = new Subject<any>();
  rcaDataSource$ = this._rcaDataSource.asObservable();

  private _shareRcaData = new Subject<any>();
  shareRca$ = this._shareRcaData.asObservable();

  private _deletercaInfo = new Subject<any>();
  deletercaInfo$ = this._deletercaInfo.asObservable();
  constructor(private http: HttpClient) {}

  getRCA() {
    console.log('getrca called');

    return this.http.get<any>('http://localhost:8080/rca');
  }

  shareRCA(data: any) {
    this._shareRcaData.next(data);
  }

  deleteRCA(id: string) {
    console.log('deleterca called');

    return this.http.delete<any>('http://localhost:8080/rca/' + id);
  }

  sendRcaData(data: any) {
    this._rcaDataSource.next(data);
  }

  deleteRcaData(data: any) {
    this._deletercaInfo.next(data);
  }
}
