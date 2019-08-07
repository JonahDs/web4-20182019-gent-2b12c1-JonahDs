import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { MaterialModule } from '../material/material.module';
import { ProductViewComponent } from './product-view/product-view.component';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingBasketComponent } from './shopping-basket/shopping-basket.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: 'productDetail/:id',
    component: ProductViewComponent,
  },
  {
    path: 'product/:id',
    component: ProductComponent,
    data: {
      title: 'Product page'
    }
  },
  {path:'product', component: ProductComponent},
  {
    path: 'basket',
    component: ShoppingBasketComponent
  }
];

@NgModule({
  declarations: [ProductComponent, ProductViewComponent, ShoppingBasketComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductModule { }
