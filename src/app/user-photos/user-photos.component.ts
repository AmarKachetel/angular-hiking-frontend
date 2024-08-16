import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoService } from '../services/photo.service';
import { Photo } from '../models/photo.model';

@Component({
  selector: 'app-user-photos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-photos.component.html',
  styleUrls: ['./user-photos.component.less']
})
export class UserPhotosComponent implements OnInit {

  photos: Photo[] = [];

  constructor(private photoService: PhotoService) { }

  ngOnInit(): void {
    this.photoService.getUserPhotos().subscribe({
      next: (data) => this.photos = data,
      error: (err) => console.error('Error fetching user photos:', err)
    });
  }
}
