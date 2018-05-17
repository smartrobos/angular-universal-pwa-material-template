import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from '@app/profile-page/profile-page.component';

const routes: Routes = [
 
  {
    path: '',
    component: ProfileComponent
  }

];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
