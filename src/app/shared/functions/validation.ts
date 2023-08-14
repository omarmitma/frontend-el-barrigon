import { Injectable } from '@angular/core';
import { Alert } from './alerts';
import { MetodoPago } from 'src/app/entitys/otros/metodoPago';
import { ErrorValidation } from 'src/app/entitys/otros/errorValidation';
import { Platos } from 'src/app/entitys/platos';
import { Producto } from 'src/app/entitys/producto';

@Injectable()
export class ValidationForms {

    constructor(private alert:Alert){
    }


    async validateCreditCardForm(data:MetodoPago){
        let errores:ErrorValidation[] = [];

        let errorAddCabezeraCore:ErrorValidation = new ErrorValidation();
        errorAddCabezeraCore.nombre = "Validacion:";
        //Errores cabezera Core
        if(data.cardNumber.length !== data.cardNumberMaxLength )errorAddCabezeraCore.errores.push("El numero de tarjeta no es correcta");
        if(data.cardName.length <= 0 )errorAddCabezeraCore.errores.push("Falta completar el titular");
        if(data.cardMonth.length <= 0 )errorAddCabezeraCore.errores.push("Falta seleccionar mes");
        if(data.cardYear.length <= 0 )errorAddCabezeraCore.errores.push("Falta seleccionar año");
        if(data.cardCvv.length <= 0 )errorAddCabezeraCore.errores.push("Falta completar cvv");
        

        if(errorAddCabezeraCore.errores.length > 0)errores.push(errorAddCabezeraCore);

         //Si existe errores retornamos true y mostramos los mensajes
         if(errores.length > 0){
            let msgAlert = "<ol>";

            errores.forEach(errors=>{
                msgAlert += `<li class="headerError"><p>${errors.nombre}</p><ul>`;
                errors.errores.forEach(errorsDetalle=> msgAlert += `<li class="detalleError"><span>-</span><p>${errorsDetalle}.</p>`);
                msgAlert += `</ul></li>`;
            });

            msgAlert += "</ol>";
            this.alert.alertErrorValidation(msgAlert);
            console.log(msgAlert);
            return false;
        }
        return true;
    }

    async validatePlato(data:Platos){
        let errores:ErrorValidation[] = [];

        let errorAddCabezeraCore:ErrorValidation = new ErrorValidation();
        errorAddCabezeraCore.nombre = "Validacion:";
        //Errores cabezera Core
        if(data.nombre.length <= 0 )errorAddCabezeraCore.errores.push("Falta completar el nombre");
        if(data.precio <= 0 || data.precio === undefined)errorAddCabezeraCore.errores.push("El precio debe ser mayor a 0");
        if(data.tiempoEspera.length <= 0 )errorAddCabezeraCore.errores.push("Falta completar el tiempo de espera");
        if(data.detallePlatos.length <= 0)errorAddCabezeraCore.errores.push("Falta detalles");

        if(errorAddCabezeraCore.errores.length > 0)errores.push(errorAddCabezeraCore);

         //Si existe errores retornamos true y mostramos los mensajes
         if(errores.length > 0){
            let msgAlert = "<ol>";

            errores.forEach(errors=>{
                msgAlert += `<li class="headerError"><p>${errors.nombre}</p><ul>`;
                errors.errores.forEach(errorsDetalle=> msgAlert += `<li class="detalleError"><span>-</span><p>${errorsDetalle}.</p>`);
                msgAlert += `</ul></li>`;
            });

            msgAlert += "</ol>";
            this.alert.alertErrorValidation(msgAlert);
            return false;
        }
        return true;
    }

    async validateProducto(data:Producto){
        let errores:ErrorValidation[] = [];

        let errorAddCabezeraCore:ErrorValidation = new ErrorValidation();
        errorAddCabezeraCore.nombre = "Validacion:";
        //Errores cabezera Core
        if(data.nombre.length <= 0 )errorAddCabezeraCore.errores.push("Falta completar el nombre");
        if(data.precio <= 0 || data.precio === undefined)errorAddCabezeraCore.errores.push("El precio debe ser mayor a 0");

        if(errorAddCabezeraCore.errores.length > 0)errores.push(errorAddCabezeraCore);

         //Si existe errores retornamos true y mostramos los mensajes
         if(errores.length > 0){
            let msgAlert = "<ol>";

            errores.forEach(errors=>{
                msgAlert += `<li class="headerError"><p>${errors.nombre}</p><ul>`;
                errors.errores.forEach(errorsDetalle=> msgAlert += `<li class="detalleError"><span>-</span><p>${errorsDetalle}.</p>`);
                msgAlert += `</ul></li>`;
            });

            msgAlert += "</ol>";
            this.alert.alertErrorValidation(msgAlert);
            return false;
        }
        return true;
    }

}