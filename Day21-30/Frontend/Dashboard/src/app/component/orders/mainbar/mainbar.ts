import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderForm } from '../order-form/order-form';

interface Order {
  orderNum: string;
  customer: string;
  trackingId: string;
  orderDate: string;
  quantity: number;
  location: string;
  total: string;
  status: string;
}

@Component({
  selector: 'app-mainbar',
  imports: [CommonModule, FormsModule, OrderForm],
  templateUrl: './mainbar.html',
  styleUrl: './mainbar.css',
})
export class Mainbar {
  showOrderForm = false;
  showFilterDropdown = false;
  orderCounter = 1003;
  currentSort: string = 'none';
  searchText: string = '';

  orders: Order[] = [
    {
      orderNum: '#1002',
      customer: 'Ariana Mendez',
      trackingId: '#15121321',
      orderDate: 'Today - 4:30 pm',
      quantity: 20,
      location: 'Syhcet, Bandor',
      total: '$500.00',
      status: 'Completed'
    },
    {
      orderNum: '#1002',
      customer: 'Floyd Miles',
      trackingId: '#15121321',
      orderDate: 'Today - 4:30 pm',
      quantity: 24,
      location: 'Syhcet, Bandor',
      total: '$500.00',
      status: 'In Process'
    },
    {
      orderNum: '#1002',
      customer: 'Ralph Edwards',
      trackingId: '#15121321',
      orderDate: 'Today - 4:30 pm',
      quantity: 12,
      location: 'Syhcet, Bandor',
      total: '$500.00',
      status: 'Pending'
    },
    {
      orderNum: '#1002',
      customer: 'Brooklyn Simmons',
      trackingId: '#15121321',
      orderDate: 'Today - 4:30 pm',
      quantity: 15,
      location: 'Syhcet, Bandor',
      total: '$500.00',
      status: 'Completed'
    },
    {
      orderNum: '#1002',
      customer: 'Dianne Russell',
      trackingId: '#15121321',
      orderDate: 'Today - 4:30 pm',
      quantity: 20,
      location: 'Syhcet, Bandor',
      total: '$500.00',
      status: 'In Process'
    },
    {
      orderNum: '#1002',
      customer: 'Devon Lane',
      trackingId: '#15121321',
      orderDate: 'Today - 4:30 pm',
      quantity: 15,
      location: 'Syhcet, Bandor',
      total: '$500.00',
      status: 'Completed'
    },
    {
      orderNum: '#1002',
      customer: 'Courtney Henry',
      trackingId: '#15121321',
      orderDate: 'Today - 4:30 pm',
      quantity: 15,
      location: 'Syhcet, Bandor',
      total: '$500.00',
      status: 'Pending'
    },
    {
      orderNum: '#1002',
      customer: 'Esther Howard',
      trackingId: '#15121321',
      orderDate: 'Today - 4:30 pm',
      quantity: 0,
      location: 'Syhcet, Bandor',
      total: '$500.00',
      status: 'In Process'
    },
    {
      orderNum: '#1002',
      customer: 'Jenny Wilson',
      trackingId: '#15121321',
      orderDate: 'Today - 4:30 pm',
      quantity: 15,
      location: 'Syhcet, Bandor',
      total: '$500.00',
      status: 'Completed'
    }
  ];

  get filteredOrders(): Order[] {
    if (!this.searchText.trim()) {
      return this.orders;
    }
    
    const searchLower = this.searchText.toLowerCase().trim();
    return this.orders.filter(order => 
      order.customer.toLowerCase().includes(searchLower)
    );
  }

  get totalOrders(): number {
    return this.orders.length;
  }

  get completedOrders(): number {
    return this.orders.filter(order => order.status === 'Completed').length;
  }

  get inProcessOrders(): number {
    return this.orders.filter(order => order.status === 'In Process').length;
  }

  openOrderForm() {
    this.showOrderForm = true;
  }

  closeOrderForm() {
    this.showOrderForm = false;
  }

  addNewOrder(formData: any) {
    const newOrder: Order = {
      orderNum: `#${this.orderCounter++}`,
      customer: formData.customer,
      trackingId: formData.trackingId,
      orderDate: this.formatDateTime(formData.orderDate),
      quantity: formData.quantity,
      location: formData.location,
      total: formData.total,
      status: formData.status
    };
    
    this.orders.unshift(newOrder); // Add to beginning of list
    this.closeOrderForm();
  }

  private formatDateTime(dateTimeString: string): string {
    if (!dateTimeString) return '';
    const date = new Date(dateTimeString);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    const timeStr = date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
    return isToday ? `Today - ${timeStr}` : `${date.toLocaleDateString()} - ${timeStr}`;
  }

  toggleFilterDropdown() {
    this.showFilterDropdown = !this.showFilterDropdown;
  }

  closeFilterDropdown() {
    this.showFilterDropdown = false;
  }

  sortOrders(sortBy: string) {
    this.currentSort = sortBy;
    
    switch(sortBy) {
      case 'date':
        this.sortByDate();
        break;
      case 'total':
        this.sortByTotal();
        break;
      case 'name':
        this.sortByName();
        break;
    }
    
    this.closeFilterDropdown();
  }

  private sortByDate() {
    this.orders.sort((a, b) => {
      const dateA = this.parseOrderDate(a.orderDate);
      const dateB = this.parseOrderDate(b.orderDate);
      return dateB.getTime() - dateA.getTime(); // Newest first
    });
  }

  private sortByTotal() {
    this.orders.sort((a, b) => {
      const totalA = parseFloat(a.total.replace('$', '').replace(',', ''));
      const totalB = parseFloat(b.total.replace('$', '').replace(',', ''));
      return totalB - totalA; // Highest first
    });
  }

  private sortByName() {
    this.orders.sort((a, b) => {
      return a.customer.localeCompare(b.customer); // A-Z
    });
  }

  private parseOrderDate(dateString: string): Date {
    // Handle "Today - 4:30 pm" format
    if (dateString.startsWith('Today')) {
      const timeMatch = dateString.match(/(\d+):(\d+)\s*(am|pm)/i);
      if (timeMatch) {
        const today = new Date();
        let hours = parseInt(timeMatch[1]);
        const minutes = parseInt(timeMatch[2]);
        const isPM = timeMatch[3].toLowerCase() === 'pm';
        
        if (isPM && hours !== 12) hours += 12;
        if (!isPM && hours === 12) hours = 0;
        
        today.setHours(hours, minutes, 0, 0);
        return today;
      }
    }
    // Handle standard date format
    return new Date(dateString);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.filter-dropdown-container');
    
    if (!clickedInside && this.showFilterDropdown) {
      this.closeFilterDropdown();
    }
  }
}
