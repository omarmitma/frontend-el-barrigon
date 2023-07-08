import { Component } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {

  fechaIni:string = "12-06-2023";
  fechaFin:string = "28-06-2023";

  constructor(){}
}
