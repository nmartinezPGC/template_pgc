/**
* @author Nahum Martinez
* @returns Componente de Financ Detalle Desembolsos
* @name FinancDetalleDesembolsosComponent
* @alias _financDetalleDesembolsosComponent
* @version 1.0.0
* @fecha 16-05-2019|Mod: 2019-07-09
*/

import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ActivityFinanciamientoDetDesembolsosModel } from '../../../../models/financiamiento/model-financiamiento-det-desembolsos';
import { NotificacionesService } from '../../../../../shared/services/notificaciones.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FinanciamientoDetService } from '../../../../services/financiamiento/financiamiento-det.service';
import { FinanciamientoEncService } from '../../../../services/financiamiento/financiamiento-enc.service';

@Component({
  selector: 'ngx-financ-detalle-desembolsos',
  templateUrl: './financ-detalle-desembolsos.component.html',
  styleUrls: ['./financ-detalle-desembolsos.component.scss'],
  providers: [MessageService, ConfirmationService, FinanciamientoEncService, NotificacionesService],
})
export class FinancDetalleDesembolsosComponent implements OnInit, OnChanges {
  // Variables entre Tabs | Components
  @Input() idProyectoTab: number;
  @Input() idUsuarioTab: number;
  @Input() codigoProyectoTab: string;
  @Input() idActividadFinancEnc: number;
  @Input() idActividadFinancDet: number;

  @Input() JsonDesembolsosSelect: any;

  // Variables de recepcion de Json
  public JsonReceptionAllMonedasProyecto: any;
  public JsonReceptionAllFinanciamientoDetDesembolso: any;
  public JsonMapAllFinanciamientoDetDesembolso: any;

  // variables de la modal window
  public display: boolean = false;

  // Modelo de la clase
  public _activityFinanciamientoDetDesembolsosModel: ActivityFinanciamientoDetDesembolsosModel;

