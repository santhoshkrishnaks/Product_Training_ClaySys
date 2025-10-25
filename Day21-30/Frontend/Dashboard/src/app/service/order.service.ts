import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define and export Order so components can reuse the type
export interface Order {
  orderId: number;
  customerName: string;
  trackingId: string;
  orderDate: string;
  quantity: number;
  location: string;
  total: number;
  status: string;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  // NOTE: fill this base URL when you configure the API in your environment
  private readonly baseUrl = 'https://localhost:7219/api';

  constructor(private http: HttpClient) {}

  // Get list of orders
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/orders`);
  }
  // Create a new order
  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/orders`, order);
  }

  // Update an existing order
  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.baseUrl}/orders/${order.orderId}`, order);
  }

  // Delete an order
  deleteOrder(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/orders/${id}`);
  }
}
