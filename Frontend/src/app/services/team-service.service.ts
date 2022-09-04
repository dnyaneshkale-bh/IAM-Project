import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class TeamServiceService {
  constructor(private http: HttpClient) {}

  apiForTeam = 'http://localhost:8080/rca';

  //getTeamData
  getTeamData(rcaId: any): Observable<any> {
    return this.http.get(`${this.apiForTeam}/${rcaId}/team`);
  }

  // Insert a new team
  saveTeam(rca_id: any, data: any): Observable<any> {
    return this.http.post(`${this.apiForTeam}/${rca_id}/team`, data);
  }

  // update a Team
  updateTeam(rca_id: any, teamId: any, data: any): Observable<any> {
    return this.http.put(`${this.apiForTeam}/${rca_id}/team/${teamId}`, data);
  }

  // delete a Team
  deleteTeam(rca_id: any, teamId: any): Observable<any> {
    return this.http.delete(`${this.apiForTeam}/${rca_id}/team/${teamId}`);
  }

  
}
