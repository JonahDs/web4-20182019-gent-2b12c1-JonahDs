import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { MaterialModule } from '../material/material.module';
import { NavigationComponent } from './navigation.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { routes } from '../app-routing.module';
import { Location } from '@angular/common';
import { AppModule } from '../app.module';
import { DataInterchangeService } from '../services/data-interchange.service';
import { ProductDetail } from '../classes/productClasses/product-detail';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let router: Router;
  let location: Location;
  let data: DataInterchangeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        MaterialModule,
        NoopAnimationsModule,
        AppModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    data = TestBed.get(DataInterchangeService);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    router.initialNavigation();
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('clicking a categorie redirects the router', fakeAsync(() => {
    component.navigateRouter('product', 'Asus');
    tick();
    expect(location.path()).toBe('/product/Asus');
  }));

  it('there should be no shoppingbag active in on initial start', () => {
    expect(component.isShoppingbag).toBe(false);
  });

  it('there should be a shopping bag when there are items present', fakeAsync(() => {
    data.cartItems.push(new ProductDetail(1, 's', 1, [], 'd', 1, []));
    data.cart$.next(data.cartItems.length);
    tick();
    expect(component.isShoppingbag).toBe(true),
    expect(component.itemCounter).toBe(1);
  }));
});
