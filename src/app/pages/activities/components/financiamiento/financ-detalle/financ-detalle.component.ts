/**
* @author Nahum Martinez
* @returns Componente de Financ Detalle
* @name FinancDetalleComponent
* @alias _financDetalleComponent
* @version 1.0.0
* @fecha 16-05-2019
*/

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-financ-detalle',
  templateUrl: './financ-detalle.component.html',
  styleUrls: ['./financ-detalle.component.scss'],
})
export class FinancDetalleComponent implements OnInit {
  // Variables entre Tabs | Components
  @Input() idProyectoTab: number;
  @Input() idUsuarioTab: number;
  @Input() codigoProyectoTab: string;

  // variable del Json
  @Input() JsonPassData: any;

  constructor() { }

  ngOnInit() {
  }

}
