import { Component, OnInit } from "@angular/core";
import { ProductService } from "../services/product.service";
import { Observable, Observer } from "rxjs";
import { Product } from "../classes/product";
import { DataInterchangeService } from "../services/data-interchange.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.sass"]
})
export class ProductComponent implements OnInit {
  private _productName: string;
  private _products: Observable<Product[]> = this._productService.products$(
    this.setProductName()
  );

  constructor(
    private _productService: ProductService,
    private _dataInterchange: DataInterchangeService
  ) {}

  ngOnInit() {}

  get products$(): Observable<Product[]> {
    return this._products;
  }

  setProductName(): string {
    this._dataInterchange.input.subscribe(t => {
      this._productName = t;
    });
    return this._productName;
  }
}
