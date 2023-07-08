export class DetalleMaestro{
    constructor() {
        var f = new Date();
        var mes = ("0" + (f.getMonth() +1)).substr(-2,2);
        var day = ("0" + f.getDate()).substr(-2,2);

        this.fecRegistro = f.getFullYear() + "-" + mes + "-" + day ;
        this.fecModifica = f.getFullYear() + "-" + mes + "-" + day ;
    }
    idDetalleMaestro:number = 0;
    idCabezeraMaestro:number = 0;
    nombre:string = "";
    abreviatura:string = "";
    campo1Nvarchar:string = "";
    campo2Nvarchar:string = "";
    campo3Nvarchar:string = "";
    campo1Int:number = 0;
    campo2Int:number = 0;
    campo3Int:number = 0;
    campo1Decimal:number = 0;
    campo2Decimal:number = 0;
    campo3Decimal:number = 0;

    fecRegistro:string = "";
    horRegistro:string = "";
    usuRegistro:number = 0;
    nomUsuRegistro:string = "";
    fecModifica:string = "";
    horModifica:string = "";
    usuModifica:number = 0;
    nomUsuModifica:string = "";
    estado:number = 0;
    accion:number = 0;
}