import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, finalize } from 'rxjs/operators';
import { Product } from '../../classes/productClasses/product';
import { ProductService } from '../../services/product.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import * as Actions from '../../ngrx/actions/filter.actions';
import { MatDialog } from '@angular/material';
import { DialogOverviewExampleDialog } from '../rating-dialog/dialog-overview';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  private _products: Product[];
  private _searchedUrlParamter: string;
  private _loader = false;
  private filterAmount$: Observable<number>;

  constructor(
    private _productService: ProductService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _store: Store<{number: number}>,
    private dialog: MatDialog
  ) {
    this._router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this._searchedUrlParamter = this._activatedRoute.snapshot.paramMap.get(
          'id'
        );
        this._searchedUrlParamter
          ? this.update(this._searchedUrlParamter)
          : null;
      });
    this.filterAmount$ = this._store.pipe(select('filter'));
  }

  ngOnInit() {}

  private update(input: string): void {
    this._productService
      .products$(input)
      .pipe(finalize(() => (this._loader = true)))
      .subscribe(t => (this._products = t));
  }

  private redirect(product: Product): void {
    this._router.navigate([`/productDetail/${product.productId}`]);
  }

  oninputChange(e: any): void {
    e === 0 ? this.applyFilter(9999) : this.applyFilter(e.value);
  }
  private applyFilter(price: number): void {
    this._store.dispatch(new Actions.FilterProducts(price));
  }

  openDialog(product: Product): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(product.productId)
      this._productService.rateProduct$(product.productId, result).subscribe();
    });
  }
}
