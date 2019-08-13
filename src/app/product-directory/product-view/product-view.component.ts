import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { finalize, catchError } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';
import { ProductDetail } from '../../classes/productClasses/product-detail';
import { DataInterchangeService } from '../../services/data-interchange.service';
import { ProductService } from '../../services/product.service';
import { ProductDetailDialogComponent } from '../product-detail-dialog/product-detail-dialog';
import { errorHandler } from '@angular/platform-browser/src/browser';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
  providers: [NgbCarouselConfig]
})
export class ProductViewComponent implements OnInit {
  public loader = false;
  public productDetail: ProductDetail;
  public imageArray: any[] = [];
  public productDetailAverage: number;
  public loadingError$ = this._productService.loadingError$;

  constructor(
    private _productService: ProductService,
    private _dataInterchange: DataInterchangeService,
    private _activatedRoute: ActivatedRoute,
    private _config: NgbCarouselConfig,
    private _loginService: LoginService,
    private _router: Router,
    private _dialog: MatDialog
  ) {
    this._config.interval = 0;
  }

  ngOnInit() {
    this._productService
      .productDetails$(this._activatedRoute.snapshot.paramMap.get('id'))
      .pipe(
        finalize(() => {
          this.loader = true;
        })
      )
      .subscribe(entry => {
        this.productDetail = entry;
        this.setupImages(this.productDetail.images);
        this.setupRating();
      });
  }

  private setupImages(array: any[]): void {
    array.forEach(t => this.imageArray.push(t.productImageLocation));
  }

  private setupRating(): void {
    this.productDetail.rating.length === 0
      ? null
      : (this.productDetailAverage =
          this.productDetail.rating.reduce(
            (previous, current) => (previous += current)
          ) / this.productDetail.rating.length);
  }

  public addToCart(product: ProductDetail): void {
    if (this._loginService.user$.getValue()) {
      this._dataInterchange.cartItems.some(
        t => t.productdetailId === product.productdetailId
      )
        ? this._dialog.open(ProductDetailDialogComponent, {
            width: '250px'
          })
        : this._dataInterchange.addToCart(product);
    } else {
      this._loginService.redirectUrl = `productDetail/${
        product.productdetailId
      }`;
      this._router.navigate(['/login']);
    }
  }
}
