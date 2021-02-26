import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPendingDetailsComponent } from './order-pending-details.component';

describe('OrderPendingDetailsComponent', () => {
  let component: OrderPendingDetailsComponent;
  let fixture: ComponentFixture<OrderPendingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderPendingDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPendingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
