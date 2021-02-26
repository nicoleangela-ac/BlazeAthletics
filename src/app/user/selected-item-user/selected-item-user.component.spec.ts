import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedItemUserComponent } from './selected-item-user.component';

describe('SelectedItemUserComponent', () => {
  let component: SelectedItemUserComponent;
  let fixture: ComponentFixture<SelectedItemUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedItemUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedItemUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
