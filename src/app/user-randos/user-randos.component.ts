import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandoService } from '../services/rando.service';
import { Rando } from '../models/rando.model';

@Component({
  selector: 'app-user-randos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-randos.component.html',
  styleUrls: ['./user-randos.component.less']
})
export class UserRandosComponent implements OnInit {

  randos: Rando[] = [];

  constructor(private randoService: RandoService) { }

  ngOnInit(): void {
    this.randoService.getUserRandos().subscribe({
      next: (data) => this.randos = data,
      error: (err) => console.error('Error fetching user randos:', err)
    });
  }

  viewDetails(id: number): void {
    console.log('Voir les détails pour la randonnée', id);
  }
}
