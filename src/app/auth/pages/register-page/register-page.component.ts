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

  isValidField(field: string): boolean | null {
    return this.authService.isValidField(this.registerForm, field);
  }

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
