import { TestBed, async, inject } from '@angular/core/testing';

import { AuxiliaryAuthGuard } from './auxiliary-auth.guard';

describe('AuxiliaryAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuxiliaryAuthGuard]
    });
  });

  it('should ...', inject([AuxiliaryAuthGuard], (guard: AuxiliaryAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
