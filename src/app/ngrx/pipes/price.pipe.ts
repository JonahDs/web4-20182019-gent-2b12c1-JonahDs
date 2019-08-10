import { Pipe, PipeTransform } from "@angular/core";
import { Product } from "src/app/classes/productClasses/product";

@Pipe({
  name: "price"
})
export class PricePipe implements PipeTransform {
  transform(value: Product[], args: number): Product[] {
    return !!!args ? value : value.filter(s => s.productPrice <= args["number"]);
  }
}
