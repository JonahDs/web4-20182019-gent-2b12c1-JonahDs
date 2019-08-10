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
import { DialogOverviewExampleDialog } from './rating-dialog/dialog-overview';

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
  declarations: [ProductComponent, ProductViewComponent, ShoppingBasketComponent, PricePipe, DialogOverviewExampleDialog],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    StoreModule.forRoot({filter: filterReducer})
  ], entryComponents: [DialogOverviewExampleDialog]
})
export class ProductModule { }
