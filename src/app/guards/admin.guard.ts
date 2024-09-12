import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); 
  const router = inject(Router); 

  console.log('Checking admin access...'); // Log de vérification
  
  if (authService.isAdmin()) {
    console.log('Access granted');
    return true; 
  } else {
    console.log('Access denied');
    router.navigate(['/']);
    return false; 
  }
};
