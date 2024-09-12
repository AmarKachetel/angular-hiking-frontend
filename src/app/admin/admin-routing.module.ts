import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateUserComponent } from './validate-user/validate-user.component';
import { ManageRandosComponent } from './manage-randos/manage-randos.component';
import { ModerateReviewsComponent } from './moderate-reviews/moderate-reviews.component';
import { adminGuard } from '../guards/admin.guard'; 
const routes: Routes = [
  { path: 'admin/validate-user', component: ValidateUserComponent, canActivate: [adminGuard] },
  { path: 'admin/manage-randos', component: ManageRandosComponent, canActivate: [adminGuard] },
  { path: 'admin/moderate-reviews', component: ModerateReviewsComponent, canActivate: [adminGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
