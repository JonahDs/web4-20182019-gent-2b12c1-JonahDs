import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingBasketComponent } from './shopping-basket.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProductModule } from '../product.module';
import { ProductDetail } from 'src/app/classes/productClasses/product-detail';

describe('ShoppingBasketComponent', () => {
  let component: ShoppingBasketComponent;
  let fixture: ComponentFixture<ShoppingBasketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MaterialModule,
        NoopAnimationsModule,
        ProductModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on init there shoudn\'t be any products in the shoppingcart', () => {
    expect(component.checkList()).toBe(true);
  });

  it('there shoudn\'t be any shipping when there are more than 2 indiv items ordered', () => {
    component.products = new Array<ProductDetail>(
      new ProductDetail(1, 's', 1, [{}], 's', 1, []),
      new ProductDetail(2, 's', 1, [{}], 's', 1, []),
      new ProductDetail(3, 's', 1, [{}], 's', 1, [])
    );
    fixture.detectChanges();
    expect(component.calculateShipping()).toBe('free');
  });

  it('the total price should be 1500', () => {
    component.products = new Array<ProductDetail>(
      new ProductDetail(1, 's', 500, [{}], 's', 500, []),
      new ProductDetail(2, 's', 500, [{}], 's', 500, []),
      new ProductDetail(3, 's', 500, [{}], 's', 500, [])
    );
    component.products.forEach(e => component.amounts.push(1));
    component.calculatePrice();
    fixture.detectChanges();
    expect(component.calculateShipping()).toBe('free');
    expect(component.caculateTotal()).toBe(1500);
  });
});
