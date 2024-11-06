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

  /**
   * Encrypts a given password using SHA-256 with a salt for additional security.
   * @param password - The plain text password to encrypt.
   * @returns A SHA-256 hashed string of the salted password.
   */
  private encryptPassword(password: string): string {
    if (!password) return '';
    return CryptoJS.SHA256(password + this.SALT).toString();
  }

  /**
   * Registers a new user by encrypting their password and checking if the email already exists.
   * Throws an error if the email already exists or if the password is missing.
   * @param userDetails - An object containing the user's details, including password.
   * @returns An Observable of the API response after the user registration.
   */
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

  /**
   * Authenticates a user by verifying their email and encrypted password.
   * If the user is found and credentials are correct, it updates `userSubject` and stores email in session.
   * @param email - The email of the user attempting to log in.
   * @param password - The plain text password provided for login.
   * @returns An Observable that emits the logged-in user's details, excluding password.
   */
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

  /**
   * Retrieves a user by email from the API.
   * Used to check if a user already exists or to retrieve user details.
   * @param email - The email address to search for.
   * @returns An Observable that emits an array of users matching the email.
   */
  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`);
  }

  /**
   * Fetches the details of the logged-in user by their email.
   * Updates `userSubject` with the retrieved user data or `null` if no user is found.
   * @param email - The email of the logged-in user.
   */
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

  /**
   * Checks if a form field has validation errors and has been touched.
   * @param form - The form group containing the field.
   * @param field - The name of the field to validate.
   * @returns `true` if the field has errors and was touched, `false` otherwise.
   */
  public isValidField(form: FormGroup, field: string) {
    return form.controls[field].errors && form.controls[field].touched;
  }

  /**
   * Logs out the current user by clearing the `userSubject` and removing the email from session storage.
   */
  logout() {
    this.userSubject.next(null);
    sessionStorage.removeItem('email');
  }
}
