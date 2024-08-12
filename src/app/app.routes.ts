import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authenticationGuard } from './guard/auth-guard';
import { LoginComponent } from './pages/login/login.component';
import { nonAuthenticationGuard } from './guard/non-auth-guard';

export const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [authenticationGuard()] },
    { path: 'login', component: LoginComponent, canActivate: [nonAuthenticationGuard()] },
    { path: '**', redirectTo: 'home' }
];
