import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminData } from 'src/app/models/admin-data-model';
import { AdminAuthService } from 'src/app/service/admin-auth.service';
import { AdminDataServices } from 'src/app/service/admin-data.service';
import { AdminWriteData } from 'src/app/service/admin-write-data.service';

@Component({
  selector: 'app-accounts-new-admin',
  templateUrl: './accounts-new-admin.component.html',
  styleUrls: ['./accounts-new-admin.component.css']
})
export class AccountsNewAdminComponent implements OnInit {

  addAccountForm: FormGroup;
  errorMessage: string = null;
  message: string = null;

  constructor(private adminAuth: AdminAuthService, private adminWrite: AdminWriteData, private adminDataService: AdminDataServices) { }
  ngOnInit()
  {
    this.addAccountForm = new FormGroup(
      {
        "name": new FormControl(null, [Validators.required]),
        "email": new FormControl(null, [Validators.email, Validators.required]),
        "contactNumber": new FormControl(null, [Validators.required]),
        "password": new FormControl(null, [Validators.required, Validators.minLength(6)]),
        "role": new FormControl('Admin',[Validators.required])
      }
    );
  }

  onClear()
  {
    this.addAccountForm.reset();
  }

  onSubmit()
  {
    const name = this.addAccountForm.value.name;
    const email = this.addAccountForm.value.email;
    const password = this.addAccountForm.value.password;
    const contactNumber = this.addAccountForm.value.contactNumber;

    this.adminAuth.adminSignUp(email, password).subscribe(responseData => 
      {

          this.adminDataService.addAdmin(new AdminData(name, responseData.localId, email, contactNumber, this.addAccountForm.value.role));

        this.adminWrite.addAdmin(responseData.localId, this.addAccountForm.value.role).subscribe(
          response => {
            this.adminWrite.putAdminData();
            this.adminWrite.logAdminEntry(responseData.localId, "Admin not logged in yet").subscribe();
            this.message = "Account added successfully!";
            this.onClear();
          }
        );
      }, error => 
      {
        this.errorMessage = error;
      }
    );
  }
}
