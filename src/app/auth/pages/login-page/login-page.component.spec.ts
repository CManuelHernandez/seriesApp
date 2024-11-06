import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

import { LoginPageComponent } from './login-page.component';
import { AuthService } from '../../services/auth.service';
import { PrimengModule } from '../../../primeng/primeng.module';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let authService: AuthService;
  let router: Router;
  let messageService: MessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, PrimengModule],
      providers: [
        AuthService,
        MessageService,
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    messageService = TestBed.inject(MessageService);
    fixture.detectChanges();
  });

  it('should create the form with required fields', () => {
    expect(component.loginForm.contains('email')).toBeTrue();
    expect(component.loginForm.contains('password')).toBeTrue();
  });

  it('should require email to be valid', () => {
    const email = component.loginForm.controls['email'];
    email.setValue('');
    expect(email.valid).toBeFalse();
    email.setValue('valid.email@example.com');
    expect(email.valid).toBeTrue();
  });

  it('should require password to be valid', () => {
    const password = component.loginForm.controls['password'];
    password.setValue('');
    expect(password.valid).toBeFalse();
    password.setValue('validpassword');
    expect(password.valid).toBeTrue();
  });

  it('should call loginUser on valid form submission', () => {
    spyOn(authService, 'login').and.returnValue(
      of({ id: '1', fullName: 'Test User', email: 'test@example.com' })
    );

    spyOn(messageService, 'add');

    component.loginForm.setValue({
      email: 'valid.email@example.com',
      password: 'validpassword',
    });

    component.loginUser();

    expect(authService.login).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/series/list']);
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Success',
      detail: 'Login exitoso',
    });
  });

  it('should show an error message if login fails', () => {
    spyOn(authService, 'login').and.returnValue(
      throwError(() => new Error('USER_NOT_FOUND'))
    );
    spyOn(messageService, 'add');

    component.loginForm.setValue({
      email: 'invalid.email@example.com',
      password: 'invalidpassword',
    });

    component.loginUser();

    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'Usuario no encontrado',
    });
  });

  it('should show an error message for invalid password', () => {
    spyOn(authService, 'login').and.returnValue(
      throwError(() => new Error('INVALID_PASSWORD'))
    );
    spyOn(messageService, 'add');

    component.loginForm.setValue({
      email: 'valid.email@example.com',
      password: 'wrongpassword',
    });

    component.loginUser();

    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'Credenciales incorrectos',
    });
  });

  it('should not call loginUser if form is invalid', () => {
    spyOn(authService, 'login');

    component.loginForm.setValue({
      email: '',
      password: '',
    });

    component.loginUser();

    expect(authService.login).not.toHaveBeenCalled();
  });
});
