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
        console.log('Received login response:', response);
        if (response && response.token) {
          // Stocker le token et le nom d'utilisateur dans la session
          this.sessionService.setToken(response.token);
          this.sessionService.setUsername(response.username); // Stocke le nom d'utilisateur
          this.isAuthenticated.next(true); // Mise à jour de l'état d'authentification
        } else {
          throw new Error('Invalid login response');
        }
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
    
    // Exemple simple de vérification si l'utilisateur est admin en fonction du token
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1])); // Décode la partie payload du JWT
      return tokenPayload.roles && tokenPayload.roles.includes('ROLE_ADMIN');
    }

    return false;
  }
}
