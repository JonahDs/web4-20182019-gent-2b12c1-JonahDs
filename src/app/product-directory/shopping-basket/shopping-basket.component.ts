import { Component, OnInit } from '@angular/core';
import { ProductDetail } from 'src/app/classes/productClasses/product-detail';
import { DataInterchangeService } from 'src/app/services/data-interchange.service';
import { LoginService } from 'src/app/services/login.service';
import { ShoppingCartService, ShoppingCart } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-basket',
  templateUrl: './shopping-basket.component.html',
  styleUrls: ['./shopping-basket.component.scss']
})
export class ShoppingBasketComponent implements OnInit {
  private _products = new Array<ProductDetail>();
  private _amounts: number[] = [];

  private _total = 0;
  private _loggedInUser: string;

  constructor(
    private _dataInterchange: DataInterchangeService,
    private _shoppingCart: ShoppingCartService,
    private _userService: LoginService
  ) {}

  ngOnInit() {
    this._products = this._dataInterchange.cartItems;
    this._products.forEach(e => this._amounts.push(1));
    this._loggedInUser = this._userService.user$.getValue();
  }

  checkList(): boolean {
    return this._products.length === 0;
  }

  updateOrderAmount(e: number, i: number): void {
    this._amounts[i] = e;
  }

  calculatePrice(): number {
    let number = 0;
    this._products.forEach((p, index) => {
      number += p.productPrice * this._amounts[index];
    });
    this._total = number;
    return Math.round(number * 100) / 100;
  }

  calculateShipping(): number | string {
    return this._products.length <= 2 ? 5 : 'free';
  }

  caculateTotal(): number {
    return typeof this.calculateShipping() === 'number'
      ? Math.round(this._total + Number(this.calculateShipping()) * 100) / 100
      : this._total;
  }

  orderableAmount(n: number): number[] {
    return [...Array(n).keys()];
  }

  sendOrder(): void {
    const productMap: Map<number, number> = new Map();


    for (let i = 0; i < this._products.length; i++ ) {
      productMap.set(this._products[i].productdetailId, this._amounts[i]);
    }

    this._shoppingCart.postShoppingCart(new ShoppingCart(this._loggedInUser, productMap)).subscribe();
  }
}
