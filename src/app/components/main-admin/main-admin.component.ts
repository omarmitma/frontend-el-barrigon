import { Component, OnInit } from '@angular/core';
import { MainFunction } from 'src/app/shared/functions/mainFunction';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.scss']
})
export class MainAdminComponent implements OnInit {

  constructor(public mainFunction:MainFunction) { }

  ngOnInit(): void {
  }

}
