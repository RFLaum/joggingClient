import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders}
  from '@angular/common/http';
import {Observable} from 'rxjs';

import {ReaderService} from './reader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private reader: ReaderService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.reader.loggedIn()){
      return next.handle(req);
    }
    let header: HttpHeaders = new HttpHeaders({"Authorization": this.reader.getAuth()});
    const copiedReq = req.clone({
      headers: req.headers.set("Authorization", this.reader.getAuth())
    });
    return next.handle(copiedReq);
  }
}
