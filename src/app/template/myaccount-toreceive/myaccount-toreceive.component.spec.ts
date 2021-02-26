import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyaccountToreceiveComponent } from './myaccount-toreceive.component';

describe('MyaccountToreceiveComponent', () => {
  let component: MyaccountToreceiveComponent;
  let fixture: ComponentFixture<MyaccountToreceiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyaccountToreceiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyaccountToreceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
