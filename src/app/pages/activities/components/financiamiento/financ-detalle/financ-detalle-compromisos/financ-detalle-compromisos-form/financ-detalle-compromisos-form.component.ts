/**
* @author Nahum Martinez
* @returns Formulario de Ingreso de Comprimisos
* @name FinancDetalleCompromisosFormComponent
* @alias _financDetalleCompromisosFormComponent
* @version 1.0.0
* @date 2019-05-29
*/

import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { NotificacionesService } from '../../../../../../shared/services/notificaciones.service';
import { ActivityFinanciamientoDetCompromisosModel } from '../../../../../models/financiamiento/model-financiamiento-det-compromisos';
import { FinanciamientoDetService } from '../../../../../services/financiamiento/financiamiento-det.service';
import { FinanciamientoEncService } from '../../../../../services/financiamiento/financiamiento-enc.service';
import { ListasComunesService } from '../../../../../../common-list/services/listas-comunes.service';
import { delay } from 'q';

@Component({
  selector: 'ngx-financ-detalle-compromisos-form',
  templateUrl: './financ-detalle-compromisos-form.component.html',
  styleUrls: ['./financ-detalle-compromisos-form.component.scss'],
  providers: [ConfirmationService, FinanciamientoEncService, FinanciamientoDetService, ListasComunesService],
})
export class FinancDetalleCompromisosFormComponent implements OnInit, OnChanges {
  // Variables primitivas
  modalHeaderIdActividadFinancDet: number;
  modalHeaderCodigoActividad: string;
  modalHeaderIdActividad: number;

  // Variables entre Tabs | Components
  @Input() idProyectoTab: number;
  @Input() idUsuarioTab: number;
  @Input() codigoProyectoTab: string;
  @Input() idActividadFinancEnc: number;
  @Input() idActividadFinancDet: number;
  @Input() JsonCompromisosSelect: any;

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
  display2: boolean = false;

  // Variables de fecha
  date6: Date;
  es: any;

