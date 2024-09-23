import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { AdminService } from '../admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-moderate-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './moderate-reviews.component.html',
  styleUrls: ['./moderate-reviews.component.less']
})
export class ModerateReviewsComponent implements OnInit {
  avisList: any[] = [];

  constructor(private adminAvisService: AdminService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadAvis();
  }

  loadAvis(): void {
    this.adminAvisService.getAvisToModerate().subscribe({
      next: (data) => {
        this.avisList = data;
      },
      error: (err) => console.error('Erreur lors de la récupération des avis:', err)
    });
  }

  approveAvis(avisId: number): void {
    this.adminAvisService.approveAvis(avisId).subscribe({
      next: () => {
        this.snackBar.open('Avis approuvé', 'Fermer', { duration: 3000 });
        this.loadAvis(); // Refresh the list after approval
      },
      error: (err) => console.error('Erreur lors de l\'approbation de l\'avis:', err)
    });
  }

  rejectAvis(avisId: number): void {
    this.adminAvisService.rejectAvis(avisId).subscribe({
      next: () => {
        this.snackBar.open('Avis rejeté', 'Fermer', { duration: 3000 });
        this.loadAvis(); // Refresh the list after rejection
      },
      error: (err) => console.error('Erreur lors du rejet de l\'avis:', err)
    });
  }
}
