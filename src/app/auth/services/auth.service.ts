import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { environments } from '../../../environments/environments';
import { FormGroup } from '@angular/forms';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environments.baseUrl;
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();
  private readonly SALT = environments.SALT;

  constructor(private http: HttpClient) {}

  private encryptPassword(password: string): string {
    if (!password) return '';
    return CryptoJS.SHA256(password + this.SALT).toString();
  }

  registerUser(userDetails: User) {
    if (!userDetails.password) {
      throw new Error('Password is required');
    }

    const encryptedUser = {
      ...userDetails,
      password: this.encryptPassword(userDetails.password),
    };

    return this.getUserByEmail(userDetails.email).pipe(
      map((users) => {
        if (users.length > 0) {
          throw new Error('EMAIL_EXISTS');
        }
        return true;
      }),
      switchMap(() => this.http.post(`${this.baseUrl}/users`, encryptedUser))
    );
  }

  login(email: string, password: string): Observable<User | null> {
    return this.getUserByEmail(email).pipe(
      map((users) => {
        if (users.length === 0) {
          throw new Error('USER_NOT_FOUND');
        }

        const user = users[0];
        const hashedPassword = this.encryptPassword(password);

        if (user.password !== hashedPassword) {
          throw new Error('INVALID_PASSWORD');
        }

        const { password: _, ...userWithoutPassword } = user;
        this.userSubject.next(userWithoutPassword);
        sessionStorage.setItem('email', email);
        return userWithoutPassword;
      })
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

  logout() {
    this.userSubject.next(null);
    sessionStorage.removeItem('email');
  }
}
