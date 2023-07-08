import { Injectable } from '@angular/core';
import { HttpClient } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { TextShared } from '../shared/functions/textShared';

@Injectable({
  providedIn: 'root'
})
export class PlatoService {
  url = environment.urlApi + 'Plato/';
  textCarga = "Plato ";

  constructor(private httpClient: HttpClient, private textShared:TextShared) {}
}
