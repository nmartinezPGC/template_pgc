/**
* @author Nahum Martinez
* @returns Servicio de Socio Desarrollo
* @name SocioDesarrolloService
* @alias _socioDesarrolloService
* @version 1.0.0
* @fecha 02-05-2019
*/

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SystemEndPointsService } from '../../../../shared/system-end-points.service';
import { SystemPropertiesService } from '../../../../shared/system-properties.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocioDesarrolloService {
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
    * Fecha: 17-04-2019
    * Descripcion: Metodo para obtener los Datos de Plan de Nacion
    * Objetivo: datos de Plan de Nacion
    * Params: { }
    ****************************************************************************/
  getAllSociosDesarrollo(caseOrganizacion: number): Observable<any> {
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
    * Descripcion: Metodo para ingresar datos de Socio al Desarrollo
    * Objetivo: Ingresar Socio al Desarrollo al Proyecto
    * Params: { jsonSendActividadSocioDesarrollo }
    ****************************************************************************/
  newActividadSociosDesarrollo(jsonSendActividadSocioDesarrollo: any): Observable<any> {
    const paramsSend: number = jsonSendActividadSocioDesarrollo;

    // Retorno de la Funcion
    return this._http.post(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 65), paramsSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00003


  /****************************************************************************
    * Funcion: FND-00004
    * Fecha: 15-05-2019
    * Descripcion: Metodo para borrar datos de Socio al Desarrollo
    * Objetivo: Borrar Socio al Desarrollo al Proyecto
    * Params: { codigoActividad }
    ****************************************************************************/
  deleteActividadSociosDesarrollo(codigoActividad: string): Observable<any> {
    const paramsSend: string = codigoActividad;

    // Retorno de la Funcion
    return this._http.delete(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 66) + paramsSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00004

  /****************************************************************************
  * Funcion: FND-00005
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
  } // FIN | FND-00005
}
