import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../orders/sidebar/sidebar';

@Component({
  selector: 'app-report-analytics',
  imports: [CommonModule, Sidebar],
  templateUrl: './report-analytics.html',
  styleUrl: './report-analytics.css',
})
export class ReportAnalytics {
}
