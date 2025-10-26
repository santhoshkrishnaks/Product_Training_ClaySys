import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from './sidebar/sidebar';
import { Mainbar } from './mainbar/mainbar';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, Sidebar, Mainbar],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders {
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }
}
