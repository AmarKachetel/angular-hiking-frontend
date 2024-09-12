import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RandosComponent } from './randos/randos.component';
import { MonCompteComponent } from './mon-compte/mon-compte.component';
import { AuthGuard } from './guards/auth.guard';
import { UserRandosComponent } from './user-randos/user-randos.component';
import { UserPhotosComponent } from './user-photos/user-photos.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [ // Assurez-vous que `routes` est bien exporté ici
  { path: '', component: HomepageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'randos', component: RandosComponent },
  { path: 'mon-compte', component: MonCompteComponent, canActivate: [AuthGuard] },
  { path: 'user-randos', component: UserRandosComponent, canActivate: [AuthGuard] },
  { path: 'photos', component: UserPhotosComponent, canActivate: [AuthGuard] },
  { path: 'posts', component: UserPostsComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent },

  // Chargement paresseux du module administrateur
  { path: 'admin', loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule) },

  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
