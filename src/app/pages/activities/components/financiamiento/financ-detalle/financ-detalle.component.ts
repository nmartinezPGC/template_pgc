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
import { delay } from 'q';
import { ListasComunesService } from '../../../../common-list/services/listas-comunes.service';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'ngx-financ-detalle',
  templateUrl: './financ-detalle.component.html',
  styleUrls: ['./financ-detalle.component.scss'],
  providers: [FinanciamientoDetService, NotificacionesService, ListasComunesService, ConfirmationService],
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
  public displayDialog: boolean = false;
  public idSocioDesarrolloSave: number;

  // Secciones de Compromisos, Desembolsos y Gastos
  public finanClasFlag: boolean = false;
  public finanEncFlag: boolean = false;

  // Json Recptions
  public JsonReceptionAllTipoFinanciamiento: any[];
  public JsonReceptionAllModalidadAyuda: any[];
  public JsonReceptionAllSocioDesarrollo: any[];
  public JsonReceptionDetalleFinanciamiento: any[];
  public JsonReceptionDetalleFinanciamientoBySocioDesarrollo0: any[];
  public JsonReceptionFinancimientoDetProyecto: any[];
  public JsonReceptionNew = [];
  public JsonReceptionNewDet = [];

  public contadorSociosDessarrollo: number = 0;

  // Variables de Auditoria



  public secuenciaFinancDetalle: any;


  /**
   * Constructor de la Calse
   * @param _financiamientoDetService
   * @param _listasComunesService
   * @param _notificacionesService
   */
  constructor(public _financiamientoDetService: FinanciamientoDetService,
    private _notificacionesService: NotificacionesService,
    private _listasComunesService: ListasComunesService,
    private confirmationService: ConfirmationService) {
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
      // this.getFindByIdActividadDetalleService(this.idActividadFinancEnc);
    }

  }


  /**
   * Inicializacion de la Clase
   */
  ngOnInit() {
    this.JsonReceptionNew = [];
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
  private validDataFinanciamientoDet() {
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
  private async newFinanciamientoDetService(idOrganizacion: number) {
    // Creacion del Codigo del Financiamiento Detalle | 7 = NEW-AFD (Nuevo Financiamiento Detalle)
    this.getSecuenciaListService('NEW-AFD');

    await delay(100);

    // Asignacion de nuevos valores de Modelo
    this._activityFinanciamientoDetModel.idSocioDesarrolloSend = idOrganizacion;
    this._activityFinanciamientoDetModel.idActividadFinancEnc = { idActividadFinancEnc: this.idActividadFinancEnc };
    this._activityFinanciamientoDetModel.idTipoFinanciamiento = { idTipoFinanciamiento: this._activityFinanciamientoDetModel.idTipoFinanciamientoSend };
    this._activityFinanciamientoDetModel.idModalidadAyuda = { idModalidadAyuda: this._activityFinanciamientoDetModel.idModalidadAyudaSend };
    this._activityFinanciamientoDetModel.idSocioDesarrollo = { idOrganizacion: this._activityFinanciamientoDetModel.idSocioDesarrolloSend };
    // this._activityFinanciamientoDetModel.codigoFinancDet = this.codigoProyectoTab + '-AFD-' + this.idProyectoTab;

    // Evaluacion de Datos de Financiamiento Detalle de Proyecto
    if (this.idActividadFinancEnc !== 0) {
      if (this._activityFinanciamientoDetModel.idSocioDesarrolloSend !== 0) {
        if (this._activityFinanciamientoDetModel.idTipoFinanciamientoSend !== 0) {
          if (this._activityFinanciamientoDetModel.idModalidadAyudaSend !== 0) {
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

                    // Actualizamos la Siguiente Secuencia
                    this.updateSecuenciaService(this.idUsuarioTab, 7);

                    // Socios al Desarrollo del Proyecto
                    this.ngOnInit();
                  }
                }
              },
              error => {
                this._notificacionesService.showToast('error', 'Error al Ingresar la Información de Clasificación de Financiamiento', JSON.stringify(error.error.message));
              },
            );
          } else {
            this._notificacionesService.showToast('error', 'Error al ingresar la Información de Clasificación de Financiamiento', 'Debes de ingresar la Modalidad de Ayuda del Financiamiento, para continuar');
          }
        } else {
          this._notificacionesService.showToast('error', 'Error al ingresar la Información de Clasificación de Financiamiento', 'Debes de ingresar el Tipo Financiamiento del Proyecto, para continuar');
        }
      } else {
        this._notificacionesService.showToast('error', 'Error al ingresar la Información de Clasificación de Financiamiento', 'Debes de ingresar el Socio al Desarrollo del Proyecto, para continuar');
      }
    } else {
      this._notificacionesService.showToast('error', 'Error al ingresar la Información de Clasificación de Financiamiento', 'Debes de ingresar el Costo Total del Proyecto, para continuar');
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
    this.JsonReceptionAllSocioDesarrollo = [];

    this._financiamientoDetService.getAllSociosDesarrolloByIdActividad(idActividad).subscribe(
      result => {
        if (result.status !== 200) {
          this._notificacionesService.showToast('error', 'Error al Obtener la Información de todos Socios al Desarrollo', result.message);
          this.JsonReceptionAllSocioDesarrollo = [];
        } else if (result.status === 200) {
          this.JsonReceptionAllSocioDesarrollo = result.data;

          // Ejecuta la Funcion que llama al Servicio de Clasificacion de Financiamiento
          // console.log(this.idActividadFinancEnc);

          this.getFindByIdActividadEncAndSocioDesarrolloService(this.idActividadFinancEnc);
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
    // Ejecuta el Servicio de invocar todos los Detalles de Financiamiento
    this._financiamientoDetService.getFindByIdActividadDetalle(idActividadFinancEnc).subscribe(
      result => {
        if (result.status !== 200) {
          // this._notificacionesService.showToast('error', 'Error al Obtener la Información de detalle de financiamiento', result.message);
          this.JsonReceptionDetalleFinanciamiento = [];
        } else if (result.status === 200) {
          this.JsonReceptionDetalleFinanciamiento = result.data;
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
  * Params: { idActividadFinancEnc }
  ****************************************************************************/
  private async getFindByIdActividadEncAndSocioDesarrolloService(idActividadFinancEnc: number) {
    // Ejecuta el Servicio de invocar todas las Clasificacion de Financiamiento de todos los Socios al Desarrollo
    this.JsonReceptionDetalleFinanciamientoBySocioDesarrollo0 = [];
    this.JsonReceptionNew = [];

    for (let index = 0; index < this.JsonReceptionAllSocioDesarrollo.length; index++) {
      const element1 = this.JsonReceptionAllSocioDesarrollo[index];

      // Ejecuta la llamada al servicio que provee el detalle de Clasificacion de Financiamiento del Socio al Desarrollo
      this._financiamientoDetService.getFindByIdActividadEncAndSocioDesarrollo(idActividadFinancEnc, element1.idOrganizacion.idOrganizacion).subscribe(
        result => {
          if (result.status !== 200) {
            this.JsonReceptionDetalleFinanciamientoBySocioDesarrollo0 = [];
          } else if (result.status === 200) {
            // Evalua si obtiene datos de response
            if (result.findRecord === true) {
              this.JsonReceptionDetalleFinanciamientoBySocioDesarrollo0 = result.data;
              // Array para el Segundo Ciclo, Clasificacion del Socio al Desarrollo | Nivel 2
              const financiamientoDet = [];

              // Ciclo para encontrar hacer Push de los items del Financiamiento de Detalle del Socio al Desarrollo
              for (let index2 = 0; index2 < this.JsonReceptionDetalleFinanciamientoBySocioDesarrollo0.length; index2++) {
                const element2 = this.JsonReceptionDetalleFinanciamientoBySocioDesarrollo0[index2];

                // Empuja el nuevo item encontrado de Clasificacion de Financimiento
                financiamientoDet.push({
                  idActividadFinancDet: element2.idActividadFinancDet,
                  codigoFinancDet: element2.codigoFinancDet,
                  idOrganizacionFinanciera: element2.idOrganizacionFinanciera,
                  idModalidadAyuda: element2.idModalidadAyuda.idModalidadAyuda,
                  descripcionModalidadAyuda: element2.idModalidadAyuda.descripcionModalidadAyuda,
                  idTipoFinanciamiento: element2.idTipoFinanciamiento.idTipoFinanciamiento,
                  descripcionTipoFinanciamiento: element2.idTipoFinanciamiento.descripcionTipoFinanciamiento,
                });
              }
              // Push del Array de Detalle si encuentra datos
              this.JsonReceptionNew.push({
                idSocioDesarrollo: element1.idOrganizacion.idOrganizacion,
                descOrganizacion: element1.idOrganizacion.descOrganizacion,
                nombreOrganizacion: element1.idOrganizacion.nombreOrganizacion,
                financiamientoDet: financiamientoDet,
              });
            } else {
              // Push del Array de Detalle si no encuentra datos
              this.JsonReceptionNew.push({
                idSocioDesarrollo: element1.idOrganizacion.idOrganizacion,
                descOrganizacion: element1.idOrganizacion.descOrganizacion,
                nombreOrganizacion: element1.idOrganizacion.nombreOrganizacion,
                financiamientoDet: null,
              });
            }
          }
        },
        error => {
          this._notificacionesService.showToast('error', 'Error al Obtener la Información de detalle de financiamiento, del Socio al Desarrollo', JSON.stringify(error.error.message));
        },
      );
      // Delay para ejecutar de forma Asincrona la siguiente peticion
      await delay(100);
    }
  } // FIN | FND-006



  /****************************************************************************
  * Funcion: saveFinanciamientoDetService
  * Object Number: FND-007
  * Fecha: 13-06-2019
  * Descripcion: Method saveFinanciamientoDetService of the Class
  * Objetivo: Ejecuta la funcion del CRUD analizada
  * Params: { }
  ****************************************************************************/
  private saveFinanciamientoDetService(idOrganizacion: number) {
    // Evalua que el ID de Financiamiento Encabezado sea distinto a 0
    if (this._activityFinanciamientoDetModel.idActividadFinancDet !== 0) {
      // Edita la información de Encabezado
      this.editFinanciamientoDetService(this._activityFinanciamientoDetModel.idActividadFinancDet, this._activityFinanciamientoDetModel);

      // Socios al Desarrollo del Proyecto
      this.getAllSociosDesarrolloService(this.idProyectoTab);
    } else {
      // Ingresa la información de Encabezado
      this.newFinanciamientoDetService(this.idSocioDesarrolloSave);
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
  private editFinanciamientoDetService(idActividadFinancDet: number, _activityFinanciamientoDetModel: any) {
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

                // Socios al Desarrollo del Proyecto
                this.ngOnInit();
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


  /****************************************************************************
  * Funcion: editFinanciamientoDetService
  * Object Number: FND-009
  * Fecha: 20-06-2019
  * Descripcion: Method Modal Class of the Class
  * Objetivo: Ventana Modal del Detalle del Financiamiento
  * Params: { idSocioDesarrollo }
  ****************************************************************************/
  private showDialogAddTo(idSocioDesarrollo: number) {
    this.idSocioDesarrolloSave = idSocioDesarrollo;

    // Evalua que se aha ingresado el Detalle del Financiamiento
    // this.JsonCompromisosSelect = null;

    if (this.idActividadFinancEnc === undefined) {
      this._notificacionesService.showToast('error', 'Error al ingresar la Información de Compromisos', 'Debes Ingresar la Clasificación de Financiamiento, para continuar');
      this.closeModal();
    } else {
      this.displayDialog = true;

      // this.JsonCompromisosSelect = {
      //   'idActividadFinancDetCompromiso': idActividadFinancDetCompromiso,
      //   'idTipoTransaccion': idTipoTransaccion,
      //   'montoCompromiso': montoCompromiso,
      //   'idMonedaActividad': idMonedaActividad,
      //   'fechaTransaccion': fechaTransaccion,
      //   'codigoFinancCompromiso': codigoFinancCompromiso,
      // }
    }
  }

  /****************************************************************************
  * Funcion: showDialogEditTo
  * Object Number: FND-009
  * Fecha: 20-06-2019
  * Descripcion: Method Modal Class of the Class
  * Objetivo: Ventana Modal del Detalle del Financiamiento
  * Params: { _activityFinanciamientoDetModel }
  ****************************************************************************/
  private showDialogEditTo(idActividadFinancDet: number, codigoFinancDet: string, idTipoFinanciamiento: number, idModalidadAyuda: number, idOrganizacionFinanciera: string) {
    // Evalua que este ligado a un Encabezado y Detalle
    if (this.idActividadFinancEnc === undefined && idActividadFinancDet === undefined) {
      this._notificacionesService.showToast('error', 'Error al ingresar la Información de Compromisos', 'Debes Ingresar la Clasificación de Financiamiento, para continuar');
      this.closeModal();
    } else {
      this.displayDialog = true;

      // Asigna los valores al Formulario
      this._activityFinanciamientoDetModel.codigoFinancDet = codigoFinancDet;
      this._activityFinanciamientoDetModel.idActividadFinancDet = idActividadFinancDet;
      this._activityFinanciamientoDetModel.idOrganizacionFinanciera = idOrganizacionFinanciera;
      this._activityFinanciamientoDetModel.idModalidadAyudaSend = idModalidadAyuda;
      this._activityFinanciamientoDetModel.idTipoFinanciamientoSend = idTipoFinanciamiento;
    }
  }

  private closeModal() {
    // this.display = false;
    // this.getAllFinanciamientoDetCompromisoService(this.idActividadFinancDet);
  } // FIN | FND-009


  /*****************************************************
  * Object Number: FND-010
  * Fecha: 20-06-2019
  * Descripcion: Funcion que Obtiene la Secuencia del
  * Proyecto o Actividad
  * Params: { codSecuencia }
  ******************************************************/
  protected getSecuenciaListService(codSecuencia: string) {
    // Envia la Secuencia a Buscar
    this._listasComunesService.getSecuenciaActividad(codSecuencia).subscribe(
      result => {
        if (result.status !== 200) {
          this._notificacionesService.showToast('error', 'Error al Obtener la Información de la Secuencia', JSON.stringify(result.message));
        } else if (result.status === 200) {
          this.secuenciaFinancDetalle = result.data;

          // Componemos la Secuencia a Generar
          const prefixHND: string = '-AFD-';
          this._activityFinanciamientoDetModel.codigoFinancDet = this.codigoProyectoTab + prefixHND + (Number(this.secuenciaFinancDetalle.valor2));
        }
      },
      error => {
        this._notificacionesService.showToast('error', 'Error al Obtener la Información de la Secuencia', JSON.stringify(error.error.message));
      },
    );
  } // FIN | FND-010


  /*****************************************************
  * Funcion: FND-01
  * Fecha: 20-06-2019
  * Descripcion: Funcion que Actuaiza la Secuencia del
  * Proyecto o Actividad
  * Params: { jsonSecuencia, idSecuencia }
  ******************************************************/
  protected updateSecuenciaService(idUsuarioMod: number, idSecuencia: number) {
    // Envia la Secuencia a Buscar
    const jsonSecuencia = {
      'idUsuarioMod': {
        'idUsuario': idUsuarioMod,
      },
    };

    this._financiamientoDetService.updateSecuence(jsonSecuencia, idSecuencia).subscribe(
      result => {
        if (result.status !== 200) {
          this._notificacionesService.showToast('error', 'Error al Actualizar la Información de la Secuencia', JSON.stringify(result.message));
        } else if (result.status === 200) {
          // Result success
        }
      },
      error => {
        this._notificacionesService.showToast('error', 'Error al Actualizar la Información de la Secuencia', JSON.stringify(error.error.message));
      },
    );
  } // FIN | FND-011


  /****************************************************************************
  * Funcion: deleteFinanciamientoDetService
  * Object Number: FND-012
  * Fecha: 24-06-2019
  * Descripcion: Method deleteFinanciamientoDetService of the Class
  * Objetivo: Eliminar el Detalle del Financiamiento
  * Params: { codigoFinancDet }
  ****************************************************************************/
  private deleteFinanciamientoDetService(codigoFinancDet: string) {
    // Ejecuta el Servicio de invocar la actualizacion de Detalle de Financiamiento
    this._financiamientoDetService.deleteActividadFinanciamientoDet(codigoFinancDet).subscribe(
      result => {
        if (result.status !== 200) {
          this._notificacionesService.showToast('error', 'Error al Eliminar la Información de Detalle de Financiamiento', result.message);
        } else if (result.status === 200) {
          if (result.findRecord === true) {
            this._notificacionesService.showToast('default', 'Detalle de Financiamiento', result.message);

            // Socios al Desarrollo del Proyecto
            this.getAllSociosDesarrolloService(this.idProyectoTab);
          } else {
            this._notificacionesService.showToast('error', 'Error al Eliminar la Información de Encabezado de Financiamiento', result.message);
          }
        }
      },
      error => {
        this._notificacionesService.showToast('error', 'Error al Eliminar la Información de Encabezado de Financiamiento', JSON.stringify(error.error.message));
      },
    );
  } // FIN | FND-012


  /****************************************************************************
  * Funcion: confirm
  * Object Number: FND-014
  * Fecha: 24-06-2019
  * Descripcion: Method confirm of the Class
  * Objetivo: Eliminar el Detalle de Financiamiento seleccionado
  * Params: { codigoFinancDet }
  ****************************************************************************/
  confirm(codigoFinancDet: string) {
    this.confirmationService.confirm({
      message: 'Estas seguro de Eliminar el Detalle de Financiamiento, puede que contenga Compromisos, Desembolsos y Gastos?',
      accept: () => {
        // Ejecuta la funcion de Eliminar el Detalle de Financiamiento
        this.deleteFinanciamientoDetService(codigoFinancDet);
      },
    });
  } // FIN | FND-013


  /****************************************************************************
   @author Nahum Martinez
   @name clearForm
   @function FND-015
   @fecha 24-06-2019
   @description Limpiar el formulario
   @param { }
   @copyright SRECI-2019
  ****************************************************************************/
  clearForm() {
    this.ngOnInit();
  } // FIN | clearForm
}
