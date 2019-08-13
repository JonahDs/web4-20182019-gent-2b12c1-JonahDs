import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ProductViewComponent } from './product-view/product-view.component';
import { ProductComponent } from './product/product.component';
import { ShoppingBasketComponent } from './shopping-basket/shopping-basket.component';
import { PricePipe } from '../ngrx/pipes/price.pipe';
import { StoreModule } from '@ngrx/store';
import { filterReducer } from '../ngrx/reducers/filter.reducer';
import { DialogOverviewExampleDialogComponent } from './rating-dialog/dialog-overview';
import { ProductDetailDialogComponent } from './product-detail-dialog/product-detail-dialog';

export const routes: Routes = [
  {
    path: 'productDetail/:id',
    component: ProductViewComponent
  },
  {
    path: 'product/:id',
    component: ProductComponent,
    data: {
      title: 'Product page'
    }
  },
  { path: 'filter', component: ProductComponent },
  { path: 'product', component: ProductComponent },
  {
    path: 'basket',
    component: ShoppingBasketComponent
  }
];

@NgModule({
  declarations: [
    ProductComponent,
    ProductViewComponent,
    ShoppingBasketComponent,
    PricePipe,
    DialogOverviewExampleDialogComponent,
    ProductDetailDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    StoreModule.forRoot({ filter: filterReducer })
  ],
  entryComponents: [
    DialogOverviewExampleDialogComponent,
    ProductDetailDialogComponent
  ]
})
export class ProductModule {}
