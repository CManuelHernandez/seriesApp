import { authGuard } from './auth.guard';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Error404PageComponent } from '../../shared/error404-page/error404-page.component';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('authGuard', () => {
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let mockRouterStateSnapshot: RouterStateSnapshot;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    mockRouterStateSnapshot = {} as RouterStateSnapshot;

    const routes = [{ path: 'auth/login', component: Error404PageComponent }];

    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
        { provide: Router, useValue: mockRouter },
      ],
    });
  });

  it('should allow navigation if user is logged in', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue('user@example.com');

    const result = TestBed.runInInjectionContext(() => {
      return authGuard(mockActivatedRouteSnapshot, mockRouterStateSnapshot);
    });

    expect(result).toBeTrue();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should redirect to login if user is not logged in', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue(null);
    mockRouter.navigate.and.returnValue(Promise.resolve(true));

    const result = TestBed.runInInjectionContext(() => {
      return authGuard(mockActivatedRouteSnapshot, mockRouterStateSnapshot);
    });

    expect(mockRouter.navigate).toHaveBeenCalledWith(['auth/login']);
  });
});
