import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RankedListPageComponent } from './ranked-list-page.component';
import { PrimengModule } from '../../../primeng/primeng.module';
import { SeriesModule } from '../../series.module';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('RankedListPageComponent', () => {
  let component: RankedListPageComponent;
  let fixture: ComponentFixture<RankedListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RankedListPageComponent],
      imports: [HttpClientTestingModule, PrimengModule, SeriesModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: of({ id: '1' }) } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RankedListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
