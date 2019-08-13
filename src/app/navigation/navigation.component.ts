import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { map, distinctUntilChanged, debounceTime } from 'rxjs/operators';
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
export class NavigationComponent implements OnInit {
  public categories$: Observable<Categorie[]> = this._categorieService
    .categories$;
  public subCategories: Subcategorie[];
  public loggedInUser$ = this._loginService.user$;
  public isShoppingbag = false;
  public itemCounter = 0;
  public filter$ = new Subject<string>();

  public isHandset$: Observable<boolean> = this._breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _categorieService: CategorieService,
    private _dataInterchange: DataInterchangeService,
    private _loginService: LoginService,
    private _router: Router
  ) {
    this._dataInterchange.cart$.subscribe(length => {
      if (length === 0) {
        this.isShoppingbag = false;
      } else {
        this.isShoppingbag = true;
        this.itemCounter = length;
      }
    });
  }

  ngOnInit() {
    this.filter$
      .pipe(
        distinctUntilChanged(),
        debounceTime(300)
      )
      .subscribe(value => {
        const paramter = { queryParams: { filter: value } };
        this._router.navigate([`/filter`], paramter);
      });
  }

  public logout(): void {
    this._loginService.logout();
  }

  public displaySubcategories(value): void {
    this.subCategories = value.subcategorien;
  }

  public navigateRouter(navString: string, navString2?: string): void {
    navString2
      ? this._router.navigate([`/${navString}/${navString2}`])
      : this._router.navigate([`/${navString}`]);
  }
}
