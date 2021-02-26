import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminData } from 'src/app/models/admin-data-model';
import { AdminAuthService } from 'src/app/service/admin-auth.service';
import { AdminDataServices } from 'src/app/service/admin-data.service';
import { AdminWriteData } from 'src/app/service/admin-write-data.service';

@Component({
  selector: 'app-accounts-registered-admin',
  templateUrl: './accounts-registered-admin.component.html',
  styleUrls: ['./accounts-registered-admin.component.css']
})
export class AccountsRegisteredAdminComponent implements OnInit, OnDestroy {

  adminData: AdminData[];
  adminSubscription: Subscription;
  searching = false;
  password: string = null;
  searchIdChecker: string = null;
  searchId: string = null;

  newSearchAdminData: AdminData[] = [];

  constructor(private adminWrite: AdminWriteData, private adminService: AdminDataServices, private adminAuthService: AdminAuthService) { }

  ngOnInit(){
    this.adminWrite.getAdmins();

   this.adminSubscription = this.adminService.adminDataChanged.subscribe(
      (adminData: AdminData[]) => 
      {
        this.adminData = adminData;
      }
    );
    this.adminData = this.adminService.getAdminData();
  }
  
  onClick(place: number)
  {
    console.log(place)
  }

  onDelete(place: number)
  {

    this.adminAuthService.authenticate(this.adminData[place].email, this.password).subscribe(response =>
      {
        this.adminAuthService.adminSignOut(response.idToken).subscribe();
      }
    );

    this.adminWrite.deleteAdmin(this.adminData[place].UID).subscribe();
    this.adminService.deleteAdmin(place);
    this.adminWrite.putAdminData();
  }

  onSearch(searchId: string)
  {
      this.searchId = searchId;
      this.searchIdChecker = this.searchId;
      this.searchNow(); 
  }

  searchNow()
  {
    let search: AdminData[] = [];
    let j = 0;
    for(let i = 0; i <= this.adminData.length - 1; i++)
    {
      if(this.adminData[i].name.toLowerCase().replace(' ', '').includes(this.searchIdChecker.toLowerCase().replace(' ', '')))
      {
        search[j] = this.adminData[i];
        j++;
      }
      else if(this.adminData[i].email.toLowerCase().replace(' ', '').includes(this.searchIdChecker.toLowerCase().replace(' ', '')))
      {
        search[j] = this.adminData[i];
        j++;
      }
    }
    this.newSearchAdminData = search;
  }

  onInput(password: string)
  {
    this.password = password;
  }

  addIndex(index: number)
  { 
    this.adminService.indexNumber = index;
  }

  ngOnDestroy()
  {
    if(this.adminSubscription != null)
    {
      this.adminSubscription.unsubscribe();
    }
  }
}
