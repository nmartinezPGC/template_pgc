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
import { FinanciamientoDetService } from '../../../../services/financiamiento/financiamiento-det.service';

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
  @Input() idActividadFinancEnc: number;
  @Input() idActividadFinancDet: number;

  // Variables de recepcion de Json
  public JsonReceptionAllMonedasProyecto: any;
  public JsonReceptionAllFinanciamientoDetCompromiso: any;
  public JsonMapAllFinanciamientoDetCompromiso: any;

  // variables de la modal window
  public display: boolean = false;

  // Modelo de la clase
  public _activityFinanciamientoDetCompromisosModel: ActivityFinanciamientoDetCompromisosModel;

  // Variables de Tabla de Compromisos
  public montoTotalCompromisos: number = 0;


  /**
   * Constructor de la Clase
   * @param _notificacionesService
   * @param confirmationService
   * @author Nahum Martinez
   */
  constructor(private _notificacionesService: NotificacionesService,
    private confirmationService: ConfirmationService,
    private _financiamientoDetService: FinanciamientoDetService) { }


  /**
   * Clase Inicializadora
   */
  ngOnInit() {
    // Carga los items de Compromisos registrados
    this.getAllFinanciamientoDetCompromisoService();
  }


  /**
   * Mostrar el Modal window
   */
  showDialog() {
    // Evalua que se aha ingresado el Detalle del Financiamiento
    if (this.idActividadFinancDet === undefined) {
      this._notificacionesService.showToast('error', 'Error al ingresar la Información de Compromisos', 'Debes Ingresar la Clasificación de Financiamiento, para continuar');
      this.closeModal();
    } else {
      this.display = true;
    }
  }

  closeModal() {
    this.display = false;

    this.getAllFinanciamientoDetCompromisoService();
  }

  /**
   * ******************* Funciones Propias **************************************
   */
  /****************************************************************************
  * Funcion: getAllFinanciamientoDetCompromisoService
  * Object Number: 001
  * Fecha: 29-05-2019
  * Descripcion: Method getAllFinanciamientoDetCompromisoService of the Class
  * Objetivo: getAllFinanciamientoDetCompromisoService listados de los Tipos de Financ.
  * Params: { }
  ****************************************************************************/
  private getAllFinanciamientoDetCompromisoService() {
    // Ejecuta el Servicio de invocar todos los Tipos de Financiamiento
    this._financiamientoDetService.getAllActividadFinanciamientoDetCompromiso(14).subscribe(
      result => {
        if (result.status !== 200) {
          this._notificacionesService.showToast('error', 'Error al Obtener la Información de todas los Compromisos', result.message);
          this.JsonReceptionAllFinanciamientoDetCompromiso = [];
        } else if (result.status === 200) {
          this.JsonReceptionAllFinanciamientoDetCompromiso = result.data;

          // Mmapeo del Json de Compromisos
          this.JsonMapAllFinanciamientoDetCompromiso = this.JsonReceptionAllFinanciamientoDetCompromiso.map((item) => {
            return {
              idActividadFinancDetCompromiso: item[0],
              montoCompromiso: item[1],
              fechaTransaccion: item[2],
              idActividadFinancDet: item[3],
              descTipoTransaccion: item[4],
              nombreMoneda: item[5],
            }
          });

          // Total de Compromisos
          this.JsonMapAllFinanciamientoDetCompromiso.forEach(element => {
            this.montoTotalCompromisos += element.montoCompromiso;
          });
        }
      },
      error => {
        this._notificacionesService.showToast('error', 'Error al Obtener la Información de todas los Compromisos', JSON.stringify(error.error.message));
      },
    );
  } // FIN | getAllFinanciamientoDetCompromisoService

}
