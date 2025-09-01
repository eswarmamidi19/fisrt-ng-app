import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if user is logged in and is admin
  if (authService.isLoggedIn() && authService.isAdmin()) {
    return true;
  }

  // Redirect to home if not admin
  router.navigate(['/']);
  return false;
};
