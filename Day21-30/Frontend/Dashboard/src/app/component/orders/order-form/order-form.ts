import { Component, EventEmitter, Output } from '@angular/core';
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
export class OrderForm {
  @Output() closeModal = new EventEmitter<void>();
  @Output() submitOrder = new EventEmitter<OrderFormData>();

  formData: OrderFormData = {
    customer: '',
    trackingId: '',
    orderDate: '',
    quantity: 0,
    location: '',
    total: '',
    status: 'Pending'
  };

  statusOptions = ['Pending', 'In Process', 'Completed'];

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
      status: 'Pending'
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
