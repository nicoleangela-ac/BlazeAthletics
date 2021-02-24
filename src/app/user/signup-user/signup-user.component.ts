import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-signup-user',
  templateUrl: './signup-user.component.html',
  styleUrls: ['./signup-user.component.css']
})
export class SignupUserComponent implements OnInit, OnDestroy {

  signUpForm: FormGroup;
  authSub: Subscription;
  errorMessage: String = null;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(){
    this.signUpForm = new FormGroup({
      "firstName": new FormControl(null,[Validators.required]),
      "middleName": new FormControl(null,[Validators.required]),
      "lastName": new FormControl(null,[Validators.required]),
      "address": new FormControl(null,[Validators.required]),
      "barangay": new FormControl(null,[Validators.required]),
      "city": new FormControl(null,[Validators.required]),
      "region": new FormControl(null,[Validators.required]),
      "postalCode": new FormControl(null,[Validators.required, Validators.maxLength(4), Validators.minLength(4)]),
      "email": new FormControl(null, [Validators.required, Validators.email]),

      "passwordField" : new FormGroup({
          "password": new FormControl(null, [Validators.required, Validators.minLength(6)]),
          "confirmPassword": new FormControl(null, [Validators.required, Validators.minLength(6)])
        },{validators: this.matchingPassword})
      }
    );
  }

  onSubmit()
  {
   this.authSub = this.authService.signUp(this.signUpForm.value.email, this.signUpForm.value.passwordField.password)
   .subscribe(resData => {
    this.router.navigate(['/my-account']);
   }, 
    errorMessage => {
        this.errorMessage = errorMessage;
      }
    );
  }
  
  ngOnDestroy()
  {
    if(this.authSub)
    {
      this.authSub.unsubscribe(); 
    }
  }

  onCancel()
  {
    this.signUpForm.reset();
  }

  matchingPassword(formGroup: FormGroup): {[s: string] : boolean}
  {
  const password = formGroup.get('password').value;
  const confirmPassword = formGroup.get('confirmPassword').value;

  return password === confirmPassword ? null : { notMatchingPassword: true };
  }
}
