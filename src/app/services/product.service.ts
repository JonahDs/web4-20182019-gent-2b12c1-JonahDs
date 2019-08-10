import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../classes/productClasses/product';
import { ProductDetail } from '../classes/productClasses/product-detail';

@Injectable({
  providedIn: 'root'
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
        map((detail: any): ProductDetail => ProductDetail.fromJSON(detail))
      );
  }

  rateProduct$(productid: number, rating: number) {
    console.log(productid);
    return this.http.put(
      `${environment.apiUrl}/product/rate/${productid}/${rating}`,
      {}
    );
  }
}
