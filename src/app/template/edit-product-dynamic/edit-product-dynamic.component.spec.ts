import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductDynamicComponent } from './edit-product-dynamic.component';

describe('EditProductDynamicComponent', () => {
  let component: EditProductDynamicComponent;
  let fixture: ComponentFixture<EditProductDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProductDynamicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
