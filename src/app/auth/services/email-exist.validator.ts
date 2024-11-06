import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, map, timer, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

/**
 * Async validator function to check if an email already exists in the system.
 * This validator calls the `AuthService` to verify if the email is already in use.
 *
 * @param authService - The AuthService used to check the email in the backend.
 * @returns An AsyncValidatorFn that returns either null (valid) or an error object (invalid).
 */
export function emailExistsValidator(
  authService: AuthService
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return new Observable((observer) => observer.next(null));
    }
    return timer(500).pipe(
      switchMap(() => authService.getUserByEmail(control.value)),
      map((users) => (users.length > 0 ? { emailExists: true } : null))
    );
  };
}
