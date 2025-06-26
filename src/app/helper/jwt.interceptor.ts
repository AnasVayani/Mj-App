import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from '../services/commonService';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private commonService: CommonService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = localStorage.getItem('UserContext');
    const currency = this.commonService.getCurrency();

    let headers: { [name: string]: string } = {
      'X-Currency': currency // ✅ Add currency header
    };

    if (user) {
      const parsedJson = JSON.parse(user);
      const token = parsedJson?.token;

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const clonedRequest = request.clone({
      setHeaders: headers
    });

    return next.handle(clonedRequest);
  }
}
