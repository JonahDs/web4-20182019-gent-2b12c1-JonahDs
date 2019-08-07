import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { Categorie } from '../classes/categorie';
import { CategorieService } from '../services/categorie.service';
import { Subcategorie } from '../classes/subcategorie';
import { DataInterchangeService } from '../services/data-interchange.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  private _categories$: Observable<Categorie[]> = this._categorieService
    .categories$;
  private _subcategories: Subcategorie[];
  private _loggedInUser$ = this._loginService.user$;
  private isShoppingbag = false;
  private itemCounter = 0;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _categorieService: CategorieService,
    private _dataInterchange: DataInterchangeService,
    private _loginService: LoginService,
    private _router: Router
  ) {
    this._dataInterchange.cart$.subscribe(element => {
      this.isShoppingbag = true;
      this.itemCounter++;
    });
  }

  public logout(): void {
    this._loginService.logout();
  }

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
    this._router.navigate([`/product/${name}`]);
    this._dataInterchange.changeOnInput(name);
  }
}
