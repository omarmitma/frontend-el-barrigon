import { Component, OnInit } from '@angular/core';
import { Images } from 'src/app/entitys/otros/images';
import { TestSignalrService } from 'src/app/services/test-signalr.service';
import { Alert } from 'src/app/shared/functions/alerts';
import { MainFunction } from 'src/app/shared/functions/mainFunction';
import { VariablesGlobales } from 'src/app/shared/functions/variablesGlobales';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { DetalleMaestro } from 'src/app/entitys/detalleMaestro';
import { Platos } from 'src/app/entitys/platos';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit{

  arrayOrden:DetalleMaestro[] = [];

  arrayCategoria:DetalleMaestro[] = [];
  arrayPrecio:DetalleMaestro[] = [];

  platosArray:Platos[] = [];

  constructor(public variableGlobales:VariablesGlobales, private mainFunction:MainFunction, private alert:Alert, private testSignalRService:TestSignalrService) { }

  private hubConnection: HubConnection;
  messages: string[] = [];
  user:string = "";
  message:string = "";
  ngOnInit(): void {

    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:44328/hub', {
         // 'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      })
      .build();

    this.hubConnection.start()
      .then(() => {
        console.log('Conexión establecida con el hub de SignalR');
      })
      .catch(error => {
        console.error('Error al establecer la conexión con el hub de SignalR:', error);
      });

    this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
      const fullMessage = `${user}: ${message}`;
      this.messages.push(fullMessage);
    });
  }


  sendMessage(user: string, message: string): void {
    this.hubConnection.send('SendMessage', user, message)
    .then(() => {
      console.log('Mensaje enviado');
    })
    .catch(error => {
      console.error('Error al enviar el mensaje:', error);
    });
  }

  //Paginacion
  pageAll:number[] = [1,2,3];
  pageActive:number = 1

  getPageAll(){
    // this.pageAll = [];
    // let num = Math.ceil(this.DatosFilter.length / this.mainFunction.maxRegister);
    // for(let i = 1; i <= num; i++){
    //   this.pageAll.push(i);
    // }
  }

  getRegisterByPage(){
    // let start = (this.pageActive - 1) * this.mainFunction.maxRegister;
    // let end = start + this.mainFunction.maxRegister;
    // this.DatosViewByPage = this.DatosFilter.slice(start,end)
  }

  receivePageActive(page:number){
    this.pageActive = page;
    this.getRegisterByPage();
  }

  testSignal(){
    
  }
  sendSignal(){
    this.testSignalRService.sendMessage("asdasdasdasd");
  }
}
