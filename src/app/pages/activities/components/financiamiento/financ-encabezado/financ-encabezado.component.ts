/**
* @author Nahum Martinez
* @returns Componente de Financ Encabezado
* @name FinancEncabezadoComponent
* @alias _financEncabezadoComponent
* @version 1.0.0
* @fecha 16-05-2019
*/

import { Component, OnInit, Input } from '@angular/core';
// Datepicker
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';

@Component({
  selector: 'ngx-financ-encabezado',
  templateUrl: './financ-encabezado.component.html',
  styleUrls: ['./financ-encabezado.component.scss'],
})
export class FinancEncabezadoComponent implements OnInit {
  // Variables entre Tabs | Components
  @Input() idProyectoTab: number;
  @Input() idUsuarioTab: number;
  @Input() codigoProyectoTab: string;

  // Ventana Modal de Fecha
  display: boolean = false;

  // Variables de fecha
  date6: Date;
  es: any;

  /**
   * Configuracion del DatePicker
   */
  public myDatePickerOptions: IMyDpOptions;

  constructor() { }

  ngOnInit() {
    this.myDatePickerOptions = {
      // other options...
      dateFormat: 'dd/mm/yyyy',
      editableDateField: true,
      inline: false,
    };

    // Definicion del Idioma del Calendario
    this.es = {
      firstDayOfWeek: 0,
      dayNames: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
      dayNamesShort: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
      dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
      monthNames: ["Enero", "Febreo", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      today: 'Hoy',
      clear: 'Borrar',
    };
  }

  /****************************************************************************
  * Funcion: onDateChanged
  * Object Number: 001
  * Fecha: 16-05-2019
  * Descripcion: Method que Genera las fechas de Transaccion y las asigan al
  * Modelo de la Clase
  * Objetivo: Generar las Fechas de Transaccion al Modelo
  * @param event
  ****************************************************************************/
  onDateChanged(event: IMyDateModel, paraEvalDate: number) {
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    // switch (paraEvalDate) {
    //   case 1:
    //     this._activityPlanificacionModel.fechaFirma = event.jsdate;
    //     break;
    //   case 2:
    //     this._activityPlanificacionModel.fechaEfectividad = event.jsdate;
    //     break;
    //   case 3:
    //     this._activityPlanificacionModel.fechaCierre = event.jsdate;
    //     break;
    //   case 4:
    //     this._activityPlanificacionModel.fechaPropuestaFinalizacion = event.jsdate;
    //     break;
    //   case 5:
    //     this._activityPlanificacionModel.fechaFinalizacion = event.jsdate;
    //     break;
    // }
  } // FIN | onDateChanged

  showDialog() {
    this.display = true;
  }

  closeDialog() {
    this.display = false;
    // console.log(this.date6);
  }

}
