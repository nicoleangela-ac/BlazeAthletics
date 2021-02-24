import { HttpHandler, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs/operators";
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class AuthenticationInterceptorService
{
    constructor(private authService: AuthenticationService){}

    intercept(req: HttpRequest<any>, next: HttpHandler)
    {
        return this.authService.user.pipe(take(1), exhaustMap(user => {

            if(!user)
            {
                return next.handle(req);
            }

            const modifiedReq = req.clone({
                    params: new HttpParams().set('auth', user.token)});
                    console.log(modifiedReq);
            return next.handle(modifiedReq);
        }));
    }
}