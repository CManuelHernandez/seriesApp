import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSeriesComponent } from './card-series.component';

describe('CardSeriesComponent', () => {
  let component: CardSeriesComponent;
  let fixture: ComponentFixture<CardSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardSeriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
