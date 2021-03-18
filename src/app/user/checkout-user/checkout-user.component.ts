import { Subscription } from 'rxjs';
import { OrdersFirebaseService } from './../../service/orders-firebase.service';
import { UserWriteData } from './../../service/user-write-data.service';
import { UserDataService } from './../../service/user-data.service';
import { CheckoutDiffAddressComponent } from './../../template/checkout-diff-address/checkout-diff-address.component';
import { FormArray, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDataModel } from 'src/app/models/product-data-model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { CartWriteData } from 'src/app/service/cart-write-data.service';
import { ProducDataService } from 'src/app/service/product-data.service';
import { UserData } from 'src/app/models/user-data-model';

@Component({
  selector: 'app-checkout-user',
  templateUrl: './checkout-user.component.html',
  styleUrls: ['./checkout-user.component.css']
})
export class CheckoutUserComponent implements OnInit {
  @ViewChild (CheckoutDiffAddressComponent) public myChild: CheckoutDiffAddressComponent; 
  userData: UserData;
  checkoutForm : FormGroup;
  items_cart: ProductDataModel[] = [];
  cartIsEmpty = true;
  isLoading = false;
  isSizeLarge = false;
  isDiffAddress = false;
  isCourierSelected = true;
  isFormValid = true;
  url : string[];
  courierRate = [];

  totalPrice: number;
  status: string;
  courierSite: string;
  public isCollapsed = false;
  todayDate : Date = new Date();

  constructor(private productService: ProducDataService, 
    private router: Router,
    private cartService: CartWriteData,
    private authService: AuthenticationService,
    private fb:FormBuilder, 
    private userDataService: UserDataService,
    private userWriteService: UserWriteData,
    private userAuthService: AuthenticationService,
    private ordersService: OrdersFirebaseService) {}

  ngOnInit() {
    this.courierSite = null;
    this.totalPrice = null;
    this.status = null;
    this.courierRate = [];
    this.url = new Array<string>();
    this.isLoading = true;
    this.cartService.getCartData(this.authService.userToken).subscribe(response => {
        if(response != null)
        {
          this.cartIsEmpty = false;
          this.items_cart = response;
          this.productService.setProductData(response);

          for(var i in this.items_cart) {
            var price = this.items_cart[i].price * this.items_cart[i].noItem
            this.totalPrice +=  price;
          }
        }
        this.isLoading = false;
      }
    );
    this.userWriteService.getUsers(this.userAuthService.userToken).subscribe(responseData => {
      this.userData = this.userDataService.getUser(0);      
    });
    this.checkoutProduct();
  }

    //upload  images
    count : number;
    selectFile(event) {
      this.url = [];
      var files = event.target.files;
      if (files) {
        var file =  files[0].size/1024
        if ( file < 1024 ) {
         for (let file of files) {
          let reader = new FileReader();
          reader.onload = (e: any) => { this.url.push(e.target.result) ;}
          reader.readAsDataURL(file);
        }
          this.isSizeLarge = false;             
        }
        else {
          this.isSizeLarge = true;
        }        
       }
      }

    checkoutProduct() {
      this.checkoutForm = new FormGroup ({
        "productMessage" : new FormControl(),
        "shippingAddress" : new FormArray([]),
        "customerId": new FormControl(this.authService.userToken),
        "customerName" : new FormControl(),
        "customerEmail": new FormControl(),
        "receiptImage" : new FormControl(),
        "orderProduct" : new FormArray([]),
        "orderDate" : new FormControl(this.todayDate.toUTCString()),
        "orderStatus" : new FormControl(''),
        "courier" : new FormControl(''),
        "trackingNum": new FormControl(''),
        "totalPayment": new FormControl('')
          })
      }

