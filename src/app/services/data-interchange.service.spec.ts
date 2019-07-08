import { TestBed } from '@angular/core/testing';

import { DataInterchangeService } from './data-interchange.service';

describe('DataInterchangeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataInterchangeService = TestBed.get(DataInterchangeService);
    expect(service).toBeTruthy();
  });
});
