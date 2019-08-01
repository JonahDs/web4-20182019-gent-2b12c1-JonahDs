import { Component, OnInit } from "@angular/core";
import { DataInterchangeService } from "src/app/services/data-interchange.service";
import { ProductDetail } from "src/app/classes/productClasses/product-detail";

@Component({
  selector: "app-shopping-basket",
  templateUrl: "./shopping-basket.component.html",
  styleUrls: ["./shopping-basket.component.scss"]
})
export class ShoppingBasketComponent implements OnInit {
  private _products = new Array<ProductDetail>();

  constructor(private _dataInterchange: DataInterchangeService) {
 
  }

  ngOnInit() {
   this._products = this._dataInterchange.cartItems;
   console.log(this._products)
  }
}
