import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = 'http://localhost:8000/api/register'; // URL pour l'enregistrement
  private loginUrl = 'http://localhost:8000/api/login'; // URL pour la connexion
  private isAuthenticated = new BehaviorSubject<boolean>(false); // Observable pour l'état d'authentification

  constructor(private http: HttpClient, private sessionService: SessionService) {
    const token = this.sessionService.getToken();
    this.isAuthenticated.next(!!token); // Initialisation de l'état d'authentification
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(this.registerUrl, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(this.loginUrl, credentials).pipe(
      tap(response => {
        // Stocker le token et le nom d'utilisateur dans la session
        this.sessionService.setToken(response.token);
        this.sessionService.setUsername(response.username);
        this.isAuthenticated.next(true); // Mise à jour de l'état d'authentification
      })
    );
  }

  logout() {
    this.sessionService.clear();
    this.isAuthenticated.next(false); // Mise à jour de l'état d'authentification après déconnexion
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }
}
