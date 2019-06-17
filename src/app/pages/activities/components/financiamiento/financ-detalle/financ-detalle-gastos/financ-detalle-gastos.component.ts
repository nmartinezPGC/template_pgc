/**
* @author Nahum Martinez
* @returns Componente de Financ Detalle Gastos
* @name FinancDetalleGastosComponent
* @alias _financDetalleGastosComponent
* @version 1.0.0
* @fecha 16-05-2019
*/

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-financ-detalle-gastos',
  templateUrl: './financ-detalle-gastos.component.html',
  styleUrls: ['./financ-detalle-gastos.component.scss'],
})
export class FinancDetalleGastosComponent implements OnInit {

  // Variables de loader
  public showLoader: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
