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

  @Input() JsonCompromisosSelect: any;

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

    this.JsonCompromisosSelect = {
      'id': 1,
      'cod': 'COD-01',
    }
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

      this.JsonCompromisosSelect = {
        'id': 1,
        'cod': 'COD-01',
      }
    }
  }

  closeModal() {
    // this.display = false;
    this.getAllFinanciamientoDetCompromisoService();
  }

  /**
   * ******************* Funciones Propias **************************************
   */
  /****************************************************************************
  * Funcion: getAllFinanciamientoDetCompromisoService
  * Object Number: FND-001
  * Fecha: 29-05-2019
  * Descripcion: Method getAllFinanciamientoDetCompromisoService of the Class
  * Objetivo: Listados de los Eliminar el Compromiso del Proyecto
  * Params: { }
  ****************************************************************************/
  private getAllFinanciamientoDetCompromisoService() {
    // Inicializa el Monto total
    this.montoTotalCompromisos = 0;
    this.JsonMapAllFinanciamientoDetCompromiso = [];

    // Ejecuta el Servicio de invocar todos los Tipos de Financiamiento
    this._financiamientoDetService.getAllActividadFinanciamientoDetCompromiso(14).subscribe(
      result => {
        if (result.status !== 200) {
          // this._notificacionesService.showToast('error', 'Error al Obtener la Información de todas los Compromisos', result.message);
          this.JsonReceptionAllFinanciamientoDetCompromiso = [];
        } else if (result.status === 200) {
          this.JsonReceptionAllFinanciamientoDetCompromiso = result.data;

          // Mmapeo del Json de Compromisos
          this.JsonMapAllFinanciamientoDetCompromiso = this.JsonReceptionAllFinanciamientoDetCompromiso.map((item) => {
            return {
              idActividadFinancDetCompromiso: item[0],
              codigoFinancCompromiso: item[1],
              montoCompromiso: item[2],
              fechaTransaccion: item[3],
              idActividadFinancDet: item[4],
              descTipoTransaccion: item[5],
              nombreMoneda: item[6],
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
  } // FIN | FND-001


  /****************************************************************************
  * Funcion: confirm
  * Object Number: FND-002
  * Fecha: 11-06-2019
  * Descripcion: Method confirm of the Class
  * Objetivo: Eliminar el Compromiso seleccionado
  * Params: { codigoFinancCompromiso }
  ****************************************************************************/
  confirm(codigoFinancCompromiso: string) {
    this.confirmationService.confirm({
      message: 'Estas seguro de Eliminar el Compromiso?',
      accept: () => {
        // Ejecuta la funcion de Eliminar el Compromiso
        this.deleteFinanciamientoDetCompromisoService(codigoFinancCompromiso);
      },
    });
  } // FIN | FND-002


  /****************************************************************************
  * Funcion: deleteFinanciamientoDetCompromisoService
  * Object Number: FND-003
  * Fecha: 11-06-2019
  * Descripcion: Method deleteFinanciamientoDetCompromisoService of the Class
  * Objetivo: Eliminar Compromisos del Proyecto
  * Params: { codigoFinancCompromiso }
  ****************************************************************************/
  deleteFinanciamientoDetCompromisoService(codigoFinancCompromiso: string) {
    // Evaluacion de Datos de Financiamiento de Compromiso para Proyecto
    if (codigoFinancCompromiso !== undefined) {
      // Ejecuta el Servicio de invocar la Eliminacion de Compromiso de Socio al Desarrollo
      this._financiamientoDetService.deleteActividadFinanciamientoDetCompromiso(codigoFinancCompromiso).subscribe(
        result => {
          if (result.status !== 200) {
            this._notificacionesService.showToast('error', 'Error al Eliminar la Información de Compromiso', result.message);
          } else if (result.status === 200) {
            if (result.findRecord === true) {
              // Carga el listado de nuevo
              this._notificacionesService.showToast('default', 'Eliminación de compromiso de Proyecto', result.message);
              this.getAllFinanciamientoDetCompromisoService();
            } else {
              this._notificacionesService.showToast('error', 'Error al Eliminar la Información de Compromiso', result.message);
            }
          }
        },
        error => {
          this._notificacionesService.showToast('error', 'Error al eliminar la Información de Compromiso', JSON.stringify(error.error.message));
        },
      );
    } else {
      this._notificacionesService.showToast('error', 'Error al eliminar la Información de Compromiso', 'Debes Ingresar seleccionar el Compromiso a Eliminar, para continuar');
    }
  } // FIN | FND-003

}
