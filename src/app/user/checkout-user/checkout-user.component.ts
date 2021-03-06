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
  isDiffAddress = false;
  isCourierSelected = true;
  isFormValid = true;
  url : string[];
  totalPrice: number;
  status: string;
  courierSite: string;
  public isCollapsed = false;
  todayDate : Date = new Date();
  dateOrder: any

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
    this.dateOrder = this.todayDate;
    this.courierSite = null;
    this.totalPrice = null;
    this.status = null;
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
        for (let file of files) {
          let reader = new FileReader();
          reader.onload = (e: any) => { this.url.push(e.target.result) ;}
          reader.readAsDataURL(file);
        } } }

    checkoutProduct() {
      this.checkoutForm = new FormGroup ({
        "productMessage" : new FormControl(),
        "shippingAddress" : new FormArray([]),
        "customerId": new FormControl(this.authService.userToken),
        "cutomerName" : new FormControl(),
        "customerEmail": new FormControl(),
        "receiptImage" : new FormControl(),
        "orderProduct" : new FormArray([]),
        "orderDate" : new FormControl(this.todayDate.toTimeString()),
        "orderStatus" : new FormControl(''),
        "courier" : new FormControl(''),
        "trackingNum": new FormControl('')
          })
      }
    courier(): FormControl{ return this.checkoutForm.get("courier") as FormControl}
    date(): FormControl{ return this.checkoutForm.get("orderDate") as FormControl}
    orderStat(): FormControl{ return this.checkoutForm.get("orderStatus") as FormControl}
    name(): FormControl{ return this.checkoutForm.get("cutomerName") as FormControl}
    email(): FormControl{ return this.checkoutForm.get("customerEmail") as FormControl}
    products(): FormArray { return this.checkoutForm.get("orderProduct") as FormArray }
    images(): FormControl { return this.checkoutForm.get("receiptImage") as FormControl }
    address(): FormArray { return this.checkoutForm.get("shippingAddress") as FormArray }
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
      this.products().clear();
      this.products().reset();
        for(var i in this.items_cart) {
          this.products().push(this.newProduct(this.items_cart[i].noItem,
            this.items_cart[i].price,
            this.items_cart[i].productId,
            this.items_cart[i].productImage,
            this.items_cart[i].productName,
            this.items_cart[i].size,
            this.items_cart[i].variationName )); 
        } 
      }
    addAddress(addr, brgy, cty, prvn, pstCd){
      this.address().push(this.newAddress(addr, brgy, cty, prvn, pstCd ))
    }
    addReceipt() {
      if ( this.url.length == 0) {
        this.orderStat().setValue('To Pay')  
        this.images().setValue('') 
        }
      else  {
        this.orderStat().setValue('Pending')   
        this.images().setValue( this.url);
      }
    }
  
  //checkbox i
  getAddressChecked(e: any, name) {
    this.address().reset
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
      this.isCourierSelected = false;
      if(e.target.checked){
        if(name == 'LBC') {
          this.courier().setValue('LBC');
          this.courierSite = "https://www.lbcexpress.com/rates?fbclid=IwAR1dMKd2vf34lJV7dzjxl8o15EL6yujN0V5sEStnmt4qjZIRXndPEPjxf7A"
        }
        else{
          this.courier().setValue('J&T');
          this.courierSite = "https://www.jtexpress.ph/index/query/query.html?fbclid=IwAR0ooAx4gQa6VheBd1gMKNqXp607npThiBs5D1imUJ_eEF1YxD58QySgMTQ"  
        }
      }
    }
  setAddress() {
    this.address().clear();
    this.address().reset();
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
    this.name().setValue(this.userData.firstName + ' ' + this.userData.lastName)
    this.email().setValue(this.userData.email)
    this.addReceipt();
    this.addProduct();
    this.setAddress();
    this.save();
    this.remove();
    console.log(this.checkoutForm.value )
  }

}
