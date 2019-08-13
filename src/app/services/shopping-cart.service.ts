import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private http: HttpClient) {}

  postShoppingCart(shoppingCart: ShoppingCart) {
    const local = { username: shoppingCart.username, orderedProducts: [] };
    shoppingCart.products.forEach((value: number, key: number) => {
      local.orderedProducts.push(new CartProduct(key, value));
    });
    return this.http.post(`${environment.apiUrl}/shoppingcart/`, local);

  }
}

export class ShoppingCart {
  constructor(public username: string, public products: Map<number, number>) {}
}

class CartProduct {
  constructor(public key: number, public value: number) {}
}
