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

  constructor(private router: Router) {}

  closeCallback(e: any): void {
    this.sidebarRef.close(e);
  }

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
  logOut(): void {
    sessionStorage.clear();
    this.router.navigate(['auth/login']);
  }
}
