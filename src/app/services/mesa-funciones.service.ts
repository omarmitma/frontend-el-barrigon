import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TextShared } from '../shared/functions/textShared';
import { MesaFunciones } from '../entitys/mesaFunciones';
import { MainFunction } from '../shared/functions/mainFunction';

@Injectable({
  providedIn: 'root'
})
export class MesaFuncionesService {
  url = environment.urlApi + 'MesasFunciones/';
  textCarga = "Mesa funciones ";


  constructor(private httpClient: HttpClient, private textShared:TextShared, private mainFunction:MainFunction) {}

  public registrar(user:MesaFunciones): Promise<HttpResponse<any>>{
    this.textShared.textCarga = "Insertando " + this.textCarga;
    return new Promise((resolve, reject)=>{
      this.httpClient
      .post<any>(this.url + `registro`,user,{ observe: 'response' })
      .subscribe(response=>{
        const user = 'Usuario';
        const message = 'Mesa funciones insertado';
        this.mainFunction.sendMessage(user, message);

        resolve(response);
      },err=>reject(err));
    });
  }
  public actualizar(user:MesaFunciones): Promise<HttpResponse<any>>{
    this.textShared.textCarga = "Actualizando " + this.textCarga;
    return new Promise((resolve, reject)=>{
      this.httpClient
      .put<any>(this.url + `actualizar`,user,{ observe: 'response' })
      .subscribe(response=>{
        resolve(response);
      },err=>reject(err));
    });
  }
  public eliminar(idMesa:number): Promise<HttpResponse<any>>{
    this.textShared.textCarga = "Eliminando " + this.textCarga;
    return new Promise((resolve, reject)=>{
      this.httpClient
      .delete<any>(this.url + `eliminar?id=${idMesa}`,{ observe: 'response' })
      .subscribe(response=>{
        resolve(response);
      },err=>reject(err));
    });
  }

  public buscar(idMesa:number): Promise<HttpResponse<any>>{
    this.textShared.textCarga = "Buscando " + this.textCarga;
    return new Promise((resolve, reject)=>{
      this.httpClient
      .get<any>(this.url + `buscar?id=${idMesa}`,{ observe: 'response' })
      .subscribe(response=>{
        resolve(response);
      },err=>reject(err));
    });
  }
  public eliminar_ByMesa(idMesa:number): Promise<HttpResponse<any>>{
    this.textShared.textCarga = "Eliminando " + this.textCarga;
    return new Promise((resolve, reject)=>{
      this.httpClient
      .delete<any>(this.url + `eliminar_ByMesa?idMesa=${idMesa}`,{ observe: 'response' })
      .subscribe(response=>{
        resolve(response);
      },err=>reject(err));
    });
  }
  public buscar_ByMesa(idMesa:number): Promise<HttpResponse<any>>{
    this.textShared.textCarga = "Buscando " + this.textCarga;
    return new Promise((resolve, reject)=>{
      this.httpClient
      .get<any>(this.url + `buscar_ByMesa?idMesa=${idMesa}`,{ observe: 'response' })
      .subscribe(response=>{
        resolve(response);
      },err=>reject(err));
    });
  }
}
