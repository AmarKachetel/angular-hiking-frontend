import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api/profile';

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  getUserProfile(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionService.getToken()}` // Ajout du token dans les en-têtes
    });
    return this.http.get<any>(this.apiUrl, { headers });
  }
}
