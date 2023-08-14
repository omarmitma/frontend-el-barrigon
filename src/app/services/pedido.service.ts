import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { TextShared } from '../shared/functions/textShared';
import { Pedido } from '../entitys/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  url = environment.urlApi + 'Pedidos/';
  textCarga = "Pedido ";

  constructor(private httpClient: HttpClient, private textShared:TextShared) {}

  public registrar(user:Pedido): Promise<HttpResponse<any>>{
    this.textShared.textCarga = "Insertando " + this.textCarga;
    return new Promise((resolve, reject)=>{
      this.httpClient
      .post<any>(this.url + `registro`,user,{ observe: 'response' })
      .subscribe(response=>{
        resolve(response);
      },err=>reject(err));
    });
  }

  public confirmPedido(user:Pedido): Promise<HttpResponse<any>>{
    this.textShared.textCarga = "Insertando " + this.textCarga;
    return new Promise((resolve, reject)=>{
      this.httpClient
      .put<any>(this.url + `confirmPedido`,user,{ observe: 'response' })
      .subscribe(response=>{
        resolve(response);
      },err=>reject(err));
    });
  }

  public actualizar(user:Pedido): Promise<HttpResponse<any>>{
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

  public buscar_All(): Promise<HttpResponse<any>>{
    this.textShared.textCarga = "Buscando " + this.textCarga;
    return new Promise((resolve, reject)=>{
      this.httpClient
      .get<any>(this.url + `buscar_All`,{ observe: 'response' })
      .subscribe(response=>{
        resolve(response);
      },err=>reject(err));
    });
  }

  public terminar_pedido(user:Pedido): Promise<HttpResponse<any>>{
    this.textShared.textCarga = "Terminando " + this.textCarga;
    return new Promise((resolve, reject)=>{
      this.httpClient
      .put<any>(this.url + `terminar_pedido`,user,{ observe: 'response' })
      .subscribe(response=>{
        resolve(response);
      },err=>reject(err));
    });
  }

  public cancelar_pedido(user:Pedido): Promise<HttpResponse<any>>{
    this.textShared.textCarga = "Terminando " + this.textCarga;
    return new Promise((resolve, reject)=>{
      this.httpClient
      .put<any>(this.url + `cancelar_pedido`,user,{ observe: 'response' })
      .subscribe(response=>{
        resolve(response);
      },err=>reject(err));
    });
  }
}
