import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyaccountTopayComponent } from './myaccount-topay.component';

describe('MyaccountTopayComponent', () => {
  let component: MyaccountTopayComponent;
  let fixture: ComponentFixture<MyaccountTopayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyaccountTopayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyaccountTopayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
