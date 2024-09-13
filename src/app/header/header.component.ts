import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; 
import { SessionService } from '../services/session.service';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule], 
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string | null = null;
  menuOpen: boolean = false;
  isAdmin: boolean = false; 
  adminMenuOpen: boolean = false; 
  mobileMenuOpen: boolean = false; 
  
  constructor(private router: Router, private sessionService: SessionService, private authService: AuthService) { }

  ngOnInit() {
    const token = this.sessionService.getToken();
    this.isLoggedIn = !!token;
    this.username = this.sessionService.getUsername();
    this.isAdmin = this.authService.isAdmin(); 
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.adminMenuOpen = false;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  toggleAdminMenu() {
    this.adminMenuOpen = !this.adminMenuOpen;
    this.menuOpen = false; 
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  navigateTo(page: string) {
    this.router.navigate([page]);
    this.closeAllMenus(); 
  }

  closeAllMenus() {
    this.menuOpen = false;
    this.adminMenuOpen = false;
    this.mobileMenuOpen = false;
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

   @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-menu') && !target.closest('.admin-menu') && !target.closest('.burger-menu')) {
      this.closeAllMenus();
    }
  }
}
