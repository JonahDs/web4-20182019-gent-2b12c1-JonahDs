import { Component, OnInit } from '@angular/core';
import { ProductDetail } from 'src/app/classes/productClasses/product-detail';
import { DataInterchangeService } from 'src/app/services/data-interchange.service';
import { LoginService } from 'src/app/services/login.service';
import {
  ShoppingCartService,
  ShoppingCart
} from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-basket',
  templateUrl: './shopping-basket.component.html',
  styleUrls: ['./shopping-basket.component.scss']
})
export class ShoppingBasketComponent implements OnInit {
  public products = new Array<ProductDetail>();
  public amounts: number[] = [];
  private _total = 0;
  private _loggedInUser: string;
  public showMsg = false;

  constructor(
    private _dataInterchange: DataInterchangeService,
    private _shoppingCart: ShoppingCartService,
    private _userService: LoginService
  ) {}

  ngOnInit() {
    this.products = this._dataInterchange.cartItems;
    this.products.forEach(e => this.amounts.push(1));
    this._loggedInUser = this._userService.user$.getValue();
  }

  checkList(): boolean {
    return this.products.length === 0;
  }

  updateOrderAmount(e: number, i: number): void {
    this.amounts[i] = e;
  }

  deleteFromCart(product: ProductDetail): void {
    const index: number = this.products.indexOf(product, 0);
    if (index > -1) {
      this.products.splice(index, 1);
    }
    this._dataInterchange.removeFromCart(product);
  }

  calculatePrice(): number {
    let number = 0;
    this.products.forEach((p, index) => {
      number += p.productPrice * this.amounts[index];
    });
    this._total = number;
    return Math.round(this._total * 100) / 100;
  }

  calculateShipping(): number | string {
    return this.products.length <= 2 ? 5 : 'free';
  }

  caculateTotal(): number {
    return typeof this.calculateShipping() === 'number'
      ? Math.round((this._total + Number(this.calculateShipping())) * 100) / 100
      : Math.round(this._total * 100) / 100;
  }

  orderableAmount(n: number): number[] {
    return [...Array(n).keys()];
  }

  sendOrder(): void {
    const productMap: Map<number, number> = new Map();

    for (let i = 0; i < this.products.length; i++) {
      productMap.set(this.products[i].productdetailId, this.amounts[i]);
    }

    this._shoppingCart
      .postShoppingCart(new ShoppingCart(this._loggedInUser, productMap))
      .subscribe((event: any) => {
        if (event.cartproducts) {
          this.showMsg = true;
          setTimeout(() => {
          location.reload();
          }, 1500);
        }
      });
  }
}
