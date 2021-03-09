import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AdminData } from "../models/admin-data-model";
import { AdminDataServices } from "./admin-data.service";
import { AuthenticationService } from "./authentication.service";

@Injectable({
    providedIn: 'root'
})
export class AdminWriteData
{
  admins = {};
  date = {};
  constructor(private http: HttpClient, private router: Router, private authService: AuthenticationService, private adminService: AdminDataServices){}

  logAdminEntry(adminUID: string, date: string)
  {   
   this.date[adminUID] = date;     
   return this.http.patch('https://blazestorage-92eaf-default-rtdb.firebaseio.com/adminLog.json', this.date);
  }

  deleteAdmin(UID: string)
  {
   return this.http.delete('https://blazestorage-92eaf-default-rtdb.firebaseio.com/admins/'+UID+'.json');
  }

  addAdmin(adminUID: string, position: string)
  { 
   this.admins[adminUID] = position;   
   return this.http.patch('https://blazestorage-92eaf-default-rtdb.firebaseio.com/admins.json', this.admins);
  }

  putAdminData()
  {
    const adminData = this.adminService.getAdminData();  
    this.http.put('https://blazestorage-92eaf-default-rtdb.firebaseio.com/adminData.json', adminData).subscribe();  
  }

  getAdmins()
  {
    this.http.get<AdminData[]>('https://blazestorage-92eaf-default-rtdb.firebaseio.com/adminData.json').subscribe(adminData => {
        this.adminService.setAdminData(adminData);
    });
  } 

  verifyClerkAccess()
  {
    return this.http.get('https://blazestorage-92eaf-default-rtdb.firebaseio.com/inventoryClerkCheck.json');
  }

  verifyAdminAccess()
  {
    return this.http.get('https://blazestorage-92eaf-default-rtdb.firebaseio.com/adminCheck.json');
  }

  verifyOwnerAccess()
  {
    return this.http.get('https://blazestorage-92eaf-default-rtdb.firebaseio.com/ownerCheck.json');
  }
}