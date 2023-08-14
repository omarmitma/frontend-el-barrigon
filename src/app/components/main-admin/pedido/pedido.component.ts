import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/entitys/pedido';
import { PedidoService } from 'src/app/services/pedido.service';
import { Alert } from 'src/app/shared/functions/alerts';
import { MainFunction } from 'src/app/shared/functions/mainFunction';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit{

  pedidos:Pedido[] = [];

  constructor(private pedidoService:PedidoService, private mainFunction:MainFunction, private alert:Alert){}

  async ngOnInit(): Promise<void> {
    await this.getPedidos();
    this.mainFunction.onReceiveMessage(async(user: string, message: string) => {
      // Lógica para manejar el mensaje recibido
      await this.getPedidos();
    });
  }

  async getPedidos(){
    await this.pedidoService.buscar_All().then(resolve => {
      this.pedidos = resolve.body.message;
    });
  }

  async terminarPedido(pedido:Pedido){
    this.alert.alertConfirm("¿Desea terminar este pedido?","").then(async(resolve) => {
      if(resolve.isConfirmed){
        await this.pedidoService.terminar_pedido(pedido).then();
        await this.getPedidos();
        this.alert.alertSucces("Terminado Exitosamente");
      }
    });
  }

  async cancelarPedido(pedido:Pedido){
    this.alert.alertConfirm("¿Desea cancelar este pedido?","").then(async(resolve) => {
      if(resolve.isConfirmed){
        await this.pedidoService.cancelar_pedido(pedido).then();
        await this.getPedidos();
        this.alert.alertSucces("Cancelado Exitosamente");
      }
    });
  }
}
