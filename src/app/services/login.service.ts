import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { skipApiKey } from './interceptor/skipApiKey';
import { UsuarioLogin } from '../entitys/usuarioLogin';
import { TextShared } from '../shared/functions/textShared';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = environment.urlApi + 'login/';
  textCarga = "Logeo ";

  constructor(private httpClient: HttpClient, private textShared:TextShared) {}

  public loginUsuario(user:UsuarioLogin): Promise<HttpResponse<any>>{
    this.textShared.textCarga = "Insertando " + this.textCarga;
    return new Promise((resolve, reject)=>{
      this.httpClient
      .post<any>(this.url + `logeo`,user,{ context: skipApiKey(), observe: 'response' })
      .subscribe(response=>{
        resolve(response);
      },err=>reject(err));
    });
  }

}
