import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private tokenKey = 'auth_token';
  private usernameKey = 'username';

  constructor() { }

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  setToken(token: string): void {
    if (this.isBrowser()) {
      sessionStorage.setItem(this.tokenKey, token);
    }
  }

  getToken(): string | null {
    if (this.isBrowser()) {
      return sessionStorage.getItem(this.tokenKey);
    }
    return null;
  }

  setUsername(username: string): void {
    if (this.isBrowser()) {
      sessionStorage.setItem(this.usernameKey, username);
    }
  }

  getUsername(): string | null {
    if (this.isBrowser()) {
      return sessionStorage.getItem(this.usernameKey);
    }
    return null;
  }

  clear(): void {
    if (this.isBrowser()) {
      sessionStorage.removeItem(this.tokenKey);
      sessionStorage.removeItem(this.usernameKey);
    }
  }
}
