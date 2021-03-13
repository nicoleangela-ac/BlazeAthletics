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
  url : string[];
  isSizeLarge = false;
  toReceiveOrders = [];
  otherOrders = []; 

  public isCollapsed = false;

  constructor(private authService: AuthenticationService, 
              private router: Router,
              private service : OrdersFirebaseService)
               {  }

  ngOnInit() {
    this.url = new Array<string>();
    this.toReceiveOrders = [];
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
        console.log(this.orders)
        for (var i in this.orders) {
          if(this.orders[i].orderStatus == 'To Pay' )  {
            this.toPayOrders.push(this.orders[i]);
            console.log(this.toPayOrders);
          }
          if(this.orders[i].orderStatus == 'On Delivery') {
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


  }
  



