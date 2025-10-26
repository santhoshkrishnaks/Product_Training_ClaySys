import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../orders/sidebar/sidebar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  imports: [CommonModule, Sidebar],
  templateUrl: './setting.html',
  styleUrl: './setting.css',
})
export class Setting {
  private router = inject(Router);
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }
  logout() {
    this.router.navigate (['/login']);
  }
}
