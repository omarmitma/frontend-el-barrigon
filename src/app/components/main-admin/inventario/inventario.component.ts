import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Images } from 'src/app/entitys/otros/images';
import { Platos } from 'src/app/entitys/platos';
import { PlatoService } from 'src/app/services/plato.service';
import { TestSignalrService } from 'src/app/services/test-signalr.service';
import { Alert } from 'src/app/shared/functions/alerts';
import { MainFunction } from 'src/app/shared/functions/mainFunction';
import { VariablesGlobales } from 'src/app/shared/functions/variablesGlobales';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit{

  constructor(public variableGlobales:VariablesGlobales, private mainFunction:MainFunction, private alert:Alert, private platosService:PlatoService,
    private router:Router) { }

  messages: string[] = [];
  user:string = "";
  message:string = "";
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

  editItem(data:Platos){
    this.alert.alertConfirm("¿Desea editar este registro?","").then(async(resolve) =>{
      if(resolve.isConfirmed){
        this.router.navigate([`/admin/inventario/edit/${data.idPlato}`]);
      }
    });
  }
  deleteItem(data:Platos){
    this.alert.alertConfirm("¿Seguro de eliminar este registro?","").then(async(resolve) => {
      if(resolve.isConfirmed){
        await this.platosService.eliminar(data.idPlato).then();
        await this.refreshInventario();
        this.alert.alertSucces("Eliminado exitosamente");
      }
    });
  }

  async refreshInventario(){
    await this.platosService.buscarAll_Inner().then(resolve => {
      if(resolve.status === 200){
        this.variableGlobales.platosArray = resolve.body.message;
      }
    });
  }
}
