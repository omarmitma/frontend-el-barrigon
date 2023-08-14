import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TextShared } from '../shared/functions/textShared';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {
  url = environment.urlApi + 'Estadisticas/';
  textCarga = "Estadisticas ";

  constructor(private httpClient: HttpClient, private textShared:TextShared) {}

  public buscar_estadisticas(fecIni:string,fecFin:string): Promise<HttpResponse<any>>{
    this.textShared.textCarga = "Buscando " + this.textCarga;
    return new Promise((resolve, reject)=>{
      this.httpClient
      .get<any>(this.url + `buscar_estadisticas?fecIni=${fecIni}&fecFin=${fecFin}`,{ observe: 'response' })
      .subscribe(response=>{
        resolve(response);
      },err=>reject(err));
    });
  }
}
