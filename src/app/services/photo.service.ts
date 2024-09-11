// src/app/services/photo.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private apiUrl = 'http://localhost:8000/api/photos'; // URL pour toutes les photos
  private userPhotosUrl = 'http://localhost:8000/api/user/photos'; // URL pour les photos d'un utilisateur

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  getAllPhotos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUserPhotos(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionService.getToken()}`
    });
    return this.http.get<any[]>(this.userPhotosUrl, { headers });
  }
}
