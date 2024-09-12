import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-manage-randos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-randos.component.html',
  styleUrls: ['./manage-randos.component.less']
})
export class ManageRandosComponent {
  randos: any[] = [];

  constructor(private adminService: AdminService) {
    this.loadRandos();
  }

  loadRandos() {
    this.adminService.manageRandos().subscribe(
      data => this.randos = data,
      error => console.error('Erreur lors du chargement des randonnées', error)
    );
  }

  deleteRando(id: number) {
    this.adminService.deleteRando(id).subscribe(
      () => this.loadRandos(),
      error => console.error('Erreur lors de la suppression de la randonnée', error)
    );
  }
}
