import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../orders/sidebar/sidebar';

@Component({
  selector: 'app-setting',
  imports: [CommonModule, Sidebar],
  templateUrl: './setting.html',
  styleUrl: './setting.css',
})
export class Setting {
}
