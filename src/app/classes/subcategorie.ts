export class Subcategorie {
  constructor(
    private _sCategorieId: number,
    private _sCategorieName: string
    ) {}

  static fromJSON(json: any): Subcategorie {
    return new Subcategorie(json.sCategorieId, json.sCategorieName);
  }

  get scategorieNaam(): string {
    return this._sCategorieName;
  }
}
