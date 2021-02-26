import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSidenavComponent } from './order-sidenav.component';

describe('OrderSidenavComponent', () => {
  let component: OrderSidenavComponent;
  let fixture: ComponentFixture<OrderSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
