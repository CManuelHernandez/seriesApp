import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.scss',
})
export class LayoutPageComponent implements OnInit, OnDestroy {
  userLoged?: string;
  creating!: boolean;
  private routerSubscription!: Subscription;
  themeSelection: boolean = false;
  themeText: string = 'Oscuro';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private authService: AuthService
  ) {
    let theme = window.localStorage.getItem('theme');
    if (theme) {
      this.themeSelection = theme === 'dark';
      this.changeTheme(this.themeSelection);
    }
  }

  ngOnInit(): void {
    this.userLoged = sessionStorage.getItem('email') || '';
    this.authService.fetchLoggedInUser(this.userLoged);

    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.creating = this.router.url.includes('new-serie');
      });

    this.themeText = this.themeSelection ? 'Oscuro' : 'Luminoso';
  }

  changeTheme(state: boolean) {
    let theme = state ? 'dark' : 'light';
    window.localStorage.setItem('theme', theme);
    let themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;
    themeLink.href = `lara-${theme}-blue.css`;

    this.themeText = state ? 'Oscuro' : 'Luminoso';
  }

  logOut(): void {
    sessionStorage.clear();
    this.router.navigate(['auth/login']);
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
