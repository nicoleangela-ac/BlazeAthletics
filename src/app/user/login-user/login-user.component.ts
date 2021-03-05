import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  loginForm: FormGroup; 
  error: string = null;

  constructor(private authService: AuthenticationService,
    private router: Router){}

  ngOnInit(){
    this.loginForm = new FormGroup({
      'email': new FormControl(null,[Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onCancel()
  {
    this.loginForm.reset();
    this.router.navigate(['/']);
  }

  onForgot()
  {

  }

  onSubmit(){
    if(!this.loginForm.valid){return;}

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.authService.login(email, password).subscribe(responseData => {
        this.router.navigate(['/my-account']);
      }, errorMessage =>{
        this.error = errorMessage;
      } 
    );
  }
}
