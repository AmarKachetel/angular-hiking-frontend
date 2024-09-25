import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateUserComponent } from './validate-user/validate-user.component';
import { ManageRandosComponent } from './manage-randos/manage-randos.component';
import { ModerateReviewsComponent } from './moderate-reviews/moderate-reviews.component';
import { EditRandoComponent } from './edit-rando/edit-rando.component';
import { AddEditRandoComponent } from './add-edit-rando/add-edit-rando.component';
import { adminGuard } from '../guards/admin.guard'; 
const routes: Routes = [
  { path: 'validate-user', component: ValidateUserComponent, canActivate: [adminGuard] },
  { path: 'manage-randos', component: ManageRandosComponent, canActivate: [adminGuard] },
  { path: 'moderate-reviews', component: ModerateReviewsComponent, canActivate: [adminGuard] },
  { path: 'edit-rando/:id', component: EditRandoComponent, canActivate: [adminGuard] },
  { path: 'edit-rando/:id', component: EditRandoComponent, canActivate: [adminGuard] },
  { path: 'add-rando', component: AddEditRandoComponent, canActivate: [adminGuard] } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
