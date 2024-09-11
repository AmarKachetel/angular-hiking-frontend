import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rando } from '../models/rando.model';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class UserRandoService {
  private apiUrl = 'http://localhost:8000/api/user/randos';

  constructor(private http: HttpClient, private sessionService: SessionService) {}

  getUserRandos(): Observable<Rando[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionService.getToken()}`
    });
    return this.http.get<Rando[]>(this.apiUrl, { headers });
  }
}
