import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartUserComponent } from '././shopping-cart-user.component';

describe('ShoppingCartUserComponent', () => {
  let component: ShoppingCartUserComponent;
  let fixture: ComponentFixture<ShoppingCartUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingCartUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
