import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/entitys/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { Alert } from 'src/app/shared/functions/alerts';
import { MainFunction } from 'src/app/shared/functions/mainFunction';
import { VariablesGlobales } from 'src/app/shared/functions/variablesGlobales';


@Component({
  selector: 'app-inventario-ingrediente',
  templateUrl: './inventario-ingrediente.component.html',
  styleUrls: ['./inventario-ingrediente.component.scss']
})
export class InventarioIngredienteComponent implements OnInit {

  constructor(public variableGlobales:VariablesGlobales, private mainFunction:MainFunction, private alert:Alert, private router:Router,
    private productosService:ProductoService) { }

  async ngOnInit(): Promise<void> {
    await this.refreshInventario();
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

  editItem(data:Producto){
    this.alert.alertConfirm("¿Desea editar este registro?","").then(async(resolve) =>{
      if(resolve.isConfirmed){
        this.router.navigate([`/admin/ingredientes/edit/${data.idProducto}`]);
      }
    });
  }
  deleteItem(data:Producto){
    this.alert.alertConfirm("¿Seguro de eliminar este registro?","").then(async(resolve) => {
      if(resolve.isConfirmed){
        await this.productosService.eliminar(data.idProducto).then();
        await this.refreshInventario();
        this.alert.alertSucces("Eliminado exitosamente");
      }
    });
  }

  async refreshInventario(){
    await this.productosService.buscarAll_Inner().then(resolve => {
      if(resolve.status === 200){
        this.variableGlobales.productosArray = resolve.body.message;
      }
    });
  }
}
