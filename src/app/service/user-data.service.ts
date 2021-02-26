import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { UserData } from "../models/user-data-model";

@Injectable({
    providedIn: 'root'
})
export class UserDataService
{
    userDataChanged = new Subject<UserData[]>();


    private userData: UserData[] = [];
    indexNumber: number = null;

    getUsersData()
    {
        if(this.userData != null){
            return this.userData.slice();
        }
        return this.userData;
    }

    getUser(index: number)
    {
      return this.userData[index];
    }

    updateUser(index: number, newUserData: UserData)
    {
      this.userData[index] = newUserData;
      this.userDataChanged.next(this.userData.slice());
      this.setUserData(this.userData.slice());
    }

    adduser(user: UserData)
    {
      if(this.userData != null)
      {
        this.userData.push(user);
      } 
      else
      {
        this.userData = [new UserData(
            user.firstName,
            user.middleName,
            user.lastName,
            user.address,
            user.barangay,
            user.city,
            user.region,
            user.postalCode,
            user.email,
            user.suffix
        )];
      }   
      this.userDataChanged.next(this.userData.slice());
    }

    deleteUser(index: number)
    {
      this.userData.splice(index, 1);
      this.userDataChanged.next(this.userData.slice());
    }

    setUserData(userData: UserData[])
    {
        this.userData = userData;
        if(this.userData != null){
            this.userDataChanged.next(this.userData.slice());
        }
    }
}