import { Component, OnInit, OnChanges, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivityFinanciamientoDetGastosModel } from '../../../../../models/financiamiento/model-financiamiento-det-gastos';
import { NotificacionesService } from '../../../../../../shared/services/notificaciones.service';
import { ConfirmationService } from 'primeng/api';
import { FinanciamientoEncService } from '../../../../../services/financiamiento/financiamiento-enc.service';
import { FinanciamientoDetService } from '../../../../../services/financiamiento/financiamiento-det.service';
import { ListasComunesService } from '../../../../../../common-list/services/listas-comunes.service';
import { delay } from 'q';

@Component({
  selector: 'ngx-financ-detalle-gastos-form',
  templateUrl: './financ-detalle-gastos-form.component.html',
  styleUrls: ['./financ-detalle-gastos-form.component.scss'],
})
export class FinancDetalleGastosFormComponent implements OnInit, OnChanges {
  // Variables entre Tabs | Components
  @Input() idProyectoTab: number;
  @Input() idUsuarioTab: number;
  @Input() codigoProyectoTab: string;
  @Input() idActividadFinancEnc: number;
  @Input() idActividadFinancDet: number;
  @Input() JsonGastosSelect: any;

  // Variables de DOM de la clase
  @ViewChild('montoGasto') montoGasto: ElementRef;

  // Modelo de la Clase
  public _activityFinanciamientoDetGastosModel: ActivityFinanciamientoDetGastosModel;

