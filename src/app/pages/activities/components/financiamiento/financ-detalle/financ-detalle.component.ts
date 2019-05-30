/**
* @author Nahum Martinez
* @returns Componente de Financ Detalle
* @name FinancDetalleComponent
* @alias _financDetalleComponent
* @version 1.0.0
* @fecha 16-05-2019
*/

import { Component, Input, OnInit } from '@angular/core';
import { NotificacionesService } from '../../../../shared/services/notificaciones.service';
import { ActivityFinanciamientoDetModel } from '../../../models/financiamiento/model-financiamiento-det';
import { FinanciamientoDetService } from '../../../services/financiamiento/financiamiento-det.service';

@Component({
  selector: 'ngx-financ-detalle',
  templateUrl: './financ-detalle.component.html',
  styleUrls: ['./financ-detalle.component.scss'],
  providers: [FinanciamientoDetService, NotificacionesService],
})
export class FinancDetalleComponent implements OnInit {
  // Variables entre Tabs | Components
  @Input() idProyectoTab: number;
  @Input() idUsuarioTab: number;
  @Input() codigoProyectoTab: string;

  // variable del Json
  @Input() JsonPassData: any;

  // Modelo de la Clase
  public _activityFinanciamientoDetModel: ActivityFinanciamientoDetModel;

  // Ventana Modal de Fecha
  display: boolean = false;

  public array: any = [
    { 'Id': 1, 'name': 'AECID', 'Desc': 'Agencia Española de Cooperacion Internacional para el Desarrollo' },
    // { 'Id': 2, 'name': 'USAID', 'Desc': 'Agencia de los Estados Unidos para el Desarrollo'},
    // { 'Id': 3, 'name': 'PNUD', 'Desc': 'Programa de la Naciones Unidas para el Desarrollo'},
  ];

  // Json Recptions
  JsonReceptionAllTipoFinanciamiento: any[];
  JsonReceptionAllModalidadAyuda: any[];


  /**
   * Constructor de la Calse
   * @param _financiamientoDetService
   */
  constructor(public _financiamientoDetService: FinanciamientoDetService,
    private _notificacionesService: NotificacionesService) {
  }


  /**
   * Inicializacion de la Clase
   */
  ngOnInit() {
    // Inicializacion del Modelo de la Clase
    this._activityFinanciamientoDetModel = new ActivityFinanciamientoDetModel(
      0, null, // Datos Generales
      null, 0, null, 0, null, 0, // Relacionales
      null, // Actividad con Detalle
      null, // Transaccion
      true, null, null, // Auditoria
    );

    // Inicio de carga de Combos
    // Tipos de Financiamiento
    this.getAllTipoFinanciamientoService();

    // Modalidades de Ayuda
    this.getAllModalidadAyuda();


  }

  /**
   * ******************* Funciones Propias **************************************
   */
  /****************************************************************************
  * Funcion: getAllTipoFinanciamientoService
  * Object Number: 001
  * Fecha: 29-05-2019
  * Descripcion: Method getAllTipoFinanciamientoService of the Class
  * Objetivo: getAllTipoFinanciamientoService listados de los Tipos de Financ.
  * Params: { }
  ****************************************************************************/
  private getAllTipoFinanciamientoService() {
    // Ejecuta el Servicio de invocar todos los Tipos de Financiamiento
    this._financiamientoDetService.getAllTiposFinanciamiento().subscribe(
      result => {
        if (result.status !== 200) {
          this._notificacionesService.showToast('error', 'Error al Obtener la Información de todas los Tipos de Financiamiento', result.message);
          this.JsonReceptionAllTipoFinanciamiento = [];
        } else if (result.status === 200) {
          this.JsonReceptionAllTipoFinanciamiento = result.data;
        }
      },
      error => {
        this._notificacionesService.showToast('error', 'Error al Obtener la Información de todas los Tipos de Financiamiento', JSON.stringify(error.message));
      },
    );
  } // FIN | getAllTipoFinanciamientoService


  /****************************************************************************
  * Funcion: getAllModalidadAyudaService
  * Object Number: 002
  * Fecha: 29-05-2019
  * Descripcion: Method getAllModalidadAyudaService of the Class
  * Objetivo: getAllModalidadAyudaService listados de las Modalidades de Ayuda
  * Params: { }
  ****************************************************************************/
  private getAllModalidadAyuda() {
    // Ejecuta el Servicio de invocar todos las Modalidades de Ayuda
    this._financiamientoDetService.getAllModalidadAyuda().subscribe(
      result => {
        if (result.status !== 200) {
          this._notificacionesService.showToast('error', 'Error al Obtener la Información de todas las Modalidades de Ayuda', result.message);
          this.JsonReceptionAllModalidadAyuda = [];
        } else if (result.status === 200) {
          this.JsonReceptionAllModalidadAyuda = result.data;
        }
      },
      error => {
        this._notificacionesService.showToast('error', 'Error al Obtener la Información de todas las  Modalidades de Ayuda', JSON.stringify(error.message));
      },
    );
  } // FIN | getAllModalidadAyuda

}
