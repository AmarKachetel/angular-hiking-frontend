import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = 'http://localhost:8000/api/register'; // URL pour l'enregistrement
  private loginUrl = 'http://localhost:8000/api/login'; // URL pour la connexion
  private refreshUrl = 'http://localhost:8000/api/token/refresh'; // URL pour le renouvellement du token
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
        console.log('Received login response:', response);
        if (response && response.token) {
          this.handleAuthentication(response.token, response.username);
        } else {
          throw new Error('Invalid login response');
        }
      }),
      catchError(error => {
        console.error('Login failed:', error);
        return throwError(error);
      })
    );
  }

  private handleAuthentication(token: string, username: string) {
    this.sessionService.setToken(token);
    this.sessionService.setUsername(username);
    this.isAuthenticated.next(true); // Mise à jour de l'état d'authentification
  }

  refreshToken(): Observable<any> {
    return this.http.post<any>(this.refreshUrl, {}).pipe(
      tap(response => {
        if (response && response.token) {
          console.log('Token refreshed successfully');
          this.sessionService.setToken(response.token);
        } else {
          throw new Error('Invalid token refresh response');
        }
      }),
      catchError(error => {
        console.error('Token refresh failed:', error);
        this.logout(); // Déconnexion en cas d'échec du rafraîchissement
        return throwError(error);
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

  isAdmin(): boolean {
    const token = this.sessionService.getToken();

    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1])); // Décode la partie payload du JWT
      return tokenPayload.roles && tokenPayload.roles.includes('ROLE_ADMIN');
    }

    return false;
  }
}
