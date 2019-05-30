/**
* @author Nahum Martinez
* @returns Componente de Financ Encabezado
* @name FinancEncabezadoComponent
* @alias _financEncabezadoComponent
* @version 1.0.0
* @fecha 16-05-2019
*/

import { Component, OnInit, Input, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
// Datepicker
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { ActivityFinanciamientoEncModel } from '../../../models/financiamiento/model-financiamiento-enc';
import { ToasterConfig, Toast, BodyOutputType, ToasterService } from 'angular2-toaster';
import { FinanciamientoEncService } from '../../../services/financiamiento/financiamiento-enc.service';

@Component({
  selector: 'ngx-financ-encabezado',
  templateUrl: './financ-encabezado.component.html',
  styleUrls: ['./financ-encabezado.component.scss'],
  providers: [FinanciamientoEncService, ToasterService],
})
export class FinancEncabezadoComponent implements OnInit {
  // Variables entre Tabs | Components
  @Input() idProyectoTab: number;
  @Input() idUsuarioTab: number;
  @Input() codigoProyectoTab: string;
  @ViewChild('montoActividad') montoActividadInput: ElementRef;

  // Variables de Recepcion de Información
  public JsonReceptionAllMonedasProyecto: any;

  // Modelo de la Clase
  public _activityFinanciamientoEncModel: ActivityFinanciamientoEncModel;

  // Consfiguracion del Notificador
  position = 'toast-bottom-full-width';
  animationType = 'slideDown';
  title = 'Se ha grabado la Información! ';
  content = 'los cambios han sido grabados temporalmente, en la PGC!';
  timeout = 20000;
  toastsLimit = 5;
  type = 'default';

  isNewestOnTop = true;
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;
  config: ToasterConfig;

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
    private _toasterService: ToasterService) { }


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
  }

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
  }

  /****************************************************************************
  * Funcion: makeToast
  * Object Number: 002
  * Fecha: 16-08-2018
  * Descripcion: Method makeToast of the Class
  * Objetivo: makeToast in the method header API
  ****************************************************************************/
  makeToast() {
    this.showToast(this.type, this.title, this.content);
  } // FIN | makeToast


  /****************************************************************************
  * Funcion: showToast
  * Object Number: 002.1
  * Fecha: 16-08-2018
  * Descripcion: Method showToast of the Class
  * Objetivo: showToast in the method header API
  ****************************************************************************/
  private showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
      positionClass: this.position,
      timeout: this.timeout,
      newestOnTop: this.isNewestOnTop,
      tapToDismiss: this.isHideOnClick,
      preventDuplicates: this.isDuplicatesPrevented,
      animation: this.animationType,
      limit: this.toastsLimit,
    });
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: this.timeout,
      showCloseButton: this.isCloseButton,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    // this._toasterService.popAsync(toast);
    this._toasterService.pop(toast);
  } // FIN | showToast


  /****************************************************************************
  * Funcion: toasterconfig
  * Object Number: 002.2
  * Fecha: 16-08-2018
  * Descripcion: Method showToast of the Class
  * Objetivo: showToast in the method header API
  ****************************************************************************/
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      showCloseButton: { 'warning': true, 'error': true },
    }); // FIN | toasterconfig


  /**
   * ******************* Funciones Propias **************************************
   */

  /****************************************************************************
  * Funcion: getAllMonedasActividadService
  * Object Number: 003
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
          this.showToast('error', 'Error al Obtener la Información de todas las Monedas de Proyecto', result.message);
          this.JsonReceptionAllMonedasProyecto = [];
        } else if (result.status === 200) {
          this.JsonReceptionAllMonedasProyecto = result.data;
        }
      },
      error => {
        this.showToast('error', 'Error al Obtener la Información de todas las Monedas de Proyecto', JSON.stringify(error.message));
      },
    );
  } // FIN | getAllMonedasActividadService


  /****************************************************************************
  * Funcion: saveFinanciamientoEncService
  * Object Number: 004
  * Fecha: 21-05-2019
  * Descripcion: Method saveFinanciamientoEncService of the Class
  * Objetivo: saveFinanciamientoEncService listados de las Monedas de Proyecto
  * Params: { this._activityFinanciamientoEncModel }
  ****************************************************************************/
  saveFinanciamientoEncService() {
    // Asignacion de nuevos valores de Modelo
    this._activityFinanciamientoEncModel.idMonedaActividad = { idMonedaActividad: this._activityFinanciamientoEncModel.idMoneda };
    this._activityFinanciamientoEncModel.idActividad = { idActividad: this.idProyectoTab };
    this._activityFinanciamientoEncModel.codigoFinancEnc = this.codigoProyectoTab + '-AFE-' + this.idProyectoTab;

    // Evaluacion de Datos de Financiamiento de Proyecto
    if (this._activityFinanciamientoEncModel.montoActividad !== 0) {
      // console.log(this._activityFinanciamientoEncModel);

      if (this._activityFinanciamientoEncModel.idMoneda) {
        // Ejecuta el Servicio de invocar el registro de Socio al Desarrollo
        this._financiamientoEncService.newActividadFinanciamientoEnc(this._activityFinanciamientoEncModel).subscribe(
          result => {
            if (result.status !== 200) {
              this.showToast('error', 'Error al Ingresar la Información de Encabezado de Financiamiento', result.message);
            } else if (result.status === 200) {
              if (result.findRecord === true) {
                this.showToast('error', 'Error al Ingresar la Información de Encabezado de Financiamiento', result.message);
              } else {
                this.showToast('default', 'Encabezado de Financiamiento', result.message);
              }
            }
          },
          error => {
            this.showToast('error', 'Error al Ingresar la Información de Encabezado de Financiamiento', JSON.stringify(error.error.message));
          },
        );
      } else {
        this.showToast('error', 'Error al ingresar la Información de Moneda de Financiamiento', 'Debes de ingresar monenda de Financiamiento del Proyecto, para continuar');
      }
    } else {
      this.showToast('error', 'Error al ingresar la Información de Encabezado de Financiamiento', 'Debes de ingresar el Costo Total del Proyecto, para continuar');
      this.montoActividadInput.nativeElement.focus();
    }
  } // FIN | saveFinanciamientoEncService


  /****************************************************************************
  * Funcion: cleanForm
  * Object Number: 005
  * Fecha: 21-05-2019
  * Descripcion: Method cleanForm of the Class
  * Objetivo: cleanForm listados de las Monedas de Proyecto
  * Params: { }
  ****************************************************************************/
  cleanForm() {
    this.ngOnInit();
    this.date6 = null;
  } // FIN | cleanForm
}
