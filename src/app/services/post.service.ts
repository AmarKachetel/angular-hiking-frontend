// src/app/services/post.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:8000/api/posts'; // URL pour tous les posts
  private userPostsUrl = 'http://localhost:8000/api/user/posts'; // URL pour les posts d'un utilisateur

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  getAllPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUserPosts(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionService.getToken()}` // Ajout du token dans les en-têtes
    });
    return this.http.get<any[]>(this.userPostsUrl, { headers });
  }
}
