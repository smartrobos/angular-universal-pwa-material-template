import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from '@app/core/auth/register-page/register-page.component';

const routes: Routes = [
 
  {
    path: '',
    component: RegisterComponent
  }

];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class RegisterRoutingModule {}
