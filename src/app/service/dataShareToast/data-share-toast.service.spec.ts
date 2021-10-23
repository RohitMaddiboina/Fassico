import { TestBed } from '@angular/core/testing';

import { DataShareToastService } from './data-share-toast.service';

describe('DataShareToastService', () => {
  let service: DataShareToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataShareToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
