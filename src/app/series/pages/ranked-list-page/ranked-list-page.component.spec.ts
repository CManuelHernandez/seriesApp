import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankedListPageComponent } from './ranked-list-page.component';

describe('RankedListPageComponent', () => {
  let component: RankedListPageComponent;
  let fixture: ComponentFixture<RankedListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RankedListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankedListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
