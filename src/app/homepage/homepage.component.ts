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
import { HikingService } from '../hiking.service';

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

  recentHikes: any[] = [];

  constructor(private hikingService: HikingService) {
    console.log('HomepageComponent initialized');
  }

  ngOnInit(): void {
    console.log('HomepageComponent ngOnInit');
    this.hikingService.getHikes().subscribe(data => {
      this.recentHikes = data;
      console.log('Hikes data loaded:', this.recentHikes);
    }, error => {
      console.error('Error fetching hikes:', error);
    });
  }
}
