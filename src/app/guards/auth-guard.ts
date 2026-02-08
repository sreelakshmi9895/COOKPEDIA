import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  const token = sessionStorage.getItem('token');
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');

  if (!token) {
    return router.createUrlTree(['/login']);
  }

  // block non-admins from admin routes
  if (router.url.startsWith('/admin') && user.role !== 'admin') {
    return router.createUrlTree(['/']);
  }

  return true;
};
