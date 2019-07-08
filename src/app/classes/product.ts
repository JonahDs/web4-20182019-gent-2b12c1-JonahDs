import { Subcategorie } from "./subcategorie";

export class Product {
  constructor(
    private productId: number,
    private productNaam: string,
    private beschrijving: string,
    private prijs: number,
    private subCategorie: Subcategorie
  ) {}

  static fromJSON(json: any): Product {
    return new Product(
      json.productId,
      json.productNaam,
      json.beschrijving,
      json.prijs,
      json.subCategorie
    );
  }

  get productName(): string{
    return this.productNaam;
  }
}
