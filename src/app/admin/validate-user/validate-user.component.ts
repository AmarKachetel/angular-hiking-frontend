import { Component } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-validate-user',
  standalone: true,
  imports: [],
  templateUrl: './validate-user.component.html',
  styleUrls: ['./validate-user.component.less']
})
export class ValidateUserComponent {
  constructor(private adminService: AdminService) {}

  validateUser(userId: number) {
    this.adminService.validateUser(userId).subscribe(
      response => console.log('Utilisateur validé', response),
      error => console.error('Erreur lors de la validation de l\'utilisateur', error)
    );
  }
}
