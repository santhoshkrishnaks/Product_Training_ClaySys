import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Order } from '../../../service/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, FormsModule],
  templateUrl: './order-form.html',
  styleUrl: './order-form.css',
})
export class OrderForm implements OnChanges {
  @Input() isEdit = false;
  @Input() data?: Order|null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() submitOrder = new EventEmitter<OrderFormData>();

  formData: OrderFormData = {
    customer: '',
    trackingId: '',
    orderDate: '',
    quantity: 0,
    location: '',
    total: '',
    status: 'Pending',
  };

  statusOptions = ['Pending', 'In Process', 'Completed'];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.formData = {
        customer: this.data.customerName || '',
        trackingId: this.data.trackingId || '',
        orderDate: "2025-10-24T16:20:00",
        quantity: this.data.quantity ?? 0,
        location: this.data.location || '',
        total: String(this.data.total ?? ''),
        status: this.data.status || 'Pending',
      };
    }
  }

  onSubmit() {
    if (this.isFormValid()) {
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
      orderDate: '',
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
      this.formData.orderDate &&
      this.formData.quantity > 0 &&
      this.formData.location &&
      this.formData.total
    );
  }
}
