import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenicationInterceptor } from './authentication-interceptor';

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenicationInterceptor,
    multi: true
  }
];
