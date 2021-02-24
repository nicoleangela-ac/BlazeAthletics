import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutDiffAddressComponent } from './checkout-diff-address.component';

describe('CheckoutDiffAddressComponent', () => {
  let component: CheckoutDiffAddressComponent;
  let fixture: ComponentFixture<CheckoutDiffAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutDiffAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutDiffAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
