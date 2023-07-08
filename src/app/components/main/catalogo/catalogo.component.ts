import { Component, OnInit } from '@angular/core';
import { Images } from 'src/app/entitys/otros/images';
import { CartaPlatosWeb } from 'src/app/entitys/otros/cartaPlatosWeb';
import { Alert } from 'src/app/shared/functions/alerts';
import { MainFunction } from 'src/app/shared/functions/mainFunction';
import { VariablesGlobales } from 'src/app/shared/functions/variablesGlobales';
import { DetalleMaestro } from 'src/app/entitys/detalleMaestro';
import { Platos } from 'src/app/entitys/platos';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  arrayOrden:DetalleMaestro[] = [];

  arrayCategoria:DetalleMaestro[] = [];
  arrayPrecio:DetalleMaestro[] = [];

  platosArray:Platos[] = [];

  platoChosen:Platos = new Platos();
  typeCrud:string = "";

  constructor(public variableGlobales:VariablesGlobales, private mainFunction:MainFunction, private alert:Alert) { }

  ngOnInit(): void {
  }

  returnCartaPlatosWeb(){
    let cartaReturn:CartaPlatosWeb[] = [];

    this.platosArray.forEach(data => {
      let cartaNow = cartaReturn.filter(d => d.idCategoria === data.idCategoria);
      let cartaAdd:CartaPlatosWeb = new CartaPlatosWeb();
      cartaAdd.idCategoria = data.idCategoria;
      cartaAdd.nomCategoria = data.nomCategoria;
      cartaAdd.platos.push(data);
      if(cartaNow.length > 0)cartaNow[0].platos.push(data);
      else cartaReturn.push(cartaAdd);
    
    });

    return cartaReturn;
  }

  addItem(data:Platos){
    data.flagInShoppingCar = true;
    this.variableGlobales.itemInShoppingCart.push(data);
  }

  deleteItem(data:Platos){
    this.alert.alertQuestion("¿Desea quitar este item?","").then(resolve => {
      if(resolve.isConfirmed){
        data.flagInShoppingCar = false;
        this.variableGlobales.itemInShoppingCart = this.variableGlobales.itemInShoppingCart.filter(d => d.idPlato !== data.idPlato);
      }
    });
  }

  detailItem(data:Platos){
    this.typeCrud = "Ver";
    this.platoChosen = data;
    this.mainFunction.openModalSearch("wrapModalDetallarPlato");
    
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

  receiveChangeCrud(crud:string){
    this.typeCrud = crud;
  }
  receiveRegister(data:Platos){
    this.platosArray[this.platosArray.indexOf(this.platoChosen)] = data;
  }
}
