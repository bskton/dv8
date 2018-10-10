import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Router, useValue: spy }
      ]
    });
    service = TestBed.get(AuthService);
    routerSpy = TestBed.get(Router);
  })

  it('should redirect to signup on logout', () => {
    const url = ['/signup'];
    service.logout();
    expect(routerSpy.navigate).toHaveBeenCalledWith(url);
  })
})