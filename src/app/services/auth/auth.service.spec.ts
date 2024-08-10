import { TestBed } from "@angular/core/testing"
import { AuthService } from "./auth.service"
import { Router } from "@angular/router";

describe("Auth Service", () => {
    let authService: AuthService;
    let router: Router;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            providers: [
                AuthService, 
                { provide: Router, useValue: { navigate: jest.fn() } }
            ]
        })
        authService = TestBed.inject(AuthService);
        router = TestBed.inject(Router);
    })

    afterEach(()=>{
        localStorage.clear();
    })

    it('should save token in local storage', ()=>{
        authService.setToken('token');
        expect(localStorage.getItem('jwtToken')).toBe('token');
    })

    it('should get token from localStorage', () => {
        const token = 'test-token';
        localStorage.setItem('jwtToken', token);
        expect(authService.getToken()).toBe(token);
    });

    it('should return true if token is present', () => {
        localStorage.setItem('jwtToken', 'test-token');
        expect(authService.isLoggedIn()).toBe(true);
    });

    it('should return false if token is not present', () => {
        localStorage.removeItem('jwtToken');
        expect(authService.isLoggedIn()).toBe(false);
    });

    it('should remove token and navigate to login on logout', () => {
        localStorage.setItem('jwtToken', 'test-token');
        authService.logout();
        expect(localStorage.getItem('jwtToken')).toBeNull();
        expect(router.navigate).toHaveBeenCalledWith(['login']);
    });
})