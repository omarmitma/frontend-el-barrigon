import { Injectable } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';
import { HubConnectionBuilder } from '@microsoft/signalr/dist/esm/index.js';

@Injectable({
  providedIn: 'root'
})
export class TestSignalrService {

  private hubConnection: HubConnection;

  constructor() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:44328/hub') // URL del hub de SignalR
      .build();


      this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
        console.log(`Mensaje recibido de ${user}: ${message}`);
      });

  }

  startConnection(){
    this.hubConnection.start()
    .then(_ => {
      console.log('Connection Started');
    }).catch(error => {
      return console.error(error);
    });
  }


  receiveMessage(){
    this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
      console.log(`Mensaje recibido de ${user}: ${message}`);
    });
  }


  sendMessage(text:string){
    this.hubConnection.invoke('NewMessage', 'Usuario', text)
    .catch(error => {
      console.error('Error al enviar el mensaje al hub de SignalR:', error);
    });
  }

  
}
