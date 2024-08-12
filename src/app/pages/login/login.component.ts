import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AuthService } from '../../services/auth/auth.service';
import { LoginService } from '../../services/login/login.service';
import { FormsModule } from '@angular/forms'
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
    standalone: true,
    selector: 'app-login',
    templateUrl: './login.component.html',
    imports: [ReactiveFormsModule, CommonModule, FloatLabelModule, FormsModule, ProgressSpinnerModule ],
})
export class LoginComponent {
    loading = false;
    error = '';

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
            this.error = '';
            this.loading = true;
            this.loginService
            .login(this.formGroup.get("email")?.value!, this.formGroup.get("password")?.value!)
            .then((response) => {
                this.authService.setToken(response.data.token);
                this.router.navigate(['home']);
            }).catch((err) => {
                if(err.response.status === 401){
                    this.error = "Email or password are incorrect!";
                } else {
                    this.error = "Something went wrong please try again later";
                }   
            }).finally(()=>{
                this.loading = false;
            })
        }
    }
}