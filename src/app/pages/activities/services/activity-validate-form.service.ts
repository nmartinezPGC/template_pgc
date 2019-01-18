/**
 * @author Nahum Martinez
 * @returns servicios de Actividades Validacion de Campos
 * @name ActivityValidateFormService
 * @alias _activityValidateFormService
 * @version 1.0.0
 * @fecha 16/01/2019
 */
import { Injectable } from '@angular/core';
import { ActivityModel } from '../models/model-activity';

@Injectable({
  providedIn: 'root',
})
export class ActivityValidateFormService {
  // Definicion de las Variables Globales
  public responseData: any;

  // Modelo de la Clase
  public _activityModel: ActivityModel;

  constructor() {
    this.responseData = {"error": false, "msg": "Error; Campo Solicitado" };
   }

  /****************************************************************************
  * Funcion: validateFormActivity
  * Object Number: 001
  * Fecha: 15-01-2019
  * Descripcion: Method validateFormActivity of the Class
  * Objetivo: Establecer la Validacion de los Campos de la Data de General del
  * Activity Form
  ****************************************************************************/
  validateFormActivity(modeloActividad: any) {
    // Setea el Modelo Enviado para la Verifiacion de los Campos
    // Validamos que se ha Seleccionado los Filtros Previos a la ID Interna
    this.responseData.error = false;
    if (modeloActividad.nombreActividad === null || modeloActividad.nombreActividad === '' ) {
      this.responseData.msg = 'Debes Ingresar el Nombre de la Actividad, para Continuar';
      this.responseData.error = true;
    } else if (modeloActividad.idEspacioTrabajo === null || modeloActividad.idEspacioTrabajo === 0) {
      this.responseData.msg = 'Debes Seleccionar el Espacio de Trabajo en el que Ingresaras la Actividad, para Continuar';
      this.responseData.error = true;
    } else if (modeloActividad.idEstado === null || modeloActividad.idEstado === 0) {
      this.responseData.msg = 'Debes Seleccionar el Estado de la Actividad, para Continuar';
      this.responseData.error = true;
    } else if (modeloActividad.descripcionActividad === null || modeloActividad.descripcionActividad === '' ) {
      this.responseData.msg = 'Debes Ingresar la Descripción de la Actividad, para Continuar';
      this.responseData.error = true;
    } else if (modeloActividad.objetivoActividad === null || modeloActividad.objetivoActividad === '' ) {
      this.responseData.msg = 'Debes Ingresar el Objetivo de la Actividad, para Continuar';
      this.responseData.error = true;
    } else if (modeloActividad.justificacionActividad === null || modeloActividad.justificacionActividad === '') {
      this.responseData.msg = 'Debes Ingresar la Justificación de la Actividad, para Continuar';
      this.responseData.error = true;
    }

    // Retorno de la Funcion
    return this.responseData;
  }
} // FIN | validateFormActivity
