import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class PasswordReset
{

    constructor(private http: HttpClient){}

    resetPassword(email: string)
    {
      let OOB = 'PASSWORD_RESET';
    
      return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDBGdXX-Qx_hzU3Ah8ZXoNcJ51gChdCPoA',
      {
        requestType: OOB,
        email: email
      });
    }

    resetAdminPassword(password: string, idToken: string)
    {
      let returnSecureToken = false;
      return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDBGdXX-Qx_hzU3Ah8ZXoNcJ51gChdCPoA', 
      {
        idToken: idToken,
        password: password,
        returnSecureToken: returnSecureToken
      })
    }
}