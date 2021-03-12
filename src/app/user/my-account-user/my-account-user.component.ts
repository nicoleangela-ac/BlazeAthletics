import { DataSnapshot } from '@angular/fire/database/interfaces';
import { AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { OrdersFirebaseService } from './../../service/orders-firebase.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-my-account-user',
  templateUrl: './my-account-user.component.html',
  styleUrls: ['./my-account-user.component.css']
})
export class MyAccountUserComponent implements OnInit{

  title = 'appBootstrap';
  orders: any;
  toPayOrders = []
  tempData : any[];
  url : string[];
  isSizeLarge = false;
  toReceiveOrders = [];
  otherOrders = []; 
  UIDdata : any[];
  public isCollapsed = false;

  constructor(private authService: AuthenticationService, 
              private router: Router,
              private service : OrdersFirebaseService)
               {  }

  ngOnInit() {
    this.url = new Array<string>();
    this.toReceiveOrders = [];
    this.tempData = [];
    this.otherOrders = [];
    this.toPayOrders = [];
    this.UIDdata = [];

      this.service.getUserOrder(this.authService.userToken).snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(datas => {
        this.orders = datas; 
        console.log(this.orders)
        for (var i in this.orders) {
          if(this.orders[i].orderStatus == 'To Pay' )  {
            this.toPayOrders.push(this.orders[i]);
            console.log(this.toPayOrders);
          }
          if(this.orders[i].orderStatus == 'To Receive') {
            this.toReceiveOrders.push(this.orders[i]);
          }
          else  {
            this.otherOrders.push(this.orders[i]);
            console.log(this.otherOrders);
          }
      } }); 
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
  updateStatus(UID) {
 //   console.log( this.toPayOrders)
 //   console.log(UID)
   for(var i in this.toPayOrders ) {
      if (UID == this.toPayOrders[i].key){
      //  this.UIDdata.push(this.toPayOrders[i].orderStatus)
      this.toPayOrders[i].orderStatus = "Pending";
      this.toPayOrders[i].receiptImage = this.url;
        console.log(this.toPayOrders[i])
        this.service.updateOrder(UID,  this.toPayOrders[i]);
        window.location.reload();        
    }} 
    
  }

  onLogOut()
  {
    this.authService.logout();
  }


  }
  



