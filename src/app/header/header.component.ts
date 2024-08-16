// src/app/header/header.component.ts

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
  menuOpen: boolean = false; 

  constructor(private router: Router, private sessionService: SessionService) { }

  ngOnInit() {
    const token = this.sessionService.getToken();
    this.isLoggedIn = !!token;
    this.username = this.sessionService.getUsername(); // Récupère le nom d'utilisateur
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen; // Changez l'état du menu
  }

  closeMenu() {
    this.menuOpen = false; // Ferme le menu
  }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]); // Redirige vers la page correspondante
  }

  logout() {
    this.sessionService.clear(); // Supprime les données de session
    this.isLoggedIn = false;
    this.router.navigate(['/']); // Redirige vers la page d'accueil après la déconnexion
  }

  handleLogoClick() {
    if (!this.isLoggedIn) {
      this.router.navigate(['/']); // Redirige vers la page d'accueil si non connecté
    }
    // Si connecté, ne fait rien, reste sur la page actuelle
  }
}
