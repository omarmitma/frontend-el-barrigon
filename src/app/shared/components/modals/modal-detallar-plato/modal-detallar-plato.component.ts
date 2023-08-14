import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DetallePlato } from 'src/app/entitys/detallePlato';
import { Platos } from 'src/app/entitys/platos';
import { Alert } from 'src/app/shared/functions/alerts';
import { MainFunction } from 'src/app/shared/functions/mainFunction';

@Component({
  selector: 'app-modal-detallar-plato',
  templateUrl: './modal-detallar-plato.component.html',
  styleUrls: ['./modal-detallar-plato.component.scss']
})
export class ModalDetallarPlatoComponent implements OnInit , OnChanges {
  @Input() plato:Platos = new Platos();
  @Input() crud:string = "";

  @Output() sendRegister:EventEmitter<Platos> = new EventEmitter<Platos>();
  @Output() changeCrud:EventEmitter<string> = new EventEmitter<string>();

  platoNow:Platos = new Platos();

  constructor(public mainFunction:MainFunction, private alert:Alert) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.platoNow = Object.assign({},this.plato);
    this.platoNow.detallePlatos = [];
    this.plato.detallePlatos.forEach(d => this.platoNow.detallePlatos.push(Object.assign({},d)));
  }

  ngOnInit(): void {
  }


  //Abrir/Cerrar Modal para buscar
  openModal(){
    this.platoNow = new Platos();
    this.changeCrud.emit(" ");
    this.mainFunction.openModalSearch("wrapModalDetallarPlato");
  }

  addRegister(){
    this.sendRegister.emit(this.platoNow);
    this.openModal();
  }
  changeSelectIngrediente(data:DetallePlato){
    if(data.flagRequerido === 1){
      this.alert.alertDefault("Este ingrediente es requerido","");
      return;
    }
    if(data.flagSelect)data.flagSelect = false;
    else data.flagSelect = true;
    this.calcPrice();
  }

  limitQuantity(ingrediente:DetallePlato) {
    if (ingrediente.cantidad > ingrediente.cantidadMaxima) {
        ingrediente.cantidad = ingrediente.cantidadMaxima;
    }
    this.calcPrice();
  }

  calcPrice(){
    this.platoNow.precioCarrito = this.platoNow.precioAdicional;
    this.platoNow.detallePlatos.forEach(detalle => {
      if(!detalle.flagSelect)return;
      this.platoNow.precioCarrito += (detalle.cantidad || 0) * detalle.precioUnit;
    });
    this.platoNow.precioCarrito = this.platoNow.precioCarrito * this.platoNow.cantidad;
    this.platoNow.precioCarrito = Number((this.platoNow.precioCarrito).toFixed(2));
  }
}
