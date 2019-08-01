import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user-directory/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './user-directory/register/register.component';
import { ProductComponent } from './product-directory/product/product.component';

const routes: Routes = [
  {
    path: 'Dashboard',
    component: DashboardComponent,
    data: {
      title: 'Dashboard Page'
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
