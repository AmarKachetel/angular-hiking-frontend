// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component'; // Import the homepage component

const routes: Routes = [
  { path: '', component: HomepageComponent },  // Set default path to homepage component
  { path: 'home', component: HomepageComponent },  // Optional: explicit route to home
  // Add more routes here as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// Export routes to be used in main.ts
export { routes };
