import { HttpHandler, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs/operators";
import { AdminAuthService } from "./admin-auth.service";

@Injectable()
export class AdminAuthInterceptorService 
{
    constructor(private authService: AdminAuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler)
    {
        return this.authService.admin.pipe(take(1), exhaustMap(user => {

            if(!user)
            {
                return next.handle(req);
            }

            const modifiedReq = req.clone({
                    params: new HttpParams().set('auth', user.token)});
                    return next.handle(modifiedReq);
        }));
    }
}