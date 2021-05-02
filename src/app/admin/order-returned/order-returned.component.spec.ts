import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderReturnedComponent } from './order-returned.component';

describe('OrderReturnedComponent', () => {
  let component: OrderReturnedComponent;
  let fixture: ComponentFixture<OrderReturnedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderReturnedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderReturnedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
