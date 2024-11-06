import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

/**
 * AuthGuard function that checks if the user is logged in.
 * If the user is logged in (email exists in sessionStorage), it allows navigation.
 * If not, it redirects the user to the login page.
 *
 * @param route - The route the user is trying to access.
 * @param state - The state of the router at the time of navigation.
 * @returns A boolean or a promise that resolves to a boolean indicating whether navigation is allowed.
 */
export const authGuard: CanActivateFn = (route, state) => {
  // Check if the user is logged in by checking sessionStorage for 'email'
  if (sessionStorage.getItem('email')) {
    return true;
  } else {
    const router = inject(Router);
    // Redirect to the login page if the user is not logged in
    return router.navigate(['auth/login']);
  }
};
