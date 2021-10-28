import { TestBed } from '@angular/core/testing';

import { SearchDataShareServiceService } from './search-data-share-service.service';

describe('SearchDataShareServiceService', () => {
  let service: SearchDataShareServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchDataShareServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
