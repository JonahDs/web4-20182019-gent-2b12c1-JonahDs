import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { finalize } from 'rxjs/operators';
import { Product } from '../../classes/productClasses/product';
import * as Actions from '../../ngrx/actions/filter.actions';
import { ProductService } from '../../services/product.service';
import { DialogOverviewExampleDialogComponent } from '../rating-dialog/dialog-overview';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public products: Product[];
  public searchedUrlParamter: string;
  public productLoader = false;
  public filterAmount$: Observable<number>;
  public avgRating: number[] = [];
  public searchQuery: string;

  constructor(
    private _productService: ProductService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _store: Store<{ number: number }>,
    private dialog: MatDialog
  ) {
    this.filterAmount$ = this._store.pipe(select('filter'));
  }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(t => {
      this.searchedUrlParamter = t.get('id');
      if (!!this.searchedUrlParamter) {
        this._productService
          .products$(this.searchedUrlParamter)
          .pipe(finalize(() => (this.productLoader = true)))
          .subscribe(t => {
            this.products = t;
            this.calcRating();
          });
      }
    });
    this._activatedRoute.queryParamMap.subscribe(t => {
      this.searchQuery = t.get('filter');
      if (!!this.searchQuery) {
        this._productService
          .getProductsSearch(this.searchQuery)
          .pipe(finalize(() => (this.productLoader = true)))
          .subscribe(t => {
            this.products = t;
            this.calcRating();
          });
      }
    });
  }

  private calcRating(): void {
    const sum: number[] = [];
    this.products.forEach((t, index) => {
      t.ratings.length === 0
        ? (this.avgRating[index] = 0)
        : (sum[index] = t.ratings.reduce(
            (previous, current) => (current += previous)
          ));
      this.avgRating[index] =
        Math.round((sum[index] / t.ratings.length) * 100) / 100;
    });
  }

  public redirectRouter(product: Product): void {
    this._router.navigate([`/productDetail/${product.productId}`]);
  }

  public oninputChange(e: any): void {
    e === 0 ? this.applyFilter(9999) : this.applyFilter(e.value);
  }

  private applyFilter(price: number): void {
    this._store.dispatch(new Actions.FilterProducts(price));
  }

  public openDialog(product: Product): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this._productService.rateProduct$(product.productId, result).subscribe();
    });
  }
}
