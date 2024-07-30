import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginService } from './../../services/login/login.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LoginComponent],
            providers: [provideHttpClient()]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a formGroup', () => {
        expect(component.formGroup).toBeTruthy();
    });

    it('should have an email form control', () => {
        expect(component.formGroup.get('email')).toBeTruthy();
    });

    it('should have a password form control', () => {
        expect(component.formGroup.get('password')).toBeTruthy();
    });

    it('should have a submit method', () => {
        expect(component.onSubmit).toBeTruthy();
    });

    it('should call loginService on submit', () => {
        const loginService = TestBed.inject(LoginService);
        const loginSpy = spyOn(loginService, 'login').and.callThrough();

        component.formGroup.get('email')?.setValue('test@gmail.com');
        component.formGroup.get('password')?.setValue('password12345');

        component.onSubmit();

        expect(loginSpy).toHaveBeenCalled();
    });

    it('should validate that email is required', ()=>{
        component.formGroup.get("email")?.setValue("");
        expect(component.formGroup.get("email")?.hasError("required")).toBeTruthy();
    })

    it('should validate that email valid', ()=>{
        component.formGroup.get("email")?.setValue("test");
        expect(component.formGroup.get("email")?.hasError("email")).toBeTruthy();
    })

    it('should validate that password is required', () => {
        component.formGroup.get("password")?.setValue("");
        expect(component.formGroup.get("password")?.hasError("required")).toBeTruthy();
    })

    it('should validate that password is 8 characters long minimum', ()=>{
        component.formGroup.get("password")?.setValue("12345");
        expect(component.formGroup.get("password")?.hasError("minlength")).toBeTruthy();
    });

    it('should only try to login if form is valid', ()=>{
        const loginService = TestBed.inject(LoginService);
        const loginSpy = spyOn(loginService, "login").and.callThrough();
        component.onSubmit();
        expect(loginSpy).not.toHaveBeenCalled();
    })
});