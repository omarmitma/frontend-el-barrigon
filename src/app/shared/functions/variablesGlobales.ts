import { Injectable } from '@angular/core';
import { Carrito } from 'src/app/entitys/carrito';
import { ClienteFunciones } from 'src/app/entitys/clienteFunciones';
import { DetalleMaestro } from 'src/app/entitys/detalleMaestro';
import { Mesa } from 'src/app/entitys/mesa';
import { CartaPlatosWeb } from 'src/app/entitys/otros/cartaPlatosWeb';
import { Platos } from 'src/app/entitys/platos';
import { Producto } from 'src/app/entitys/producto';
@Injectable()
export class VariablesGlobales {
    
    arrayOrden:DetalleMaestro[] = [];
    arrayCategoria:DetalleMaestro[] = [];
    arrayCategoriaProducto:DetalleMaestro[] = [];
    arrayUnidad:DetalleMaestro[] = [];
    arrayPrecio:DetalleMaestro[] = [];
    platosArray:Platos[] = [];
    productosArray:Producto[] = [];
    cartaReturn:CartaPlatosWeb[] = [];
    arrayClienteFunciones:ClienteFunciones[] = [];

    // itemInShoppingCart:Platos[] = [];

    mesasArray:Mesa[] = [];

    carrito:Carrito = new Carrito();

    cantidadPersonas:string = "";
    idMesa:number = 0;
    mesa:string = "";
    tipoPago:string  = "";
    
    constructor(){}
}