// src/app/services/avis.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AvisService {
  private apiUrl = 'http://localhost:8000/api/avis'; // Adjust this URL

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  addAvis(randoId: number, avisData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionService.getToken()}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${this.apiUrl}`, { ...avisData, randoId }, { headers });
  }
}
