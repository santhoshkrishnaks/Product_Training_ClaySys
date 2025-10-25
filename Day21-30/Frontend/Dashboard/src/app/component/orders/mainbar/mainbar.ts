import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderForm } from '../order-form/order-form';
import { OrderService, Order } from '../../../service/order.service';

@Component({
  selector: 'app-mainbar',
  imports: [CommonModule, FormsModule, OrderForm],
  templateUrl: './mainbar.html',
  styleUrl: './mainbar.css',
})
export class Mainbar implements OnInit {
  // switched to use service-backed data
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    // fetch orders from backend via service; subscription updates the local array
    this.orderService.getOrders().subscribe({
      next: (orders) => {
        // replace local orders with server-provided ones; if API not configured,
        // this will error — fill baseUrl in service to enable.
        this.orders = orders || [];
        console.log('Loaded orders from API:', orders);
        this.orderCounter = this.orders.length + 1001;
      },
      error: (err) => {
        // keep current local demo data if backend not available
        console.warn('Failed to load orders from API (service baseUrl not configured?):', err);
      },
    });
  }
  orders: Order[] = [];
  showOrderForm = false;
  showFilterDropdown = false;
  currentSort: string = 'none';
  searchText: string = '';
  orderCounter: number = 1001;

  openActionMenuIndex: number | null = null;
  isEditing = false;
  editingOrderData: Order | null = null;

  get filteredOrders(): Order[] {
    if (!this.searchText.trim()) {
      return this.orders;
    }

    const searchLower = this.searchText.toLowerCase().trim();
    return this.orders.filter((order) => order.customerName.toLowerCase().includes(searchLower));
  }

  get totalOrders(): number {
    return this.orders.length;
  }

  get completedOrders(): number {
    return this.orders.filter((order) => order.status === 'Completed').length;
  }

  get inProcessOrders(): number {
    return this.orders.filter((order) => order.status === 'In Process').length;
  }

  openOrderForm() {
    this.isEditing = false;
    this.editingOrderData = null;
    this.showOrderForm = true;
  }

  closeOrderForm() {
    this.showOrderForm = false;
    this.isEditing = false;
    this.editingOrderData = null;
  }

  onSubmitFromForm(formData: any) {
    if (this.isEditing && this.editingOrderData) {
      const payload: Order = {
        orderId: this.editingOrderData.orderId,
        customerName: formData.customer,
        trackingId: formData.trackingId,
        orderDate: new Date(formData.orderDate).toISOString(),
        quantity: Number(formData.quantity),
        location: formData.location,
        total: Number(formData.total),
        status: formData.status,
      };
      this.orderService.updateOrder(payload).subscribe({
        next: (updated) => {
          const idx = this.orders.findIndex((o) => o.orderId === updated.orderId);
          if (idx > -1) this.orders[idx] = updated;
          this.closeOrderForm();
        },
        error: (err) => {
          console.warn('Update failed; keeping existing data.', err);
          this.closeOrderForm();
        },
      });
    } else {
      const newOrder: Order = {
        orderId: this.orderCounter++,
        customerName: formData.customer,
        trackingId: formData.trackingId,
        orderDate: new Date(formData.orderDate).toISOString(),
        quantity: Number(formData.quantity),
        location: formData.location,
        total: Number(formData.total),
        status: formData.status,
      };
      this.orderService.createOrder(newOrder).subscribe({
        next: (created) => {
          this.orders.unshift(created);
          this.closeOrderForm();
        },
        error: (err) => {
          console.warn('Create failed; adding locally.', err);
          this.orders.unshift(newOrder);
          this.closeOrderForm();
        },
      });
    }
  }

  toggleRowMenu(i: number) {
    this.openActionMenuIndex = this.openActionMenuIndex === i ? null : i;
  }

  startEdit(order: Order, index: number) {
    this.isEditing = true;
    this.editingOrderData = { ...order };
    this.showOrderForm = true;
    this.openActionMenuIndex = null;
  }

  confirmAndDelete(order: Order, index: number) {
    const ok = confirm(`Delete order ${order.orderId}?`);
    if (!ok) return;
    this.orderService.deleteOrder(order.orderId).subscribe({
      next: () => {
        this.orders = this.orders.filter((o) => o.orderId !== order.orderId);
      },
      error: (err) => {
        console.warn('Delete failed', err);
      },
    });
    this.openActionMenuIndex = null;
  }

  toggleFilterDropdown() {
    this.showFilterDropdown = !this.showFilterDropdown;
  }

  closeFilterDropdown() {
    this.showFilterDropdown = false;
  }

  sortOrders(sortBy: string) {
    this.currentSort = sortBy;

    switch (sortBy) {
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
      return b.total - a.total; // Highest first
    });
  }

  private sortByName() {
    this.orders.sort((a, b) => {
      return a.customerName.localeCompare(b.customerName); // A-Z
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
