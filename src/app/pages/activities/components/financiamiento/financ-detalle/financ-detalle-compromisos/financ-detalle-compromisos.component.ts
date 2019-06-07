/**
* @author Nahum Martinez
* @returns Componente de Financ Detalle Compromisos
* @name FinancDetalleCompromisosComponent
* @alias _financDetalleCompromisosComponent
* @version 1.0.0
* @fecha 16-05-2019
*/

import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NotificacionesService } from '../../../../../shared/services/notificaciones.service';
import { ActivityFinanciamientoDetCompromisosModel } from '../../../../models/financiamiento/model-financiamiento-det-compromisos';
import { FinanciamientoEncService } from '../../../../services/financiamiento/financiamiento-enc.service';

@Component({
  selector: 'ngx-financ-detalle-compromisos',
  templateUrl: './financ-detalle-compromisos.component.html',
  styleUrls: ['./financ-detalle-compromisos.component.scss'],
  providers: [MessageService, ConfirmationService, FinanciamientoEncService, NotificacionesService],
})
export class FinancDetalleCompromisosComponent implements OnInit {
  // Variables entre Tabs | Components
  @Input() idProyectoTab: number;
  @Input() idUsuarioTab: number;
  @Input() codigoProyectoTab: string;
  @Input() idActividadFinancDet: number;

  // Variables de recepcion de Json
  public JsonReceptionAllMonedasProyecto: any;

  // variables de la modal window
  public display: boolean = false;

  // Modelo de la clase
  public _activityFinanciamientoDetCompromisosModel: ActivityFinanciamientoDetCompromisosModel;



  /**
   * Constructor de la Clase
   * @param _notificacionesService
   * @param confirmationService
   * @author Nahum Martinez
   */
  constructor(private _notificacionesService: NotificacionesService,
    private confirmationService: ConfirmationService) { }


  /**
   * Clase Inicializadora
   */
  ngOnInit() {
    //
  }


  /**
   * Mostrar el Modal window
   */
  showDialog() {
    this.display = true;
  }

}
