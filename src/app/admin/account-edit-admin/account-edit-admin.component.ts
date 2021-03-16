import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminData } from 'src/app/models/admin-data-model';
import { AdminAuthService } from 'src/app/service/admin-auth.service';
import { AdminDataServices } from 'src/app/service/admin-data.service';
import { AdminWriteData } from 'src/app/service/admin-write-data.service';
import { PasswordReset } from 'src/app/service/password-reset.service';

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
  isDisable: boolean;

  errorMessage: string = null;
  message: string = null;

  constructor(private adminService: AdminDataServices, 
    private adminWrite: AdminWriteData, 
    private router: Router,
    private resetPassword: PasswordReset,
    private adminAuthService: AdminAuthService){}

  ngOnInit(){ 
    this.adminData = this.adminService.getAdmin(this.index);
    this.adminEditForm = new FormGroup({
      "name": new FormControl(this.adminData.name, [Validators.required]),
      "email": new FormControl(this.adminData.email, [Validators.required, Validators.email]),
      "contactNumber": new FormControl(this.adminData.contactNumber, [Validators.required]),
      "role": new FormControl(this.adminData.role, [Validators.required]),
      "oldPassword": new FormControl(null),
      "newPassword": new FormControl(null)
    });
    this.adminData.email = this.adminEditForm.value.email;
    this.adminEditForm.controls['email'].disable();
  }
  onFinish()
  {
    this.router.navigate(['/accounts-registered']);
  }

  onSubmit()
  {
    this.message = null;
    this.errorMessage = null;
    
    this.adminData.name = this.adminEditForm.value.name;
    this.adminData.contactNumber = this.adminEditForm.value.contactNumber;
    this.adminData.role = this.adminEditForm.value.role;

    this.adminService.updateAdmin(this.index,this.adminData);

    this.adminWrite.addAdmin(this.adminData.UID, this.adminData.role).subscribe();
    this.adminWrite.putAdminData();

    if(this.adminEditForm.value.oldPassword != null && this.adminEditForm.value.newPassword != null)
    {
      this.adminAuthService.authenticate(this.adminData.email, this.adminEditForm.value.oldPassword).subscribe(response => 
        {
          this.resetPassword.resetAdminPassword(this.adminEditForm.value.newPassword, response.idToken).subscribe(response => {
              this.message = "Password Changed!";
          }, error =>{
            this.errorMessage = "An Error occured";
          });
        }, error => 
        {
          this.errorMessage = "Invalid Password!";
       });
    }
  }
}
