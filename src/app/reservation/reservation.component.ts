import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RandoService } from '../services/rando.service';
import { ReservationService } from '../services/reservation.service'; // Assurez-vous d'importer le service de réservation
import { Rando } from '../models/rando.model';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.less']
})
export class ReservationComponent implements OnInit {
  randos: Rando[] = [];

  constructor(
    private randoService: RandoService,
    private reservationService: ReservationService // Injecte le service de réservation ici
  ) {}

  ngOnInit(): void {
    this.randoService.getAllRandos().subscribe({
      next: (data) => {
        this.randos = data;
        console.log('Randonnées disponibles pour réservation:', this.randos);
      },
      error: (err) => console.error('Erreur lors de la récupération des randonnées:', err)
    });
  }

  reserveRando(rando: Rando) {
    this.reservationService.makeReservation(rando.id).subscribe({
      next: (response) => {
        console.log('Réservation réussie:', response);
        alert('Votre réservation a été effectuée avec succès !');
      },
      error: (err) => console.error('Erreur lors de la réservation:', err)
    });
  }
}
