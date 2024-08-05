// src/main.ts

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';  // Import provideHttpClient
import { AppComponent } from './app/app.component';
import { routes } from './app/app-routing.module'; // Import your routes

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()  // Ensure HttpClientModule is provided
  ]
}).catch(err => console.error(err));
