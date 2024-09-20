import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandoService } from '../services/rando.service';
import { AvisService } from '../services/avis.service';
import { Rando } from '../models/rando.model';
import { Avis } from '../models/avis.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-randos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './randos.component.html',
  styleUrls: ['./randos.component.less']
})
export class RandosComponent implements OnInit {
  randos: Rando[] = [];
  filteredRandos: Rando[] = [];
  searchTerm: string = '';
  avisList: { [randoId: number]: Avis[] } = {};
  avisCount: { [randoId: number]: number } = {};

  constructor(private randoService: RandoService, private avisService: AvisService) {}

  ngOnInit(): void {
    this.randoService.getAllRandos().subscribe({
      next: (data) => {
        this.randos = data;
        this.filteredRandos = data;
        this.initializeAvisCounts();
      },
      error: (err) => console.error('Erreur lors de la récupération des randonnées:', err)
    });
  }

  onSearch(): void {
    this.filteredRandos = this.randos.filter(rando => 
      rando.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      rando.location.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  toggleAvis(randoId: number): void {
    // Si les avis n'ont pas encore été récupérés pour cette randonnée
    if (!this.avisList[randoId]) {
      this.viewAvis(randoId);
    } else {
      // Basculer l'affichage des avis
      delete this.avisList[randoId];
    }
  }

  viewAvis(randoId: number): void {
    this.avisService.getAvisForRando(randoId).subscribe({
      next: (data) => {
        this.avisList[randoId] = data;
        this.avisCount[randoId] = data.length; // Mettre à jour le compteur d'avis
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des avis:', err);
      }
    });
  }

  private initializeAvisCounts(): void {
    this.randos.forEach(rando => {
      this.avisService.getAvisForRando(rando.id).subscribe({
        next: (data) => {
          this.avisCount[rando.id] = data.length;
        },
        error: (err) => {
          console.error('Erreur lors de l\'initialisation du compteur d\'avis:', err);
        }
      });
    });
  }
}
