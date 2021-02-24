import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditAdminComponent } from './product-edit-admin.component';

describe('ProductEditAdminComponent', () => {
  let component: ProductEditAdminComponent;
  let fixture: ComponentFixture<ProductEditAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductEditAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEditAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
