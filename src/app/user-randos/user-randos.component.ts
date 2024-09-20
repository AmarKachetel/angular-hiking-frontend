import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Rando } from '../models/rando.model';
import { UserRandoService } from '../services/user-rando.service';
import { PhotoService } from '../services/photo.service';
import { AvisService } from '../services/avis.service';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Avis } from '../models/avis.model';

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
  avisList: { [randoId: number]: Avis[] } = {};
  avisCount: { [randoId: number]: number } = {};
  showReviewForm: { [randoId: number]: boolean } = {};
  
  // Utiliser un objet pour stocker les commentaires et les notes associés à chaque randonnée
  avisForm: { [randoId: number]: { commentaire: string, note: number } } = {};

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private userRandoService: UserRandoService,
    private photoService: PhotoService,
    private avisService: AvisService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userRandoService.getUserRandos().subscribe({
      next: (data) => {
        this.randos = data;
        this.filteredRandos = data; // Initialize filter
        this.initializeAvisCounts();
      },
      error: (err) => console.error('Erreur lors de la récupération des randonnées utilisateur:', err)
    });
  }

  onSearch(): void {
    if (this.searchTerm) {
      this.filteredRandos = this.randos.filter(rando =>
        rando.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredRandos = this.randos;
    }
  }

  triggerFileInput(randoId: number) {
    this.fileInput.nativeElement.click();  // Open file explorer
  }

  uploadPhoto(event: any, randoId: number): void {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.photoService.uploadPhoto(randoId, formData).subscribe(
        (response) => {
          console.log('Photo uploadée avec succès', response);
          this.snackBar.open('Photo uploadée avec succès!', 'Fermer', { duration: 3000, panelClass: 'snackbar-success' });
        },
        (error) => {
          console.error('Erreur lors de l\'upload de la photo', error);
          this.snackBar.open('Échec de l\'upload de la photo.', 'Fermer', { duration: 3000, panelClass: 'snackbar-error' });
        }
      );
    }
  }

  toggleAvis(randoId: number): void {
    // Fetch avis if not already fetched
    if (!this.avisList[randoId]) {
      this.viewAvis(randoId);
    }
    // Initialize form fields for this rando if not done yet
    if (!this.avisForm[randoId]) {
      this.avisForm[randoId] = { commentaire: '', note: 5 }; // Valeur par défaut
    }
    // Toggle review form display
    this.showReviewForm[randoId] = !this.showReviewForm[randoId];
  }

  viewAvis(randoId: number): void {
    this.avisService.getAvisForRando(randoId).subscribe({
      next: (data) => {
        this.avisList[randoId] = data;
        this.avisCount[randoId] = data.length; // Update avis count
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des avis:', err);
        this.snackBar.open('Erreur lors de la récupération des avis.', 'Fermer', { duration: 3000, panelClass: 'snackbar-error' });
      }
    });
  }

  addAvis(randoId: number): void {
    const { commentaire, note } = this.avisForm[randoId]; // Récupère le commentaire et la note spécifiques à la randonnée

    if (!commentaire || !note) {
      this.snackBar.open('Veuillez ajouter un commentaire et une note.', 'Fermer', { duration: 3000, panelClass: 'snackbar-error' });
      return;
    }

    this.avisService.addAvis(randoId, commentaire, note).subscribe({
      next: () => {
        this.snackBar.open('Avis ajouté avec succès!', 'Fermer', { duration: 3000, panelClass: 'snackbar-success' });
        this.viewAvis(randoId); // Refresh avis list
        this.avisForm[randoId] = { commentaire: '', note: 5 }; // Reset form fields for this rando
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout de l\'avis:', err);
        this.snackBar.open('Erreur lors de l\'ajout de l\'avis.', 'Fermer', { duration: 3000, panelClass: 'snackbar-error' });
      }
    });
  }

  setRating(randoId: number, star: number): void {
    this.avisForm[randoId].note = star;
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

