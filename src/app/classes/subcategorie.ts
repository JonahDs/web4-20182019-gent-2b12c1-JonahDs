export class Subcategorie {
  constructor(private sCategorieId: number,private sCategorieNaam: string) {}

  static fromJSON(json: any): Subcategorie {
    return new Subcategorie(json.sCategorieId,json.sCategorieNaam);
  }

  get scategorieNaam(): string {
    return this.sCategorieNaam;
  }
}
