import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/service/admin-auth.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {

  constructor(private adminAuth: AdminAuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onLogout()
  {
    this.adminAuth.logout();
    this.router.navigate(['/login-admin']);
  }
}
