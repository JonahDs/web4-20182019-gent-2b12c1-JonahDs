import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { LoginService } from '../services/login.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenicationInterceptor implements HttpInterceptor {
    constructor(private loginService: LoginService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if(this.loginService.token.length) {
          const cloneRequest = req.clone({
              headers: req.headers.set('Authorization', `Bearer ${this.loginService.token}`)
          });
          return next.handle(cloneRequest);
      }
      return next.handle(req);
    }
    
}