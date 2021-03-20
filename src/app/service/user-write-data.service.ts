import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { UserData } from "../models/user-data-model";
import { UserDataService } from "./user-data.service";

@Injectable({
    providedIn: 'root'
})
export class UserWriteData
{

    constructor(private http : HttpClient, private userService: UserDataService){}

    deleteUser(UID: string)
    {
     return this.http.delete('https://blazeathletics-e3a6e-default-rtdb.firebaseio.com/userData/'+UID+'.json');
    }

    putUserData(UID: string)
    {
      const userData = this.userService.getUsersData();  
      return this.http.put('https://blazeathletics-e3a6e-default-rtdb.firebaseio.com/userData/' + UID +'.json', userData);  
    }

    getUsers(UID: string)
    {
     return this.http.get<UserData[]>('https://blazeathletics-e3a6e-default-rtdb.firebaseio.com/userData/' + UID +'.json').pipe(
        map(userData => {
            return userData;
        }), tap(userData =>
            {
            this.userService.setUserData(userData);
            }));
    }   
}