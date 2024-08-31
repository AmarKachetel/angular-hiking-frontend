import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.less']
})

export class UserProfileComponent implements OnInit {
  user: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.http.get('http://localhost:8000/api/profile').subscribe({
      next: (data) => this.user = data,
      error: (err) => console.error('Failed to load profile', err)
    });
  }

  updateUserProfile(): void {
    this.http.post('http://localhost:8000/api/profile', this.user).subscribe({
      next: () => alert('Profile updated successfully'),
      error: (err) => console.error('Failed to update profile', err)
    });
  }
}