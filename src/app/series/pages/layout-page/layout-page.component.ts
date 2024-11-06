import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AuthService } from '../../../auth/services/auth.service';

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

  /**
   * Initializes the component, sets the user status, and configures the theme settings.
   * Subscribes to router events to track route changes.
   */
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

  /**
   * Changes the application theme based on the user selection.
   * @param state - Boolean indicating dark theme (true) or light theme (false).
   */
  changeTheme(state: boolean) {
    let theme = state ? 'dark' : 'light';
    window.localStorage.setItem('theme', theme);
    let themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;
    themeLink.href = `lara-${theme}-blue.css`;

    this.themeText = state ? 'Oscuro' : 'Luminoso';
  }

  /**
   * Clears user session and redirects to the login page.
   */
  logOut(): void {
    sessionStorage.clear();
    this.router.navigate(['auth/login']);
  }

  /**
   * Cleans up subscriptions when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