    getFormControl (field) : FormControl { return this.checkoutForm?.get(field) as FormControl  }
    getFormArray (field) : FormArray { return this.checkoutForm?.get(field) as FormArray  }
    newProduct(noItem, price, pId, pImg, pName, pSize, pVar): FormGroup {  return this.fb.group({ 
      noItems: noItem,  
      price: price,
      productId: pId,
      productImage: pImg,
      productName: pName,
      productSize: pSize,
      productVariation: pVar   
      })  }
    newAddress(addr, brgy, cty, prvn, pstCd): FormGroup {  return this.fb.group({ 
        address1 : addr ,
        barangay: brgy ,
        city: cty ,
        province: prvn ,
        postalCode: pstCd,
        })  }
    addProduct() { 
      this.getFormArray("orderProduct").clear();
      this.getFormArray("orderProduct").reset();
        for(var i in this.items_cart) {
          this.getFormArray("orderProduct").push(this.newProduct(this.items_cart[i].noItem,
            this.items_cart[i].price,
            this.items_cart[i].productId,
            this.items_cart[i].productImage,
            this.items_cart[i].productName,
            this.items_cart[i].size,
            this.items_cart[i].variationName )); 
        } 
      }
    addAddress(addr, brgy, cty, prvn, pstCd){
      this.getFormArray("shippingAddress").push(this.newAddress(addr, brgy, cty, prvn, pstCd ))
    }
    addReceipt() {
      if ( this.url.length == 0) {
        this.getFormControl("orderStatus").setValue('To Pay')  
        this.getFormControl("receiptImage").setValue('') 
        }
      else  {
        this.getFormControl("orderStatus").setValue('Pending')   
        this.getFormControl("receiptImage").setValue( this.url);
      }
    }
  
  //checkbox i
  getAddressChecked(e: any, name) {
    this.getFormArray("shippingAddress").reset
    if(e.target.checked){
      if(name == 'sameAddress') {
        this.isFormValid = false;
        this.isDiffAddress =false;
      }
      else{
        this.isFormValid = true;
        this.isDiffAddress =true;     
      }
    }
  }
    //checkbox i
    getCourier(e: any, name) {
     // this.courierRate.pop(0, this.courierRate.length);
      this.isCourierSelected = false;
      if(e.target.checked){
        if(name == 'LBC') {
          this.getFormControl("courier").setValue('LBC');
          var lbc = ['Metro Manila - P 150', 'Luzon - P 165', 'Visayaz & Mindanao - P 210']
          this.courierRate= lbc
        }
        else{
          this.getFormControl("courier").setValue('J&T');
          var jnt = ['Metro Manila - P 115','Luzon - P 165','Visayaz & Mindanao - P 195'  ]
          this.courierRate = jnt;
        }
      }
    }
  setAddress() {
    this.getFormArray("shippingAddress").clear();
    this.getFormArray("shippingAddress").reset();
    if( this.isDiffAddress == true) {
        this.addAddress(this.myChild.diffAddressForm.value.address1,
          this.myChild.diffAddressForm.value.barangay,
          this.myChild.diffAddressForm.value.city,
          this.myChild.diffAddressForm.value.province,
          this.myChild.diffAddressForm.value.postalCode )   
    }
    else {
      this.addAddress(this.userData.address,
        this.userData.barangay,
        this.userData.city,
        this.userData.region,
        this.userData.postalCode )  
    }
  }  

  remove()
  {
   this.ordersService.deletecart(this.authService.userToken)
  }
  save() {  
    this.ordersService.createOrder(this.checkoutForm.value) ; 
    this.router.navigate(['/my-account']);
  }
  
  ngAfterViewChecked() {
    if(this.isDiffAddress == true) {
      if(this.myChild.diffAddressForm?.valid == true) {
        this.isFormValid = false;
      }
      else {
        this.isFormValid = true;
      }
      
    }
  } 

  onProceed()
  { 
    this.getFormControl("customerName").setValue(this.userData.firstName + ' ' + this.userData.lastName)
    this.getFormControl("customerEmail").setValue(this.userData.email)
    this.getFormControl("totalPayment").setValue(this.totalPrice);
    this.addReceipt();
    this.addProduct();
    this.setAddress();
    this.save();
    this.remove();
    console.log(this.checkoutForm.value )
  }

}
