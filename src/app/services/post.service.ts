import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:8000/api/posts';

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  getUserPosts(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionService.getToken()}` // Ajout du token dans les en-têtes
    });
    return this.http.get<any[]>(this.apiUrl, { headers });
  }
}
