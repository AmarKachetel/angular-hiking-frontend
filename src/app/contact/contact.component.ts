// src/app/contact/contact.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms'; // Ajoutez NgForm pour le typage
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less']
})
export class ContactComponent {
  contactData = { name: '', email: '', message: '' };
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private http: HttpClient) {}

  onSubmit(contactForm: NgForm) { // Ajoutez NgForm comme paramètre
    // Réinitialiser les messages à chaque soumission de formulaire
    this.successMessage = null;
    this.errorMessage = null;

    // Envoyer la requête HTTP POST
    this.http.post('http://localhost:8000/api/contact', this.contactData, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          this.successMessage = 'Message envoyé et enregistré avec succès.';
          this.contactData = { name: '', email: '', message: '' }; // Réinitialiser les données du formulaire après l'envoi
          contactForm.resetForm(); // Réinitialiser le formulaire complètement
        },
        error: (error) => {
          this.errorMessage = `Erreur lors de l'envoi du message. Détails: ${error.message || error.statusText}`;
          console.error('Erreur complète:', error); // Affiche l'erreur complète pour le débogage
        }
      });
  }
}
