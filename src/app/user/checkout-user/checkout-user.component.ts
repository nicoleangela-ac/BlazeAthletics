import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout-user',
  templateUrl: './checkout-user.component.html',
  styleUrls: ['./checkout-user.component.css']
})
export class CheckoutUserComponent implements OnInit {
  title = 'appBootstrap';
  
  public isCollapsed = false;
  constructor() { }

  ngOnInit(): void {
  }

}
