import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private apiUrl = 'http://localhost:8000/api/photos';

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  getUserPhotos(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionService.getToken()}` // Ajout du token dans les en-têtes
    });
    return this.http.get<any[]>(this.apiUrl, { headers });
  }
}
