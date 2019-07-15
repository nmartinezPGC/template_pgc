/**
* @author Nahum Martinez
* @returns Componente de Financ Encabezado
* @name FinancEncabezadoComponent
* @alias _financEncabezadoComponent
* @version 1.0.0
* @fecha 16-05-2019
*/

import { Component, ElementRef, Input, OnInit, ViewChild, OnChanges } from '@angular/core';
// Datepicker
import { IMyDpOptions } from 'mydatepicker';
import { NotificacionesService } from '../../../../shared/services/notificaciones.service';
import { ActivityFinanciamientoEncModel } from '../../../models/financiamiento/model-financiamiento-enc';
import { FinanciamientoEncService } from '../../../services/financiamiento/financiamiento-enc.service';

@Component({
  selector: 'ngx-financ-encabezado',
  templateUrl: './financ-encabezado.component.html',
  styleUrls: ['./financ-encabezado.component.scss'],
  providers: [FinanciamientoEncService, NotificacionesService],
})
export class FinancEncabezadoComponent implements OnInit, OnChanges {
  // Variables entre Tabs | Components
  @Input() idProyectoTab: number;
  @Input() idUsuarioTab: number;
  @Input() codigoProyectoTab: string;
  @Input() idActividadFinancEnc: number;
  @ViewChild('montoActividad') montoActividadInput: ElementRef;

  // Variables de Recepcion de Información
  public JsonReceptionFinancimientoEncProyecto: any;
  public JsonReceptionAllMonedasProyecto: any;

  // Modelo de la Clase
  public _activityFinanciamientoEncModel: ActivityFinanciamientoEncModel;

  // Ventana Modal de Fecha
  display: boolean = false;

  // Variables de fecha
  date6: Date;
  es: any;

  /**
   * Configuracion del DatePicker
   */
  public myDatePickerOptions: IMyDpOptions;


  /**
   * Constructor de la Clase
   */
  constructor(private _financiamientoEncService: FinanciamientoEncService,
    private _notificacionesService: NotificacionesService) { }


  /**
   * Inicializacion de la Clase
   */
  ngOnInit() {
    this.myDatePickerOptions = {
      // other options...
      dateFormat: 'dd/mm/yyyy',
      editableDateField: true,
      inline: false,
    };

    // Inicializacion del Modelo
    this._activityFinanciamientoEncModel = new ActivityFinanciamientoEncModel(
      0, null, // Datos Generales
      null, 0, null, // Relacionales
      null, null, // Transaccion
      true, null, null, // Auditoria
    );

    // Definicion del Idioma del Calendario
    this.es = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
      dayNamesShort: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
      dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
      monthNames: ['Enero', 'Febreo', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      today: 'Hoy',
      clear: 'Borrar',
    };

    // Recepcion de Información
    this.getAllMonedasActividadService();

    this.getActividadFinanciamientoEncByIdActividadService(this.idProyectoTab);
  } // FIN | ngOnInit


  /**
  * Metodo que recibe los cambios de vairables
  */
  ngOnChanges() {
    // Verificacion de informacion de Compromiso
    // console.log('En change Encabezado ' + this.idProyectoTab);
    if (this.idActividadFinancEnc !== undefined) {
      // this.getActividadFinanciamientoEncByIdActividadService(this.idProyectoTab);
      this.idActividadFinancEnc = this.idActividadFinancEnc;
    }

  } // FIN | ngOnChanges


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
    this._activityFinanciamientoEncModel.fechaTransaccion = this.date6;

