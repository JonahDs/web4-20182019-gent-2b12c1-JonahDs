import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDetail } from '../classes/productClasses/product-detail';
import { ProductService } from '../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, finalize } from 'rxjs/operators';
import { Product } from '../classes/productClasses/product';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { DataInterchangeService } from '../services/data-interchange.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
  providers: [NgbCarouselConfig]
})
export class ProductViewComponent implements OnInit {
  private _productId: string;
  private loader = false;
  private productDetail: ProductDetail;

  images = [1, 2, 3, 4, 5, 6, 7].map(
    () => `https://picsum.photos/900/500?random&t=${Math.random()}`
  );

  constructor(
    private _productService: ProductService,
    private _dataInterchange: DataInterchangeService,
    private activatedRoute: ActivatedRoute,
    private config: NgbCarouselConfig
  ) {
    this.config.interval = 0;
  }

  ngOnInit() {
    this._productId = this.activatedRoute.snapshot.paramMap.get('id');
    this._productService
      .productDetails$(this._productId)
      .pipe(
        finalize(() => {
          this.loader = true;
        })
      )
      .subscribe(entry => {
        this.productDetail = entry;
      });
  }

  private addToCart(productNaam: string): void {
    this._dataInterchange.addToCart(productNaam);
  }
}
