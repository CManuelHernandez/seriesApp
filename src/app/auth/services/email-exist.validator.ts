import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, map, timer, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

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
