import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mon-compte',
  standalone: true,
  imports: [],
  templateUrl: './mon-compte.component.html',
  styleUrls: ['./mon-compte.component.less']
})
export class MonCompteComponent implements OnInit {
  username: string | null = null;
  recentActivities: string[] = [];  // Liste des dernières activités

  constructor(private sessionService: SessionService, private router: Router) {}

  ngOnInit(): void {
    // Récupérer le nom d'utilisateur depuis le service de session
    this.username = this.sessionService.getUsername();

    // Charger les dernières activités de l'utilisateur
    this.loadRecentActivities();
  }

  // Fonction pour charger les dernières activités
  loadRecentActivities(): void {
    // Exemple de données fictives pour les dernières activités
    this.recentActivities = [
      "Réservation de la randonnée Mont Blanc",
      "Ajout d'un avis sur la randonnée Alpes",
      "Ajout d'une nouvelle photo pour la randonnée Vosges"
    ];
  }

  // Redirection vers la page des randonnées de l'utilisateur
  goToMyRandos(): void {
    this.router.navigate(['/mes-randos']);
  }

  // Redirection vers la page des réservations de l'utilisateur
  goToMyReservations(): void {
    this.router.navigate(['/mes-reservations']);
  }

  // Redirection vers la page des avis de l'utilisateur
  goToMyReviews(): void {
    this.router.navigate(['/mes-avis']);
  }

  // Redirection vers la page des photos de l'utilisateur
  goToMyPhotos(): void {
    this.router.navigate(['/mes-photos']);
  }
}
