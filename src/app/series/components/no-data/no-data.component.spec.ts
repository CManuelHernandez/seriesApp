import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoDataComponent } from './no-data.component';
import { ButtonModule } from 'primeng/button';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('NoDataComponent', () => {
  let component: NoDataComponent;
  let fixture: ComponentFixture<NoDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoDataComponent],
      imports: [ButtonModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show the text "There are no series available yet"', () => {
    const paragraph = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(paragraph.textContent).toContain('Aun no hay series disponibles');
  });

  it('should render the button with the text "New Series"', () => {
    const button = fixture.debugElement.query(By.css('p-button')).nativeElement;
    expect(button).toBeTruthy();
    expect(button.textContent).toContain('Nueva serie');
  });

  it('the button should have the routerLink attribute', () => {
    const button = fixture.debugElement.query(By.css('p-button')).nativeElement;
    expect(button.getAttribute('ng-reflect-router-link')).toBe(
      '/series/new-serie'
    );
  });
});
