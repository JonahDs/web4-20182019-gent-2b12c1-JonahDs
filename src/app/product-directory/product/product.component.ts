import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Observable, Observer } from 'rxjs';
import { DataInterchangeService } from '../../services/data-interchange.service';
import { Product } from '../../classes/productClasses/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  private _productName: string;

  private _products$: Observable<Product[]> = this._productService.products$(
    this.setProductName()
  );

  constructor(
    private _productService: ProductService,
    private _dataInterchange: DataInterchangeService,
    private router: Router
  ) {}

  ngOnInit() {}

  get products$(): Observable<Product[]> {
    return this._products$;
  }

  setProductName(): string {
    this._dataInterchange.input.subscribe(t => {
      this.update(t);
      this._productName = t;
    });
    return this._productName;
  }

  private update(input: string): void {
    this._products$ = this._productService.products$(input);
  }

  private redirect(product: Product): void {
    this.router.navigate([`/productDetail/${product.productId}`]);
  }
}
