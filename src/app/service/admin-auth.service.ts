import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { UserModel } from "../models/user-model";
import { AuthenticationService, AuthResponseData } from "./authentication.service";

@Injectable({
    providedIn: 'root'
})
export class AdminAuthService
{
    admin = new BehaviorSubject<UserModel>(null);

    public userToken:string = null;
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router, private authService: AuthenticationService){}

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
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDBGdXX-Qx_hzU3Ah8ZXoNcJ51gChdCPoA', {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            catchError(this.authService.handleError), 
            tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);    
        }));
    }

    adminSignUp(email: string, password: string)
    {
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDBGdXX-Qx_hzU3Ah8ZXoNcJ51gChdCPoA',{
        email: email,
        password: password,
        returnSecureToken: true
        }).pipe(
            catchError(this.authService.handleError)
        );
    }

    authenticate(email: string, password: string)
    {
       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDBGdXX-Qx_hzU3Ah8ZXoNcJ51gChdCPoA',{
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            catchError(this.authService.handleError));
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
       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDBGdXX-Qx_hzU3Ah8ZXoNcJ51gChdCPoA',{
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            catchError(this.authService.handleError), 
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
      } = JSON.parse(localStorage.getItem('adminData'));


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
            this.admin.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
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

        this.admin.next(null);
        this.router.navigate(['/login-admin']);
        localStorage.removeItem('adminData');
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

    adminSignOut(idToken: string)
    {
      return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyDBGdXX-Qx_hzU3Ah8ZXoNcJ51gChdCPoA',
        {
        idToken: idToken 
        }
      ).pipe(
          catchError(this.authService.handleError)
      );
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
        this.admin.next(user);
        this.userToken = localId;

        //timer expects milliseconds, expiresIn is in seconds.
        this.autoLogout(expiresIn * 1000);

        //storing the user data in the browser storage. Converts the javascript JSON into a string.
        localStorage.setItem('adminData', JSON.stringify(user));
    }
}