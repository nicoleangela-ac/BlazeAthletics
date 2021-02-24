import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-my-account-user',
  templateUrl: './my-account-user.component.html',
  styleUrls: ['./my-account-user.component.css']
})
export class MyAccountUserComponent{

  title = 'appBootstrap';
  
  public isCollapsed = false;
  constructor(private authService: AuthenticationService, private router: Router) { }

  onLogOut()
  {
    this.authService.logout();
  }
}
