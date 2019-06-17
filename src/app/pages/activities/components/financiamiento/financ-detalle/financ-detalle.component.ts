/**
* @author Nahum Martinez
* @returns Componente de Financ Detalle
* @name FinancDetalleComponent
* @alias _financDetalleComponent
* @version 1.0.0
* @fecha 16-05-2019
*/

import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { NotificacionesService } from '../../../../shared/services/notificaciones.service';
import { ActivityFinanciamientoDetModel } from '../../../models/financiamiento/model-financiamiento-det';
import { FinanciamientoDetService } from '../../../services/financiamiento/financiamiento-det.service';

@Component({
  selector: 'ngx-financ-detalle',
  templateUrl: './financ-detalle.component.html',
  styleUrls: ['./financ-detalle.component.scss'],
  providers: [FinanciamientoDetService, NotificacionesService],
})
export class FinancDetalleComponent implements OnInit, OnChanges {
  // Variables entre Tabs | Components
  @Input() idProyectoTab: number;
  @Input() idUsuarioTab: number;
  @Input() codigoProyectoTab: string;
  @Input() idActividadFinancEnc: number;
  @Input() idActividadFinancDet: number;
  @Input() idSocioDesarrolloTab: number;

  // variable del Json
  @Input() JsonPassData: any;

  // Modelo de la Clase
  public _activityFinanciamientoDetModel: ActivityFinanciamientoDetModel;

  // Ventana Modal de Fecha
  display: boolean = false;

  // Json Recptions
  JsonReceptionAllTipoFinanciamiento: any[];
  JsonReceptionAllModalidadAyuda: any[];
  JsonReceptionAllSocioDesarrollo: any[];
  JsonReceptionDetalleFinanciamiento: any[];
  JsonReceptionDetalleFinanciamientoBySocioDesarrollo: any[];
  JsonReceptionFinancimientoDetProyecto: any[];


  /**
   * Constructor de la Calse
   * @param _financiamientoDetService
   */
  constructor(public _financiamientoDetService: FinanciamientoDetService,
    private _notificacionesService: NotificacionesService) {
  }


  /**
   * Metodo change del Componente
   */
  ngOnChanges() {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    // console.log('En detalle change Socio ' + this.idSocioDesarrolloTab);
    if (this.idActividadFinancEnc !== undefined) {
      // Carga Detalle de financimiento
      this.getFindByIdActividadDetalleService(this.idActividadFinancEnc);
    }

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
    this.getAllModalidadAyudaService();

    // Socios al Desarrollo del Proyecto
    this.getAllSociosDesarrolloService(this.idProyectoTab);
  } // FIN | ngOnInit


