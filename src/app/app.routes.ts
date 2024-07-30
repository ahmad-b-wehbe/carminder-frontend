import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authenticationGuard } from './guard/auth-guard';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [authenticationGuard()] },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: 'home' }
];
