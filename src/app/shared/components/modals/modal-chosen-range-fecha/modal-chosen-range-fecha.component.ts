import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MainFunction } from 'src/app/shared/functions/mainFunction';

@Component({
  selector: 'app-modal-chosen-range-fecha',
  templateUrl: './modal-chosen-range-fecha.component.html',
  styleUrls: ['./modal-chosen-range-fecha.component.scss']
})
export class ModalChosenRangeFechaComponent implements OnInit, OnChanges{

  @Input() fecIniParent:string = "";
  @Input() fecFinParent:string = "";

  @Output() changeCrud:EventEmitter<string> = new EventEmitter<string>();
  @Output() sendRegister:EventEmitter<any> = new EventEmitter<any>();
  
  fecIni:string = "";
  fecFin:string = "";

  constructor(private mainFunction:MainFunction){}

  ngOnChanges(changes: SimpleChanges): void {
    this.fecIni = this.fecIniParent;
    this.fecFin = this.fecFinParent;
  }

  ngOnInit(): void {
  }

  //Abrir/Cerrar Modal para buscar
  openModal(){
    this.changeCrud.emit(" ");
    this.mainFunction.openModalSearch("wrapModalChosenDate");
  }

  addRegister(){
    let rangeDate = {
      fecIni: this.fecIni,
      fecFin: this.fecFin
    }
    this.sendRegister.emit(rangeDate);
    this.openModal();
  }
    
}
