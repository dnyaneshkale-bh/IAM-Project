import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class AssetServiceService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:8080/rca';

  //getSingleData

  getSingleData(assetId: any, rcaId: any): Observable<any> {
    // let assetId = assetId1;
    // console.log(this.http.get(`${this.apiForSingleAsset}/${rcaId}/asset/${assetId}`));
    return this.http.get(`${this.url}/${rcaId}/asset/${assetId}`);
  }

  //get AssetData
  getAssetData(rcaId: any): Observable<any> {
    return this.http.get(`${this.url}/${rcaId}/asset`);
  }

  // Insert a new asset
  saveAsset(rca_id: any, data: any): Observable<any> {
    return this.http.post(`${this.url}/${rca_id}/asset`, data);
  }

  // update a asset
  updateAsset(rca_id: any, assetId: any, data: any): Observable<any> {
    console.log(rca_id);
    console.log(assetId);
    console.log(data);
    return this.http.put(`${this.url}/${rca_id}/asset/${assetId}`, data);
  }

  // delete a asset
  deleteAsset(rca_id: any, assetId: any): Observable<any> {
    
    // console.log(`${this.url}/${rca_id}/asset/${assetId}`);
    return this.http.delete(`${this.url}/${rca_id}/asset/${assetId}`);
  }
}
