import { Component } from '@angular/core';
import { Sidebar } from './sidebar/sidebar';
import { Mainbar } from './mainbar/mainbar';

@Component({
  selector: 'app-orders',
  imports: [Sidebar,Mainbar],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders {

}
