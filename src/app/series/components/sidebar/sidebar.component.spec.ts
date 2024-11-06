import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { Router } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [SidebarModule, ButtonModule, BrowserAnimationsModule],
      providers: [{ provide: Router, useValue: routerSpy }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open sidebar when `sidebarVisible` is true', () => {
    component.sidebarVisible = true;
    fixture.detectChanges();
    const sidebarEl = fixture.nativeElement.querySelector('p-sidebar');
    expect(sidebarEl).toBeTruthy();
    expect(component.sidebarVisible).toBeTrue();
  });

  it('should close sidebar when `closeCallback` is called', () => {
    spyOn(component.sidebarRef, 'close');
    component.closeCallback(new Event('click'));
    expect(component.sidebarRef.close).toHaveBeenCalled();
  });

  it('should navigate to login page and clear session when `logOut` is called', () => {
    component.logOut();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['auth/login']);
    expect(sessionStorage.length).toBe(0);
  });

  it('should show navigation elements in sidebar', () => {
    component.sidebarVisible = true;
    fixture.detectChanges();
    const navItems = fixture.nativeElement.querySelectorAll(
      '.template-list-item a'
    );
    expect(navItems.length).toBe(component.navItems.length);
    expect(navItems[0].textContent).toContain('Listado Series');
    expect(navItems[1].textContent).toContain('Top Series');
    expect(navItems[2].textContent).toContain('Nueva Serie');
  });
});
