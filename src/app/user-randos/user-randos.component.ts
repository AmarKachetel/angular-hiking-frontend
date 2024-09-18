import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRandoService } from '../services/user-rando.service';
import { Rando } from '../models/rando.model';
import { FormsModule } from '@angular/forms';

import { HikingService } from '../services/hiking.service';

@Component({
  selector: 'app-user-randos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-randos.component.html',
  styleUrls: ['./user-randos.component.less']
})
export class UserRandosComponent implements OnInit {
  randos: Rando[] = [];
  filteredRandos: Rando[] = [];
  searchTerm: string = '';

  constructor(private userRandoService: UserRandoService) { }

  ngOnInit(): void {
    this.userRandoService.getUserRandos().subscribe({
      next: (data) => {
        this.randos = data;
        this.filteredRandos = data; // Initialisation du filtre
      },
      error: (err) => console.error('Erreur lors de la récupération des randonnées utilisateur:', err)
    });
  }

  onSearch(): void {
    if (this.searchTerm) {
      this.filteredRandos = this.randos.filter(rando =>
        rando.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        rando.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredRandos = this.randos;
    }
  }
}
