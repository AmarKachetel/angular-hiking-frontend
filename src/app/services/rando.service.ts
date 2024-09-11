import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RandoService {
  private apiUrl = 'http://localhost:8000/api/randos';

  constructor(private http: HttpClient) {}

  getAllRandos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
