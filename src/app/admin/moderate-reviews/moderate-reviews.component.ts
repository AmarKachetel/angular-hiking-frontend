import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-moderate-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './moderate-reviews.component.html',
  styleUrls: ['./moderate-reviews.component.less']
})
export class ModerateReviewsComponent {
  reviews: any[] = [];

  constructor(private adminService: AdminService) {
    this.loadReviews();
  }

  loadReviews() {
    this.adminService.getReviews().subscribe(
      data => this.reviews = data,
      error => console.error('Erreur lors du chargement des avis', error)
    );
  }

  approveReview(id: number) {
    this.adminService.approveReview(id).subscribe(
      () => this.loadReviews(),
      error => console.error('Erreur lors de l\'approbation de l\'avis', error)
    );
  }

  deleteReview(id: number) {
    this.adminService.deleteReview(id).subscribe(
      () => this.loadReviews(),
      error => console.error('Erreur lors de la suppression de l\'avis', error)
    );
  }
}
