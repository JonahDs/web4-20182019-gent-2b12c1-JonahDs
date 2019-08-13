import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs/internal/Observable";
import { filter, finalize, switchMap } from "rxjs/operators";
import { Product } from "../../classes/productClasses/product";
import * as Actions from "../../ngrx/actions/filter.actions";
import { ProductService } from "../../services/product.service";
import { DialogOverviewExampleDialogComponent } from "../rating-dialog/dialog-overview";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent implements OnInit {
  private _products: Product[];
  private _searchedUrlParamter: string;
  private _loader = false;
  private filterAmount$: Observable<number>;
  private _avgRating: number[] = [];
  private _searchQuery: string;

  constructor(
    private _productService: ProductService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _store: Store<{ number: number }>,
    private dialog: MatDialog
  ) {
    this.filterAmount$ = this._store.pipe(select("filter"));
  }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(t => {
      this._searchedUrlParamter = t.get("id");
      if (!!this._searchedUrlParamter) {
        this._productService
          .products$(this._searchedUrlParamter)
          .pipe(finalize(() => (this._loader = true)))
          .subscribe(t => {
            this._products = t;
            this.calcRating();
          });
      }
    });
    this._activatedRoute.queryParamMap.subscribe(t => {
      this._searchQuery = t.get("filter");
      if (!!this._searchQuery) {
        this._productService
          .getProductsSearch(this._searchQuery)
          .pipe(finalize(() => (this._loader = true)))
          .subscribe(t => {
            this._products = t;
            this.calcRating();
          });
      }
    });
  }

  calcRating(): void {
    const sum: number[] = [];
    const avg: number[] = [];
    this._products.forEach((t, index) => {
      t.ratings.length === 0
        ? (this._avgRating[index] = 0)
        : (sum[index] = t.ratings.reduce(
            (previous, current) => (current += previous)
          ));
      avg[index] = sum[index] / t.ratings.length;
    });
    this._avgRating = avg;
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
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: "250px"
    });

    dialogRef.afterClosed().subscribe(result => {
      this._productService.rateProduct$(product.productId, result).subscribe();
    });
  }
}
