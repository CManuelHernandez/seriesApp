import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListPageComponent } from './list-page.component';
import { AuthService } from '../../../auth/services/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PrimengModule } from '../../../primeng/primeng.module';
import { SeriesModule } from '../../series.module';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ListPageComponent', () => {
  let component: ListPageComponent;
  let fixture: ComponentFixture<ListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListPageComponent],
      imports: [HttpClientTestingModule, PrimengModule, SeriesModule],
      providers: [
        AuthService,
        ConfirmationService,
        MessageService,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: of({ id: '1' }) } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