  /**
   * ******************* Funciones Propias **************************************
   */
  /****************************************************************************
  * Funcion: getAllTipoFinanciamientoService
  * Object Number: FND-001
  * Fecha: 29-05-2019
  * Descripcion: Method getAllTipoFinanciamientoService of the Class
  * Objetivo: Listados de los Tipos de Financ.
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
        this._notificacionesService.showToast('error', 'Error al Obtener la Información de todas los Tipos de Financiamiento', JSON.stringify(error.error.message));
      },
    );
  } // FIN | FND-001


  /****************************************************************************
  * Funcion: getAllModalidadAyudaService
  * Object Number: FND-002
  * Fecha: 29-05-2019
  * Descripcion: Method getAllModalidadAyudaService of the Class
  * Objetivo: Listados de las Modalidades de Ayuda
  * Params: { }
  ****************************************************************************/
  private getAllModalidadAyudaService() {
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
        this._notificacionesService.showToast('error', 'Error al Obtener la Información de todas las  Modalidades de Ayuda', JSON.stringify(error.error.message));
      },
    );
  } // FIN | FND-002


  /****************************************************************************
  * Funcion: validDataFinanciamientoDet
  * Object Number: FND-003
  * Fecha: 29-05-2019
  * Descripcion: Method validDataFinanciamientoDet of the Class
  * Objetivo: Valida la informacion que ingresa el
  * Detalle del Proyecto
  * Params: { _activityFinanciamientoDetModel }
  ****************************************************************************/
  validDataFinanciamientoDet() {
    // Valida la Informacion ingresada del Deatlle de Financiamiento
    if (this.idActividadFinancEnc === 0) {
      this._notificacionesService.showToast('error', 'Error al Ingresar la Información de Clasificación de Financiamiento', 'Debes ingresar el Costo Total del proyecto para continuar');
      return -1;
    } else {

    }

  } // FIN | FND-003

  /****************************************************************************
  * Funcion: newFinanciamientoDetService
  * Object Number: FND-004
  * Fecha: 29-05-2019
  * Descripcion: Method newFinanciamientoDetService of the Class
  * Objetivo: Ingresa el Detalle del Proyecto
  * Params: { activityFinanciamientoDetModel, idOrganizacion }
  ****************************************************************************/
  newFinanciamientoDetService(idOrganizacion: number) {
    // Asignacion de nuevos valores de Modelo
    this._activityFinanciamientoDetModel.idSocioDesarrolloSend = idOrganizacion;
    this._activityFinanciamientoDetModel.idActividadFinancEnc = { idActividadFinancEnc: this.idActividadFinancEnc };
    this._activityFinanciamientoDetModel.idTipoFinanciamiento = { idTipoFinanciamiento: this._activityFinanciamientoDetModel.idTipoFinanciamientoSend };
    this._activityFinanciamientoDetModel.idModalidadAyuda = { idModalidadAyuda: this._activityFinanciamientoDetModel.idModalidadAyudaSend };
    this._activityFinanciamientoDetModel.idSocioDesarrollo = { idOrganizacion: this._activityFinanciamientoDetModel.idSocioDesarrolloSend };
    this._activityFinanciamientoDetModel.codigoFinancDet = this.codigoProyectoTab + '-AFD-' + this.idProyectoTab;

    // Evaluacion de Datos de Financiamiento Detalle de Proyecto
    if (this.idActividadFinancEnc !== 0) {
      if (this._activityFinanciamientoDetModel.idSocioDesarrolloSend !== 0) {
        if (this._activityFinanciamientoDetModel.idTipoFinanciamientoSend !== 0) {
          // Ejecuta el Servicio de invocar el registro de Detalle de Financiamiento | Clasificacion
          this._financiamientoDetService.newActividadFinanciamientoDet(this._activityFinanciamientoDetModel).subscribe(
            result => {
              if (result.status !== 200) {
                this._notificacionesService.showToast('error', 'Error al Ingresar la Información de Clasificación de Financiamiento', result.message);
              } else if (result.status === 200) {
                if (result.findRecord === true) {
                  this._notificacionesService.showToast('error', 'Error al Ingresar la Información de Clasificación de Financiamiento', result.message);
                } else {
                  this._notificacionesService.showToast('default', 'Clasificación de Financiamiento', result.message);
                  this._activityFinanciamientoDetModel.idActividadFinancDet = result.data.idActividadFinancDet;
                  this.idActividadFinancDet = this._activityFinanciamientoDetModel.idActividadFinancDet;
                }
              }
            },
            error => {
              this._notificacionesService.showToast('error', 'Error al Ingresar la Información de Clasificación de Financiamiento', JSON.stringify(error.error.message));
            },
          );
        } else {
          this._notificacionesService.showToast('error', 'Error al ingresar la Información de Clasificación de Financiamiento', 'Debes de ingresar el Tipo Financiamiento del Proyecto, para continuar');
        }
      } else {
        this._notificacionesService.showToast('error', 'Error al ingresar la Información de Clasificación de Financiamiento', 'Debes de ingresar el Socio al Desarrollo del Proyecto, para continuar');
      }
    } else {
      this._notificacionesService.showToast('error', 'Error al ingresar la Información de Clasificación de Financiamiento', 'Debes de ingresar el Costo Total del Proyecto, para continuar');
      // this.montoActividadInput.nativeElement.focus();
    }
  } // FIN | FND-004


  /****************************************************************************
  * Funcion: getAllSociosDesarrolloService
  * Object Number: FND-005
  * Fecha: 03-06-2019
  * Descripcion: Method getAllSociosDesarrolloService of the Class
  * Objetivo: Listados todos los Socios al Desarrollo
  * Params: { idActividad }
  ****************************************************************************/
  private getAllSociosDesarrolloService(idActividad: number) {
    // Ejecuta el Servicio de invocar todos los Socios al Desarrollo
    this._financiamientoDetService.getAllSociosDesarrolloByIdActividad(idActividad).subscribe(
      result => {
        if (result.status !== 200) {
          this._notificacionesService.showToast('error', 'Error al Obtener la Información de todos Socios al Desarrollo', result.message);
          this.JsonReceptionAllSocioDesarrollo = [];
        } else if (result.status === 200) {
          this.JsonReceptionAllSocioDesarrollo = result.data;

          // Mapeo de los Socios al Desarrollo
          this.JsonReceptionAllSocioDesarrollo.forEach(element => {
            // console.log('Socio # :' + element.idOrganizacion.idOrganizacion + ' Actividad Enc ' + this.idActividadFinancEnc);
            this.getFindByIdActividadEncAndSocioDesarrolloService(this.idActividadFinancEnc, element.idOrganizacion.idOrganizacion);
          });
        }
      },
      error => {
        this._notificacionesService.showToast('error', 'Error al Obtener la Información de todos Socios al Desarrollo', JSON.stringify(error.error.message));
      },
    );
  } // FIN | FND-005


  /****************************************************************************
  * Funcion: getFindByIdActividadDetalleService
  * Object Number: 006
  * Fecha: 03-06-2019
  * Descripcion: Method getFindByIdActividadDetalleService of the Class
  * Objetivo: Detalle del Financiamiento
  * Params: { idActividadFinancEnc }
  ****************************************************************************/
  private getFindByIdActividadDetalleService(idActividadFinancEnc: number) {
    // Ejecuta el Servicio de invocar todos los Socios al Desarrollo
    this._financiamientoDetService.getFindByIdActividadDetalle(idActividadFinancEnc).subscribe(
      result => {
        if (result.status !== 200) {
          // this._notificacionesService.showToast('error', 'Error al Obtener la Información de detalle de financiamiento', result.message);
          this.JsonReceptionDetalleFinanciamiento = [];
        } else if (result.status === 200) {
          this.JsonReceptionDetalleFinanciamiento = result.data;

          // console.log(this.JsonReceptionDetalleFinanciamiento);


          this._activityFinanciamientoDetModel.idModalidadAyudaSend = this.JsonReceptionDetalleFinanciamiento[0].idModalidadAyuda.idModalidadAyuda;
          this._activityFinanciamientoDetModel.idTipoFinanciamientoSend = this.JsonReceptionDetalleFinanciamiento[0].idTipoFinanciamiento.idTipoFinanciamiento;
          this._activityFinanciamientoDetModel.idOrganizacionFinanciera = this.JsonReceptionDetalleFinanciamiento[0].idOrganizacionFinanciera;
          this._activityFinanciamientoDetModel.idActividadFinancDet = this.JsonReceptionDetalleFinanciamiento[0].idActividadFinancDet;
          this._activityFinanciamientoDetModel.codigoFinancDet = this.JsonReceptionDetalleFinanciamiento[0].codigoFinancDet;

          // Carga la variable de traslado a componente de Compromisos
          this.idActividadFinancDet = this._activityFinanciamientoDetModel.idActividadFinancDet;
        }
      },
      error => {
        this._notificacionesService.showToast('error', 'Error al Obtener la Información de detalle de financiamiento', JSON.stringify(error.error.message));
      },
    );
  } // FIN | FND-006


  /****************************************************************************
  * Funcion: getFindByIdActividadEncAndSocioDesarrolloService
  * Object Number: 006
  * Fecha: 03-06-2019
  * Descripcion: Method getFindByIdActividadEncAndSocioDesarrolloService of the Class
  * Objetivo: Detalle del Financiamiento, con el Socio al Desarrollo
  * Params: { idActividadFinancEnc, idSocioDesarrollo }
  ****************************************************************************/
  private getFindByIdActividadEncAndSocioDesarrolloService(idActividadFinancEnc: number, idSocioDesarrollo: number) {
    // Ejecuta el Servicio de invocar todos los Socios al Desarrollo
    this._financiamientoDetService.getFindByIdActividadEncAndSocioDesarrollo(idActividadFinancEnc, idSocioDesarrollo).subscribe(
      result => {
        if (result.status !== 200) {
          // this._notificacionesService.showToast('error', 'Error al Obtener la Información de detalle de financiamiento del Socio al Desarrollo', result.message);
          this.JsonReceptionDetalleFinanciamientoBySocioDesarrollo = [];
        } else if (result.status === 200) {
          this.JsonReceptionDetalleFinanciamientoBySocioDesarrollo = result.data;

          // console.log(this.JsonReceptionDetalleFinanciamientoBySocioDesarrollo);

          // this._activityFinanciamientoDetModel.idModalidadAyudaSend = this.JsonReceptionDetalleFinanciamientoBySocioDesarrollo[0].idModalidadAyuda.idModalidadAyuda;
          // this._activityFinanciamientoDetModel.idTipoFinanciamientoSend = this.JsonReceptionDetalleFinanciamientoBySocioDesarrollo[0].idTipoFinanciamiento.idTipoFinanciamiento;
          // this._activityFinanciamientoDetModel.idOrganizacionFinanciera = this.JsonReceptionDetalleFinanciamientoBySocioDesarrollo[0].idOrganizacionFinanciera;
          // this._activityFinanciamientoDetModel.idActividadFinancDet = this.JsonReceptionDetalleFinanciamientoBySocioDesarrollo[0].idActividadFinancDet;
          // this._activityFinanciamientoDetModel.codigoFinancDet = this.JsonReceptionDetalleFinanciamiento[0].codigoFinancDet;

          // Carga la variable de traslado a componente de Compromisos
          // this.idActividadFinancDet = this._activityFinanciamientoDetModel.idActividadFinancDet;
        }
      },
      error => {
        this._notificacionesService.showToast('error', 'Error al Obtener la Información de detalle de financiamiento, del Socio al Desarrollo', JSON.stringify(error.error.message));
      },
    );
  } // FIN | FND-006



  /****************************************************************************
  * Funcion: saveFinanciamientoDetService
  * Object Number: FND-007
  * Fecha: 13-06-2019
  * Descripcion: Method saveFinanciamientoDetService of the Class
  * Objetivo: Ejecuta la funcion del CRUD analizada
  * Params: { }
  ****************************************************************************/
  saveFinanciamientoDetService(idOrganizacion: number) {
    // console.log(idOrganizacion);

    // Evalua que el ID de Financiamiento Encabezado sea distinto a 0
    if (this._activityFinanciamientoDetModel.idActividadFinancDet !== 0) {
      // Edita la información de Encabezado
      this.editFinanciamientoDetService(this._activityFinanciamientoDetModel.idActividadFinancDet, this._activityFinanciamientoDetModel);
    } else {
      // Ingresa la información de Encabezado
      this.newFinanciamientoDetService(idOrganizacion);
    }
  } // FIN | FND-007


  /****************************************************************************
  * Funcion: editFinanciamientoDetService
  * Object Number: FND-008
  * Fecha: 14-06-2019
  * Descripcion: Method editFinanciamientoDetService of the Class
  * Objetivo: Actualizar el Detalle del Financiamiento
  * Params: { idActividadFinancDet, _activityFinanciamientoDetModel }
  ****************************************************************************/
  editFinanciamientoDetService(idActividadFinancDet: number, _activityFinanciamientoDetModel: any) {
    // Asignacion de nuevos valores de Modelo
    this._activityFinanciamientoDetModel.idModalidadAyuda = { idModalidadAyuda: this._activityFinanciamientoDetModel.idModalidadAyudaSend };
    this._activityFinanciamientoDetModel.idTipoFinanciamiento = { idTipoFinanciamiento: this._activityFinanciamientoDetModel.idTipoFinanciamientoSend };

    // Evaluacion de Datos de Financiamiento de Proyecto
    if (this._activityFinanciamientoDetModel.idActividadFinancDet !== 0) {

      if (this._activityFinanciamientoDetModel.idModalidadAyuda) {
        // Ejecuta el Servicio de invocar la actualizacion de Detalle de Financiamiento
        this._financiamientoDetService.editActividadFinanciamientoDet(idActividadFinancDet, this._activityFinanciamientoDetModel).subscribe(
          result => {
            if (result.status !== 200) {
              this._notificacionesService.showToast('error', 'Error al Actualizar la Información de Encabezado de Financiamiento', result.message);
            } else if (result.status === 200) {
              if (result.findRecord === true) {
                this._notificacionesService.showToast('default', 'Encabezado de Financiamiento', result.message);
                this.idActividadFinancDet = result.data.idActividadFinancDet;
              } else {
                this._notificacionesService.showToast('error', 'Error al Actualizar la Información de Encabezado de Financiamiento', result.message);
              }
            }
          },
          error => {
            this._notificacionesService.showToast('error', 'Error al Actualizar la Información de Encabezado de Financiamiento', JSON.stringify(error.error.message));
          },
        );
      } else {
        this._notificacionesService.showToast('error', 'Error al Actualizar la Información de Moneda de Financiamiento', 'Debes de ingresar monenda de Financiamiento del Proyecto, para continuar');
      }
    } else {
      this._notificacionesService.showToast('error', 'Error al Actualizar la Información de Encabezado de Financiamiento', 'Debes de ingresar el Costo Total del Proyecto, para continuar');
      // this.montoActividadInput.nativeElement.focus();
    }
  } // FIN | FND-008
}
