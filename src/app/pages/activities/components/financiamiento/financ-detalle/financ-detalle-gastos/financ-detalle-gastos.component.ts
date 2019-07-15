/**
* @author Nahum Martinez
* @returns Componente de Financ Detalle Gastos
* @name FinancDetalleGastosComponent
* @alias _financDetalleGastosComponent
* @version 1.0.0
* @fecha 16-05-2019
*/

import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FinanciamientoEncService } from '../../../../services/financiamiento/financiamiento-enc.service';
import { NotificacionesService } from '../../../../../shared/services/notificaciones.service';
import { ActivityFinanciamientoDetGastosModel } from '../../../../models/financiamiento/model-financiamiento-det-gastos';
import { FinanciamientoDetService } from '../../../../services/financiamiento/financiamiento-det.service';

@Component({
  selector: 'ngx-financ-detalle-gastos',
  templateUrl: './financ-detalle-gastos.component.html',
  styleUrls: ['./financ-detalle-gastos.component.scss'],
  providers: [MessageService, ConfirmationService, FinanciamientoEncService, NotificacionesService],
})
export class FinancDetalleGastosComponent implements OnInit, OnChanges {
  // Variables entre Tabs | Components
  @Input() idProyectoTab: number;
  @Input() idUsuarioTab: number;
  @Input() codigoProyectoTab: string;
  @Input() idActividadFinancEnc: number;
  @Input() idActividadFinancDet: number;

  @Input() JsonGastosSelect: any;

  // Variables de recepcion de Json
  public JsonReceptionAllMonedasProyecto: any;
  public JsonReceptionAllFinanciamientoDetGasto: any;
  public JsonMapAllFinanciamientoDetGasto: any;

  // variables de la modal window
  public display: boolean = false;

  // Modelo de la clase
  public _activityFinanciamientoDetGastosModel: ActivityFinanciamientoDetGastosModel;

  // Variables de Tabla de Gastos
  public montoTotalGastos: number = 0;

