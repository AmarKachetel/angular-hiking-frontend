import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { CommonModule } from '@angular/common';
import { ValidateUserComponent } from './validate-user/validate-user.component';
import { ManageRandosComponent } from './manage-randos/manage-randos.component';
import { ModerateReviewsComponent } from './moderate-reviews/moderate-reviews.component';
import { FormsModule } from '@angular/forms'; 

@NgModule({
  declarations: [],
  imports: [
    AdminRoutingModule,
    CommonModule,
    FormsModule ,
    ValidateUserComponent,
    ManageRandosComponent,
    ModerateReviewsComponent
  ]
})
export class AdminModule { }
