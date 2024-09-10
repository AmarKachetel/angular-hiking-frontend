import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandoService } from '../services/rando.service';
import { Rando } from '../models/rando.model';
import { FormsModule } from '@angular/forms';
import { HikingService } from '../services/hiking.service';

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
  regions: string[] = ['Île-de-France', 'Bretagne', 'Provence', 'Normandie', 'Alsace']; // Ajouter d'autres régions si nécessaire

  constructor(private randoService: RandoService) {}

  ngOnInit(): void {
    this.randoService.getAllRandos().subscribe({
      next: (data) => {
        this.randos = data;
        this.filteredRandos = data;
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

  filterByRegion(region: string): void {
    this.filteredRandos = this.randos.filter(rando => rando.location === region);
  }
}
