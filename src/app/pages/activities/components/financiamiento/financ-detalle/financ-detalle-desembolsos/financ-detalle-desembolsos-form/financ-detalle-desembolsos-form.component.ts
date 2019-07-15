import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { ActivityFinanciamientoDetDesembolsosModel } from '../../../../../models/financiamiento/model-financiamiento-det-Desembolsos';
import { NotificacionesService } from '../../../../../../shared/services/notificaciones.service';
import { ConfirmationService } from 'primeng/api';
import { FinanciamientoEncService } from '../../../../../services/financiamiento/financiamiento-enc.service';
import { FinanciamientoDetService } from '../../../../../services/financiamiento/financiamiento-det.service';
import { ListasComunesService } from '../../../../../../common-list/services/listas-comunes.service';
import { delay } from 'q';

@Component({
  selector: 'ngx-financ-detalle-desembolsos-form',
  templateUrl: './financ-detalle-desembolsos-form.component.html',
  styleUrls: ['./financ-detalle-desembolsos-form.component.scss'],
})
export class FinancDetalleDesembolsosFormComponent implements OnInit, OnChanges {
  // Variables entre Tabs | Components
  @Input() idProyectoTab: number;
  @Input() idUsuarioTab: number;
  @Input() codigoProyectoTab: string;
  @Input() idActividadFinancEnc: number;
  @Input() idActividadFinancDet: number;
  @Input() JsonDesembolsosSelect: any;

  // Variables de DOM de la clase
  @ViewChild('montoDesembolso') montoDesembolso: ElementRef;

  // Modelo de la Clase
  public _activityFinanciamientoDetDesembolsosModel: ActivityFinanciamientoDetDesembolsosModel;

