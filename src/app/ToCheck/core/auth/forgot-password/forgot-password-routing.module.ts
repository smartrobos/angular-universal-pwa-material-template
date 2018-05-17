import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from '@app/core/auth/forgot-password/forgot-password.component';

const routes: Routes = [
 
  {
    path: '',
    component: ForgotPasswordComponent
  }

];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class ForgotPasswordRoutingModule {}
