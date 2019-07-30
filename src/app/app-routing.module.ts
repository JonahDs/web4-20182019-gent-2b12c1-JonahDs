import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { ProductComponent } from './product/product.component';
import { ProductViewComponent } from './product-view/product-view.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    data: {
      title: 'Product page'
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'Dashboard',
    component: DashboardComponent,
    data: {
      title: 'Dashboard Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Add User Page'
    }
  },
  {
    path: 'productDetail/:id',
    component: ProductViewComponent,
    data: {
      title: 'Procuct Details'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
