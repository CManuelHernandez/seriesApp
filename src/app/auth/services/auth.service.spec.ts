import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { BehaviorSubject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const mockUser: User = {
    id: '1',
    fullName: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
  };

  const mockUsersResponse: User[] = [mockUser];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('encryptPassword', () => {
    it('should encrypt the password with salt', () => {
      const password = 'password123';
      const encryptedPassword = service['encryptPassword'](password);
      expect(encryptedPassword).toBeTruthy();
      expect(encryptedPassword).not.toEqual(password);
    });
  });

  describe('registerUser', () => {
    it('should throw an error if password is missing', () => {
      const userWithoutPassword = { ...mockUser, password: undefined };

      expect(() => service.registerUser(userWithoutPassword)).toThrowError(
        'Password is required'
      );
    });

    it('should throw an error if email already exists', (done) => {
      spyOn(service, 'getUserByEmail').and.returnValue(of(mockUsersResponse));

      service
        .registerUser(mockUser)
        .pipe(
          catchError((error) => {
            expect(error.message).toBe('EMAIL_EXISTS');
            done();
            return of(null);
          })
        )
        .subscribe();
    });

    it('should register a new user successfully', () => {
      spyOn(service, 'getUserByEmail').and.returnValue(of([]));

      const encryptedUser = {
        ...mockUser,
        password: service['encryptPassword'](mockUser.password!),
      };

      service.registerUser(mockUser).subscribe((response) => {
        expect(response).toEqual(encryptedUser);
      });

      const req = httpMock.expectOne(`${environments.baseUrl}/users`);
      expect(req.request.method).toBe('POST');
      req.flush(encryptedUser);
    });
  });

  describe('login', () => {
    it('should throw an error if user is not found', () => {
      spyOn(service, 'getUserByEmail').and.returnValue(of([]));

      service.login(mockUser.email, mockUser.password!).subscribe(
        () => fail('Expected error, but got success'),
        (error) => {
          expect(error.message).toBe('USER_NOT_FOUND');
        }
      );
    });
  });

  describe('isValidField', () => {
    it('should return true if the field has validation errors and has been touched', () => {
      const formGroup = new FormGroup({});
      formGroup.addControl('email', new FormControl('', [Validators.required]));
      const emailControl = formGroup.get('email')!;
      emailControl.markAsTouched();
      expect(service.isValidField(formGroup, 'email')).toBeTrue();
    });
  });

  describe('logout', () => {
    it('should reset userSubject and remove email from sessionStorage', () => {
      service.logout();

      expect(service['userSubject'].getValue()).toBeNull();
      expect(sessionStorage.getItem('email')).toBeNull();
    });
  });
});
