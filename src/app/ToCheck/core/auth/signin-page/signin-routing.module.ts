import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from '@app/core/auth/signin-page/signin-page.component';

const routes: Routes = [
 
  {
    path: '',
    component: SignInComponent
  }

];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class SigninRoutingModule {}
