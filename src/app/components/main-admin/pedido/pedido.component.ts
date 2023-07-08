import { Component } from '@angular/core';
import { Pedido } from 'src/app/entitys/pedido';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent {

  pedidos:Pedido[] = [];
  constructor(){}
}
