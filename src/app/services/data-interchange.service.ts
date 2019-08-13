import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, Observable, Observer } from "rxjs";
import { ProductDetail } from "../classes/productClasses/product-detail";

@Injectable({
  providedIn: "root"
})
export class DataInterchangeService {
  public cart$ = new Subject<number>();
  public cartItems = Array<ProductDetail>();
  constructor() {}

  public addToCart(product: ProductDetail): void {
    this.cartItems.push(product);
    this.cart$.next(this.cartItems.length);
  }

  public removeFromCart(product: ProductDetail): void {
    const index: number = this.cartItems.indexOf(product, 0);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
    this.cart$.next(this.cartItems.length);
  }
}
