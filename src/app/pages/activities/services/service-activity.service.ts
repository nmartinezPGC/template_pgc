/**
 * @author Nahum Martinez
 * @returns servicios de Actividades
 * @name ActivityService
 * @alias _activityService
 * @version 1.0.0
 * @fecha 09/01/2019
 */
import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';

// Clases nesesarias para el envio via Ajax
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Importamos la Clase de las Propiedades del Sistema
import { SystemPropertiesService } from '../../../shared/system-properties.service';
import { SystemEndPointsService } from '../../../shared/system-end-points.service';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  // Variables de la Ruta de la API
  public _url: string;
  public _urlResourses: string;

  // Variables para el localStorage
  public _identity;
  public _token;

  public tokenHeader = this._systemPropertiesService.getIdentity().token;
  public usernameHeader = this._systemPropertiesService.getIdentity().userName;

  // Variable de cabezeras http
  public headers = new HttpHeaders();

  /****************************************************************************
  * Funcion: FND-00001
  * Fecha: 01-09-2019
  * Descripcion: Metodo para obtener los Datos de la
  * variable identity del localStorage
  * Objetivo: Seteo de las variables en json
  ****************************************************************************/
  constructor(private _http: HttpClient,
    // Instanciamos la Url de la API
    private _systemEndPointsService: SystemEndPointsService,
    private _systemPropertiesService: SystemPropertiesService) {

    // Seteo de los Headers
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.tokenHeader, 'Access-Control-Allow-Origin': '*',
    });
  } // FIN | Constructor


  /****************************************************************************
    * Funcion: FND-00002
    * Fecha: 09-01-2019
    * Descripcion: Metodo para obtener los Datos de todos los perfiles
    * Objetivo: datos generales de los perfiles
    * Params: { }
    ****************************************************************************/
  getAllPerfiles(): Observable<any> {
    // Retorno de la Funcion
    return this._http.get(this._systemEndPointsService.getEndPointService('mantGenericosGroup', 4), {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00002


  /****************************************************************************
    * Funcion: FND-00003
    * Fecha: 14-01-2019
    * Descripcion: Metodo para Ingresar los Datos Generales de la Actividad
    * Objetivo: Ingresar los Datos generales de la Activiad
    * Params: { jsonActivity }
    ****************************************************************************/
  newActivityGeneral(jsonActivity: any): Observable<any> {
    // Parametros del EndPoint
    const paramsSend = jsonActivity;

    // Retorno de la Funcion
    return this._http.post(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 1), paramsSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00003


  /****************************************************************************
    * Funcion: FND-00003.1
    * Fecha: 08-02-2019
    * Descripcion: Metodo para Actualizar los Datos Generales de la Actividad
    * Objetivo: Actualizar los Datos generales de la Activiad
    * Params: { jsonActivity }
    ****************************************************************************/
  editActivityGeneral(jsonActivity: any, idProyectoIn: number): Observable<any> {
    // Parametros del EndPoint
    const idProyectoSend: number = idProyectoIn;
    const paramsSend = jsonActivity;

    // Retorno de la Funcion
    return this._http.put(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 2) + idProyectoSend, paramsSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00003.1


  /****************************************************************************
    * Funcion: FND-00004
    * Fecha: 21-01-2019
    * Descripcion: Metodo para Actualizar el Valor de la Secuencia
    * Objetivo: Actualizar el valor de la Secuencia
    * Params: { jsonSecuencia, idSecuencia }
    ****************************************************************************/
  updateSecuence(jsonSecuencia, idSecuencia: number): Observable<any> {
    // Valores Constantes
    const idSecuenciaSend: number = idSecuencia;
    // Retorno de la Funcion
    return this._http.put(this._systemEndPointsService.getEndPointService('userGroup', 4) + idSecuenciaSend, jsonSecuencia, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00004


  /****************************************************************************
    * Funcion: FND-00005
    * Fecha: 28-01-2019
    * Descripcion: Metodo para obtener Ingresar los Datos de Planificacion de
    * la Actividad, segun el codigo de la Actividad recien Ingresado
    * Objetivo: Ingresar los Datos de Planificacion de la Activiad
    * Params: { jsonActivityPlanificacion }
    ****************************************************************************/
  newActivityPlanificacion(jsonActivityPlanificacion: any): Observable<any> {
    // Parametros del EndPoint
    const paramsSend = jsonActivityPlanificacion;

    // Retorno de la Funcion
    return this._http.post(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 4), paramsSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00005


  /****************************************************************************
    * Funcion: FND-00005.1
    * Fecha: 08-02-2019
    * Descripcion: Metodo para Actualizar los Datos de Planificacion de
    * la Actividad, segun el codigo del Proyecto
    * Objetivo: Actualizar los Datos de Planificacion del Proyecto
    * * Params: { jsonActivityPlanificacion, idActividadPlan }
    ****************************************************************************/
  editActivityPlanificacion(jsonActivityPlanificacion: any, idActividadPlanIn: number): Observable<any> {
    // Parametros del EndPoint
    const idActividadPlanSend: number = idActividadPlanIn;
    const paramsSend = jsonActivityPlanificacion;

    // Retorno de la Funcion
    return this._http.put(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 5) + idActividadPlanSend, paramsSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00005.1


  /****************************************************************************
    * Funcion: FND-00006
    * Fecha: 11-02-2019
    * Descripcion: Metodo para Ingresar los Datos de Id Interna de
    * la Actividad, segun el Id de la Actividad recien Ingresado
    * Objetivo: Ingresar los Datos de Planificacion de la Activiad
    * Params: { jsonActivityIdInterna }
    ****************************************************************************/
  newActivityIdInterna(jsonActivityIdInterna: any): Observable<any> {
    // Parametros del EndPoint
    const paramsSend = jsonActivityIdInterna;

    // Retorno de la Funcion
    return this._http.post(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 7), paramsSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00006


  /****************************************************************************
    * Funcion: FND-00006.1
    * Fecha: 11-02-2019
    * Descripcion: Metodo para Actualizar los Datos de Id Interna de
    * la Actividad, segun el Id de la Actividad recien Ingresado
    * Objetivo: Editar los Datos de Id Interna de la Activiad
    * Params: { jsonActivityIdInterna, idInterna }
    ****************************************************************************/
  editActivityIdInterna(jsonActivityIdInterna: any, idInternaIn: number): Observable<any> {
    // Parametros del EndPoint
    const idInternaSend: number = idInternaIn;
    const paramsSend = jsonActivityIdInterna;

    // Retorno de la Funcion
    return this._http.put(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 7) + idInternaSend, paramsSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00006.1


  /****************************************************************************
    * Funcion: FND-00006.2
    * Fecha: 11-02-2019
    * Descripcion: Metodo para Eliminar los Datos de Id Interna de
    * la Actividad, segun el Id de la Actividad recien Ingresado
    * Objetivo: Eliminar los Datos de Id Interna de la Activiad
    * Params: { codIdInterna }
    ****************************************************************************/
  deletedActivityIdInterna(codIdInterna: string): Observable<any> {
    // Parametros del EndPoint
    const codIdInternaSend: string = codIdInterna;

    // Retorno de la Funcion
    return this._http.delete(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 9) + codIdInternaSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00006.2

}
