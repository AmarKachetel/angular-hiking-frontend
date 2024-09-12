import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // Importer RouterModule
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { SessionService } from '../services/session.service';
import { AuthService } from '../services/auth.service'; // Importer AuthService

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule], // Ajouter RouterModule ici
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string | null = null;
  menuOpen: boolean = false;
  isAdmin: boolean = false; // Indicateur si l'utilisateur est admin
  adminMenuOpen: boolean = false; // Indicateur pour le menu admin

  constructor(private router: Router, private sessionService: SessionService, private authService: AuthService) { }

  ngOnInit() {
    const token = this.sessionService.getToken();
    this.isLoggedIn = !!token;
    this.username = this.sessionService.getUsername();
    this.isAdmin = this.authService.isAdmin(); // Vérifie si l'utilisateur est admin
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  toggleAdminMenu() {
    console.log('oui')
    this.adminMenuOpen = !this.adminMenuOpen;
  }

  navigateTo(page: string) {
    this.router.navigate([page]);  }

  logout() {
    this.sessionService.clear();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

  handleLogoClick() {
    if (!this.isLoggedIn) {
      this.router.navigate(['/']);
    }
  }
}
