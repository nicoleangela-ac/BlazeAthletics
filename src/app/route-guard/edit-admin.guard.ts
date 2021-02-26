import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AdminDataServices } from "../service/admin-data.service";

@Injectable({
    providedIn: 'root'
})
export class EditAdminGuard implements CanActivate
{
    constructor(private router: Router, private accountEdit: AdminDataServices){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree > | Observable<boolean | UrlTree>
    {
            if(this.accountEdit.indexNumber != null)
            {
              return true;  
            }
            return this.router.createUrlTree(['/accounts-registered']);
    }
}