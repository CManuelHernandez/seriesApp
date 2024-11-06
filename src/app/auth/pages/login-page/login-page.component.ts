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

  private initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

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

  isValidField(field: string): boolean | null {
    return this.authService.isValidField(this.loginForm, field);
  }
}
