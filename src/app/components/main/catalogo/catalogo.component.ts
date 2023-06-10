import { Component, OnInit } from '@angular/core';
import { DMaestro } from 'src/app/entitys/maestro/dMaestro';
import { CartaPlatosWeb } from 'src/app/entitys/platos/cartaPlatosWeb';
import { Platos } from 'src/app/entitys/platos/platos';
import { MainFunction } from 'src/app/shared/functions/mainFunction';
import { VariablesGlobales } from 'src/app/shared/functions/variablesGlobales';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  arrayOrden:DMaestro[] = [
    {idDMaestro:1, codDMaestro:'menorMayor-0', descripcion:"Precio de menor a mayor", abreviacion:""},
    {idDMaestro:2, codDMaestro:'mayorMenor-1', descripcion:"Precio de mayor a menor", abreviacion:""},
    {idDMaestro:3, codDMaestro:'masVendido-2', descripcion:"Mas vendido", abreviacion:""},
    {idDMaestro:4, codDMaestro:'menorVendido-3', descripcion:"Menor vendido", abreviacion:""},
    {idDMaestro:5, codDMaestro:'mejorCalificados-4', descripcion:"Mejor calificados", abreviacion:""},
  ];

  arrayCategoria:DMaestro[] = [
    {idDMaestro:1, codDMaestro:'bebida-0', descripcion:"Bebidas", abreviacion:""},
    {idDMaestro:2, codDMaestro:'piqueos-1', descripcion:"Piqueos", abreviacion:""},
    {idDMaestro:3, codDMaestro:'gourmet-2', descripcion:"Gourmet", abreviacion:""},
    {idDMaestro:4, codDMaestro:'veganas-3', descripcion:"Veganos", abreviacion:""},
    {idDMaestro:5, codDMaestro:'americano-4', descripcion:"Americano", abreviacion:""},
  ];
  arrayPrecio:DMaestro[] = [
    {idDMaestro:1, codDMaestro:'0-20-0', descripcion:"S/.0 a S/.20", abreviacion:""},
    {idDMaestro:2, codDMaestro:'21-40-1', descripcion:"S/.21 a S/. 40", abreviacion:""},
    {idDMaestro:3, codDMaestro:'41-60-2', descripcion:"S/.41 a S/.60", abreviacion:""},
    {idDMaestro:4, codDMaestro:'61-more-3', descripcion:"S/.61 a mas", abreviacion:""}
  ];

  platosArray:Platos[] = [
    {idPlatos:1,nomPlato:"Hamburguesa Americana",precio:5.90,urlImagen:"assets/images/hamburguesa-via-shutterstock.jpg",idCategoria:1,nomCategoria:"Americano",flagInShoppingCar:false,waitTime:"1:00",detallePlato:[
      {idPlatosDetalle:1,idPlatos:1,idIngrediente:1,nomIngrediente:"Pan",cantidad:10,idMedida:1,nomMedida:"gramo",abrMedida:"gr"},
      {idPlatosDetalle:2,idPlatos:1,idIngrediente:2,nomIngrediente:"Cebolla",cantidad:10,idMedida:1,nomMedida:"gramo",abrMedida:"gr"},
      {idPlatosDetalle:3,idPlatos:1,idIngrediente:3,nomIngrediente:"Tomate",cantidad:10,idMedida:1,nomMedida:"gramo",abrMedida:"gr"},
      {idPlatosDetalle:4,idPlatos:1,idIngrediente:4,nomIngrediente:"Carne",cantidad:100,idMedida:1,nomMedida:"gramo",abrMedida:"gr"}
    ]},
    {idPlatos:2,nomPlato:"Hamburguesa Americana 2",precio:4.90,urlImagen:"assets/images/hamburguesa-via-shutterstock.jpg",idCategoria:1,nomCategoria:"Americano",flagInShoppingCar:false,waitTime:"1:00",detallePlato:[
      {idPlatosDetalle:1,idPlatos:1,idIngrediente:1,nomIngrediente:"Pan",cantidad:10,idMedida:1,nomMedida:"gramo",abrMedida:"gr"},
      {idPlatosDetalle:2,idPlatos:1,idIngrediente:2,nomIngrediente:"Cebolla",cantidad:10,idMedida:1,nomMedida:"gramo",abrMedida:"gr"},
      {idPlatosDetalle:3,idPlatos:1,idIngrediente:3,nomIngrediente:"Tomate",cantidad:10,idMedida:1,nomMedida:"gramo",abrMedida:"gr"},
      {idPlatosDetalle:4,idPlatos:1,idIngrediente:4,nomIngrediente:"Carne",cantidad:100,idMedida:1,nomMedida:"gramo",abrMedida:"gr"}
    ]},
    {idPlatos:3,nomPlato:"Hamburguesa Americana",precio:5.90,urlImagen:"assets/images/hamburguesa-via-shutterstock.jpg",idCategoria:1,nomCategoria:"Americano",flagInShoppingCar:false,waitTime:"1:00",detallePlato:[
      {idPlatosDetalle:1,idPlatos:1,idIngrediente:1,nomIngrediente:"Pan",cantidad:10,idMedida:1,nomMedida:"gramo",abrMedida:"gr"},
      {idPlatosDetalle:2,idPlatos:1,idIngrediente:2,nomIngrediente:"Cebolla",cantidad:10,idMedida:1,nomMedida:"gramo",abrMedida:"gr"},
      {idPlatosDetalle:3,idPlatos:1,idIngrediente:3,nomIngrediente:"Tomate",cantidad:10,idMedida:1,nomMedida:"gramo",abrMedida:"gr"},
      {idPlatosDetalle:4,idPlatos:1,idIngrediente:4,nomIngrediente:"Carne",cantidad:100,idMedida:1,nomMedida:"gramo",abrMedida:"gr"}
    ]},
    {idPlatos:4,nomPlato:"Hamburguesa Americana",precio:5.90,urlImagen:"assets/images/hamburguesa-via-shutterstock.jpg",idCategoria:1,nomCategoria:"Americano",flagInShoppingCar:false,waitTime:"1:00",detallePlato:[
      {idPlatosDetalle:1,idPlatos:1,idIngrediente:1,nomIngrediente:"Pan",cantidad:10,idMedida:1,nomMedida:"gramo",abrMedida:"gr"},
      {idPlatosDetalle:2,idPlatos:1,idIngrediente:2,nomIngrediente:"Cebolla",cantidad:10,idMedida:1,nomMedida:"gramo",abrMedida:"gr"},
      {idPlatosDetalle:3,idPlatos:1,idIngrediente:3,nomIngrediente:"Tomate",cantidad:10,idMedida:1,nomMedida:"gramo",abrMedida:"gr"},
      {idPlatosDetalle:4,idPlatos:1,idIngrediente:4,nomIngrediente:"Carne",cantidad:100,idMedida:1,nomMedida:"gramo",abrMedida:"gr"}
    ]},
    {idPlatos:5,nomPlato:"Hamburguesa Americana",precio:5.90,urlImagen:"assets/images/hamburguesa-via-shutterstock.jpg",idCategoria:1,nomCategoria:"Americano",flagInShoppingCar:false,waitTime:"1:00",detallePlato:[
      {idPlatosDetalle:1,idPlatos:1,idIngrediente:1,nomIngrediente:"Pan",cantidad:10,idMedida:1,nomMedida:"gramo",abrMedida:"gr"},
      {idPlatosDetalle:2,idPlatos:1,idIngrediente:2,nomIngrediente:"Cebolla",cantidad:10,idMedida:1,nomMedida:"gramo",abrMedida:"gr"},
      {idPlatosDetalle:3,idPlatos:1,idIngrediente:3,nomIngrediente:"Tomate",cantidad:10,idMedida:1,nomMedida:"gramo",abrMedida:"gr"},
      {idPlatosDetalle:4,idPlatos:1,idIngrediente:4,nomIngrediente:"Carne",cantidad:100,idMedida:1,nomMedida:"gramo",abrMedida:"gr"}
    ]},
    {idPlatos:6,nomPlato:"Hamburguesa Americana",precio:5.90,urlImagen:"assets/images/hamburguesa-via-shutterstock.jpg",idCategoria:1,nomCategoria:"Americano",flagInShoppingCar:false,waitTime:"1:00",detallePlato:[
      {idPlatosDetalle:1,idPlatos:1,idIngrediente:1,nomIngrediente:"Pan",cantidad:10,idMedida:1,nomMedida:"gramo",abrMedida:"gr"},
      {idPlatosDetalle:2,idPlatos:1,idIngrediente:2,nomIngrediente:"Cebolla",cantidad:10,idMedida:1,nomMedida:"gramo",abrMedida:"gr"},
      {idPlatosDetalle:3,idPlatos:1,idIngrediente:3,nomIngrediente:"Tomate",cantidad:10,idMedida:1,nomMedida:"gramo",abrMedida:"gr"},
      {idPlatosDetalle:4,idPlatos:1,idIngrediente:4,nomIngrediente:"Carne",cantidad:100,idMedida:1,nomMedida:"gramo",abrMedida:"gr"}
    ]},
    {idPlatos:7,nomPlato:"Inka Kola",precio:1.90,urlImagen:"assets/images/inkakola.png",idCategoria:2,nomCategoria:"Bebidas",flagInShoppingCar:false,waitTime:"1:00",detallePlato:[]},
    {idPlatos:8,nomPlato:"Coca Cola",precio:1.90,urlImagen:"assets/images/cocacola.jpg",idCategoria:2,nomCategoria:"Bebidas",flagInShoppingCar:false,waitTime:"1:00",detallePlato:[]}
  ];

  platoChosen:Platos = new Platos();

  constructor(public variableGlobales:VariablesGlobales, private mainFunction:MainFunction) { }

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
    data.flagInShoppingCar = false;
    this.variableGlobales.itemInShoppingCart = this.variableGlobales.itemInShoppingCart.filter(d => d.idPlatos !== data.idPlatos);
  }

  detailItem(data:Platos){
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

  receiveRegister(data:Platos){
    this.platoChosen = data;
  }
}
