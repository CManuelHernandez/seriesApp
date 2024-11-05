import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { environments } from '../../../environments/environments';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environments.baseUrl;
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  registerUser(userDetails: User) {
    return this.getUserByEmail(userDetails.email).pipe(
      map((users) => {
        if (users.length > 0) {
          throw new Error('EMAIL_EXISTS');
        }
        return true;
      }),
      switchMap(() => this.http.post(`${this.baseUrl}/users`, userDetails))
    );
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`);
  }

  fetchLoggedInUser(email: string): void {
    this.getUserByEmail(email)
      .pipe(
        map((users) => {
          if (users.length > 0) {
            const { password, ...filteredUser } = users[0];
            return filteredUser;
          }
          return null;
        })
      )
      .subscribe({
        next: (user) => this.userSubject.next(user),
        error: (error) => {
          console.error('Error al obtener el usuario:', error);
        },
      });
  }

  public isValidField(form: FormGroup, field: string) {
    return form.controls[field].errors && form.controls[field].touched;
  }
}