  // JsonReceptions
  public JsonReceptionFinancDetDesembolsos: any = [];
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
  public secuenciaDeDesembolso: any;

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
    this._activityFinanciamientoDetDesembolsosModel = new ActivityFinanciamientoDetDesembolsosModel(
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
    if (this.JsonDesembolsosSelect.idActividadFinancDetDesembolso !== undefined) {
      // Carga el Model con los datos enviados
      this._activityFinanciamientoDetDesembolsosModel.idActividadFinancDetDesembolso = this.JsonDesembolsosSelect.idActividadFinancDetDesembolso;
      this._activityFinanciamientoDetDesembolsosModel.idTipoTransaccionSend = this.JsonDesembolsosSelect.idTipoTransaccion;
      this._activityFinanciamientoDetDesembolsosModel.montoDesembolso = this.JsonDesembolsosSelect.montoDesembolso;
      this._activityFinanciamientoDetDesembolsosModel.idMonedaActividadSend = this.JsonDesembolsosSelect.idMonedaActividad;
      this._activityFinanciamientoDetDesembolsosModel.codigoFinancDesembolso = this.JsonDesembolsosSelect.codigoFinancDesembolso;
      this.date6 = new Date(this.JsonDesembolsosSelect.fechaTransaccion);
      this._activityFinanciamientoDetDesembolsosModel.fechaTransaccion = this.date6;
    } else {
      // Inicializacion del Modelo
      this._activityFinanciamientoDetDesembolsosModel = new ActivityFinanciamientoDetDesembolsosModel(
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
    this._activityFinanciamientoDetDesembolsosModel.fechaTransaccion = this.date6;
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
  * Funcion: newFinanciamientoDetDesembolsoService
  * Object Number: FND-003
  * Fecha: 21-05-2019
  * Descripcion: Method newFinanciamientoDetDesembolsoService of the Class
  * Objetivo: Registrar Desembolsos del Proyecto
  * Params: { _activityFinanciamientoDetDesembolsosModel }
  ****************************************************************************/
  async newFinanciamientoDetDesembolsoService() {
    // Creacion del Codigo del Desembolso | 5 = NEW-ADC (Nuevo Desembolso)
    this.getSecuenciaListService('NEW-ADD');

    await delay(100);

    // Asignacion de nuevos valores de Modelo
    this._activityFinanciamientoDetDesembolsosModel.idActividadFinancDetSend = this.idActividadFinancDet;
    this._activityFinanciamientoDetDesembolsosModel.idActividadFinancDet = { idActividadFinancDet: this._activityFinanciamientoDetDesembolsosModel.idActividadFinancDetSend };

    // Evaluacion de Datos de Financiamiento de Desembolso para Proyecto
    if (this.idActividadFinancDet !== undefined) {
      if (this._activityFinanciamientoDetDesembolsosModel.idTipoTransaccionSend !== 0) {
        this._activityFinanciamientoDetDesembolsosModel.idTipoTransaccion = { idTipoTransaccion: this._activityFinanciamientoDetDesembolsosModel.idTipoTransaccionSend };

        if (this._activityFinanciamientoDetDesembolsosModel.montoDesembolso !== null) {

          if (this._activityFinanciamientoDetDesembolsosModel.idMonedaActividadSend !== 0) {
            this._activityFinanciamientoDetDesembolsosModel.idMonedaActividad = { idMonedaActividad: this._activityFinanciamientoDetDesembolsosModel.idMonedaActividadSend };

            // Ejecuta el Servicio de invocar el registro de Desembolso de Socio al Desarrollo
            this._financiamientoDetService.newActividadFinanciamientoDetDesembolso(this._activityFinanciamientoDetDesembolsosModel).subscribe(
              result => {
                if (result.status !== 200) {
                  this._notificacionesService.showToast('error', 'Error al Ingresar la Información de Desembolsos', result.message);
                } else if (result.status === 200) {
                  if (result.findRecord === true) {
                    this._notificacionesService.showToast('error', 'Error al Ingresar la Información de Desembolsos', result.message);
                  } else {
                    this._notificacionesService.showToast('default', 'Registro de Desembolso de Proyecto', result.message);

                    // Actualizamos la Siguiente Secuencia
                    this.updateSecuenciaService(this.idUsuarioTab, 5);

                    // this.closeModal();
                    this.ngOnInit();
                  }
                }
              },
              error => {
                this._notificacionesService.showToast('error', 'Error al Ingresar la Información de Desembolsos', JSON.stringify(error.error.message));
              },
            );
          } else {
            this._notificacionesService.showToast('error', 'Error al ingresar la Información de Desembolsos', 'Debes de ingresar Moneda de Desembolso, para continuar');
          }
        } else {
          this._notificacionesService.showToast('error', 'Error al ingresar la Información de de Desembolsos', 'Debes de ingresar el monto de Desembolso, para continuar');
          this.montoDesembolso.nativeElement.focus();
        }
      } else {
        this._notificacionesService.showToast('error', 'Error al ingresar la Información de Desembolsos', 'Debes de ingresar el Tipo de Transacción, para continuar');
        // this.montoActividadInput.nativeElement.focus();
      }
    } else {
      this._notificacionesService.showToast('error', 'Error al ingresar la Información de Desembolsos', 'Debes Ingresar el Detalle de Financiamiento, para continuar');
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
          this.secuenciaDeDesembolso = result.data;

          // Componemos la Secuencia a Generar
          const prefixHND: string = '-ADD-';
          this._activityFinanciamientoDetDesembolsosModel.codigoFinancDesembolso = this.codigoProyectoTab + prefixHND + (Number(this.secuenciaDeDesembolso.valor2));
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
  * Objetivo: Eliminar el Desembolso seleccionado
  * Params: { }
  ****************************************************************************/
  confirm() {
    this.confirmationService.confirm({
      message: 'Estas seguro de Registrar el Desembolso?',
      accept: () => {
        // Ejecuta la funcion de Registrar el Desembolso
        this.saveFinanciamientoDetDesembolsoService();
      },
    });
  } // FIN | FND-006


  /****************************************************************************
  * Funcion: editFinanciamientoDetDesembolsoService
  * Object Number: FND-007
  * Fecha: 13-06-2019
  * Descripcion: Method editFinanciamientoDetDesembolsoService of the Class
  * Objetivo: Actualiza Desembolsos del Proyecto
  * Params: { idActividadFinancDetDesembolso, _activityFinanciamientoEncModel }
  ****************************************************************************/
  editFinanciamientoDetDesembolsoService(idActividadFinancDetDesembolso: number) {
    // Valida que Se ha registrado previamente el Desembolso para editarlo
    if (this._activityFinanciamientoDetDesembolsosModel.idActividadFinancDetDesembolso === 0) {
      // this._notificacionesService.showToast('error', 'Eror al Actualizar Desembolso', 'Debes de Seleccionar el ');
      return -1;
    }

    // Evaluacion de Datos de Financiamiento de Desembolso para Proyecto
    if (this._activityFinanciamientoDetDesembolsosModel.idTipoTransaccionSend !== 0) {
      this._activityFinanciamientoDetDesembolsosModel.idTipoTransaccion = { idTipoTransaccion: this._activityFinanciamientoDetDesembolsosModel.idTipoTransaccionSend };

      if (this._activityFinanciamientoDetDesembolsosModel.montoDesembolso !== null) {

        if (this._activityFinanciamientoDetDesembolsosModel.idMonedaActividadSend !== 0) {
          this._activityFinanciamientoDetDesembolsosModel.idMonedaActividad = { idMonedaActividad: this._activityFinanciamientoDetDesembolsosModel.idMonedaActividadSend };

          // Ejecuta el Servicio de invocar la actualizacion de Desembolso de Socio al Desarrollo
          this._financiamientoDetService.editActividadFinanciamientoDetDesembolso(idActividadFinancDetDesembolso, this._activityFinanciamientoDetDesembolsosModel).subscribe(
            result => {
              if (result.status !== 200) {
                this._notificacionesService.showToast('error', 'Error al Actualizar la Información de Desembolsos', result.message);
              } else if (result.status === 200) {
                if (result.findRecord === false) {
                  this._notificacionesService.showToast('error', 'Error al Actualizar la Información de Desembolsos', result.message);
                } else {
                  this._notificacionesService.showToast('default', 'Actualizacion de Desembolso de Proyecto', result.message);

                  // Reinicia el Formulario
                  // this.ngOnInit();
                }
              }
            },
            error => {
              this._notificacionesService.showToast('error', 'Error al Actualizar la Información de Desembolsos', JSON.stringify(error.error.message));
            },
          );
        } else {
          this._notificacionesService.showToast('error', 'Error al Actualizar la Información de Desembolsos', 'Debes de ingresar Moneda de Desembolso, para continuar');
        }
      } else {
        this._notificacionesService.showToast('error', 'Error al Actualizar la Información de de Desembolsos', 'Debes de ingresar el monto de Desembolso, para continuar');
        this.montoDesembolso.nativeElement.focus();
      }
    } else {
      this._notificacionesService.showToast('error', 'Error al Actualizar la Información de Desembolsos', 'Debes de ingresar el Tipo de Transacción, para continuar');
      // this.montoActividadInput.nativeElement.focus();
    }
  } // FIN | FND-007


  /****************************************************************************
  * Funcion: saveFinanciamientoDetDesembolsoService
  * Object Number: FND-008
  * Fecha: 13-06-2019
  * Descripcion: Method saveFinanciamientoDetDesembolsoService of the Class
  * Objetivo: Ejecuta la funcion del CRUD analizada
  * Params: { }
  ****************************************************************************/
  saveFinanciamientoDetDesembolsoService() {
    // Evalua que el ID de Desembolso sea distinto a 0
    if (this._activityFinanciamientoDetDesembolsosModel.idActividadFinancDetDesembolso !== 0) {
      this.editFinanciamientoDetDesembolsoService(this._activityFinanciamientoDetDesembolsosModel.idActividadFinancDetDesembolso);
    } else {
      this.newFinanciamientoDetDesembolsoService();
    }
  } // FIN | FND-008
}
