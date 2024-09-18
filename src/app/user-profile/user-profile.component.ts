import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.less']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userService.getUserProfile().subscribe({
      next: (data) => this.user = data,
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement du profil';
        console.error('Failed to load profile', err);
      }
    });
  }

  updateUserProfile(): void {
    this.userService.updateUserProfile(this.user).subscribe({
      next: () => {
        this.successMessage = 'Profil mis à jour avec succès';
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de la mise à jour du profil';
        this.successMessage = '';
        console.error('Failed to update profile', err);
      }
    });
  }
}
