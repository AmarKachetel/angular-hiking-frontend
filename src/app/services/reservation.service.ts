import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';
import { Reservation } from './../models/reservation.model'; // Import the new Reservation model

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8000/api/reservations';

  constructor(private http: HttpClient, private sessionService: SessionService) {}

  makeReservation(randoId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionService.getToken()}`
    });

    return this.http.post(`${this.apiUrl}/`, { rando_id: randoId }, { headers });
  }

  getUserReservations(): Observable<Reservation[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionService.getToken()}`
    });

    return this.http.get<Reservation[]>(`${this.apiUrl}/my`, { headers });
  }
}
