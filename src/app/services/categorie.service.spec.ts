import { TestBed } from '@angular/core/testing';

import { CategorieService } from './categorie.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CategorieService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule

    ]
  }));

  it('should be created', () => {
    const service: CategorieService = TestBed.get(CategorieService);
    expect(service).toBeTruthy();
  });
});
