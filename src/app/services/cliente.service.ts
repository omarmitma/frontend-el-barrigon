import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TextShared } from '../shared/functions/textShared';
import { Cliente } from '../entitys/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  url = environment.urlApi + 'Clientes/';
  textCarga = "Cliente ";

  constructor(private httpClient: HttpClient, private textShared:TextShared) {}

  public registro(user:Cliente): Promise<HttpResponse<any>>{
    this.textShared.textCarga = "Insertando " + this.textCarga;
    return new Promise((resolve, reject)=>{
      this.httpClient
      .post<any>(this.url + `registro`,user,{ observe: 'response' })
      .subscribe(response=>{
        resolve(response);
      },err=>reject(err));
    });
  }
  public actualizar(user:Cliente): Promise<HttpResponse<any>>{
    this.textShared.textCarga = "Actualizando " + this.textCarga;
    return new Promise((resolve, reject)=>{
      this.httpClient
      .put<any>(this.url + `actualizar`,user,{ observe: 'response' })
      .subscribe(response=>{
        resolve(response);
      },err=>reject(err));
    });
  }
  public eliminar(idUser:number): Promise<HttpResponse<any>>{
    this.textShared.textCarga = "Eliminando " + this.textCarga;
    return new Promise((resolve, reject)=>{
      this.httpClient
      .delete<any>(this.url + `eliminar?id=${idUser}`,{ observe: 'response' })
      .subscribe(response=>{
        resolve(response);
      },err=>reject(err));
    });
  }
  public buscar(idUser:number): Promise<HttpResponse<any>>{
    this.textShared.textCarga = "Buscando " + this.textCarga;
    return new Promise((resolve, reject)=>{
      this.httpClient
      .get<any>(this.url + `buscar?id=${idUser}`,{ observe: 'response' })
      .subscribe(response=>{
        resolve(response);
      },err=>reject(err));
    });
  }
}
