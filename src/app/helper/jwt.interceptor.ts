import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private readonly secureApiUrls = [
    '/api/Auth/GetUserWishlist',
    '/api/Auth/AddToWishlist',
    '/api/Product/GetProducts',
    '/api/Auth/EditUserDetails',
    '/api/Auth/GetCurrentUser',
    '/api/Auth/GetCountries',
    '/api/Auth/GetCities',
    '/api/Auth/GetStates',
    '/api/Auth/AddOrUpdateUserAddress',
    '/api/Auth/GetUserAddresses',
    '/api/Auth/DeletedUserAddress',
    '/api/Auth/GetOrdersGrandTotal'
  ];
  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = localStorage.getItem('UserContext');
    if (user == null || user == undefined) {
      return next.handle(request);
    }
    var parsedJson = JSON.parse(user);
    const token = parsedJson.token

    const shouldAttachToken = this.secureApiUrls.some(url =>
      request.url.includes(url)
    );

    if (token && shouldAttachToken) {
      const cloned = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(cloned);
    }

    return next.handle(request);
  }
}
