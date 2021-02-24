import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminData } from 'src/app/models/admin-data-model';
import { AdminDataServices } from 'src/app/service/admin-data.service';
import { AdminWriteData } from 'src/app/service/admin-write-data.service';

@Component({
  selector: 'app-account-edit-admin',
  templateUrl: './account-edit-admin.component.html',
  styleUrls: ['./account-edit-admin.component.css']
})
export class AccountEditAdminComponent implements OnInit {

  index: number = this.adminService.indexNumber;
  adminSubscription: Subscription;
  adminData: AdminData = null;
  adminEditForm: FormGroup; 

  constructor(private adminService: AdminDataServices, private adminWrite: AdminWriteData, private router: Router) 
  {
    
  }

  ngOnInit(){ 
    this.adminData = this.adminService.getAdmin(this.index);
    this.adminEditForm = new FormGroup({
      "name": new FormControl(this.adminData.name, [Validators.required]),
      "email": new FormControl(this.adminData.email, [Validators.required, Validators.email]),
      "contactNumber": new FormControl(this.adminData.contactNumber, [Validators.required]),
    });
  }

  onFinish()
  {
    this.router.navigate(['/accounts-registered']);
  }

  onSubmit()
  {
    this.adminData.name = this.adminEditForm.value.name;
    this.adminData.email = this.adminEditForm.value.email;
    this.adminData.contactNumber = this.adminEditForm.value.contactNumber;

    this.adminService.updateAdmin(this.index,this.adminData);
    this.adminWrite.putAdminData();


    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/account-edit']);
  }); 
  }
}
