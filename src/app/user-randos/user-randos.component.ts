import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRandoService } from '../services/user_rando.service';
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

  constructor(private userRandoService: UserRandoService) { }

  ngOnInit(): void {
    this.userRandoService.getUserRandos().subscribe({
      next: (data) => this.randos = data,
      error: (err) => console.error('Erreur lors de la récupération des randonnées utilisateur:', err)
    });
  }
}
