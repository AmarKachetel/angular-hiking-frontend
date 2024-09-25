import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8000/api/admin';

  constructor(private http: HttpClient, private sessionService: SessionService) { }

   // Méthode pour récupérer toutes les randonnées
   getAllRandos(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionService.getToken()}`
    });
    return this.http.get<any[]>(`${this.apiUrl}/randos`, { headers });
  }

   // Méthode pour récupérer une randonnée par ID
   getRandoById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionService.getToken()}`
    });
    return this.http.get<any>(`${this.apiUrl}/randos/${id}`, { headers });
  }

  getUnvalidatedUsers(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionService.getToken()}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<any[]>(`${this.apiUrl}/users/unvalidated`, { headers });
  }
  // Validate a user
  validateUser(userId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionService.getToken()}`,  // Ensure token is attached
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.apiUrl}/validate-user/${userId}`, {}, { headers });
  }

  rejectUser(userId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionService.getToken()}`,  // Ensure token is attached
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.apiUrl}/reject-user/${userId}`, {}, { headers });
  }

  manageRandos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/randos`);
  }

  createRando(rando: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionService.getToken()}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.apiUrl}/randos`, rando, { headers });
  }
  
  updateRando(id: number, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionService.getToken()}`,  
      'Content-Type': 'application/json'
    });
    return this.http.put(`${this.apiUrl}/randos/${id}`, data, { headers });
  }

  deleteRando(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionService.getToken()}`,  
      'Content-Type': 'application/json'
    });
    return this.http.delete(`${this.apiUrl}/randos/${id}`, { headers });
  }


  getAvisToModerate(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionService.getToken()}`,  
      'Content-Type': 'application/json'
    });
    return this.http.get<any[]>(`${this.apiUrl}/avis`, { headers });
  }

  approveAvis(avisId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionService.getToken()}`,  
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.apiUrl}/avis/approve/${avisId}`, {}, { headers });
  }
  
  rejectAvis(avisId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionService.getToken()}`,  
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.apiUrl}/avis/reject/${avisId}`, {}, { headers });
  }
  
}
