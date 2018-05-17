import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: '@app/core/auth/signin-page/signin-page.module#SigninModule',
  },
  {
    path: 'register',
    loadChildren: '@app/core/auth/register-page/register-page.module#RegisterModule',
  },
 
  {
    path: 'forgot-password',
    loadChildren: '@app/core/auth/forgot-password/forgot-password.module#ForgotPasswordModule',
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
