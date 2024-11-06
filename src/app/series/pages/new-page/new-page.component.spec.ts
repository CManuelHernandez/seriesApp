import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NewPageComponent } from './new-page.component';
import { MessageService } from 'primeng/api';
import { PrimengModule } from '../../../primeng/primeng.module';
import { SeriesModule } from '../../series.module';

class ActivatedRouteStub {
  snapshot = { paramMap: { get: () => 'mockedParam' } } as any;
  params = of({ id: 'mockedId' });
}

class MessageServiceMock {
  add() {}
  clear() {}
}

describe('NewPageComponent', () => {
  let component: NewPageComponent;
  let fixture: ComponentFixture<NewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewPageComponent],
      imports: [HttpClientTestingModule, PrimengModule, SeriesModule],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: MessageService, useClass: MessageServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
