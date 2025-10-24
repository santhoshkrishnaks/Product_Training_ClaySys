import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../orders/sidebar/sidebar';

@Component({
  selector: 'app-tracking',
  imports: [CommonModule, Sidebar],
  templateUrl: './tracking.html',
  styleUrl: './tracking.css',
})
export class Tracking {
}
