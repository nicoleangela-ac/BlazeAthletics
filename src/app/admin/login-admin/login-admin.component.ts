import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/service/admin-auth.service';
import { AdminWriteData } from 'src/app/service/admin-write-data.service';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  adminLogin: FormGroup;
  date: string;
  errorMessage:string = null;


  constructor(private authService: AdminAuthService, private logAdminEntry: AdminWriteData, private router: Router) { }

  ngOnInit(){
    this.adminLogin = new FormGroup({

      "username": new FormControl(null,[Validators.required, Validators.email]),
      "password": new FormControl(null,[Validators.required])

      }
    );
  }

  onSubmit()
  {
    this.date = new Date().toLocaleString();

    this.authService.login(this.adminLogin.value.username, this.adminLogin.value.password).subscribe
    (responseData => {
      this.logAdminEntry.logAdminEntry(responseData.localId, this.date).subscribe(
        response => {
        this.router.navigate(['/dashboard-admin']);
      }, 
        error => {
          localStorage.removeItem('adminData');
          this.errorHandling(error);
        });
    }, errorMessage =>{
      this.errorMessage = errorMessage;
    } 
  );
  }

  errorHandling(error: any)
  {
    switch(error.status)
    {
      case 401:
        this.errorMessage = "Unauthorized email or password";
    }
  }
}
