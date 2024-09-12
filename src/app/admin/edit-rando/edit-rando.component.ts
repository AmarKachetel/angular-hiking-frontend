import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-rando',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-rando.component.html',
  styleUrl: './edit-rando.component.less'
})

export class EditRandoComponent implements OnInit {
  rando: any = {}; // Objet pour stocker les détails de la randonnée

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router // Injectez le routeur pour naviguer
  ) {}

  ngOnInit(): void {
    const randoId = this.route.snapshot.params['id'];
    this.adminService.getRandoById(randoId).subscribe(
      (data) => {
        this.rando = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération de la randonnée:', error);
      }
    );
  }

  saveChanges() {
    this.adminService.updateRando(this.rando.id, this.rando).subscribe(
      () => {
        console.log('Randonnée mise à jour avec succès');
        this.router.navigate(['/admin/manage-randos']); // Redirige après la mise à jour
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la randonnée:', error);
      }
    );
  }

  cancel() {
    this.router.navigate(['/admin/manage-randos']); // Redirige vers la liste des randonnées
  }
}