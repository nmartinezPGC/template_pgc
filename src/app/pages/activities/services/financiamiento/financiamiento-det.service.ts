/**
* @author Nahum Martinez
* @returns Servicio de Financiamiento Det
* @name FinanciamientoDetService
* @alias _financiamientoDetService
* @version 1.0.0
* @fecha 21-05-2019
*/

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SystemEndPointsService } from '../../../../shared/system-end-points.service';
import { SystemPropertiesService } from '../../../../shared/system-properties.service';

@Injectable({
  providedIn: 'root',
})
export class FinanciamientoDetService {
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
  * Fecha: 29-05-2019
  * Descripcion: Metodo para obtener los Tipos de financiamiento
  * Objetivo: Tipos de financiamiento
  * Params: { }
  ****************************************************************************/
  getAllTiposFinanciamiento(): Observable<any> {
    // Retorno de la Funcion
    return this._http.get(this._systemEndPointsService.getEndPointService('mantActGroup', 10), {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00002

  /****************************************************************************
  * Funcion: FND-00003
  * Fecha: 29-05-2019
  * Descripcion: Metodo para obtener las Modalidades de Ayuda
  * Objetivo: Modalidades de Ayuda
  * Params: { }
  ****************************************************************************/
  getAllModalidadAyuda(): Observable<any> {
    // Retorno de la Funcion
    return this._http.get(this._systemEndPointsService.getEndPointService('mantActGroup', 12), {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00003


  /****************************************************************************
    * Funcion: FND-00004
    * Fecha: 29-05-2019
    * Descripcion: Metodo para ingresar datos de Financiamiento Detalle
    * Objetivo: Ingresar Financiamiento Detalle al Proyecto
    * Params: { jsonSendActividadFinanciamientoDet }
    ****************************************************************************/
  newActividadFinanciamientoDet(jsonSendActividadFinanciamientoDet: any): Observable<any> {
    const paramsSend: any = jsonSendActividadFinanciamientoDet;

    // Retorno de la Funcion
    return this._http.post(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 69), paramsSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00004


  /****************************************************************************
    * Funcion: FND-00005
    * Fecha: 29-05-2019
    * Descripcion: Metodo para eliminar datos de Financiamiento Detalle
    * Objetivo: Eliminar Financiamiento Detalle al Proyecto
    * Params: { codigoFinancDet }
    ****************************************************************************/
  deleteActividadFinanciamientoDet(codigoFinancDet: string): Observable<any> {
    const paramsSend: string = codigoFinancDet;

    // Retorno de la Funcion
    return this._http.delete(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 70) + paramsSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00005


  /****************************************************************************
  * Funcion: FND-00006
  * Fecha: 03-06-2019
  * Descripcion: Metodo para obtener los Socios al Desarrollo del Proyecto
  * Objetivo: Socios al Desarrollo del Proyecto
  * Params: { idActividad }
  ****************************************************************************/
  getAllSociosDesarrolloByIdActividad(idActividad: number): Observable<any> {
    const paramsSend: number = idActividad;
    // Retorno de la Funcion
    return this._http.get(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 63) + paramsSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00006


  /****************************************************************************
  * Funcion: FND-00007
  * Fecha: 06-06-2019
  * Descripcion: Metodo para obtener los Tipos de Transacción
  * Objetivo: Tipos de Transacción
  * Params: { }
  ****************************************************************************/
  getAllTipoTransaccion(): Observable<any> {
    // Retorno de la Funcion
    return this._http.get(this._systemEndPointsService.getEndPointService('mantActGroup', 14), {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00007


  /**
   * Seccion de Compromisos ***************************************************
   */
  /****************************************************************************
  * Funcion: FND-00008
  * Fecha: 06-06-2019
  * Descripcion: Metodo para Ingresar Compromisos de Socio al Desarrollo
  * Objetivo: Ingresar Compromisos de Socio al Desarrollo
  * Params: { jsonSendActividadFinanciamientoDetCompromiso }
  ****************************************************************************/
  newActividadFinanciamientoDetCompromiso(jsonSendActividadFinanciamientoDetCompromiso: any): Observable<any> {
    const paramsSend: any = jsonSendActividadFinanciamientoDetCompromiso;

    // Retorno de la Funcion
    return this._http.post(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 70.1), paramsSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00008


  /****************************************************************************
    * Funcion: FND-00009
    * Fecha: 06-06-2019
    * Descripcion: Metodo para eliminar datos de Financiamiento Detalle
    * Objetivo: Eliminar Financiamiento Detalle al Proyecto
    * Params: { codigoFinancCompromiso }
    ****************************************************************************/
  deleteActividadFinanciamientoDetCompromiso(codigoFinancCompromiso: string): Observable<any> {
    const paramsSend: string = codigoFinancCompromiso;

    // Retorno de la Funcion
    return this._http.delete(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 70.2) + paramsSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00009


  /**
   * Seccion de Desembolsos ******************************************************
   */


   /**
    * Seccion de Gastos **********************************************************
    */
}
