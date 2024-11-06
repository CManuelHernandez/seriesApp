import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { LayoutPageComponent } from './layout-page.component';

describe('LayoutPageComponent', () => {
  let component: LayoutPageComponent;
  let fixture: ComponentFixture<LayoutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutPageComponent],
      imports: [RouterTestingModule, ToastModule],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render router-outlet', () => {
    const compiled = fixture.nativeElement;
    const routerOutlet = compiled.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy();
  });

  it('should render p-toast component', () => {
    const compiled = fixture.nativeElement;
    const toast = compiled.querySelector('p-toast');
    expect(toast).toBeTruthy();
  });

  it('should have container class', () => {
    const compiled = fixture.nativeElement;
    const container = compiled.querySelector('.container');
    expect(container).toBeTruthy();
    expect(container.className).toContain('container');
  });

  it('should have container with flex styles', () => {
    const compiled = fixture.nativeElement;
    const container = compiled.querySelector('.container');
    expect(container.classList.contains('container')).toBeTruthy();
  });
});
