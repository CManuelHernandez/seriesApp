import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { User } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { passwordMatchValidator } from '../../../shared/password-match.directive';
import { emailExistsValidator } from '../../services/email-exist.validator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Initializes the `registerForm` FormGroup with controls for user registration fields.
   * - 'fullName': required, allows only alphabetical characters and spaces.
   * - 'email': required, must be a valid email, and checked for existence via async validator.
   * - 'password': required, with a minimum length of 4 characters.
   * - 'confirmPassword': required, used to match the 'password' field.
   * The form group also includes a custom validator, `passwordMatchValidator`, to ensure
   * 'password' and 'confirmPassword' fields match.
   */
  private initForm(): void {
    this.registerForm = this.fb.group(
      {
        fullName: [
          '',
          [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)],
        ],
        email: [
          '',
          [Validators.required, Validators.email],
          [emailExistsValidator(this.authService)],
        ],
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: passwordMatchValidator,
      }
    );
  }

  /**
   * Checks if a specified form field is valid or has been touched.
   * - Uses `AuthService.isValidField` to validate the given field.
   * - Returns `true` if the field is valid; otherwise, returns `false`.
   * @param field - The name of the form field to check.
   * @returns `true` if the field is valid, `false` if it is invalid or untouched.
   */
  isValidField(field: string): boolean | null {
    return this.authService.isValidField(this.registerForm, field);
  }

  // Getters for each form control, to simplify template binding
  get fullName() {
    return this.registerForm.controls['fullName'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  /**
   * Submits the registration form details to register a new user.
   * - First, it creates a `postData` object from the form values, removing `confirmPassword`.
   * - Invokes `AuthService.registerUser()` with the `postData` object to submit the new user details.
   * - On success, displays a success message and navigates to the login page.
   * - On error, displays a generic error message.
   */
  submitDetails() {
    const postData = { ...this.registerForm.value };
    delete postData.confirmPassword;
    this.authService.registerUser(postData as User).subscribe(
      (response) => {
        console.log(response);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Registro completado con exito',
        });
        this.router.navigate(['auth/login']);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Algo fue mal',
        });
      }
    );
  }
}
