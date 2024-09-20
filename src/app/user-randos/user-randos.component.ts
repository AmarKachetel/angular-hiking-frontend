import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Rando } from '../models/rando.model';
import { UserRandoService } from '../services/user-rando.service';
import { PhotoService } from '../services/photo.service';
import { AvisService } from '../services/avis.service';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private userRandoService: UserRandoService,
    private photoService: PhotoService,
    private snackBar: MatSnackBar, 
    private avisService: AvisService
  ) {}
  
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
        rando.title.toLowerCase().includes(this.searchTerm.toLowerCase())

      );
    } else {
      this.filteredRandos = this.randos;
    }
  }

  triggerFileInput(randoId: number) {
    this.fileInput.nativeElement.click();  // Ouvre l'explorateur de fichiers
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

  addReview(randoId: number) {
    // Open a modal to add a review (covered in section 2)
  }

  viewAvis(randoId: number) {
    // View all avis for the rando (covered in section 3)
  }
}
