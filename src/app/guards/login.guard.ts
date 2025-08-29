import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const loginGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  // If user is already logged in, redirect to home page
  if (authService.isLoggedIn()) {
    router.navigate(['/']);
    return false;
  }
  
  // If user is not logged in, allow access to login/register pages
  return true;
};