  // Variables loaders
  public showLoader: boolean = false;
  public showNoData: boolean = false;

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
    // Inicializacion del Json que manda los Parametros de Gasto
    this.JsonGastosSelect = {
    }
  }

  ngOnChanges() {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    // Carga los items de Gastos registrados
    if (this.idActividadFinancDet !== undefined) {
      this.getAllFinanciamientoDetGastoservice(this.idActividadFinancDet);
    }
  }


  /**
   * Mostrar el Modal window
   */
  showDialog(idActividadFinancDetGasto: number, idTipoTransaccion: number,
    montoGasto: number, idMonedaActividad: number, fechaTransaccion: any, codigoFinancGasto: string) {
    // Evalua que se aha ingresado el Detalle del Financiamiento
    this.JsonGastosSelect = null;

    if (this.idActividadFinancDet === undefined) {
      this._notificacionesService.showToast('error', 'Error al ingresar la Información de Gastos', 'Debes Ingresar la Clasificación de Financiamiento, para continuar');
      this.closeModal();
    } else {
      this.display = true;

      this.JsonGastosSelect = {
        'idActividadFinancDetGasto': idActividadFinancDetGasto,
        'idTipoTransaccion': idTipoTransaccion,
        'montoGasto': montoGasto,
        'idMonedaActividad': idMonedaActividad,
        'fechaTransaccion': fechaTransaccion,
        'codigoFinancGasto': codigoFinancGasto,
      }
    }
  }

  closeModal() {
    // this.display = false;
    this.getAllFinanciamientoDetGastoservice(this.idActividadFinancDet);
  }

  /**
   * ******************* Funciones Propias **************************************
   */
  /****************************************************************************
  * Funcion: getAllFinanciamientoDetGastoservice
  * Object Number: FND-001
  * Fecha: 29-05-2019
  * Descripcion: Method getAllFinanciamientoDetGastoservice of the Class
  * Objetivo: Listados de los Eliminar el Gasto del Proyecto
  * Params: { idActividadFinancDet }
  ****************************************************************************/
  private getAllFinanciamientoDetGastoservice(idActividadFinancDet: number) {
    // Inicializa el Monto total
    this.montoTotalGastos = 0;
    this.JsonMapAllFinanciamientoDetGasto = [];

    // Carga el loader
    this.showLoader = true;

    // Ejecuta el Servicio de invocar todos los Tipos de Financiamiento
    this._financiamientoDetService.getAllActividadFinanciamientoDetGasto(idActividadFinancDet).subscribe(
      result => {
        if (result.status !== 200) {
          // this._notificacionesService.showToast('error', 'Error al Obtener la Información de todas los Gastos', result.message);
          this.JsonReceptionAllFinanciamientoDetGasto = [];
          // Oculta el loader
          this.showLoader = false;
          this.showNoData = true;
        } else if (result.status === 200 && result.findRecord === true) {
          this.JsonReceptionAllFinanciamientoDetGasto = result.data;

          // Mapeo del Json de Gastos
          this.JsonMapAllFinanciamientoDetGasto = this.JsonReceptionAllFinanciamientoDetGasto.map((item) => {
            return {
              idActividadFinancDetGasto: item[0],
              codigoFinancGasto: item[1],
              montoGasto: item[2],
              fechaTransaccion: item[3],
              idActividadFinancDet: item[4],
              descTipoTransaccion: item[5],
              idTipoTransaccion: item[6],
              nombreMoneda: item[7],
              idMoneda: item[8],
            }
          });

          // Total de Gastos
          this.JsonMapAllFinanciamientoDetGasto.forEach(element => {
            this.montoTotalGastos += element.montoGasto;
          });

          // Oculta el loader
          this.showLoader = false;
          this.showNoData = false;
        } else {
          // Oculta el loader
          this.showLoader = false;
          this.showNoData = true;
        }
      },
      error => {
        this._notificacionesService.showToast('error', 'Error al Obtener la Información de todas los Gastos', JSON.stringify(error.error.message));
        // Oculta el loader
        this.showLoader = false;
      },
    );
  } // FIN | FND-001


  /****************************************************************************
  * Funcion: confirm
  * Object Number: FND-002
  * Fecha: 11-06-2019
  * Descripcion: Method confirm of the Class
  * Objetivo: Eliminar el Gasto seleccionado
  * Params: { codigoFinancGasto }
  ****************************************************************************/
  confirm(codigoFinancGasto: string) {
    this.confirmationService.confirm({
      message: 'Estas seguro de Eliminar el Gasto?',
      accept: () => {
        // Ejecuta la funcion de Eliminar el Gasto
        this.deleteFinanciamientoDetGastoservice(codigoFinancGasto);
      },
    });
  } // FIN | FND-002


  /****************************************************************************
  * Funcion: deleteFinanciamientoDetGastoservice
  * Object Number: FND-003
  * Fecha: 11-06-2019
  * Descripcion: Method deleteFinanciamientoDetGastoservice of the Class
  * Objetivo: Eliminar Gastos del Proyecto
  * Params: { codigoFinancGasto }
  ****************************************************************************/
  deleteFinanciamientoDetGastoservice(codigoFinancGasto: string) {
    // Evaluacion de Datos de Financiamiento de Gasto para Proyecto
    if (codigoFinancGasto !== undefined) {
      // Ejecuta el Servicio de invocar la Eliminacion de Gasto de Socio al Desarrollo
      this._financiamientoDetService.deleteActividadFinanciamientoDetGasto(codigoFinancGasto).subscribe(
        result => {
          if (result.status !== 200) {
            this._notificacionesService.showToast('error', 'Error al Eliminar la Información de Gasto', result.message);
          } else if (result.status === 200) {
            if (result.findRecord === true) {
              // Carga el listado de nuevo
              this._notificacionesService.showToast('default', 'Eliminación de Gasto de Proyecto', result.message);
              this.getAllFinanciamientoDetGastoservice(this.idActividadFinancDet);
            } else {
              this._notificacionesService.showToast('error', 'Error al Eliminar la Información de Gasto', result.message);
            }
          }
        },
        error => {
          this._notificacionesService.showToast('error', 'Error al eliminar la Información de Gasto', JSON.stringify(error.error.message));
        },
      );
    } else {
      this._notificacionesService.showToast('error', 'Error al eliminar la Información de Gasto', 'Debes Ingresar seleccionar el Gasto a Eliminar, para continuar');
    }
  } // FIN | FND-003
}
