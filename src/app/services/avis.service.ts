// src/app/services/avis.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Avis } from '../models/avis.model';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AvisService {
  private apiUrl = 'http://localhost:8000/api/avis';

  constructor(private http: HttpClient, private sessionService: SessionService) {}

  getAvisForRando(randoId: number): Observable<Avis[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionService.getToken()}` // Assurez-vous que le token est valide ici
    });
    return this.http.get<Avis[]>(`${this.apiUrl}/${randoId}`, { headers });
  }

  addAvis(randoId: number, commentaire: string, note: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionService.getToken()}`,
      'Content-Type': 'application/json'
    });

    const body = {
      randoId: randoId,
      commentaire: commentaire,
      note: note
    };

    return this.http.post(`${this.apiUrl}`, body, { headers });
  }
}
