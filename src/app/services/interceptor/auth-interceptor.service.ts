import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { throwError, Observable, BehaviorSubject,lastValueFrom, from } from "rxjs";
import { catchError, filter, take, switchMap, retry } from "rxjs/operators";
import { Alert } from 'src/app/shared/functions/alerts';
import { MainFunction } from 'src/app/shared/functions/mainFunction';
import { TextShared } from 'src/app/shared/functions/textShared';

import { NO_API_KEY } from './skipApiKey';
import { TIPO_TOKEN } from './typeToken';

@Injectable({
  providedIn: 'root'
})


export class AuthInterceptorService implements HttpInterceptor{
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(private alert:Alert, private router:Router,
    private textShared:TextShared){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //Agregamos el token
    this.textShared.resetCronometro();
   
    request = this.addAuthenticationToken(request);

    return from(this.handle(request, next)).pipe(
      retry(1),
      catchError(async(error: HttpErrorResponse) => {
        if (error && error.status === 401) {
          //Si es necesario el token
          if(request.context.get(NO_API_KEY)){
            this.alert.alertError("Credenciales Incorrectas","");
            return throwError(error);
          }
          if(request.context.get(TIPO_TOKEN) === 0){
            this.router.navigate(['']);
            return throwError(error);
          }
        }
        else {

          this.textShared.textCarga = "ERROR -" + this.textShared.textCarga;

          if(error.error === null){
            this.alert.alertErrorHtml2(`Error ${error.status}`,error.message);
          }
          else if(error.error.errors !== undefined){
            this.alert.alertErrorHtml2(`Error ${error.status}`,JSON.stringify(error.error.errors).toString());
          }
          else{
            this.alert.alertErrorHtml2(`Error ${error.status}`,error.error);
          }
        
          return throwError(error);
        }
      })
    ) as Observable<HttpEvent<any>>;

  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    return await lastValueFrom(next.handle(this.addAuthenticationToken(req)));
  }

  //
  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token:any) => next.handle(this.addAuthenticationToken(request)))
    );
  }


  //Agregamos el token en la cabezera
  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    //Si no es necesario un token
    if (request.context.get(NO_API_KEY)) {
      return request;
    }
    //Agregamos en la cabezera el token
    return request.clone({
      setHeaders: {
        // 'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      }
    });
  }

}
