import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter, finalize } from "rxjs/operators";
import { Product } from "../../classes/productClasses/product";
import { ProductService } from "../../services/product.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit {
  private _products: Product[];
  private _searchedUrlParamter: string;
  private _loader: boolean = false;
  currentRate = 4.2;

  constructor(
    private _productService: ProductService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this._router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this._searchedUrlParamter = this._activatedRoute.snapshot.paramMap.get(
          "id"
        );
        this._searchedUrlParamter? this.update(this._searchedUrlParamter): null ;
      });
  }

  ngOnInit() {
  }

  private update(input: string): void {
    this._productService.products$(input).pipe(finalize(() => this._loader = true)).subscribe(t => (this._products = t));
    console.log(this._products)
  }

  private redirect(product: Product): void {
    this._router.navigate([`/productDetail/${product.productId}`]);
  }
}
