import { Injectable } from '@angular/core';
import { Platos } from 'src/app/entitys/platos/platos';

@Injectable()
export class VariablesGlobales {
    
    itemInShoppingCart:Platos[] = [];

    constructor(){}
}