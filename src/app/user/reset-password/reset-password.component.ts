import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordReset } from 'src/app/service/password-reset.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup;
  errorMessage: string = null;
  message: string = null;

  constructor(private passwordReset: PasswordReset) { }

  ngOnInit()
  {
    this.resetForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email])
    });
  }

  onCancel()
  {
    this.resetForm.reset();
  }

  onSubmit()
  {

    this.errorMessage = null;

    this.passwordReset.resetPassword(this.resetForm.value.email).subscribe(response => {
      this.message = 'Email Successfully sent!';
    }, error => {
      
      console.log(error.error.error.message);

      switch(error.error.error.message)
      {
        case "EMAIL_NOT_FOUND":
          this.errorMessage = 'Account does not exist!';
      }
    });
  }
}
