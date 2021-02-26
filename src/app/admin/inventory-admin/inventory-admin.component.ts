import { FirebaseProductsService } from './../../service/firebase-products.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-inventory-admin',
  templateUrl: './inventory-admin.component.html',
  styleUrls: ['./inventory-admin.component.css']
})
export class InventoryAdminComponent implements OnInit {

  product: any;

  constructor(private service : FirebaseProductsService, public toastr: ToastrService)
   { this.product = service.getProductData();}

   ngOnInit() {
    this.getProductData();
  }
 
  getProductData() {
    this.service.getProductData().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(customers => {
      this.product = customers;
    });
  }
  deleteProduct(key, product) {
    if (window.confirm('Are sure you want to delete this product : ' + product + ' ?')) {
    this.service.deleteProduct(key);
    this.toastr.success(product + ' successfully deleted!'); 
    }
  }

}
