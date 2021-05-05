import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/service/admin-auth.service';
import { AdminWriteData } from 'src/app/service/admin-write-data.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {

  errorMessage: string = null;

  constructor(private adminAuth: AdminAuthService,
    private adminWrite: AdminWriteData,
    private router: Router) { }

  ngOnInit(): void {
  }

  onLogout()
  {
    this.adminAuth.logout();
    this.router.navigate(['/login-admin']);
  }

  orderDetails()
  {
    this.errorMessage = null;
    this.adminWrite.verifyAdminAccess().subscribe(response => 
      {
        this.router.navigate(['/orders-topay']);
      }, error=>{
        this.errorMessage = "Unauthorized Account!";
      });
  }

  inventory()
  {
    this.errorMessage = null;
    this.adminWrite.verifyClerkAccess().subscribe(response => {
      this.router.navigate(['/inventory']);
    }, error=>{
      this.errorMessage = "Unauthorized Account!";
    });
  }

  accountsRegistered()
  {
    this.errorMessage = null;
    this.adminWrite.verifyAdminAccess().subscribe(response => 
      {
        this.router.navigate(['/accounts-registered']);
      }, error=>{
        this.errorMessage = "Unauthorized Account!";
      })
  }
}
