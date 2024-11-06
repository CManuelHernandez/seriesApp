import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private msgService: MessageService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Initializes the `loginForm` FormGroup with controls for 'email' and 'password'.
   * - The 'email' field is required and must be in a valid email format.
   * - The 'password' field is required.
   * This method is called within `ngOnInit` to set up form validation and structure.
   */
  private initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // Getters for each form control, to simplify template binding
  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  /**
   * Submits the login form and attempts to authenticate the user.
   * - First, checks if the form is valid.
   * - If valid, extracts email and password from the form and sends them to `AuthService.login()`.
   * - On successful login, displays a success message and navigates to the '/series/list' route.
   * - If an error occurs (e.g., invalid credentials), displays an error message with specific details.
   */
  loginUser() {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (user) => {
        if (user) {
          this.msgService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Login exitoso',
          });
          this.router.navigate(['/series/list']);
        }
      },
      error: (error) => {
        let errorMessage = 'Algo salió mal';

        if (error.message === 'USER_NOT_FOUND') {
          errorMessage = 'Usuario no encontrado';
        } else if (error.message === 'INVALID_PASSWORD') {
          errorMessage = 'Credenciales incorrectos';
        }

        this.msgService.add({
          severity: 'error',
          summary: 'Error',
          detail: errorMessage,
        });
      },
    });
  }

  /**
   * Checks if a specified form field is valid or has been touched.
   * - Uses `AuthService.isValidField` to validate the given field.
   * - Returns `true` if the field is valid; otherwise, returns `false`.
   * @param field - The name of the form field to check.
   * @returns `true` if the field is valid, `false` if it is invalid or untouched.
   */
  isValidField(field: string): boolean | null {
    return this.authService.isValidField(this.loginForm, field);
  }
}
