import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '@app/core/layout/layout.component';
import { Error404PageComponent } from '@app/core/404/error404-page.component';

//All Routes need to be defined ...

const routes: Routes = [
 // { path: '', component: LayoutComponent , pathMatch :'full'},
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './home/home.module#HomeModule',
        pathMatch: 'full'
      },
      { path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule'},
      { path: 'lazy/nested', loadChildren: './lazy/lazy.module#LazyModule'},
      { path: '404', component: Error404PageComponent},
      {
        path: 'auth/reset-password',
        loadChildren: '@app/core/auth/reset-password/reset-password.module#ResetPasswordModule',
      },
      { path: 'profile', loadChildren: './profile-page/profile-page.module#ProfileModule' },
    ]
  },
  { path: 'auth', loadChildren: './core/auth/auth.module#AuthModule' },
 
  {
    // There's a bug that's preventing wild card routes to be lazy loaded (see: https://github.com/angular/angular/issues/13848)
    // That's why the Error page should be eagerly loaded
    path: '**',
    redirectTo : '/404'
  },
 

];



@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,{
        initialNavigation: 'enabled'
      })
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
