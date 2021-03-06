import { diffAddress } from './../../models/user-different-Address';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, ViewChild, Input, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-checkout-diff-address',
  templateUrl: './checkout-diff-address.component.html',
  styleUrls: ['./checkout-diff-address.component.css']
})
export class CheckoutDiffAddressComponent implements OnInit {

  @Output() diffAddressForm : FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.getForm();
  }
  getForm() {
    this.diffAddressForm = new FormGroup( {
      'address1' : new FormControl('', Validators.required),
      'barangay' : new FormControl('', Validators.required), 
      'city' : new FormControl('', Validators.required),
      'province' : new FormControl('', Validators.required),
      'postalCode' : new FormControl('', Validators.required),
    })
  }
  getinputField (field) : FormControl { return this.diffAddressForm?.get(field) as FormControl  }
  }


