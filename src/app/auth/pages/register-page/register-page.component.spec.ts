import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { RegisterPageComponent } from './register-page.component';
import { AuthService } from '../../services/auth.service';
import { PrimengModule } from '../../../primeng/primeng.module';

describe('RegisterPageComponent', () => {
  let component: RegisterPageComponent;
  let fixture: ComponentFixture<RegisterPageComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterPageComponent],
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
    fixture = TestBed.createComponent(RegisterPageComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the form with required fields', () => {
    expect(component.registerForm.contains('fullName')).toBeTrue();
    expect(component.registerForm.contains('email')).toBeTrue();
    expect(component.registerForm.contains('password')).toBeTrue();
    expect(component.registerForm.contains('confirmPassword')).toBeTrue();
  });

  it('should require fullName to be valid', () => {
    const fullName = component.registerForm.controls['fullName'];
    fullName.setValue('');
    expect(fullName.valid).toBeFalse();
    fullName.setValue('Valid Name');
    expect(fullName.valid).toBeTrue();
  });

  it('should validate password match', () => {
    const password = component.registerForm.controls['password'];
    const confirmPassword = component.registerForm.controls['confirmPassword'];
    password.setValue('1234');
    confirmPassword.setValue('12345');
    expect(component.registerForm.errors?.['passwordMismatch']).toBeTrue();

    confirmPassword.setValue('1234');
    expect(component.registerForm.errors?.['passwordMismatch']).toBeFalsy();
  });

  it('should call registerUser on valid form submission', () => {
    spyOn(authService, 'registerUser').and.returnValue(of({}));
    component.registerForm.setValue({
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      password: '1234',
      confirmPassword: '1234',
    });

    component.submitDetails();

    expect(authService.registerUser).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['auth/login']);
  });

  it('should show an error if email already exists', () => {
    spyOn(authService, 'registerUser').and.returnValue(
      throwError(() => new Error('EMAIL_EXISTS'))
    );

    const messageService = TestBed.inject(MessageService);
    spyOn(messageService, 'add');

    component.registerForm.setValue({
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      password: '1234',
      confirmPassword: '1234',
    });

    component.submitDetails();

    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'Algo fue mal',
    });
  });
});
