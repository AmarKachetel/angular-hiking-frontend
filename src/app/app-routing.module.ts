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

export const routes: Routes = [
  { path: '', component: HomepageComponent }, // Page d'accueil
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'randos', component: RandosComponent }, 
  { path: 'mon-compte', component: MonCompteComponent, canActivate: [AuthGuard] },
  { path: 'photos', component: UserPhotosComponent, canActivate: [AuthGuard] },
  { path: 'posts', component: UserPostsComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent },

  { path: '**', redirectTo: '/' }, // Redirige vers la page d'accueil par défaut pour les routes non trouvées

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


