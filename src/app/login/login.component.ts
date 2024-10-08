import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  credentials = {
    email: '',  // Utiliser 'email' ici
    password: ''
  };

  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  onSubmit() {
    console.log('Attempting login with credentials:', this.credentials);
    this.authService.login(this.credentials).subscribe(
      response => {
        console.log('Login successful, received response:', response);
        // Redirection vers la page du compte personnel après une connexion réussie
        this.snackBar.open('Connexion réussie !', 'Fermer', { duration: 3000, panelClass: 'snackbar-success' });
        this.router.navigate(['/mon-compte']);
      },
      error => {
        if (error.status === 401) {
          this.errorMessage = 'Email ou mot de passe incorrect.';
        } else if (error.status === 400) {
          this.errorMessage = 'Veuillez remplir tous les champs correctement.';
        } else {
          this.errorMessage = 'Une erreur est survenue, veuillez réessayer plus tard.';
        }
        this.snackBar.open(this.errorMessage, 'Fermer', { duration: 3000, panelClass: 'snackbar-error' });
        console.error('Login error:', error);
      }
    );
  }
}


