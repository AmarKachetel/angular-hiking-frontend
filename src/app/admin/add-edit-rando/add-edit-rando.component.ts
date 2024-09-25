import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-edit-rando',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-edit-rando.component.html',
  styleUrls: ['./add-edit-rando.component.less']
})
export class AddEditRandoComponent implements OnInit {
  rando: any = {}; // Object to store rando details
  isEditMode: boolean = false; // Track if it's edit mode

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const randoId = this.route.snapshot.params['id'];
    this.isEditMode = !!randoId; // Check if we're editing or adding

    if (this.isEditMode) {
      this.adminService.getRandoById(randoId).subscribe(
        (data) => {
          this.rando = data; // Populate rando details for editing
        },
        (error) => {
          console.error('Error fetching rando:', error);
        }
      );
    }
  }

  saveRando() {
    if (this.isEditMode) {
      // Update existing randonnée
      this.adminService.updateRando(this.rando.id, this.rando).subscribe(
        () => {
          console.log('Randonnée successfully updated');
          this.router.navigate(['/admin/manage-randos']);
        },
        (error) => {
          console.error('Error updating rando:', error);
        }
      );
    } else {
      // Create a new randonnée
      this.adminService.createRando(this.rando).subscribe(
        () => {
          console.log('Randonnée successfully added');
          this.router.navigate(['/admin/manage-randos']);
        },
        (error) => {
          console.error('Error adding rando:', error);
        }
      );
    }
  }

  cancel() {
    this.router.navigate(['/admin/manage-randos']); // Cancel and return to list
  }
}
