import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private readonly baseUrl = 'https://localhost:7219/api';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/orders`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/orders`, order);
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.baseUrl}/orders`, order);
  }

  deleteOrder(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/orders/${id}`);
  }
}
