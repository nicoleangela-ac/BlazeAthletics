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
    
      return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBTRcYBzEsw1Hl1bDrtc5mB-cC17PazJlw',
      {
        requestType: OOB,
        email: email
      });
    }

    resetAdminPassword(password: string, idToken: string)
    {
      let returnSecureToken = false;
      return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBTRcYBzEsw1Hl1bDrtc5mB-cC17PazJlw', 
      {
        idToken: idToken,
        password: password,
        returnSecureToken: returnSecureToken
      })
    }

    resetUserPassword(password: string, idToken: string)
    {
      let returnSecureToken = false;
      return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBTRcYBzEsw1Hl1bDrtc5mB-cC17PazJlw', 
      {
        idToken: idToken,
        password: password,
        returnSecureToken: returnSecureToken
      })
    }
}