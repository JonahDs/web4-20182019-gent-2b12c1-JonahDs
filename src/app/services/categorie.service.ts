import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, of } from "rxjs";
import { Categorie } from "../classes/categorie";
import { map, catchError, delay } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class CategorieService {
  public loadingError$ = new Subject<string>();

  constructor(private http: HttpClient) {}

  get categories$(): Observable<Categorie[]> {
    return this.http.get(`${environment.apiUrl}/categorie`).pipe(
      catchError(error => {
        this.loadingError$.next(error.statusText);
        return of(null);
      }),
      map((list: any): Categorie[] => list.map(Categorie.fromJSON))
    );
  }
}
