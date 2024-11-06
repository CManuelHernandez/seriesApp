import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ImagenHelperComponent } from './imagen-helper.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ImagenHelperComponent', () => {
  let component: ImagenHelperComponent;
  let fixture: ComponentFixture<ImagenHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImagenHelperComponent],
      imports: [ButtonModule, DialogModule, BrowserAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the help dialog when showHelp() is called', fakeAsync(() => {
    component.showHelp();
    fixture.detectChanges();
    tick();

    fixture.whenStable().then(() => {
      const dialog =
        fixture.debugElement.nativeElement.querySelector('p-dialog');
      expect(dialog).toBeTruthy();
      expect(component.helpVisible).toBeTrue();
    });
  }));

  it('should call showHelp() when the button is clicked', () => {
    spyOn(component, 'showHelp');
    const button = fixture.debugElement.query(By.css('.helper')).nativeElement;
    button.click();
    expect(component.showHelp).toHaveBeenCalled();
  });

  it('should have the correct tooltip on the help button', () => {
    const button = fixture.debugElement.query(By.css('.helper')).nativeElement;
    expect(button.getAttribute('pTooltip')).toBe(
      'Guía para añadir Imagen de la serie'
    );
  });
});
