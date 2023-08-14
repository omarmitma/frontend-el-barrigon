import { Component,OnInit } from '@angular/core';
import { EstadisticasAdmin } from 'src/app/entitys/otros/estadisticasAdmin';
import { EstadisticasService } from 'src/app/services/estadisticas.service';
import { MainFunction } from 'src/app/shared/functions/mainFunction';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit{

  dataNow:EstadisticasAdmin = new EstadisticasAdmin();
  fecIni:string = "";
  fecFin:string = "";

  constructor(private mainFunction:MainFunction, private estadisticasService:EstadisticasService){
    var f = new Date();
    var mes = ("0" + (f.getMonth() +1)).substr(-2,2);
    var day = ("0" + f.getDate()).substr(-2,2);

    this.fecIni = f.getFullYear() + "-" + mes + "-" + day ;
    this.fecFin = f.getFullYear() + "-" + mes + "-" + day ;

  }

  async ngOnInit(): Promise<void> {
    
    await this.getData();
  }

  openModalChosenDate(){
    
    this.mainFunction.openModalSearch("wrapModalChosenDate");
  }

  async getData(){

    await this.estadisticasService.buscar_estadisticas(this.fecIni,this.fecFin).then(resolve => {
      this.dataNow = resolve.body.message;
      this.dataNow.rankingPlato = this.dataNow.rankingPlato === undefined ? [] : this.dataNow.rankingPlato;
      this.dataNow.rankingCategoria = this.dataNow.rankingCategoria === undefined ? [] : this.dataNow.rankingCategoria;
    });
  }
}
