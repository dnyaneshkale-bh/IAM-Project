import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface documentinfo {
  document_id: number;
  document_name: string;
  document_modified_name: string;
  rca_id: string;
}

@Injectable({
  providedIn: 'root',
})
export class FileuploaderService {
  constructor(private _http: HttpClient) {}

  uploadfiles(rcaid: any, data: any): Observable<any> {
    return this._http.post<any>(
      `http://localhost:8080/rca/${rcaid}/documents`,
      data
    );
  }

  getfiles(rca_id: any): Observable<any> {
    return this._http.get<any>(`http://localhost:8080/rca/${rca_id}/documents`);
  }
}