  // Variables de Tabla de Desembolsos
  public montoTotalDesembolsos: number = 0;

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
    // Inicializacion del Json que manda los Parametros de Desembolso
    this.JsonDesembolsosSelect = {
    }
  }

  ngOnChanges() {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    // Carga los items de Desembolsos registrados
    if (this.idActividadFinancDet !== undefined) {
      this.getAllFinanciamientoDetDesembolsoservice(this.idActividadFinancDet);
    }
  }


  /**
   * Mostrar el Modal window
   */
  showDialog(idActividadFinancDetDesembolso: number, idTipoTransaccion: number,
    montoDesembolso: number, idMonedaActividad: number, fechaTransaccion: any, codigoFinancDesembolso: string) {
    // Evalua que se aha ingresado el Detalle del Financiamiento
    this.JsonDesembolsosSelect = null;

    if (this.idActividadFinancDet === undefined) {
      this._notificacionesService.showToast('error', 'Error al ingresar la Información de Desembolsos', 'Debes Ingresar la Clasificación de Financiamiento, para continuar');
      this.closeModal();
    } else {
      this.display = true;

      this.JsonDesembolsosSelect = {
        'idActividadFinancDetDesembolso': idActividadFinancDetDesembolso,
        'idTipoTransaccion': idTipoTransaccion,
        'montoDesembolso': montoDesembolso,
        'idMonedaActividad': idMonedaActividad,
        'fechaTransaccion': fechaTransaccion,
        'codigoFinancDesembolso': codigoFinancDesembolso,
      }
    }
  }

  closeModal() {
    // this.display = false;
    this.getAllFinanciamientoDetDesembolsoservice(this.idActividadFinancDet);
  }

  /**
   * ******************* Funciones Propias **************************************
   */
  /****************************************************************************
  * Funcion: getAllFinanciamientoDetDesembolsoservice
  * Object Number: FND-001
  * Fecha: 29-05-2019
  * Descripcion: Method getAllFinanciamientoDetDesembolsoservice of the Class
  * Objetivo: Listados de los Eliminar el Desembolso del Proyecto
  * Params: { idActividadFinancDet }
  ****************************************************************************/
  private getAllFinanciamientoDetDesembolsoservice(idActividadFinancDet: number) {
    // Inicializa el Monto total
    this.montoTotalDesembolsos = 0;
    this.JsonMapAllFinanciamientoDetDesembolso = [];

    // Carga el loader
    this.showLoader = true;

    // Ejecuta el Servicio de invocar todos los Tipos de Financiamiento
    this._financiamientoDetService.getAllActividadFinanciamientoDetDesembolso(idActividadFinancDet).subscribe(
      result => {
        if (result.status !== 200) {
          // this._notificacionesService.showToast('error', 'Error al Obtener la Información de todas los Desembolsos', result.message);
          this.JsonReceptionAllFinanciamientoDetDesembolso = [];
          // Oculta el loader
          this.showLoader = false;
          this.showNoData = true;
        } else if (result.status === 200 && result.findRecord === true) {
          this.JsonReceptionAllFinanciamientoDetDesembolso = result.data;

          // Mapeo del Json de Desembolsos
          this.JsonMapAllFinanciamientoDetDesembolso = this.JsonReceptionAllFinanciamientoDetDesembolso.map((item) => {
            return {
              idActividadFinancDetDesembolso: item[0],
              codigoFinancDesembolso: item[1],
              montoDesembolso: item[2],
              fechaTransaccion: item[3],
              idActividadFinancDet: item[4],
              descTipoTransaccion: item[5],
              idTipoTransaccion: item[6],
              nombreMoneda: item[7],
              idMoneda: item[8],
            }
          });

          // Total de Desembolsos
          this.JsonMapAllFinanciamientoDetDesembolso.forEach(element => {
            this.montoTotalDesembolsos += element.montoDesembolso;
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
        this._notificacionesService.showToast('error', 'Error al Obtener la Información de todas los Desembolsos', JSON.stringify(error.error.message));
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
  * Objetivo: Eliminar el Desembolso seleccionado
  * Params: { codigoFinancDesembolso }
  ****************************************************************************/
  confirm(codigoFinancDesembolso: string) {
    this.confirmationService.confirm({
      message: 'Estas seguro de Eliminar el Desembolso?',
      accept: () => {
        // Ejecuta la funcion de Eliminar el Desembolso
        this.deleteFinanciamientoDetDesembolsoservice(codigoFinancDesembolso);
      },
    });
  } // FIN | FND-002


  /****************************************************************************
  * Funcion: deleteFinanciamientoDetDesembolsoservice
  * Object Number: FND-003
  * Fecha: 11-06-2019
  * Descripcion: Method deleteFinanciamientoDetDesembolsoservice of the Class
  * Objetivo: Eliminar Desembolsos del Proyecto
  * Params: { codigoFinancDesembolso }
  ****************************************************************************/
  deleteFinanciamientoDetDesembolsoservice(codigoFinancDesembolso: string) {
    // Evaluacion de Datos de Financiamiento de Desembolso para Proyecto
    if (codigoFinancDesembolso !== undefined) {
      // Ejecuta el Servicio de invocar la Eliminacion de Desembolso de Socio al Desarrollo
      this._financiamientoDetService.deleteActividadFinanciamientoDetDesembolso(codigoFinancDesembolso).subscribe(
        result => {
          if (result.status !== 200) {
            this._notificacionesService.showToast('error', 'Error al Eliminar la Información de Desembolso', result.message);
          } else if (result.status === 200) {
            if (result.findRecord === true) {
              // Carga el listado de nuevo
              this._notificacionesService.showToast('default', 'Eliminación de Desembolso de Proyecto', result.message);
              this.getAllFinanciamientoDetDesembolsoservice(this.idActividadFinancDet);
            } else {
              this._notificacionesService.showToast('error', 'Error al Eliminar la Información de Desembolso', result.message);
            }
          }
        },
        error => {
          this._notificacionesService.showToast('error', 'Error al eliminar la Información de Desembolso', JSON.stringify(error.error.message));
        },
      );
    } else {
      this._notificacionesService.showToast('error', 'Error al eliminar la Información de Desembolso', 'Debes Ingresar seleccionar el Desembolso a Eliminar, para continuar');
    }
  } // FIN | FND-003
}
