import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../orders/sidebar/sidebar';

@Component({
  selector: 'app-user-authentication',
  imports: [CommonModule, Sidebar],
  templateUrl: './user-authentication.html',
  styleUrl: './user-authentication.css',
})
export class UserAuthentication {
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }
}
