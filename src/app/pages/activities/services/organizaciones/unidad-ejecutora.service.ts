/**
* @author Nahum Martinez
* @returns Servicio de Unidad Ejecutora
* @name UnidadEjecutoraService
* @alias _unidadEjecutoraService
* @version 1.0.0
* @fecha 03-05-2019
*/

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SystemEndPointsService } from '../../../../shared/system-end-points.service';
import { SystemPropertiesService } from '../../../../shared/system-properties.service';
import { Observable } from 'rxjs';
import { TreeNode } from 'primeng/api';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root',
})
export class UnidadEjecutoraService {
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
    private http: Http,
    // Instanciamos la Url de la API
    private _systemEndPointsService: SystemEndPointsService,
    private _systemPropertiesService: SystemPropertiesService) {

    // Seteo de los Headers
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.tokenHeader, 'Access-Control-Allow-Origin': '*',
    });
  }// FIN | Constructor


    /****************************************************************************
    * Funcion: FND-00002
    * Fecha: 17-04-2019
    * Descripcion: Metodo para obtener los Unidad Ejecutora
    * Objetivo: datos de Plan de Nacion
    * Params: { }
    ****************************************************************************/
   getAllUnidadEjecutora(caseOrganizacion: number): Observable<any> {
    const paramsSend: number = caseOrganizacion;

    // Retorno de la Funcion
    return this._http.get(this._systemEndPointsService.getEndPointService('organizacionesGroup', 23) + paramsSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00002


  /****************************************************************************
    * Funcion: FND-00003
    * Fecha: 15-05-2019
    * Descripcion: Metodo para ingresar datos de Unidad Ejecutora
    * Objetivo: Ingresar Unidad Ejecutora al Proyecto
    * Params: { jsonSendActividadUnidadEjecutora }
    ****************************************************************************/
   newActividadUnidadEjecutora(jsonSendActividadUnidadEjecutora): Observable<any> {
    const paramsSend: number = jsonSendActividadUnidadEjecutora;

    // Retorno de la Funcion
    return this._http.post(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 74), paramsSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00003
  // FIN | FND-00003


  /****************************************************************************
    * Funcion: FND-00004
    * Fecha: 15-05-2019
    * Descripcion: Metodo para borrar datos de Unidad Ejecutora
    * Objetivo: Borrar Unidad Ejecutora al Proyecto
    * Params: { codigoActividad }
    ****************************************************************************/
   deleteActividadUnidadEjecutora(codigoActividad: string): Observable<any> {
    const paramsSend: string = codigoActividad;

    // Retorno de la Funcion
    return this._http.delete(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 75) + paramsSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00004


 /****************************************************************************
    * Funcion: FND-00005
    * Fecha: 30-05-2019
    * Descripcion: Metodo para editar datos de Unidad Ejecutora
    * Objetivo: Editar Unidad Ejecutora al Proyecto
    * Params: { idActividadUnidadEjecutora }
    ****************************************************************************/
  OrganizacionUpdate(jsonSendActividadUnidadEjecutora, idActividadUnidadEjecutora: number): Observable<any> {
    // Parametros del EndPoint
    const paramsSend = jsonSendActividadUnidadEjecutora;
    const idOrg: number = idActividadUnidadEjecutora;
    // Retorno de la Funcion
    return this._http.put(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 75.1) + idOrg, paramsSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    }); // FIN | FND-00005
  } // FIN | FND-00005


  /****************************************************************************
  * Funcion: FND-00006
  * Fecha: 09-07-2019
  * Descripcion: Metodo para obtener los datos de Unidad Ejecutora del Proyecto
  * Objetivo: Unidad Ejecutora del Proyecto
  * Params: { idActividad }
  ****************************************************************************/
 getAllUnidadEjecutoraByIdActividad(): Observable<any> {
  // Retorno de la Funcion
  return this._http.get(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 71), {
    headers: this.headers,
    params: { 'tokenApi': this.tokenHeader },
  });
} // FIN | FND-00006


}
