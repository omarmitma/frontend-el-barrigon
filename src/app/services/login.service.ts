import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../entitys/usuario';
import { skipApiKey } from './interceptor/skipApiKey';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = environment.urlApi + 'login';
  constructor(private httpClient: HttpClient) {}
  
  public loginUsuario( user:Usuario): Observable<any>{
    return this.httpClient
    .post<any>(this.url, user,{ context: skipApiKey() });
  }

}
