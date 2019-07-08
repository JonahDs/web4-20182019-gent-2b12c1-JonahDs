import { Subcategorie } from "./subcategorie";

export class Categorie {
  constructor(
    private categorieId: number,
    private categorieNaam: string,
    private subCategorieCollection = new Array<Subcategorie>()
  ) {}

  static fromJSON(json: any): Categorie {
    return new Categorie(
      json.categorieId,
      json.categorieNaam,
      json.subCategorieCollection.map(Subcategorie.fromJSON)
    );
  }

  get name():string{
      return this.categorieNaam;
  }

  get subcategorien(): Array<Subcategorie>{
    return this.subCategorieCollection;
  }

}
