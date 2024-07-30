import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { LoginService } from '../../services/login/login.service';

@Component({
    standalone: true,
    selector: 'app-login',
    templateUrl: './login.component.html',
    imports: [ReactiveFormsModule, CommonModule],
})
export class LoginComponent {
    formGroup = new FormGroup({
        email: new FormControl('', [
            Validators.required,
            Validators.email
        ]),
        password: new FormControl('',[
            Validators.required,
            Validators.minLength(8)
        ])
    });
    
    constructor(private loginService: LoginService,
        private authService: AuthService,
        private router: Router) {
    }

    onSubmit() {
        if(this.formGroup.valid){
            this.loginService
            .login(this.formGroup.get("email")?.value!, this.formGroup.get("password")?.value!)
            .then((response)=>{
                this.authService.setToken(response.data.token);
                this.router.navigate(['home']);
            }).catch((error)=>{
                console.error(error);
            })
        }
    }
}