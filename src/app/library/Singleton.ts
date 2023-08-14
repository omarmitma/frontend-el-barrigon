import { Injectable } from "@angular/core";


@Injectable()
export class Singleton {

    constructor(){}

    //Maestros Producto
    vFiltroOrden:number = 1;
    vCategoria:number = 2;
    vFiltroPrecio:number = 3;
    vCategoriaProducto:number = 4;
    vMedidas:number = 5;

    vEstadoTerminado:number = 4;
    vEstadoPendiente:number = 5;
    vEstadoCancelado:number = 6;
}