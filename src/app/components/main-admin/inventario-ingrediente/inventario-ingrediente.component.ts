import { Component, OnInit } from '@angular/core';
import { DetalleMaestro } from 'src/app/entitys/detalleMaestro';
import { Producto } from 'src/app/entitys/producto';
import { Alert } from 'src/app/shared/functions/alerts';
import { MainFunction } from 'src/app/shared/functions/mainFunction';
import { VariablesGlobales } from 'src/app/shared/functions/variablesGlobales';


@Component({
  selector: 'app-inventario-ingrediente',
  templateUrl: './inventario-ingrediente.component.html',
  styleUrls: ['./inventario-ingrediente.component.scss']
})
export class InventarioIngredienteComponent implements OnInit {

  arrayOrden:DetalleMaestro[] = [];
  arrayCategoria:DetalleMaestro[] = [];
  arrayPrecio:DetalleMaestro[] = [];

  platosArray:Producto[] = [];

  constructor(public variableGlobales:VariablesGlobales, private mainFunction:MainFunction, private alert:Alert) { }

  ngOnInit(): void {
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
}
