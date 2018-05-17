import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ResetPasswordComponent } from '@app/core/auth/reset-password/reset-password.component';

const routes: Routes = [
 
  {
    path: '',
    component: ResetPasswordComponent
  }

];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class ResetPasswordRoutingModule {}
