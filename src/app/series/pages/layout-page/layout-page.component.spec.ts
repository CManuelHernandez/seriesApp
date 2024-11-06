import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutPageComponent } from './layout-page.component';
import { AuthService } from '../../../auth/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SeriesModule } from '../../series.module';

class MockAuthService {
  fetchLoggedInUser() {
    return of({});
  }
}

describe('LayoutPageComponent', () => {
  let component: LayoutPageComponent;
  let fixture: ComponentFixture<LayoutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutPageComponent],
      imports: [RouterTestingModule, SeriesModule],
      providers: [{ provide: AuthService, useClass: MockAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
