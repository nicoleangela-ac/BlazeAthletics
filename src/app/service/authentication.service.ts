import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { UserModel } from "../models/user-model";
import { catchError, tap } from "rxjs/operators";

export interface AuthResponseData
{
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn:'root'
})
export class AuthenticationService
{
    user = new BehaviorSubject<UserModel>(null);

    public userToken:string = null;
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router){}

/**
 * 
 * @param email 
 * @param password
 * 
 * sends a POST request to firebase
 * to register and email and password
 * and returns (email, localId, idToken and expiresIn)
 * that get handled by handleAuthentication()
 */

    signUp(email: string, password: string)
    {
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCVs_D6J3MVqnPqyt1B2gaHwaPZsyJ8cXc', {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            catchError(this.handleError), 
            tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);    
        }));
    }

    /**
 * 
 * @param email 
 * @param password
 * 
 * sends a POST request to firebase
 * that checks and verifies the email and password sent
 * returns (email, localId, idToken and expiresIn)
 * that get handled by handleAuthentication()
 */

    login(email: string, password: string)
    {
       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCVs_D6J3MVqnPqyt1B2gaHwaPZsyJ8cXc',{
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            catchError(this.handleError), 
            tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }

    /**
     * Checks for an existing local file (via browser)
     * that contains user information
     * and automatically uses that information
     * to login the user
     */

    autoLogin()
    {
      const userData:{
          email:string,
          id: string,
          _token: string,
          _tokenExpirationDate: string
          //converts the string data into JSON
      } = JSON.parse(localStorage.getItem('userData'));

      const adminConfirm = JSON.parse(localStorage.getItem('adminData'));

      //if there is no user data, return nothing.
        if(!userData)
        {
            return;
        }

        const loadedUser = new UserModel(userData.email, userData.id, userData._token, new Date (userData._tokenExpirationDate));

        /**
         * checks if the tokenExpirationDate is valid
         * if it isn't, then do nothing
         * if it is, automatically update user subject
         **/

        if(loadedUser.token)
        {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
            this.userToken = userData.id;
        }
    }

    logout(){

        /**
         * sets the user observable to null
         * and navigates the user back to the login page.
         * 
         * removes the stored data (if any)
         * and stops the timer that will automatically log the user out
         */

        this.user.next(null);
        this.router.navigate(['/login-user']);
        localStorage.removeItem('userData');

        if(this.tokenExpirationTimer)
        {
            clearTimeout(this.tokenExpirationTimer);
        }
    }

    autoLogout(expirationDuration: number)
    {

        /**
         * sets a timer based on the tokenDuration
         * when the timer runs out, it will automatically
         * call logout()
         */

      this.tokenExpirationTimer = setTimeout(() => {
            this.logout();}
        ,expirationDuration);
    }

    private handleAuthentication(email: string, localId: string, token: string, expiresIn: number)
    {

        /**
         * handles the authentication by automatically
         * pushing the data to the user observable and
         * notifying all files that are subscribed.
         */

        const expirationDate = new Date(new Date().getTime() + expiresIn *1000);
        const user = new UserModel(email, localId, token, expirationDate);
        this.user.next(user);
        this.userToken = localId;

        //timer expects milliseconds, expiresIn is in seconds.
        this.autoLogout(expiresIn * 1000);

        //storing the user data in the browser storage. Converts the javascript JSON into a string.
        localStorage.setItem('userData', JSON.stringify(user));
    }

    public handleError(errorRes: HttpErrorResponse)
    {

        /**
         * handles the error that could be returned by firebase
         * and swaps out the firebase error code with a more user-friendly
         * message based on the code
         * 
         * firebase error code is in firebase auth API
         */

        let errorMessage = 'An unknown error occured';

        //if there is no error code, throw the default error message
        if(!errorRes.error || !errorRes.error.error)
        {
            return throwError(errorMessage);
        }

        switch(errorRes.error.error.message)
        {
          case 'EMAIL_EXISTS':
            errorMessage = 'This email already exists!';
            break;
          case 'INVALID_PASSWORD':  
          case 'EMAIL_NOT_FOUND':
            errorMessage = 'Email or password was not correct';
            break;
          default:
              errorMessage = 'An Error Occurred';    
        }
        return throwError(errorMessage);
    }
}