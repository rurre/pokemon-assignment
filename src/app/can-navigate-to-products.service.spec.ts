import { TestBed } from '@angular/core/testing';

import { CanNavigateToProductsService } from './can-navigate-to-products.service';

describe('CanNavigateToProductsService', () => {
  let service: CanNavigateToProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanNavigateToProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
