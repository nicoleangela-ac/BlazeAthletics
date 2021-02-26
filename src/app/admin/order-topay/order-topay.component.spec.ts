import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTopayComponent } from './order-topay.component';

describe('OrderTopayComponent', () => {
  let component: OrderTopayComponent;
  let fixture: ComponentFixture<OrderTopayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderTopayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTopayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