    // Guarda la fecha de Transaccion
    this.saveFinanciamientoEncService();
  } // Dialog

  /**
   * ******************* Funciones Propias **************************************
   */

  /****************************************************************************
  * Funcion: getAllMonedasActividadService
  * Object Number: FND-002
  * Fecha: 21-05-2019
  * Descripcion: Method getAllMonedasActividadService of the Class
  * Objetivo: getAllMonedasActividadService listados de las Monedas de Proyecto
  * Params: { }
  ****************************************************************************/
  private getAllMonedasActividadService() {
    // Ejecuta el Servicio de invocar todos los Objetivos Vision Pais
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
        this._notificacionesService.showToast('error', 'Error al Obtener la Información de todas las Monedas de Proyecto', JSON.stringify(error.message));
      },
    );
  } // FIN | FND-002


  /****************************************************************************
  * Funcion: newFinanciamientoEncService
  * Object Number: FND-003
  * Fecha: 21-05-2019
  * Descripcion: Method newFinanciamientoEncService of the Class
  * Objetivo: Registrar el Encabezado del Financiamiento
  * Params: { _activityFinanciamientoEncModel }
  ****************************************************************************/
  newFinanciamientoEncService() {
    // Asignacion de nuevos valores de Modelo
    this._activityFinanciamientoEncModel.idMonedaActividad = { idMonedaActividad: this._activityFinanciamientoEncModel.idMoneda };
    this._activityFinanciamientoEncModel.idActividad = { idActividad: this.idProyectoTab };
    this._activityFinanciamientoEncModel.codigoFinancEnc = this.codigoProyectoTab + '-AFE-' + this.idProyectoTab;

    // Evaluacion de Datos de Financiamiento de Proyecto
    if (this._activityFinanciamientoEncModel.montoActividad !== 0) {

      if (this._activityFinanciamientoEncModel.idMoneda) {
        // Ejecuta el Servicio de invocar el registro de Socio al Desarrollo
        this._financiamientoEncService.newActividadFinanciamientoEnc(this._activityFinanciamientoEncModel).subscribe(
          result => {
            if (result.status !== 200) {
              this._notificacionesService.showToast('error', 'Error al Ingresar la Información de Encabezado de Financiamiento', result.message);
            } else if (result.status === 200) {
              if (result.findRecord === true) {
                this._notificacionesService.showToast('error', 'Error al Ingresar la Información de Encabezado de Financiamiento', result.message);
              } else {
                this._notificacionesService.showToast('default', 'Encabezado de Financiamiento', result.message);
                this.idActividadFinancEnc = result.data.idActividadFinancEnc;
              }
            }
          },
          error => {
            this._notificacionesService.showToast('error', 'Error al Ingresar la Información de Encabezado de Financiamiento', JSON.stringify(error.error.message));
          },
        );
      } else {
        this._notificacionesService.showToast('error', 'Error al ingresar la Información de Moneda de Financiamiento', 'Debes de ingresar monenda de Financiamiento del Proyecto, para continuar');
      }
    } else {
      this._notificacionesService.showToast('error', 'Error al ingresar la Información de Encabezado de Financiamiento', 'Debes de ingresar el Costo Total del Proyecto, para continuar');
      this.montoActividadInput.nativeElement.focus();
    }
  } // FIN | FND-003


  /****************************************************************************
  * Funcion: cleanForm
  * Object Number: FND-004
  * Fecha: 21-05-2019
  * Descripcion: Method cleanForm of the Class
  * Objetivo: cleanForm listados de las Monedas de Proyecto
  * Params: { }
  ****************************************************************************/
  cleanForm() {
    this.ngOnInit();
    this.date6 = null;
  } // FIN | FND-004


  /****************************************************************************
  * Funcion: getActividadFinanciamientoEncByIdActividadService
  * Object Number: FND-005
  * Fecha: 14-06-2019
  * Descripcion: Method getActividadFinanciamientoEncByIdActividadService of the Class
  * Objetivo: Listados de las Monedas de Proyecto
  * Params: { idActividad }
  ****************************************************************************/
  private getActividadFinanciamientoEncByIdActividadService(idActividad: number) {
    // Ejecuta el Servicio de invocar todos los Objetivos Encabezado de Financiamiento
    this._financiamientoEncService.getActividadFinanciamientoEncByIdActividad(idActividad).subscribe(
      result => {
        if (result.status !== 200) {
          this._notificacionesService.showToast('error', 'Error al Obtener la Información de Encabezado del Financiamiento del Proyecto', result.message);
          this.JsonReceptionFinancimientoEncProyecto = [];
        } else if (result.status === 200) {
          this.JsonReceptionFinancimientoEncProyecto = result.data;
          // Carga de Generales
          this._activityFinanciamientoEncModel.idActividadFinancEnc = this.JsonReceptionFinancimientoEncProyecto[0].idActividadFinancEnc;
          this._activityFinanciamientoEncModel.idActividad = this.JsonReceptionFinancimientoEncProyecto[0].idActividad;
          this._activityFinanciamientoEncModel.montoActividad = this.JsonReceptionFinancimientoEncProyecto[0].montoActividad;
          this._activityFinanciamientoEncModel.codigoFinancEnc = this.JsonReceptionFinancimientoEncProyecto[0].codigoFinancEnc;
          this.idActividadFinancEnc = this._activityFinanciamientoEncModel.idActividadFinancEnc;

          // Carga de Relaciones
          this._activityFinanciamientoEncModel.idMoneda = this.JsonReceptionFinancimientoEncProyecto[0].idMonedaActividad.idMonedaActividad;
          this.date6 = new Date(this.JsonReceptionFinancimientoEncProyecto[0].fechaTransaccion);
          this._activityFinanciamientoEncModel.fechaTransaccion = this.date6;
        }
      },
      error => {
        this._notificacionesService.showToast('error', 'Error al Obtener la Información de Encabezado del Financiamiento de Proyecto', JSON.stringify(error.error.message));
      },
    );
  } // FIN | FND-005


  /****************************************************************************
  * Funcion: saveFinanciamientoEncService
  * Object Number: FND-006
  * Fecha: 13-06-2019
  * Descripcion: Method saveFinanciamientoEncService of the Class
  * Objetivo: Ejecuta la funcion del CRUD analizada
  * Params: { }
  ****************************************************************************/
  saveFinanciamientoEncService() {
    // Evalua que el ID de Financiamiento Encabezado sea distinto a 0
    if (this._activityFinanciamientoEncModel.idActividadFinancEnc !== 0) {
      // Edita la información de Encabezado
      this.editFinanciamientoEncService(this._activityFinanciamientoEncModel.idActividadFinancEnc, this._activityFinanciamientoEncModel);
    } else {
      // Ingresa la información de Encabezado
      this.newFinanciamientoEncService();
    }
  } // FIN | FND-006


  /****************************************************************************
  * Funcion: editFinanciamientoEncService
  * Object Number: FND-007
  * Fecha: 14-06-2019
  * Descripcion: Method editFinanciamientoEncService of the Class
  * Objetivo: Actualizar el Encabezado del Financiamiento
  * Params: { idActividadFinancEnc, _activityFinanciamientoEncModel }
  ****************************************************************************/
  editFinanciamientoEncService(idActividadFinancEnc: number, _activityFinanciamientoEncModel: any) {
    // Asignacion de nuevos valores de Modelo
    this._activityFinanciamientoEncModel.idMonedaActividad = { idMonedaActividad: this._activityFinanciamientoEncModel.idMoneda };
    this._activityFinanciamientoEncModel.idActividad = { idActividad: this.idProyectoTab };

    // Evaluacion de Datos de Financiamiento de Proyecto
    if (this._activityFinanciamientoEncModel.montoActividad !== 0) {

      if (this._activityFinanciamientoEncModel.idMoneda) {
        // Ejecuta el Servicio de invocar la actualizacion de Encabezado de Financiamiento
        this._financiamientoEncService.editActividadFinanciamientoEnc(idActividadFinancEnc, this._activityFinanciamientoEncModel).subscribe(
          result => {
            if (result.status !== 200) {
              this._notificacionesService.showToast('error', 'Error al Actualizar la Información de Encabezado de Financiamiento', result.message);
            } else if (result.status === 200) {
              if (result.findRecord === true) {
                this._notificacionesService.showToast('default', 'Encabezado de Financiamiento', result.message);
                this.idActividadFinancEnc = result.data.idActividadFinancEnc;
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
      this.montoActividadInput.nativeElement.focus();
    }
  } // FIN | FND-007
}
