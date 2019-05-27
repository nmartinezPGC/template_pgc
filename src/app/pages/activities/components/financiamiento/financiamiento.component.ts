/**
* @author Nahum Martinez
* @returns Componente de Financiamiento
* @name FinanciamientoComponent
* @alias _financiamientoComponent
* @version 1.0.0
* @fecha 16-05-2019
*/

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-financiamiento',
  templateUrl: './financiamiento.component.html',
  styleUrls: ['./financiamiento.component.scss'],
})
export class FinanciamientoComponent implements OnInit {
  // Variables entre Tabs | Components
  @Input() idProyectoTab: number;
  @Input() idUsuarioTab: number;
  @Input() codigoProyectoTab: string;

  constructor() { }

  ngOnInit() {
  }

}
