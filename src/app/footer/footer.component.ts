import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],  
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent { 
  constructor(private router: Router) {}

  navigateToRegister() {
    this.router.navigate(['/register']); 
  }

  navigateToLogin() {
    this.router.navigate(['/login']); 
  }
}