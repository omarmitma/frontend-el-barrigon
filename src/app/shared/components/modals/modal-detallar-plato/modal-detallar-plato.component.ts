import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Platos } from 'src/app/entitys/platos/platos';
import { MainFunction } from 'src/app/shared/functions/mainFunction';

@Component({
  selector: 'app-modal-detallar-plato',
  templateUrl: './modal-detallar-plato.component.html',
  styleUrls: ['./modal-detallar-plato.component.scss']
})
export class ModalDetallarPlatoComponent implements OnInit , OnChanges {
  @Input() plato:Platos = new Platos();

  @Output() sendRegister:EventEmitter<Platos> = new EventEmitter<Platos>();

  platoNow:Platos = new Platos();

  constructor(private mainFunction:MainFunction) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.platoNow = Object.assign({},this.plato);
  }

  ngOnInit(): void {
  }

  //Abrir/Cerrar Modal para buscar
  openModal(){
    this.platoNow = new Platos();
    this.mainFunction.openModalSearch("wrapModalDetallarPlato");
  }

  addArte(){
    this.sendRegister.emit(this.platoNow);
    this.openModal();
  }
}
