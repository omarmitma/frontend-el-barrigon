import { Component } from '@angular/core';
import { Platos } from 'src/app/entitys/platos';
import { Alert } from 'src/app/shared/functions/alerts';
import { VariablesGlobales } from 'src/app/shared/functions/variablesGlobales';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {

  constructor(public variablesGlobales:VariablesGlobales,private alert:Alert){}

  deleteItem(item:Platos){
    this.alert.alertConfirm("¿Desea eliminar este Item?","").then(resolve => {
      if(resolve.isConfirmed){
        this.variablesGlobales.itemInShoppingCart = this.variablesGlobales.itemInShoppingCart.filter(d => d !== item);
      }
    });
  }

  changeQuantity(item:Platos,tipo:number){
    if(tipo === 1)item.cantidad ++;
    else if(tipo === 2 && item.cantidad > 1)item.cantidad --;
  }
}
