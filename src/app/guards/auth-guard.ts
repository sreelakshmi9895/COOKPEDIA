import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route) => {

  const router = inject(Router)

  const token = sessionStorage.getItem('token')
  const userRole = sessionStorage.getItem('role')
  const requiredRole = route.data?.['role']

  // not logged in
  if(!token){
    alert('Please login first')
    router.navigateByUrl('/login')
    return false
  }

  // role restriction
  if(requiredRole && userRole !== requiredRole){
    alert('Access denied')
    router.navigateByUrl('/')
    return false
  }

  return true
}
