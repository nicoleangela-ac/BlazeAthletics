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

  toReceiveOrders = [];
  otherOrders = []; 
  public isCollapsed = false;
  constructor(private authService: AuthenticationService, 
              private router: Router,
              private service : OrdersFirebaseService)
               {  }

  ngOnInit() {
    this.toReceiveOrders = [];
    this.otherOrders = [];
    this.toPayOrders = [];
    this.service.getUserOrder(this.authService.userToken).valueChanges().subscribe(data => {
      this.orders = data; 
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
      }    } )
  }


  onLogOut()
  {
    this.authService.logout();
  }


  }
  



