import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PrimengModule } from '../../../primeng/primeng.module';
import { NoDataComponent } from '../no-data/no-data.component';
import { By } from '@angular/platform-browser';
import { tick, fakeAsync } from '@angular/core/testing';

describe('NoDataComponent', () => {
  let component: NoDataComponent;
  let fixture: ComponentFixture<NoDataComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoDataComponent],
      imports: [
        PrimengModule,
        RouterTestingModule.withRoutes([
          { path: 'series/new-serie', component: NoDataComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NoDataComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the "No data" message', () => {
    const messageElement = fixture.nativeElement.querySelector('p');
    expect(messageElement.textContent.trim()).toEqual(
      'Aun no hay series disponibles'
    );
  });
});
