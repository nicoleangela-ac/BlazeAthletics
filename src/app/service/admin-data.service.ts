import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AdminData } from "../models/admin-data-model";

@Injectable({
    providedIn: 'root'
})
export class AdminDataServices
{
  adminDataChanged = new Subject<AdminData[]>();


  private adminData: AdminData[] = [];
  indexNumber: number = null;

  getAdminData()
  {
      if(this.adminData != null){
      return this.adminData.slice();
      }
      return this.adminData;
  }

  getAdmin(index: number)
  {
    return this.adminData[index];
  }

  updateAdmin(index: number, newAdminData: AdminData)
  {
    this.adminData[index] = newAdminData;
    this.adminDataChanged.next(this.adminData.slice());
    this.setAdminData(this.adminData.slice());
  }

  addAdmin(admin: AdminData)
  {
    if(this.adminData != null || this.adminData.length != 0)
    {
      this.adminData.push(admin);
    } 
    else
    {
      this.adminData = [new AdminData(admin.name, admin.UID, 
        admin.email, 
        admin.contactNumber, 
        admin.role)];
    }   
    this.adminDataChanged.next(this.adminData.slice());
  }

  deleteAdmin(index: number)
  {
    this.adminData.splice(index, 1);
    this.adminDataChanged.next(this.adminData.slice());
  }

  setAdminData(adminData: AdminData[])
  {
      this.adminData = adminData;
      if(this.adminData != null){
          this.adminDataChanged.next(this.adminData.slice());
      }
  }
}