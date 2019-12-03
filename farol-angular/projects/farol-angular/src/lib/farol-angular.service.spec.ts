import { TestBed } from '@angular/core/testing';

import { FarolAngularService } from './farol-angular.service';

describe('FarolAngularService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FarolAngularService = TestBed.get(FarolAngularService);
    expect(service).toBeTruthy();
  });
});
