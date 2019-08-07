import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Observable, Observer } from 'rxjs';
import { DataInterchangeService } from '../../services/data-interchange.service';
import { Product } from '../../classes/productClasses/product';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  private _productName: string;
  private _route: string = null;
  public _products: Product[] ;

  constructor(
    private _productService: ProductService,
    private _dataInterchange: DataInterchangeService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
   
  }

  ngOnInit() {
    this._productService.products$(this.setProductName()).subscribe(t => this._products = t);
  }

  setProductName(): string {
    this._dataInterchange.input.subscribe(t => {
      this._productName = String(t);
      this.update(this._productName);
    });
    return this._productName;
  }

  private update(input: string): void {
    this._productService.products$(input).subscribe(t => this._products = t);
    console.log(this._products)
  }

  private redirect(product: Product): void {
    this._router.navigate([`/productDetail/${product.productId}`]);
  }
}
