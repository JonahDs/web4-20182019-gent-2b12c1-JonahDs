import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, of } from "rxjs";
import { Product } from "../classes/productClasses/product";
import { environment } from "src/environments/environment";
import { catchError, map } from "rxjs/operators";
import { ProductDetail } from "../classes/productClasses/product-detail";
import { jsonpCallbackContext } from '@angular/common/http/src/module';

@Injectable({
  providedIn: "root"
})
export class ProductService {
  private loadingError$ = new Subject<string>();

  constructor(private http: HttpClient) {}

  products$(subcatName: string): Observable<Product[]> {
    return this.http.get(`${environment.apiUrl}/product/${subcatName}`).pipe(
      catchError(error => {
        this.loadingError$.next(error.statusText);
        return of(null);
      }),
      map((list: any): Product[] => list.map(Product.fromJSON))
    );
  }

  productDetails$(productId: string): Observable<ProductDetail> {
    return this.http
      .get(`${environment.apiUrl}/product/productdetail/${productId}`)
      .pipe(
        catchError(error => {
          this.loadingError$.next(error.statusText);
          return of(null);
        }),
        map(
          (detail: any): ProductDetail => ProductDetail.fromJSON(detail)
        )
      );
  }

  
}
