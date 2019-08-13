import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ProductViewComponent } from "./product-view.component";
import { MaterialModule } from "src/app/material/material.module";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProductDetail } from 'src/app/classes/productClasses/product-detail';
import { DataInterchangeService } from 'src/app/services/data-interchange.service';

describe("ProductViewComponent", () => {
  let component: ProductViewComponent;
  let fixture: ComponentFixture<ProductViewComponent>;
  let dataInterChange: DataInterchangeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductViewComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MaterialModule,
        NoopAnimationsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dataInterChange = TestBed.get(DataInterchangeService);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it('adding to a cart without being logged in result is failure', () => {
    component.addToCart(new ProductDetail(1,'s',1,[],'s',1,[]));
    fixture.detectChanges();
    expect(dataInterChange.cartItems.length).toBe(0);
  });
});
