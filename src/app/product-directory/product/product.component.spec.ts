import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Product } from 'src/app/classes/productClasses/product';
import { MaterialModule } from 'src/app/material/material.module';
import { ProductModule } from '../product.module';
import { ProductComponent } from './product.component';


describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [  ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MaterialModule,
        NoopAnimationsModule,
        ProductModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calculating the average rating of 0 components should\'t do anything', () => {
    component.products = new Array<Product>();
    fixture.detectChanges();
    component.calcRating();
    expect(component.avgRating).toBeLessThanOrEqual(0);
  });

  it('average rating of 5,5,4 should be 4.67', () => {
    component.products = [new Product(1, 's', 's', 0, 's', 's', [5, 5, 4])];
    fixture.detectChanges();
    component.calcRating();
    expect(component.avgRating).toEqual([4.67]);
  });
});
