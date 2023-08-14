import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MainFunction } from 'src/app/shared/functions/mainFunction';

@Component({
  selector: 'app-modal-metodo-pago',
  templateUrl: './modal-metodo-pago.component.html',
  styleUrls: ['./modal-metodo-pago.component.scss']
})
export class ModalMetodoPagoComponent implements OnInit, OnChanges{

  @Output() changeCrud:EventEmitter<string> = new EventEmitter<string>();
  
  constructor(private mainFunction:MainFunction){}

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngOnInit(): void {
  }

  //Abrir/Cerrar Modal para buscar
  openModal(){
    this.changeCrud.emit(" ");
    this.mainFunction.openModalSearch("wrapModalMetodoPago");
  }

  addRegister(){
    this.openModal();
  }
    
}
