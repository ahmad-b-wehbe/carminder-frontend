import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor';
import { AuthService } from '../services/auth/auth.service';

describe('AuthInterceptor', () => {
    let httpMock: HttpTestingController;
    let httpClient: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                AuthService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthInterceptor,
                    multi: true
                }
            ]
        });

        httpMock = TestBed.inject(HttpTestingController);
        httpClient = TestBed.inject(HttpClient);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should add an Authorization header with the token from AuthService to the request', () => {
        const authService = TestBed.inject(AuthService);
        spyOn(authService, 'getToken').and.returnValue('test-token');

        httpClient.get('/api/data').subscribe();

        const httpRequest = httpMock.expectOne('/api/data');
        expect(httpRequest.request.headers.has('Authorization')).toBeTrue();
        expect(httpRequest.request.headers.get('Authorization')).toBe('Bearer test-token');

        httpRequest.flush({});
    });

    it('should not add an Authorization header if the token is not available', () => {
        const authService = TestBed.inject(AuthService);
        spyOn(authService, 'getToken').and.returnValue(null);

        httpClient.get('/api/data').subscribe();

        const httpRequest = httpMock.expectOne('/api/data');
        expect(httpRequest.request.headers.has('Authorization')).toBeFalse();

        httpRequest.flush({});
    });

    it('should pass through the request if it is not an API request', () => {
        httpClient.get('/some/other/url').subscribe();

        const httpRequest = httpMock.expectOne('/some/other/url');
        expect(httpRequest.request.headers.has('Authorization')).toBeFalse();

        httpRequest.flush({});
    });
});