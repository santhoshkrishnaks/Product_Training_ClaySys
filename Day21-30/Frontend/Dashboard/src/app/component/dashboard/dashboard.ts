import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../orders/sidebar/sidebar';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, Sidebar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }
}
