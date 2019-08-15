import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private http: HttpClient) {}

  public postShoppingCart(shoppingCart: ShoppingCart): Observable<object> {
    const local = { username: shoppingCart.username, orderedProducts: [] };
    shoppingCart.products.forEach((value: number, key: number) => {
      local.orderedProducts.push(new CartProduct(key, value));
    });
    return this.http.post(`${environment.apiUrl}/shoppingcart/`, local).pipe(map((res: any) => {
      return res;
    }));

  }
}

export class ShoppingCart {
  constructor(public username: string, public products: Map<number, number>) {}
}

class CartProduct {
  constructor(public key: number, public value: number) {}
}
