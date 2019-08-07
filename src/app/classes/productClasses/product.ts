export class Product {
  constructor(
    private _productId: number,
    private _productName: string,
    private _description: string,
    private _price: number,
    private _image: string,
    private _subCategorie: string,
  ) {}

  static fromJSON(json: any): Product {
    return new Product(
      json.productId,
      json.productName,
      json.productDescription,
      json.price,
      json.productImage,
      json.subCategorie.scategorieName
    );
  }

  toJSON(): any {
    return {
      id: this._productId,
      productName: this.productName,
      productDescription: this.productDescription,
      price: this.productPrice,
      productImage: this._image
    };
  }

  get productId(): number {
    return this._productId;
  }

  get productName(): string {
    return this._productName;
  }

  get subCategorieName(): string {
    return this._subCategorie;
  }

  get productPrice(): number {
    return this._price;
  }

  get productDescription(): string {
    return this._description;
  }

  get productImage(): string {
    return this._image;
  }
}
