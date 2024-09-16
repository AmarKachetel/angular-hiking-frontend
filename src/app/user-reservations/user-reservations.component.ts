import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../services/reservation.service';
import { Reservation } from '../models/reservation.model'; 
@Component({
  selector: 'app-user-reservations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-reservations.component.html',
  styleUrl: './user-reservations.component.less'
})
export class UserReservationsComponent implements OnInit {
  reservations: Reservation[] = []; // Use the Reservation model

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.loadUserReservations();
  }

  loadUserReservations(): void {
    this.reservationService.getUserReservations().subscribe({
      next: (data) => this.reservations = data,
      error: (err) => console.error('Erreur lors de la récupération des réservations:', err)
    });
  }
}


