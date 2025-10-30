import { Component, HostListener, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output() toggleMenu = new EventEmitter<void>();

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders || [];
        console.log('Loaded orders from API:', orders);
        this.orderCounter = this.orders[this.orders.length - 1]?.orderId + 1 || 1001;
      },
      error: (err) => {
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

  private getCurrentDateTime(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

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
    const currentDate = this.getCurrentDateTime();

    if (this.isEditing && this.editingOrderData) {
      const payload: Order = {
        orderId: this.editingOrderData.orderId,
        customerName: formData.customer,
        trackingId: formData.trackingId,
        orderDate: currentDate,
        quantity: Number(formData.quantity),
        location: formData.location,
        total: Number(formData.total),
        status: formData.status,
      };
      this.orderService.updateOrder(payload).subscribe({
        next: () => {
          const idx = this.orders.findIndex((o) => o.orderId === payload.orderId);
          if (idx > -1) this.orders[idx] = payload;
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
        orderDate: currentDate,
        quantity: Number(formData.quantity),
        location: formData.location,
        total: Number(formData.total),
        status: formData.status,
      };
      this.orderService.createOrder(newOrder).subscribe({
        next: (created) => {
          console.log('Order created via API:', created);
          const completeOrder: Order = {
            orderId: created.orderId || newOrder.orderId,
            customerName: created.customerName || newOrder.customerName,
            trackingId: created.trackingId || newOrder.trackingId,
            orderDate: created.orderDate || newOrder.orderDate,
            quantity: created.quantity ?? newOrder.quantity,
            location: created.location || newOrder.location,
            total: created.total ?? newOrder.total,
            status: created.status || newOrder.status,
          };
          this.orders.push(completeOrder);
          this.closeOrderForm();
        },
        error: (err) => {
          
          console.warn('Create failed; adding locally.', err);
          this.orders.push(newOrder);
          this.closeOrderForm();
        },
      });
    }
  }

  toggleRowMenu(i: number) {
    this.openActionMenuIndex = this.openActionMenuIndex === i ? null : i;
  }

  startEdit(order: Order) {
    this.isEditing = true;
    this.editingOrderData = { ...order };
    this.showOrderForm = true;
    this.openActionMenuIndex = null;
  }

  confirmAndDelete(order: Order) {
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
      case 'total':
        this.sortByTotal();
        break;
      case 'name':
        this.sortByName();
        break;
    }

    this.closeFilterDropdown();
  }

  private sortByTotal() {
    this.orders.sort((a, b) => {
      return b.total - a.total;
    });
  }

  private sortByName() {
    this.orders.sort((a, b) => {
      return a.customerName.localeCompare(b.customerName);
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.filter-dropdown-container');
    const clickedaction = target.closest('.action-menu-wrapper');

    if (!clickedInside && this.showFilterDropdown) {
      this.closeFilterDropdown();
    }
    if (!clickedaction && this.openActionMenuIndex !== null) {
      this.openActionMenuIndex = null;
    }
  }

  emitToggleMenu() {
    this.toggleMenu.emit();
  }
}