  // Variables de Auditoria
  public secuenciaDeCompromiso: any;

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
    private _financiamientoDetService: FinanciamientoDetService,
    private _listasComunesService: ListasComunesService) { }


  /**
   * Metodo de inizalizacion de la Clase
   */
  ngOnInit() {
    // Valor de Detalle del Financiamiento del Proyecto
    const idActividadFinancDetSend = { idActividadFinancDet: this.idActividadFinancDet };
    // Inicializacion del Modelo
    this._activityFinanciamientoDetCompromisosModel = new ActivityFinanciamientoDetCompromisosModel(
      0, null, // Generales de tabla
      null, 0, null, 0, null, 0, // Relacionales
      null, null, 0, // Transaccion
      true, null, null, // Auditoria
    );

    // Inicio de los servicios de datos
    this.getAllMonedasActividadService();

    this.getAllTipoTransaccionService();
  } // FIN | ngOnInit


  /**
   * Metodo que recibe los cambios de vairables
   */
  ngOnChanges() {
    // Verificacion de informacion de Compromiso
    if (this.JsonCompromisosSelect.idActividadFinancDetCompromiso !== undefined) {
      // Carga el Model con los datos enviados
      this._activityFinanciamientoDetCompromisosModel.idActividadFinancDetCompromiso = this.JsonCompromisosSelect.idActividadFinancDetCompromiso;
      this._activityFinanciamientoDetCompromisosModel.idTipoTransaccionSend = this.JsonCompromisosSelect.idTipoTransaccion;
      this._activityFinanciamientoDetCompromisosModel.montoCompromiso = this.JsonCompromisosSelect.montoCompromiso;
      this._activityFinanciamientoDetCompromisosModel.idMonedaActividadSend = this.JsonCompromisosSelect.idMonedaActividad;
      this._activityFinanciamientoDetCompromisosModel.codigoFinancCompromiso = this.JsonCompromisosSelect.codigoFinancCompromiso;
      this.date6 = new Date(this.JsonCompromisosSelect.fechaTransaccion);
      this._activityFinanciamientoDetCompromisosModel.fechaTransaccion = this.date6;
    } else {
      // Inicializacion del Modelo
      this._activityFinanciamientoDetCompromisosModel = new ActivityFinanciamientoDetCompromisosModel(
        0, null, // Generales de tabla
        null, 0, null, 0, null, 0, // Relacionales
        null, null, 0, // Transaccion
        true, null, null, // Auditoria
      );

      // Fecha
      this.date6 = null;
    }
  } // FIN | ngOnChanges


  /****************************************************************************
   * Funcion: closeModal
   * Object Number: 001
   * Fecha: 29-05-2019
   * Descripcion: Method closeModal of the Class
   * Objetivo: closeModal cerrar la ventana Modal
   * Params: { }
   ****************************************************************************/
  closeModal() {
    this.display2 = false;
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
  } // FIN | Dialog


  /****************************************************************************
  * Funcion: getAllMonedasActividadService
  * Object Number: FND-001
  * Fecha: 06-06-2019
  * Descripcion: Method getAllMonedasActividadService of the Class
  * Objetivo: listados de las Monedas de Proyecto
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
  } // FIN | FND-001


  /****************************************************************************
  * Funcion: getAllTipoTransaccionService
  * Object Number: FND-002
  * Fecha: 06-06-2019
  * Descripcion: Method getAllTipoTransaccionService of the Class
  * Objetivo: listados de los Tipos de Transaccion
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
  } // FIN | FND-002


  /****************************************************************************
  * Funcion: saveFinanciamientoDetCompromisoService
  * Object Number: FND-003
  * Fecha: 21-05-2019
  * Descripcion: Method saveFinanciamientoDetCompromisoService of the Class
  * Objetivo: Registrar Compromisos del Proyecto
  * Params: { _activityFinanciamientoEncModel }
  ****************************************************************************/
  async newFinanciamientoDetCompromisoService() {
    // Creacion del Codigo del Compromiso | 4 = NEW-ADC (Nuevo Compromiso)
    this.getSecuenciaListService('NEW-ADC');

    await delay(100);

    // Asignacion de nuevos valores de Modelo
    this._activityFinanciamientoDetCompromisosModel.idActividadFinancDetSend = this.idActividadFinancDet;
    this._activityFinanciamientoDetCompromisosModel.idActividadFinancDet = { idActividadFinancDet: this._activityFinanciamientoDetCompromisosModel.idActividadFinancDetSend };

    // Evaluacion de Datos de Financiamiento de Compromiso para Proyecto
    if (this.idActividadFinancDet !== undefined) {
      if (this._activityFinanciamientoDetCompromisosModel.idTipoTransaccionSend !== 0) {
        this._activityFinanciamientoDetCompromisosModel.idTipoTransaccion = { idTipoTransaccion: this._activityFinanciamientoDetCompromisosModel.idTipoTransaccionSend };

        if (this._activityFinanciamientoDetCompromisosModel.montoCompromiso !== null) {

          if (this._activityFinanciamientoDetCompromisosModel.idMonedaActividadSend !== 0) {
            this._activityFinanciamientoDetCompromisosModel.idMonedaActividad = { idMonedaActividad: this._activityFinanciamientoDetCompromisosModel.idMonedaActividadSend };

            // Ejecuta el Servicio de invocar el registro de Compromiso de Socio al Desarrollo
            this._financiamientoDetService.newActividadFinanciamientoDetCompromiso(this._activityFinanciamientoDetCompromisosModel).subscribe(
              result => {
                if (result.status !== 200) {
                  this._notificacionesService.showToast('error', 'Error al Ingresar la Información de Compromisos', result.message);
                } else if (result.status === 200) {
                  if (result.findRecord === true) {
                    this._notificacionesService.showToast('error', 'Error al Ingresar la Información de Compromisos', result.message);
                  } else {
                    this._notificacionesService.showToast('default', 'Registro de compromiso de Proyecto', result.message);

                    // Actualizamos la Siguiente Secuencia
                    this.updateSecuenciaService(this.idUsuarioTab, 4);

                    // this.closeModal();
                    this.ngOnInit();
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
    } else {
      this._notificacionesService.showToast('error', 'Error al ingresar la Información de Compromisos', 'Debes Ingresar el Detalle de Financiamiento, para continuar');
    }
  } // FIN | FND-003


  /*****************************************************
  * Object Number: FND-004
  * Fecha: 09-06-2019
  * Descripcion: Funcion que Obtiene la Secuencia del
  * Proyecto o Actividad
  * Params: codSecuencia
  ******************************************************/
  protected getSecuenciaListService(codSecuencia: string) {
    // Envia la Secuencia a Buscar
    this._listasComunesService.getSecuenciaActividad(codSecuencia).subscribe(
      result => {
        if (result.status !== 200) {
          this._notificacionesService.showToast('error', 'Error al Obtener la Información de la Secuencia', JSON.stringify(result.message));
        } else if (result.status === 200) {
          this.secuenciaDeCompromiso = result.data;

          // Componemos la Secuencia a Generar
          const prefixHND: string = '-ADC-';
          this._activityFinanciamientoDetCompromisosModel.codigoFinancCompromiso = this.codigoProyectoTab + prefixHND + (Number(this.secuenciaDeCompromiso.valor2));
        }
      },
      error => {
        this._notificacionesService.showToast('error', 'Error al Obtener la Información de la Secuencia', JSON.stringify(error.error.message));
      },
    );
  } // FIN | FND-004


  /*****************************************************
  * Funcion: FND-005
  * Fecha: 09-06-2019
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
  } // FIN | FND-005


  /****************************************************************************
  * Funcion: confirm
  * Object Number: FND-006
  * Fecha: 11-06-2019
  * Descripcion: Method confirm of the Class
  * Objetivo: Eliminar el Compromiso seleccionado
  * Params: { }
  ****************************************************************************/
  confirm() {
    this.confirmationService.confirm({
      message: 'Estas seguro de Registrar el Compromiso?',
      accept: () => {
        // Ejecuta la funcion de Registrar el Compromiso
        this.saveFinanciamientoDetCompromisoService();
      },
    });
  } // FIN | FND-006


  /****************************************************************************
  * Funcion: editFinanciamientoDetCompromisoService
  * Object Number: FND-007
  * Fecha: 13-06-2019
  * Descripcion: Method editFinanciamientoDetCompromisoService of the Class
  * Objetivo: Actualiza Compromisos del Proyecto
  * Params: { idActividadFinancDetCompromiso, _activityFinanciamientoEncModel }
  ****************************************************************************/
  editFinanciamientoDetCompromisoService(idActividadFinancDetCompromiso: number) {
    // Valida que Se ha registrado previamente el Compromiso para editarlo
    if (this._activityFinanciamientoDetCompromisosModel.idActividadFinancDetCompromiso === 0) {
      // this._notificacionesService.showToast('error', 'Eror al Actualizar Compromiso', 'Debes de Seleccionar el ');
      return -1;
    }

    // Evaluacion de Datos de Financiamiento de Compromiso para Proyecto
    if (this._activityFinanciamientoDetCompromisosModel.idTipoTransaccionSend !== 0) {
      this._activityFinanciamientoDetCompromisosModel.idTipoTransaccion = { idTipoTransaccion: this._activityFinanciamientoDetCompromisosModel.idTipoTransaccionSend };

      if (this._activityFinanciamientoDetCompromisosModel.montoCompromiso !== null) {

        if (this._activityFinanciamientoDetCompromisosModel.idMonedaActividadSend !== 0) {
          this._activityFinanciamientoDetCompromisosModel.idMonedaActividad = { idMonedaActividad: this._activityFinanciamientoDetCompromisosModel.idMonedaActividadSend };

          // Ejecuta el Servicio de invocar la actualizacion de Compromiso de Socio al Desarrollo
          this._financiamientoDetService.editActividadFinanciamientoDetCompromiso(idActividadFinancDetCompromiso, this._activityFinanciamientoDetCompromisosModel).subscribe(
            result => {
              if (result.status !== 200) {
                this._notificacionesService.showToast('error', 'Error al Actualizar la Información de Compromisos', result.message);
              } else if (result.status === 200) {
                if (result.findRecord === false) {
                  this._notificacionesService.showToast('error', 'Error al Actualizar la Información de Compromisos', result.message);
                } else {
                  this._notificacionesService.showToast('default', 'Actualizacion de compromiso de Proyecto', result.message);

                  // Reinicia el Formulario
                  // this.ngOnInit();
                }
              }
            },
            error => {
              this._notificacionesService.showToast('error', 'Error al Actualizar la Información de Compromisos', JSON.stringify(error.error.message));
            },
          );
        } else {
          this._notificacionesService.showToast('error', 'Error al Actualizar la Información de Compromisos', 'Debes de ingresar Moneda de Compromiso, para continuar');
        }
      } else {
        this._notificacionesService.showToast('error', 'Error al Actualizar la Información de de Compromisos', 'Debes de ingresar el monto de Compromiso, para continuar');
        this.montoCompromiso.nativeElement.focus();
      }
    } else {
      this._notificacionesService.showToast('error', 'Error al Actualizar la Información de Compromisos', 'Debes de ingresar el Tipo de Transacción, para continuar');
      // this.montoActividadInput.nativeElement.focus();
    }
  } // FIN | FND-007


  /****************************************************************************
  * Funcion: saveFinanciamientoDetCompromisoService
  * Object Number: FND-008
  * Fecha: 13-06-2019
  * Descripcion: Method saveFinanciamientoDetCompromisoService of the Class
  * Objetivo: Ejecuta la funcion del CRUD analizada
  * Params: { }
  ****************************************************************************/
  saveFinanciamientoDetCompromisoService() {
    // Evalua que el ID de Compromiso sea distinto a 0
    if (this._activityFinanciamientoDetCompromisosModel.idActividadFinancDetCompromiso !== 0) {
      this.editFinanciamientoDetCompromisoService(this._activityFinanciamientoDetCompromisosModel.idActividadFinancDetCompromiso);
    } else {
      this.newFinanciamientoDetCompromisoService();
    }
  } // FIN | FND-008
}
