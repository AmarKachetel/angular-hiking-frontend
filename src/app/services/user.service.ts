import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/user.model';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api/profile';

  constructor(private http: HttpClient, private sessionService: SessionService) {}

  getUserProfile(): Observable<UserProfile> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionService.getToken()}`
    });
    return this.http.get<UserProfile>(this.apiUrl, { headers });
  }

  updateUserProfile(profileData: UserProfile): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionService.getToken()}`,
      'Content-Type': 'application/json'
    });
    return this.http.put<any>(this.apiUrl, profileData, { headers });
  }

  updatePassword(newPassword: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionService.getToken()}`,
      'Content-Type': 'application/json'
    });
    const body = { password: newPassword };
    return this.http.put<any>(`${this.apiUrl}/update-password`, body, { headers });
  }
}
