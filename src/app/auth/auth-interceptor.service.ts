import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.user.pipe(
            take(1),
            exhaustMap(
                user => {
                    if (user) {
                        const reqWithToken = req.clone({ params: req.params.append('auth', user.token) })
                        return next.handle(reqWithToken)
                    } else {
                        return next.handle(req)
                    }
                    
                }
            )
        )
    }

}