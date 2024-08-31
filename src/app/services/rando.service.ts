import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rando } from '../models/rando.model';

@Injectable({
  providedIn: 'root'
})
export class RandoService {
  private apiUrl = 'http://localhost:8000/api/randos';
  private userRandosUrl = 'http://localhost:8000/api/user/randos';

  constructor(private http: HttpClient) {}

  getAdminRandos(): Observable<Rando[]> {
    return this.http.get<Rando[]>(this.apiUrl);
  }

  createRando(rando: Rando): Observable<Rando> {
    return this.http.post<Rando>(this.apiUrl, rando);
  }

  updateRando(id: number, rando: Rando): Observable<Rando> {
    return this.http.put<Rando>(`${this.apiUrl}/${id}`, rando);
  }

  deleteRando(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAllRandos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUserRandos(): Observable<any[]> {
    return this.http.get<any[]>(this.userRandosUrl);
  }
}
