import { PlatosDetalle } from "./platosDetalle";

export class Platos{
    idPlatos:number = 0;
    nomPlato:string = "";
    precio:number = 0;
    urlImagen:string = "";
    waitTime:string = "";
    idCategoria:number = 0;
    nomCategoria:string = "";
    flagInShoppingCar:boolean = false;
    detallePlato:PlatosDetalle[] = [];
}