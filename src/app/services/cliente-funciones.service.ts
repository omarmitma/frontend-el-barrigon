import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TextShared } from '../shared/functions/textShared';
import { Cliente } from '../entitys/cliente';
import { ClienteFunciones } from '../entitys/clienteFunciones';
import { MainFunction } from '../shared/functions/mainFunction';

@Injectable({
  providedIn: 'root'
})
export class ClienteFuncionesService {
  url = environment.urlApi + 'ClienteFunciones/';
  textCarga = "Cliente Funciones";

  constructor(private httpClient: HttpClient, private textShared:TextShared, private mainFunction:MainFunction) {}

  public registro(user:ClienteFunciones): Promise<HttpResponse<any>>{
    this.textShared.textCarga = "Insertando " + this.textCarga;
    return new Promise((resolve, reject)=>{
      this.httpClient
      .post<any>(this.url + `registro`,user,{ observe: 'response' })
      .subscribe(response=>{
        resolve(response);
      },err=>reject(err));
    });
  }
  public actualizar(user:ClienteFunciones): Promise<HttpResponse<any>>{
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
  public eliminar_ByCliente(idCliente:number): Promise<HttpResponse<any>>{
    this.textShared.textCarga = "Eliminando " + this.textCarga;
    return new Promise((resolve, reject)=>{
      this.httpClient
      .delete<any>(this.url + `eliminar_ByCliente?idCliente=${idCliente}`,{ observe: 'response' })
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
  public buscar_ByCliente(idCliente:number): Promise<HttpResponse<any>>{
    this.textShared.textCarga = "Buscando " + this.textCarga;
    return new Promise((resolve, reject)=>{
      this.httpClient
      .get<any>(this.url + `buscar_ByCliente?idCliente=${idCliente}`,{ observe: 'response' })
      .subscribe(response=>{
        resolve(response);
      },err=>reject(err));
    });
  }

  public changeMesa(user:ClienteFunciones,idMesaAnterior:number): Promise<HttpResponse<any>>{
    this.textShared.textCarga = "Cambiando mesa " + this.textCarga;
    return new Promise((resolve, reject)=>{
      this.httpClient
      .put<any>(this.url + `changeMesa?idMesaAnterior=${idMesaAnterior}`,user,{ observe: 'response' })
      .subscribe(response=>{

        const user = 'Usuario';
        const message = 'Mesa funciones insertado';
        this.mainFunction.sendMessage(user, message);

        resolve(response);
      },err=>reject(err));
    });
  }
}
