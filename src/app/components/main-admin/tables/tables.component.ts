import { Component, OnInit } from '@angular/core';
import { MesaService } from 'src/app/services/mesa.service';
import { MainFunction } from 'src/app/shared/functions/mainFunction';
import { VariablesGlobales } from 'src/app/shared/functions/variablesGlobales';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  constructor(public variableGlobales:VariablesGlobales, private mesaService:MesaService,private mainFunction:MainFunction){}
  ngOnInit(): void {

    this.mainFunction.onReceiveMessage(async(user: string, message: string) => {
      // Lógica para manejar el mensaje recibido
      await this.mesaService.buscarAll().then(resolve => {
        if(resolve.status === 200){
          this.variableGlobales.mesasArray = resolve.body.message;
        }
      });
    });

  }
}
