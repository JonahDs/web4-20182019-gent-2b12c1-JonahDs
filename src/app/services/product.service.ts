import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { Product } from '../classes/product';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private loadingError$ = new Subject<string>();

  constructor(private http: HttpClient) { }

  products$(naam): Observable<Product[]> {
    return this.http.get(`${environment.apiUrl}/product/${naam}`).pipe(
      catchError(error => {
        this.loadingError$.next(error.statusText);
        return of(null);
      }), 
      map((list:any): Product[] => list.map(Product.fromJSON))
    )
  }
}
