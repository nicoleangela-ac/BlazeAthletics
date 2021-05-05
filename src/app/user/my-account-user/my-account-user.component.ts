import { DataSnapshot } from '@angular/fire/database/interfaces';
import { AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { OrdersFirebaseService } from './../../service/orders-firebase.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, FormArray, FormBuilder, FormControlName } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-my-account-user',
  templateUrl: './my-account-user.component.html',
  styleUrls: ['./my-account-user.component.css']
})
export class MyAccountUserComponent implements OnInit{
  feedbackForm : FormGroup;
  title = 'appBootstrap';
  orders: any;
  userID : any;
  toPayOrders = []
  url : string[];
  isSizeLarge = false;
  completedOrders = [];
  otherOrders: any[]; 
  tempOrders: any;
  isOrderEmpty = false;
  isOrderEmptyPay= false;
  isOrderEmptyRecieve=false;
  UIDdata : any
  comment : any[];
  condition: any[];
  feedbacks: any[]
  public isCollapsed = false;
  public isCollapseOrder = true;

  constructor(private authService: AuthenticationService, 
              private router: Router,
              private service : OrdersFirebaseService,
              private modalService: NgbModal,
              private fb:FormBuilder)
               {  }

  ngOnInit() {
    this.UIDdata = [];
    this.comment = [];
    this.condition= [];
    this.feedbacks=[];
    this.url = new Array<string>();
    this.completedOrders = [];
    this.otherOrders = [];
    this.toPayOrders = [];

      this.service.getUserOrder(this.authService.userToken).snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(datas => {
        this.orders = datas;
        this.tempOrders=datas; 
       // console.log(this.orders)
       /* for (var i in this.orders) {
          if(this.orders[i].orderStatus == 'To Pay' )  {
            this.toPayOrders.push(this.orders[i]);
            console.log(this.toPayOrders);
          }
          if(this.orders[i].orderStatus == 'Completed') {
            this.completedOrders.push(this.orders[i]);
            console.log(this.completedOrders);
          }
          else  {
            this.otherOrders.push(this.orders[i]);
            console.log(this.otherOrders);
          } 
      } */ }); 
    //  this.feedbackFormed();
  }
  getinputField (field) : FormControl { return this.feedbackForm?.get(field) as FormControl  }
  getArrayField (field) : FormArray { return this.feedbackForm?.get(field) as FormArray  }

  feedbackFormed() {
    this.feedbackForm = new FormGroup ({
      "comments" : new FormArray([]),
      "condition" : new FormArray([]),
    })
  }

  addNewField(x) {
    
    if(x = 'comments'){
      this.getArrayField(x).push(this.fb.group({
        comment: ['']
      }))
    }
    else{
      this.getArrayField(x).push(
        this.fb.group({
          conditions: ['']
        })    )}
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
  orderPending(UID, image) {
    this.service.getOrderKey(UID).update(UID,{ orderStatus: "Pending", receiptImage : image });
    window.location.reload();        
  }

  orderReceive(UID) {
    this.service.getOrderKey(UID).update(UID,{ orderStatus: "Completed"});
    window.location.reload();         
     }

  onLogOut()
  {
    this.authService.logout();
  }
  
GetOrderStatus(status){
  this.isOrderEmpty = false;
  this.otherOrders.splice(0, this.otherOrders.length)
  this.toPayOrders.splice(0, this.toPayOrders.length) 
  this.completedOrders.splice(0, this.completedOrders.length)
  for(var i in this.tempOrders ) {
    if (this.tempOrders[i].orderStatus== status) {
    this.otherOrders.push(this.tempOrders[i]) 
    console.log(this.otherOrders)
    console.log(this.toPayOrders)
    console.log(this.completedOrders)
    
    this.toPayOrders.length=0
    this.completedOrders.length=0
  }
}
if(this.otherOrders.length <= 0 && this.toPayOrders.length == 0 && this.completedOrders.length == 0) {
  this.isOrderEmpty = true;
}

}
GetOrderStatusPay(stat){
  this.isOrderEmpty = false;
  this.otherOrders.splice(0, this.otherOrders.length)
  this.toPayOrders.splice(0, this.toPayOrders.length) 
  this.completedOrders.splice(0, this.completedOrders.length)
  for(var i in this.tempOrders ) {
    if (this.tempOrders[i].orderStatus== stat) {
    this.toPayOrders.push(this.tempOrders[i]) 
    console.log(this.toPayOrders)
    console.log(this.otherOrders)
    console.log(this.completedOrders)
    this.otherOrders.length=0
    this.completedOrders.length=0
  }
}
if(this.toPayOrders.length <= 0 && this.otherOrders.length == 0 && this.completedOrders.length == 0) {
  this.isOrderEmpty = true;
}

}

GetOrderStatusRecieve(stat){
  this.isOrderEmpty = false;
  this.otherOrders.splice(0, this.otherOrders.length)
  this.toPayOrders.splice(0, this.toPayOrders.length) 
  this.completedOrders.splice(0, this.completedOrders.length)
  for(var i in this.tempOrders ) {
    if (this.tempOrders[i].orderStatus== stat) {
    this.completedOrders.push(this.tempOrders[i]) 
    console.log(this.completedOrders)
   console.log(this.otherOrders)
   console.log(this.toPayOrders)
    this.otherOrders.length=0
    this.toPayOrders.length=0
  }
}
if(this.completedOrders.length <= 0 && this.otherOrders.length == 0 && this.toPayOrders.length == 0) {
  this.isOrderEmpty = true;
}

}

openVerticallyCentered(content, UID:string) {
 // this.getArrayField('condition').clear
//  this.getArrayField('comments').clear
this.condition.splice(0, this.condition.length)
this.comment.splice(0, this.comment.length)
this.feedbacks.splice(0, this.feedbacks.length)
  console.log(UID)
  this.userID = UID;
  this.UIDdata.pop();
  this.modalService.open(content);
  for(var i in this.tempOrders ) {
    if (UID == this.tempOrders[i].key){
      this.UIDdata.push(this.tempOrders[i] )
      for(var j in this.tempOrders[i].orderProduct) {
        this.comment.push('')
        this.condition.push('')
   //     this.addNewField('condition')
    //    this.addNewField('comments')
      }
    // console.log(this.orders)
    // console.log(this.orders[i].orderProduct[i].productName)
    }
  }

}
  submitFeedback() {
  // console.log(this.feedbackForm.value) 
  this.feedbacks.push(this.comment )
  this.feedbacks.push(this.condition)
  console.log(this.feedbacks)
  console.log(this.comment)
  console.log(this.condition)
   this.service.getOrderKey(this.userID).update(this.userID,{ feedback: this.feedbacks});
   this.modalService.dismissAll();      
 }
  


}
