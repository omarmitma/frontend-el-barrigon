import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Mesa } from 'src/app/entitys/mesa';
import { MesaService } from 'src/app/services/mesa.service';
import { Alert } from 'src/app/shared/functions/alerts';
import { MainFunction } from 'src/app/shared/functions/mainFunction';
import { VariablesGlobales } from 'src/app/shared/functions/variablesGlobales';

@Component({
  selector: 'app-modal-chosen-mesa',
  templateUrl: './modal-chosen-mesa.component.html',
  styleUrls: ['./modal-chosen-mesa.component.scss']
})
export class ModalChosenMesaComponent implements OnInit, OnChanges{

  @Input() idMesa:number = 0;

  @Output() sendRegister:EventEmitter<Mesa> = new EventEmitter<Mesa>();
  @Output() changeCrud:EventEmitter<string> = new EventEmitter<string>();

  constructor(private mainFunction:MainFunction, public variableGlobales:VariablesGlobales, private alert:Alert, private mesaService:MesaService){}
  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    await this.getData();
  }

  async ngOnInit(): Promise<void> {
    await this.getData();
  }

  async getData(){
    await this.mesaService.buscarAll().then(resolve => {
      if(resolve.status === 200){
        this.variableGlobales.mesasArray = resolve.body.message;
      }
    });
  }

  //Abrir/Cerrar Modal para buscar
  openModal(){
    this.changeCrud.emit(" ");
    this.mainFunction.openModalSearch("wrapModalChosenMesa");
  }
  
  addRegister(data:Mesa){
    if(data.estadoMesa !== 1){
      this.alert.alertError("Esta mesa esta ocupada eliga otra","");
      return;
    }
    this.alert.alertConfirm(`¿Desea elegir la mesa ${data.nombre}?`, "").then(resolve => {
      if(resolve.isConfirmed){
        this.sendRegister.emit(data);
        this.openModal();
      }
    });
  }
}
