import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { SessionService } from '../services/session.service'; // Import du service de session

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  username: string | null = null;

  constructor(private router: Router, private sessionService: SessionService) { }

  ngOnInit() {
    const token = this.sessionService.getToken();
    this.isLoggedIn = !!token;
    this.username = this.sessionService.getUsername(); // Récupère le nom d'utilisateur
  }

  logout() {
    this.sessionService.clear(); // Supprime les données de session
    this.isLoggedIn = false;
    this.router.navigate(['/']); // Redirige vers la page d'accueil après la déconnexion
  }
}
