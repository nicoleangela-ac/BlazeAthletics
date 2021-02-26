import { TestBed } from '@angular/core/testing';

import { FirebaseProductsService } from './firebase-products.service';

describe('FirebaseProductsService', () => {
  let service: FirebaseProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
