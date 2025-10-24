import { TestBed } from '@angular/core/testing';
import { OrderForm } from './order-form';

describe('OrderForm', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderForm]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(OrderForm);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
