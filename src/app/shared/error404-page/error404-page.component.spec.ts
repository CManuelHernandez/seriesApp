import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Error404PageComponent } from './error404-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonModule } from 'primeng/button';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('Error404PageComponent', () => {
  let component: Error404PageComponent;
  let fixture: ComponentFixture<Error404PageComponent>;
  let buttonElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Error404PageComponent],
      imports: [RouterTestingModule, ButtonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Error404PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    buttonElement = fixture.debugElement.query(By.css('p-button'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the 404 image', () => {
    const imgElement: HTMLImageElement = fixture.debugElement.query(
      By.css('.not-found-image')
    ).nativeElement;
    expect(imgElement.src).toContain('assets/extras/notFound.gif');
  });

  it('should display the 404 message', () => {
    const h1Element: HTMLElement = fixture.debugElement.query(
      By.css('h1')
    ).nativeElement;
    expect(h1Element.textContent).toBe('404 - Página no encontrada');
  });

  it('should have a button with the label "Volver a listado"', () => {
    const button: HTMLElement = buttonElement.nativeElement;
    expect(button.textContent).toContain('Volver a listado');
  });

  it('should have the correct routerLink for the button', () => {
    const button = fixture.debugElement.query(By.css('p-button')).nativeElement;
    expect(button.getAttribute('ng-reflect-router-link')).toBe('/');
  });
});
