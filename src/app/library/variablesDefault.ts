import { Injectable } from "@angular/core";

@Injectable()
export class VariablesDefault {

    constructor(){
    }

    nomMoneda:string = "DOLARES";
    idMoneda:number = 299;
    codMonedaUi:string = "DOL";

    idLineaServicio:number = 646;
    nomLineaServicio:string = "SERVICIO";
    idSubLineaServicio:number = 647;
    nomSubLineaServicio:string = "SERVICIO";
    idCategoriaServicio:number = 1254;
    nomCategoriaServicio:string = "SERVICIO";

    idFormula:number = 689;
    //Almacen
    idAlmacenMateriaPrima:number = 691;
    nomAlmacenMateriaPrima:string = "PROCESO MATERIA PRIMA";

    //
    idTransferenciaInmediata:number = 787;
    nomTransferenciaInmediata:string = "TRANSFERENCIA INMEDIATA";

}