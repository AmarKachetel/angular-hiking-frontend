// src/app/hiking.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import HttpClient
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HikingService {

  private apiUrl = 'http://localhost:8000/api/hikes'; // Remplacez par votre URL d'API Symfony

  constructor(private http: HttpClient) { }  // Injecter HttpClient

  getHikes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);  // Utiliser HttpClient pour faire des requêtes HTTP
  }
}
