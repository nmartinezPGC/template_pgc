/**
* @author Nahum Martinez
* @returns Formulario de Ingreso de Comprimisos
* @name FinancDetalleCompromisosFormComponent
* @alias _financDetalleCompromisosFormComponent
* @version 1.0.0
* @date 2019-05-29
*/

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { NotificacionesService } from '../../../../../../shared/services/notificaciones.service';
import { ActivityFinanciamientoDetCompromisosModel } from '../../../../../models/financiamiento/model-financiamiento-det-compromisos';
import { FinanciamientoDetService } from '../../../../../services/financiamiento/financiamiento-det.service';
import { FinanciamientoEncService } from '../../../../../services/financiamiento/financiamiento-enc.service';

@Component({
  selector: 'ngx-financ-detalle-compromisos-form',
  templateUrl: './financ-detalle-compromisos-form.component.html',
  styleUrls: ['./financ-detalle-compromisos-form.component.scss'],
  providers: [ConfirmationService, FinanciamientoEncService, FinanciamientoDetService],
})
export class FinancDetalleCompromisosFormComponent implements OnInit {
  // Variables primitivas
  modalHeaderIdActividadFinancDet: number;
  modalHeaderCodigoActividad: string;
  modalHeaderIdActividad: number;

  // Variables de DOM de la clase
  @ViewChild('montoCompromiso') montoCompromiso: ElementRef;

  // Modelo de la Clase
  public _activityFinanciamientoDetCompromisosModel: ActivityFinanciamientoDetCompromisosModel;

  // JsonReceptions
  public JsonReceptionFinancDetCompromisos: any = [];
  public JsonReceptionAllMonedasProyecto: any;
  public JsonReceptionAllTipoTransaccion: any;

  // Loaders
  loader: boolean = true;

  // Ventana Modal de Fecha
  display: boolean = false;

  // Variables de fecha
  date6: Date;
  es: any;

  /**
   * Constructor de la Clase
   * @param _toasterService
   * @param confirmationService
   * @param _financiamientoEncService
   * @param _notificacionesService
   * @author Nahum Martinez
   */
  constructor(private _notificacionesService: NotificacionesService,
    private confirmationService: ConfirmationService,
    private _financiamientoEncService: FinanciamientoEncService,
    private _financiamientoDetService: FinanciamientoDetService, ) { }


  /**
   * Metodo de inizalizacion de la Clase
   */
  ngOnInit() {
    // Valor de Detalle del Financiamiento del Proyecto
    const idActividadFinancDetSend = { idActividadFinancDet: this.modalHeaderIdActividadFinancDet };
    // Inicializacion del Modelo
    this._activityFinanciamientoDetCompromisosModel = new ActivityFinanciamientoDetCompromisosModel(
      0, null, // Generales de tabla
      null, 0, null, 0, null, 0, // Relacionales
      0, null, 0, // Transaccion
      true, null, null, // Auditoria
    );

    // Inicio de los servicios de datos
    this.getAllMonedasActividadService();

    this.getAllTipoTransaccionService();
  } // FIN | ngOnInit


  /****************************************************************************
   * Funcion: closeModal
   * Object Number: 001
   * Fecha: 29-05-2019
   * Descripcion: Method closeModal of the Class
   * Objetivo: closeModal cerrar la ventana Modal
   * Params: { }
   ****************************************************************************/
  closeModal() {
    // this.activeModal.close();
  } // FIN | closeModal


  /****************************************************************************
  * Funcion: showDialog y closeDialog
  * Object Number: 001
  * Fecha: 21-05-2019
  * Descripcion: Method que Genera las fechas de Transaccion y las asigan al
  * Modelo de la Clase
  * Objetivo: Generar las Fechas de Transaccion al Modelo
  * @param event
  ****************************************************************************/
  showDialog() {
    this.display = true;
  }

  closeDialog() {
    this.display = false;
    // Asignacion de Fecha de Transaccion
    this._activityFinanciamientoDetCompromisosModel.fechaTransaccion = this.date6;

    // Guarda la fecha de Transaccion
    // this.saveFinanciamientoEncService();
  } // FIN | Dialog


  /****************************************************************************
  * Funcion: getAllMonedasActividadService
  * Object Number: 001
  * Fecha: 06-06-2019
  * Descripcion: Method getAllMonedasActividadService of the Class
  * Objetivo: getAllMonedasActividadService listados de las Monedas de Proyecto
  * Params: { }
  ****************************************************************************/
  private getAllMonedasActividadService() {
    // Ejecuta el Servicio de invocar todos las Monedas de Actividad
    this._financiamientoEncService.getAllMonedasProyecto().subscribe(
      result => {
        if (result.status !== 200) {
          this._notificacionesService.showToast('error', 'Error al Obtener la Información de todas las Monedas de Proyecto', result.message);
          this.JsonReceptionAllMonedasProyecto = [];
        } else if (result.status === 200) {
          this.JsonReceptionAllMonedasProyecto = result.data;
        }
      },
      error => {
        this._notificacionesService.showToast('error', 'Error al Obtener la Información de todas las Monedas de Proyecto', JSON.stringify(error.error.message));
      },
    );
  } // FIN | getAllMonedasActividadService


