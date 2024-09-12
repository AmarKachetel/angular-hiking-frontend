import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class RandoService {
  private apiUrl = 'http://localhost:8000/api/randos';

  constructor(private http: HttpClient, private sessionService: SessionService) {}

  getAllRandos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // Pas besoin de token ici si public
  }

  getUserRandos(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionService.getToken()}`
    });
    return this.http.get<any[]>(`${this.apiUrl}/user`, { headers }); // Ajout des en-têtes d'autorisation
  }
}
