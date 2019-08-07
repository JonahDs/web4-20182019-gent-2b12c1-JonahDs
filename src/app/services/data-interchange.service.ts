import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable, Observer } from 'rxjs';
import { ProductDetail } from '../classes/productClasses/product-detail';

@Injectable({
  providedIn: 'root'
})
export class DataInterchangeService {
  private inputSource = new Subject();
  input = this.inputSource.asObservable();

  public cart$ = new Subject<ProductDetail>();
  public cartItems = Array<ProductDetail>();

  constructor() {}

  changeOnInput(message: string) {
    this.inputSource.next(message);
  }

  addToCart(product: ProductDetail) {
        this.cart$.next(product);
        this.cartItems.push(product);
  }
}
