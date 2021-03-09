import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminWriteData } from 'src/app/service/admin-write-data.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  constructor(private adminWrite: AdminWriteData,
    private router: Router) { }

  errorMessage:string = null;
    

  ngOnInit()
  {
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
