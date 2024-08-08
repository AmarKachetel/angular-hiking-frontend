// src/app/header/header.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button'; 

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule],  
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent { }
