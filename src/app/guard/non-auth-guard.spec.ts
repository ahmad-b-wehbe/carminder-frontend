import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { nonAuthenticationGuard } from './non-auth-guard';

describe('NonAuthGuard', () => {
    let authService: AuthService;
    let router: Router;

    beforeEach(() => {
        const authServiceMock = {
            isLoggedIn: jest.fn()
        } as unknown as AuthService;
        const routerMock = {
            navigate: jest.fn()
        } as unknown as Router;

        TestBed.configureTestingModule({
            providers: [
                {
                    provide: AuthService,
                    useValue: authServiceMock
                },
                {
                    provide: Router,
                    useValue: routerMock
                }
            ]
        });

        authService = TestBed.inject(AuthService);
        router = TestBed.inject(Router);
    });

    it('should allow access when user is not authenticated', () => {
        (authService.isLoggedIn as jest.Mock).mockReturnValueOnce(false);

        let context = TestBed.runInInjectionContext(()=> nonAuthenticationGuard()({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot))
        
        expect(context).toBeTruthy();
    });

    it('should redirect to home page when user is authenticated', () => {
        (authService.isLoggedIn as jest.Mock).mockReturnValueOnce(true);

        let context = TestBed.runInInjectionContext(()=> nonAuthenticationGuard()({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot))
        
        expect(context).toBeFalsy();
    });
});
