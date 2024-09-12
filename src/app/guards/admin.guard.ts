import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Injecte le service d'authentification
  const router = inject(Router); // Injecte le routeur

  if (authService.isAdmin()) {
    return true;
  } else {
    router.navigate(['/']); // Redirige si l'utilisateur n'est pas admin
    return false;
  }
};
