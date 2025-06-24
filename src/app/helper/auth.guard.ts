import { CanActivateFn, Router } from '@angular/router';
import { CommonService } from '../services/commonService';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(CommonService);
   const router = inject(Router);
   if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
