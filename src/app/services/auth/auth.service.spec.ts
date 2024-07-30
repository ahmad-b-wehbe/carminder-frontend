import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthService]
        });
        service = TestBed.inject(AuthService);
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should set and get token correctly', () => {
        const token = 'test-token';
        service.setToken(token);
        expect(service.getToken()).toEqual(token);
    });

    it('should return null if token is not set', () => {
        expect(service.getToken()).toBeNull();
    });

    it('should return true if user is logged in', () => {
        const token = 'test-token';
        service.setToken(token);
        expect(service.isLoggedIn()).toBeTrue();
    });

    it('should return false if user is not logged in', () => {
        expect(service.isLoggedIn()).toBeFalse();
    });

    it('should logout user', () => {
        service.logout();
        expect(service.getToken()).toBeNull();
    });
});