  /****************************************************************************
  * Funcion: getAllTipoTransaccionService
  * Object Number: 002
  * Fecha: 06-06-2019
  * Descripcion: Method getAllTipoTransaccionService of the Class
  * Objetivo: getAllTipoTransaccionService listados de los Tipos de Transaccion
  * Params: { }
  ****************************************************************************/
  private getAllTipoTransaccionService() {
    // Ejecuta el Servicio de invocar todos los Tipos de Transaccion
    this._financiamientoDetService.getAllTipoTransaccion().subscribe(
      result => {
        if (result.status !== 200) {
          this._notificacionesService.showToast('error', 'Error al Obtener la Información de los Tipos de Transacción', result.message);
          this.JsonReceptionAllTipoTransaccion = [];
        } else if (result.status === 200) {
          this.JsonReceptionAllTipoTransaccion = result.data;
        }
      },
      error => {
        this._notificacionesService.showToast('error', 'Error al Obtener la Información de los Tipos de Transacción', JSON.stringify(error.error.message));
      },
    );
  } // FIN | getAllTipoTransaccionService


  /****************************************************************************
  * Funcion: saveFinanciamientoDetCompromisoService
  * Object Number: 004
  * Fecha: 21-05-2019
  * Descripcion: Method saveFinanciamientoDetCompromisoService of the Class
  * Objetivo: saveFinanciamientoDetCompromisoService listados de las Monedas de Proyecto
  * Params: { _activityFinanciamientoEncModel }
  ****************************************************************************/
  saveFinanciamientoDetCompromisoService() {
    // Asignacion de nuevos valores de Modelo
    this._activityFinanciamientoDetCompromisosModel.idActividadFinancDetSend = 14;
    this._activityFinanciamientoDetCompromisosModel.idActividadFinancDet = { idActividadFinancDet: this._activityFinanciamientoDetCompromisosModel.idActividadFinancDetSend };
    this._activityFinanciamientoDetCompromisosModel.codigoFinancCompromiso = this.modalHeaderCodigoActividad + '-ADC-' + this.modalHeaderIdActividadFinancDet;

    // Evaluacion de Datos de Financiamiento de Compromiso para Proyecto
    if (this._activityFinanciamientoDetCompromisosModel.idTipoTransaccionSend !== 0) {
      this._activityFinanciamientoDetCompromisosModel.idTipoTransaccion = { idTipoTransaccion: this._activityFinanciamientoDetCompromisosModel.idTipoTransaccionSend };
      // console.log(this._activityFinanciamientoEncModel);

      if (this._activityFinanciamientoDetCompromisosModel.montoCompromiso !== 0) {

        if (this._activityFinanciamientoDetCompromisosModel.idMonedaActividadSend !== 0) {
          this._activityFinanciamientoDetCompromisosModel.idMonedaActividad = { idMonedaActividad: this._activityFinanciamientoDetCompromisosModel.idMonedaActividadSend };
          // console.log(this._activityFinanciamientoDetCompromisosModel);


          // Ejecuta el Servicio de invocar el registro de Compromiso de Socio al Desarrollo
          this._financiamientoDetService.newActividadFinanciamientoDetCompromiso(this._activityFinanciamientoDetCompromisosModel).subscribe(
            result => {
              if (result.status !== 200) {
                this._notificacionesService.showToast('error', 'Error al Ingresar la Información de Compromisos', result.message);
              } else if (result.status === 200) {
                if (result.findRecord === true) {
                  this._notificacionesService.showToast('error', 'Error al Ingresar la Información de Compromisos', result.message);
                } else {
                  this._notificacionesService.showToast('default', 'Encabezado de Financiamiento', result.message);
                  // this.idActividadFinancDetSend = result.data.idActividadFinancEnc;
                }
              }
            },
            error => {
              this._notificacionesService.showToast('error', 'Error al Ingresar la Información de Compromisos', JSON.stringify(error.error.message));
            },
          );
        } else {
          this._notificacionesService.showToast('error', 'Error al ingresar la Información de Compromisos', 'Debes de ingresar Moneda de Compromiso, para continuar');
        }
      } else {
        this._notificacionesService.showToast('error', 'Error al ingresar la Información de de Compromisos', 'Debes de ingresar el monto de Compromiso, para continuar');
        this.montoCompromiso.nativeElement.focus();
      }
    } else {
      this._notificacionesService.showToast('error', 'Error al ingresar la Información de Compromisos', 'Debes de ingresar el Tipo de Transacción, para continuar');
      // this.montoActividadInput.nativeElement.focus();
    }
  } // FIN | saveFinanciamientoDetCompromisoService
}
