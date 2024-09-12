import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-randos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-randos.component.html',
  styleUrls: ['./manage-randos.component.less']
})
export class ManageRandosComponent implements OnInit {
  randos: any[] = []; // Tableau pour stocker les randonnées

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.loadRandos(); // Charger les randonnées au démarrage du composant
  }

  loadRandos() {
    this.adminService.getAllRandos().subscribe(
      (data) => {
        this.randos = data;
        console.log('Randonnées chargées:', this.randos);
      },
      (error) => {
        console.error('Erreur lors du chargement des randonnées:', error);
      }
    );
  }

  editRando(rando: any) {
  this.router.navigate(['/admin/edit-rando', rando.id]); // Naviguer vers le composant de modification
}

  // Méthode pour supprimer une randonnée
  deleteRando(id: number) {
    this.adminService.deleteRando(id).subscribe(
      () => {
        console.log('Randonnée supprimée');
        this.loadRandos(); // Recharger la liste après suppression
      },
      (error) => {
        console.error('Erreur lors de la suppression de la randonnée:', error);
      }
    );
  }
}
