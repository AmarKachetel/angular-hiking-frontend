import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoService } from '../services/photo.service';
import { Photo } from '../models/photo.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-photos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-photos.component.html',
  styleUrls: ['./user-photos.component.less']
})
export class UserPhotosComponent implements OnInit {
  photos: Photo[] = [];

  constructor(private photoService: PhotoService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadUserPhotos();
  }

  loadUserPhotos(): void {
    this.photoService.getUserPhotos().subscribe({
      next: (data) => this.photos = data,
      error: (err) => console.error('Error fetching user photos:', err)
    });
  }

  deletePhoto(photoId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette photo ?')) {
      this.photoService.deletePhoto(photoId).subscribe({
        next: () => {
          this.snackBar.open('Photo supprimée avec succès!', 'Fermer', { duration: 3000, panelClass: 'snackbar-success' });
          this.loadUserPhotos(); // Reload photos after deletion
        },
        error: (err) => {
          console.error('Error deleting photo:', err);
          this.snackBar.open('Échec de la suppression de la photo.', 'Fermer', { duration: 3000, panelClass: 'snackbar-error' });
        }
      });
    }
  }
}
