import { TestBed } from '@angular/core/testing';

import { ShoppingCartService } from './shopping-cart.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ShoppingCartService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [
    HttpClientTestingModule

  ]}));

  it('should be created', () => {
    const service: ShoppingCartService = TestBed.get(ShoppingCartService);
    expect(service).toBeTruthy();
  });
});
