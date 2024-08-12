import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export function nonAuthenticationGuard(): CanActivateFn {
    return () => {
      const oauthService: AuthService = inject(AuthService);
      const router = inject(Router);
      
      if (!oauthService.isLoggedIn() ) {
        return true;
      } else {
        router.navigate(['/home']);
        return false;
      }
    };
  }