  // JsonReceptions
  public JsonReceptionFinancDetGastos: any = [];
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
  public secuenciaDeGasto: any;

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
    this._activityFinanciamientoDetGastosModel = new ActivityFinanciamientoDetGastosModel(
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
    if (this.JsonGastosSelect.idActividadFinancDetGasto !== undefined) {
      // Carga el Model con los datos enviados
      this._activityFinanciamientoDetGastosModel.idActividadFinancDetGasto = this.JsonGastosSelect.idActividadFinancDetGasto;
      this._activityFinanciamientoDetGastosModel.idTipoTransaccionSend = this.JsonGastosSelect.idTipoTransaccion;
      this._activityFinanciamientoDetGastosModel.montoGasto = this.JsonGastosSelect.montoGasto;
      this._activityFinanciamientoDetGastosModel.idMonedaActividadSend = this.JsonGastosSelect.idMonedaActividad;
      this._activityFinanciamientoDetGastosModel.codigoFinancGasto = this.JsonGastosSelect.codigoFinancGasto;
      this.date6 = new Date(this.JsonGastosSelect.fechaTransaccion);
      this._activityFinanciamientoDetGastosModel.fechaTransaccion = this.date6;
    } else {
      // Inicializacion del Modelo
      this._activityFinanciamientoDetGastosModel = new ActivityFinanciamientoDetGastosModel(
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
    this._activityFinanciamientoDetGastosModel.fechaTransaccion = this.date6;
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
  * Funcion: newFinanciamientoDetGastoservice
  * Object Number: FND-003
  * Fecha: 21-05-2019
  * Descripcion: Method newFinanciamientoDetGastoservice of the Class
  * Objetivo: Registrar Gastos del Proyecto
  * Params: { _activityFinanciamientoDetGastosModel }
  ****************************************************************************/
  async newFinanciamientoDetGastoservice() {
    // Creacion del Codigo del Gasto | 6 = NEW-ADC (Nuevo Gasto)
    this.getSecuenciaListService('NEW-ADG');

    await delay(100);

    // Asignacion de nuevos valores de Modelo
    this._activityFinanciamientoDetGastosModel.idActividadFinancDetSend = this.idActividadFinancDet;
    this._activityFinanciamientoDetGastosModel.idActividadFinancDet = { idActividadFinancDet: this._activityFinanciamientoDetGastosModel.idActividadFinancDetSend };

    // Evaluacion de Datos de Financiamiento de Gasto para Proyecto
    if (this.idActividadFinancDet !== undefined) {
      if (this._activityFinanciamientoDetGastosModel.idTipoTransaccionSend !== 0) {
        this._activityFinanciamientoDetGastosModel.idTipoTransaccion = { idTipoTransaccion: this._activityFinanciamientoDetGastosModel.idTipoTransaccionSend };

        if (this._activityFinanciamientoDetGastosModel.montoGasto !== null) {

          if (this._activityFinanciamientoDetGastosModel.idMonedaActividadSend !== 0) {
            this._activityFinanciamientoDetGastosModel.idMonedaActividad = { idMonedaActividad: this._activityFinanciamientoDetGastosModel.idMonedaActividadSend };

            // Ejecuta el Servicio de invocar el registro de Gasto de Socio al Desarrollo
            this._financiamientoDetService.newActividadFinanciamientoDetGasto(this._activityFinanciamientoDetGastosModel).subscribe(
              result => {
                if (result.status !== 200) {
                  this._notificacionesService.showToast('error', 'Error al Ingresar la Información de Gastos', result.message);
                } else if (result.status === 200) {
                  if (result.findRecord === true) {
                    this._notificacionesService.showToast('error', 'Error al Ingresar la Información de Gastos', result.message);
                  } else {
                    this._notificacionesService.showToast('default', 'Registro de Gasto de Proyecto', result.message);

                    // Actualizamos la Siguiente Secuencia
                    this.updateSecuenciaService(this.idUsuarioTab, 6);

                    // this.closeModal();
                    this.ngOnInit();
                  }
                }
              },
              error => {
                this._notificacionesService.showToast('error', 'Error al Ingresar la Información de Gastos', JSON.stringify(error.error.message));
              },
            );
          } else {
            this._notificacionesService.showToast('error', 'Error al ingresar la Información de Gastos', 'Debes de ingresar Moneda de Gasto, para continuar');
          }
        } else {
          this._notificacionesService.showToast('error', 'Error al ingresar la Información de de Gastos', 'Debes de ingresar el monto de Gasto, para continuar');
          this.montoGasto.nativeElement.focus();
        }
      } else {
        this._notificacionesService.showToast('error', 'Error al ingresar la Información de Gastos', 'Debes de ingresar el Tipo de Transacción, para continuar');
        // this.montoActividadInput.nativeElement.focus();
      }
    } else {
      this._notificacionesService.showToast('error', 'Error al ingresar la Información de Gastos', 'Debes Ingresar el Detalle de Financiamiento, para continuar');
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
          this.secuenciaDeGasto = result.data;

          // Componemos la Secuencia a Generar
          const prefixHND: string = '-ADG-';
          this._activityFinanciamientoDetGastosModel.codigoFinancGasto = this.codigoProyectoTab + prefixHND + (Number(this.secuenciaDeGasto.valor2));
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
  * Objetivo: Eliminar el Gasto seleccionado
  * Params: { }
  ****************************************************************************/
  private confirm() {
    this.confirmationService.confirm({
      message: 'Estas seguro de Registrar el Gasto?',
      accept: () => {
        // Ejecuta la funcion de Registrar el Gasto
        this.saveFinanciamientoDetGastoservice();
      },
    });
  } // FIN | FND-006


  /****************************************************************************
  * Funcion: editFinanciamientoDetGastoservice
  * Object Number: FND-007
  * Fecha: 13-06-2019
  * Descripcion: Method editFinanciamientoDetGastoservice of the Class
  * Objetivo: Actualiza Gastos del Proyecto
  * Params: { idActividadFinancDetGasto, _activityFinanciamientoEncModel }
  ****************************************************************************/
  private editFinanciamientoDetGastoservice(idActividadFinancDetGasto: number) {
    // Valida que Se ha registrado previamente el Gasto para editarlo
    if (this._activityFinanciamientoDetGastosModel.idActividadFinancDetGasto === 0) {
      // this._notificacionesService.showToast('error', 'Eror al Actualizar Gasto', 'Debes de Seleccionar el ');
      return -1;
    }

    // Evaluacion de Datos de Financiamiento de Gasto para Proyecto
    if (this._activityFinanciamientoDetGastosModel.idTipoTransaccionSend !== 0) {
      this._activityFinanciamientoDetGastosModel.idTipoTransaccion = { idTipoTransaccion: this._activityFinanciamientoDetGastosModel.idTipoTransaccionSend };

      if (this._activityFinanciamientoDetGastosModel.montoGasto !== null) {

        if (this._activityFinanciamientoDetGastosModel.idMonedaActividadSend !== 0) {
          this._activityFinanciamientoDetGastosModel.idMonedaActividad = { idMonedaActividad: this._activityFinanciamientoDetGastosModel.idMonedaActividadSend };

          // Ejecuta el Servicio de invocar la actualizacion de Gasto de Socio al Desarrollo
          this._financiamientoDetService.editActividadFinanciamientoDetGasto(idActividadFinancDetGasto, this._activityFinanciamientoDetGastosModel).subscribe(
            result => {
              if (result.status !== 200) {
                this._notificacionesService.showToast('error', 'Error al Actualizar la Información de Gastos', result.message);
              } else if (result.status === 200) {
                if (result.findRecord === false) {
                  this._notificacionesService.showToast('error', 'Error al Actualizar la Información de Gastos', result.message);
                } else {
                  this._notificacionesService.showToast('default', 'Actualizacion de Gasto de Proyecto', result.message);

                  // Reinicia el Formulario
                  // this.ngOnInit();
                }
              }
            },
            error => {
              this._notificacionesService.showToast('error', 'Error al Actualizar la Información de Gastos', JSON.stringify(error.error.message));
            },
          );
        } else {
          this._notificacionesService.showToast('error', 'Error al Actualizar la Información de Gastos', 'Debes de ingresar Moneda de Gasto, para continuar');
        }
      } else {
        this._notificacionesService.showToast('error', 'Error al Actualizar la Información de de Gastos', 'Debes de ingresar el monto de Gasto, para continuar');
        this.montoGasto.nativeElement.focus();
      }
    } else {
      this._notificacionesService.showToast('error', 'Error al Actualizar la Información de Gastos', 'Debes de ingresar el Tipo de Transacción, para continuar');
      // this.montoActividadInput.nativeElement.focus();
    }
  } // FIN | FND-007


  /****************************************************************************
  * Funcion: saveFinanciamientoDetGastoservice
  * Object Number: FND-008
  * Fecha: 13-06-2019
  * Descripcion: Method saveFinanciamientoDetGastoservice of the Class
  * Objetivo: Ejecuta la funcion del CRUD analizada
  * Params: { }
  ****************************************************************************/
  private saveFinanciamientoDetGastoservice() {
    // Evalua que el ID de Gasto sea distinto a 0
    if (this._activityFinanciamientoDetGastosModel.idActividadFinancDetGasto !== 0) {
      this.editFinanciamientoDetGastoservice(this._activityFinanciamientoDetGastosModel.idActividadFinancDetGasto);
    } else {
      this.newFinanciamientoDetGastoservice();
    }
  } // FIN | FND-008
}
