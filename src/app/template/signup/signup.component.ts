import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserData } from 'src/app/models/user-data-model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserDataService } from 'src/app/service/user-data.service';
import { UserWriteData } from 'src/app/service/user-write-data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  userData: UserData;
  userDataForm: FormGroup;
  message: string = null;

  constructor(private userDataService: UserDataService, private userWriteService: UserWriteData, private userAuthService: AuthenticationService) 
  {

  }

  ngOnInit()
  {
    this.userWriteService.getUsers(this.userAuthService.userToken).subscribe(responseData => {
      this.userData = this.userDataService.getUser(0);
      this.userDataForm = new FormGroup({
        "firstname": new FormControl(this.userData.firstName, [Validators.required]),
        "middlename": new FormControl(this.userData.middleName, [Validators.required]),
        "lastname": new FormControl(this.userData.lastName, [Validators.required]),
        "suffix": new FormControl(this.userData.suffix),
        "address": new FormControl(this.userData.address, [Validators.required]),
        "barangay": new FormControl(this.userData.barangay, [Validators.required]),
        "city": new FormControl(this.userData.city, [Validators.required]),
        "region": new FormControl(this.userData.region, [Validators.required]),
        "postalCode": new FormControl(this.userData.postalCode, [Validators.required])
      });
    });
  }

  onSubmit()
  {
    this.userData.firstName = this.userDataForm.value.firstname;
    this.userData.lastName = this.userDataForm.value.lastname;
    this.userData.middleName = this.userDataForm.value.middlename;
    this.userData.suffix = this.userDataForm.value.suffix;
    this.userData.address = this.userDataForm.value.address;
    this.userData.barangay = this.userDataForm.value.barangay;
    this.userData.city = this.userDataForm.value.city;
    this.userData.region = this.userDataForm.value.region;
    this.userData.postalCode = this.userDataForm.value.postalCode;

    this.userDataService.updateUser(0, this.userData);
    this.userWriteService.putUserData(this.userAuthService.userToken).subscribe(response => {
      this.message = "Successfully Saved."
    });
  }
}
