import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
//import { ShoppingCart } from '../classes/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private http: HttpClient) {}

  postShoppingCart(shoppingCart: ShoppingCart) {
    const umoeder = { username: shoppingCart.username, orderedProducts: [] };
    shoppingCart.products.forEach((value: number, key: number) => {
      umoeder.orderedProducts.push(new CartProduct(key, value));
    });
    return this.http.post(`${environment.apiUrl}/shoppingcart/`, umoeder);

  }
}

export class ShoppingCart {
  constructor(public username: string, public products: Map<number, number>) {}
}

class CartProduct {
  constructor(public key: number, public value: number) {}
}
