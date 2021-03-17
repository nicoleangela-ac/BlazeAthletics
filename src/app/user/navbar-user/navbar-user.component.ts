import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css']
})
export class NavbarUserComponent implements OnInit {

  constructor(private authService: AuthenticationService) {}

  private userSubscription: Subscription;

  isAuthenticated = false;

  ngOnInit(){
    this.userSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    }
  );
  }
}
