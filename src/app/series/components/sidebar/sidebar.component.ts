import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Sidebar } from 'primeng/sidebar';

import { NavItem } from '../../interfaces/navItem.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  sidebarVisible: boolean = false;

  navItems: NavItem[] = [
    {
      icon: 'pi pi-list',
      label: 'Listado Series',
      route: '/series/list',
    },
    {
      icon: 'pi pi-trophy',
      label: 'Top Series',
      route: '/series/top-series',
    },
    {
      icon: 'pi pi-plus',
      label: 'Nueva Serie',
      route: '/series/new-serie',
    },
  ];

  constructor(private router: Router) {}

  /**
   * Closes the sidebar using a reference to the Sidebar component.
   * @param e - The event associated with the sidebar closing action.
   */
  closeCallback(e: any): void {
    this.sidebarRef.close(e);
  }

  /**
   * Clears session data and navigates the user to the login page.
   * Used to log the user out of the application.
   */
  logOut(): void {
    sessionStorage.clear();
    this.router.navigate(['auth/login']);
  }
}
