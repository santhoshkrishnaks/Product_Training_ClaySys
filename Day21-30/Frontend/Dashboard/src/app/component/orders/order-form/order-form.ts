import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Order } from '../../../service/order.service';

interface OrderFormData {
  customer: string;
  trackingId: string;
  orderDate: string;
  quantity: number;
  location: string;
  total: string;
  status: string;
}

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-form.html',
  styleUrls: ['./order-form.css'],
})
export class OrderForm implements OnChanges {
  @Input() isEdit = false;
  @Input() data?: Order | null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() submitOrder = new EventEmitter<OrderFormData>();

  formData: OrderFormData = {
    customer: '',
    trackingId: '',
    orderDate: new Date().toISOString(),
    quantity: 0,
    location: '',
    total: '',
    status: 'Pending',
  };

  statusOptions = ['Pending', 'In Process', 'Completed'];

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.formData = {
        customer: this.data.customerName || '',
        trackingId: this.data.trackingId || '',
        orderDate: this.data.orderDate || this.getCurrentDateTime(),
        quantity: this.data.quantity ?? 0,
        location: this.data.location || '',
        total: String(this.data.total ?? ''),
        status: this.data.status || 'Pending',
      };
    } else {
      // For new orders, set the current date and time
      this.formData.orderDate = this.getCurrentDateTime();
    }
  }

  onSubmit() {
    if (this.isFormValid()) {
      // Ensure order date is set to current date and time before submitting
      this.formData.orderDate = this.getCurrentDateTime();
      this.submitOrder.emit({ ...this.formData });
      this.resetForm();
    }
  }

  onCancel() {
    this.resetForm();
    this.closeModal.emit();
  }

  resetForm() {
    this.formData = {
      customer: '',
      trackingId: '',
      orderDate: this.getCurrentDateTime(),
      quantity: 0,
      location: '',
      total: '',
      status: 'Pending',
    };
  }

  isFormValid(): boolean {
    return !!(
      this.formData.customer &&
      this.formData.trackingId &&
      this.formData.quantity > 0 &&
      this.formData.location &&
      this.formData.total
    );
  }
}
