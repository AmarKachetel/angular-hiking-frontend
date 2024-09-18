// validate-user.component.ts
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-validate-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './validate-user.component.html',
  styleUrls: ['./validate-user.component.less']
})
export class ValidateUserComponent implements OnInit {
  unvalidatedUsers: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadUnvalidatedUsers();
  }

  // Load unvalidated users
  loadUnvalidatedUsers() {
    this.adminService.getUnvalidatedUsers().subscribe(
      (users) => this.unvalidatedUsers = users,
      (error) => console.error('Erreur lors du chargement des utilisateurs', error)
    );
  }

  // Validate user
  validateUser(userId: number) {
    this.adminService.validateUser(userId).subscribe(
      response => {
        console.log('Utilisateur validé', response);
        this.loadUnvalidatedUsers(); // Reload list after validation
      },
      error => console.error('Erreur lors de la validation de l\'utilisateur', error)
    );
  }

  // Reject user
  rejectUser(userId: number) {
    this.adminService.rejectUser(userId).subscribe(
      response => {
        console.log('Utilisateur rejeté', response);
        this.loadUnvalidatedUsers(); // Reload list after rejection
      },
      error => console.error('Erreur lors du rejet de l\'utilisateur', error)
    );
  }
}
