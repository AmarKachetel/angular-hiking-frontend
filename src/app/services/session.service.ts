// src/app/services/session.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private tokenKey = 'auth_token';
  private usernameKey = 'username';

  constructor() { }

  setToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  setUsername(username: string): void {
    sessionStorage.setItem(this.usernameKey, username);
  }

  getUsername(): string | null {
    return sessionStorage.getItem(this.usernameKey);
  }

  clear(): void {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.usernameKey);
  }
}
