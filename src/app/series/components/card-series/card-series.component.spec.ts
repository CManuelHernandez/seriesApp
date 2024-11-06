import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SerieImagePipe } from '../../pipes/serie-image.pipe';

import { CardSeriesComponent } from './card-series.component';
import {
  Serie,
  StreamingPlataform,
  Rating,
} from '../../interfaces/series.interface';

describe('CardSeriesComponent', () => {
  let component: CardSeriesComponent;
  let fixture: ComponentFixture<CardSeriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardSeriesComponent, SerieImagePipe],
      providers: [SerieImagePipe],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CardSeriesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    component.title = 'Test Title';
    fixture.detectChanges();
    const titleElement = fixture.debugElement.query(
      By.css('.title')
    ).nativeElement;
    expect(titleElement.textContent).toContain('Test Title');
  });
});
