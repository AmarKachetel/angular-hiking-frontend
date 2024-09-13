import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RandoService } from '../services/rando.service';
import { Rando } from '../models/rando.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatCardModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.less']
})
export class HomepageComponent implements OnInit {
  randos: Rando[] = [];
  testimonials = [
    { content: "Super expérience de randonnée grâce à ce site!", user: "Alice" },
    { content: "Randonnées bien organisées et faciles à suivre.", user: "Bob" }
  ];
  articles = [
    { id: 1, title: "Conseils pour les débutants en randonnée", excerpt: "Découvrez les astuces pour bien commencer..." },
    { id: 2, title: "Les plus belles randonnées en France", excerpt: "Explorez les randonnées les plus prisées..." }
  ];

  constructor(private randoService: RandoService, private router: Router) {
    console.log('HomepageComponent initialized');
  }

  ngOnInit(): void {
    this.randoService.getAllRandos().subscribe({
      next: (data) => {
        // Récupère les randonnées et affiche seulement les 4 dernières
        this.randos = data.slice(-4); // Prend les 4 dernières randonnées
        console.log('Dernières randonnées récupérées:', this.randos);
      },
      error: (err) => console.error('Erreur lors de la récupération des randonnées:', err)
    });
  }

  handleReservation(): void {
    if (this.isUserLoggedIn()) {
      this.router.navigate(['/reservation']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  isUserLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  navigateToArticle(articleId: number): void {
    this.router.navigate(['/articles', articleId]);
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']); // Redirection vers la page d'inscription
  }
}
