import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../orders/sidebar/sidebar';

@Component({
  selector: 'app-inventory',
  imports: [CommonModule, Sidebar],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})
export class Inventory {
}
