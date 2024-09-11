// Exemple pour header.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // Importer RouterModule
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { SessionService } from '../services/session.service';

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

  constructor(private router: Router, private sessionService: SessionService) { }

  ngOnInit() {
    const token = this.sessionService.getToken();
    this.isLoggedIn = !!token;
    this.username = this.sessionService.getUsername();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }

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
