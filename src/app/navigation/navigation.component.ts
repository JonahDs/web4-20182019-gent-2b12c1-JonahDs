import { Component } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable, Subject } from "rxjs";
import { map, distinctUntilChanged } from "rxjs/operators";
import { Categorie } from "../classes/categorie";
import { CategorieService } from "../services/categorie.service";
import { Subcategorie } from "../classes/subcategorie";
import { DataInterchangeService } from "../services/data-interchange.service";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"]
})
export class NavigationComponent {
  private _categories$: Observable<Categorie[]> = this._categorieService
    .categories$;
  private _subcategories: Subcategorie[];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _categorieService: CategorieService,
    private _dataInterchange: DataInterchangeService
  ) {}

  get categories$(): Observable<Categorie[]> {
    return this._categories$;
  }

  subcategories(value) {
    this._subcategories = value.subcategorien;
  }

  get subcategoriesList(): Subcategorie[] {
    return this._subcategories;
  }

  getProductName(name: string) {
    this._dataInterchange.changeOnInput(name);
  }
}
