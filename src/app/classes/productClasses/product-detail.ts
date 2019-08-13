export class ProductDetail {
  constructor(
    public productdetailId: number,
    public productName: string,
    public productPrice: number,
    public images: any[],
    public fullText: string,
    public productSpecs: number,
    public rating: number[]
  ) {}

  static fromJSON(json: any): ProductDetail {
    return new ProductDetail(
      json.productdetailId,
      json.productName,
      json.price,
      json.images,
      json.fullText,
      json.productSpecs,
      json.ratings.map(t => t.rating)
    );
  }
}


