import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { LoginService } from '../../services/login/login.service';
import { LoginComponent } from './login.component';
import { AxiosResponse } from 'axios';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let loginService: LoginService;
    let authService: AuthService;
    let router: Router;

    beforeEach(async () => {
        const loginServiceMock = {
            login: jest.fn()
        };
        const authServiceMock = {
            setToken: jest.fn()
        };
        const routerMock = {
            navigate: jest.fn()
        };

        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, LoginComponent],
            providers: [
                { provide: LoginService, useValue: loginServiceMock },
                { provide: AuthService, useValue: authServiceMock },
                { provide: Router, useValue: routerMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        loginService = TestBed.inject(LoginService);
        authService = TestBed.inject(AuthService);
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a form with email and password controls', () => {
        expect(component.formGroup.contains('email')).toBe(true);
        expect(component.formGroup.contains('password')).toBe(true);
    });

    it('should require email and password fields', () => {
        const emailControl = component.formGroup.get('email');
        const passwordControl = component.formGroup.get('password');

        emailControl?.setValue('');
        passwordControl?.setValue('');

        expect(emailControl?.valid).toBeFalsy();
        expect(passwordControl?.valid).toBeFalsy();
    });

    it('should validate email format', () => {
        const emailControl = component.formGroup.get('email');

        emailControl?.setValue('invalidemail');
        expect(emailControl?.valid).toBeFalsy();

        emailControl?.setValue('test@example.com');
        expect(emailControl?.valid).toBeTruthy();
    });

    it('should require password to be at least 8 characters', () => {
        const passwordControl = component.formGroup.get('password');

        passwordControl?.setValue('short');
        expect(passwordControl?.valid).toBeFalsy();

        passwordControl?.setValue('longenoughpassword');
        expect(passwordControl?.valid).toBeTruthy();
    });

    it('should call loginService.login and authService.setToken on submit', async () => {
        const email = 'test@example.com';
        const password = 'password123';
        const token = 'mock-token';
        const loginResponse = { data: { token } } as unknown as AxiosResponse;

        component.formGroup.get('email')?.setValue(email);
        component.formGroup.get('password')?.setValue(password);

        jest.spyOn(loginService, 'login').mockResolvedValue(loginResponse);
        jest.spyOn(authService, 'setToken');
        jest.spyOn(router, 'navigate');

        await component.onSubmit();

        expect(loginService.login).toHaveBeenCalledWith(email, password);
        expect(authService.setToken).toHaveBeenCalledWith(token);
        expect(router.navigate).toHaveBeenCalledWith(['home']);
    });

    it('should handle login error', async () => {
        const email = 'test@example.com';
        const password = 'password123';
        const error = new Error('Login failed');

        component.formGroup.get('email')?.setValue(email);
        component.formGroup.get('password')?.setValue(password);

        jest.spyOn(loginService, 'login').mockRejectedValue(error);
        jest.spyOn(console, 'error').mockImplementation();

        await component.onSubmit();

        expect(console.error).toHaveBeenCalledWith(error);
    });
});
