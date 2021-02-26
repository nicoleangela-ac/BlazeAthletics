import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderOngoingComponent } from './order-ongoing.component';

describe('OrderOngoingComponent', () => {
  let component: OrderOngoingComponent;
  let fixture: ComponentFixture<OrderOngoingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderOngoingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderOngoingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
