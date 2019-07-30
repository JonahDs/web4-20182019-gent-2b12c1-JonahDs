import { Subcategorie } from './subcategorie';

export class Categorie {
  constructor(
    private _categorieId: number,
    private _categorieName: string,
    private _subCategorieCollection = new Array<Subcategorie>()
  ) {}

  static fromJSON(json: any): Categorie {
    return new Categorie(
      json.categorieId,
      json.categorieName,
      json.subCategorieCollection.map(Subcategorie.fromJSON)
    );
  }

  get name(): string {
    return this._categorieName;
  }

  get subcategorien(): Array<Subcategorie> {
    return this._subCategorieCollection;
  }
}
