import { HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { AuthInterceptor } from './auth-interceptor';

describe('AuthInterceptor', () => {
    let authInterceptor: AuthInterceptor;
    let authService: AuthService;

    beforeEach(()=>{
        authService = {getToken: jest.fn()} as unknown as AuthService;

        authInterceptor = new AuthInterceptor(authService);
    });

    it('should update request header if user is authenticated', () => {
        jest.spyOn(authService, 'getToken').mockReturnValue('token');
        let httpHandler:HttpHandler = {handle: jest.fn(), } as unknown as HttpHandler;
        let authorizedRequest = {url: "test"} as unknown as HttpRequest<any>
        let request: HttpRequest<any> = {clone: jest.fn(()=>authorizedRequest), headers: {set: jest.fn()} as unknown as HttpHeaders} as unknown as HttpRequest<any>;
        const spy = jest.spyOn(httpHandler, 'handle');
        authInterceptor.intercept(request, httpHandler);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(authorizedRequest);
    });

    it('should not update request headers if user is not authenticated',() => {
        jest.spyOn(authService, 'getToken').mockReturnValue(null);
        let httpHandler:HttpHandler = {handle: jest.fn(), } as unknown as HttpHandler;
        let authorizedRequest = {url: "test"} as unknown as HttpRequest<any>
        let request: HttpRequest<any> = {clone: jest.fn(()=>authorizedRequest), headers: {set: jest.fn()} as unknown as HttpHeaders} as unknown as HttpRequest<any>;
        const spy = jest.spyOn(httpHandler, 'handle');
        authInterceptor.intercept(request, httpHandler);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(request);
    })
});