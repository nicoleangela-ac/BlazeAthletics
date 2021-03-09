import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AdminAuthService } from "../service/admin-auth.service";
import { AdminWriteData } from "../service/admin-write-data.service";

@Injectable({
    providedIn: 'root'
})
export class AdminAccessGuard implements CanActivate
{

    isAdmin = false;

    constructor(private adminWrite: AdminWriteData, private router: Router, private authService: AdminAuthService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree > | Observable<boolean | UrlTree>
    {

        return this.router.createUrlTree(['/login-admin']);
    }
}