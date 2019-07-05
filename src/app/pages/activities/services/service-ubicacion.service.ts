/**
* @author Nahum Martinez
* @returns ServiceUbicacionService
* @name ServiceUbicacionService
* @alias _serviceUbicacionService
* @version 1.0.0
* @fecha 2019-02-21
*/

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SystemEndPointsService } from '../../../shared/system-end-points.service';
import { SystemPropertiesService } from '../../../shared/system-properties.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceUbicacionService {
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
    * Fecha: 21-02-2019
    * Descripcion: Metodo para obtener los Datos de todos los Niveles de Implementacion
    * Objetivo: datos de Niveles de Implementacion
    * Params: { }
    ****************************************************************************/
  getAllNivelesImplementacion(): Observable<any> {
    // Retorno de la Funcion
    return this._http.get(this._systemEndPointsService.getEndPointService('endPointImplementacion', 1), {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00002


  /****************************************************************************
    * Funcion: FND-00003
    * Fecha: 21-02-2019
    * Descripcion: Metodo para obtener los Datos de todos los Niveles de Ubicacion
    * de Implementacion
    * Objetivo: datos de Niveles de Implementacion
    * Params: { idNivelImplementacion }
    ****************************************************************************/
  getAllNivelesUbicacionImplementacion(idNivelImplementacionIn: number): Observable<any> {
    // Parametros
    const paramSend: number = idNivelImplementacionIn;

    // Retorno de la Funcion
    return this._http.get(this._systemEndPointsService.getEndPointService('endPointImplementacion', 5) + paramSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00003


  /****************************************************************************
    * Funcion: FND-00004
    * Fecha: 25-02-2019
    * Descripcion: Metodo para obtener los Datos de todos las Ubicaciones
    * Objetivo: datos de las Ubicaciones
    * Params: { idNivelImplementacion, idNivelUbicacion }
    ****************************************************************************/
  getUbicacionesByIdNivelImplAndIdNivelUbicacion(idNivelImplementacionIn: number, idNivelUbicacionIn): Observable<any> {
    // Parametros
    const paramSend: any = idNivelImplementacionIn + '/' + idNivelUbicacionIn;

    // Retorno de la Funcion
    return this._http.get(this._systemEndPointsService.getEndPointService('endPointImplementacion', 10) + paramSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00004


  /****************************************************************************
    * Funcion: FND-00005
    * Fecha: 25-02-2019
    * Descripcion: Metodo para obtener los Datos de todos las Ubicaciones
    * Objetivo: datos de las Ubicaciones
    * Params: { idNivelUbicacion }
    ****************************************************************************/
  getUbicacionesByIdNivelUbicacion(idNivelUbicacionIn): Observable<any> {
    // Parametros
    const paramSend: any = idNivelUbicacionIn;

    // Retorno de la Funcion
    return this._http.get(this._systemEndPointsService.getEndPointService('endPointImplementacion', 9) + paramSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00005


  /****************************************************************************
    * Funcion: FND-00006
    * Fecha: 28-02-2019
    * Descripcion: Metodo para ingresar los Datos de la Ubicacion
    * Objetivo: Ingresar datos de las Ubicaciones con Proyectos
    * Params: { jsonUbicacionActivity }
    ****************************************************************************/
  newUbicacionProyecto(jsonUbicacionActivity: any): Observable<any> {
    // Parametros
    const paramSend: any = jsonUbicacionActivity;

    // Retorno de la Funcion
    return this._http.post(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 10), paramSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00006


  /****************************************************************************
    * Funcion: FND-00007
    * Fecha: 01-03-2019
    * Descripcion: Metodo para borrar los Datos de la Ubicacion relacionada con
    * el Proyecto
    * Objetivo: Borrar datos de las Ubicaciones con Proyectos
    * Params: { idUbicacionImpl , idActividad }
    ****************************************************************************/
  deletedActivityUbicacion(idUbicacionImplIn: number, idActividadIn: number): Observable<any> {
    // Parametros
    const paramSend: any = idUbicacionImplIn + '/' + idActividadIn;

    // Retorno de la Funcion
    return this._http.delete(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 13) + paramSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00007


  /****************************************************************************
    * Funcion: FND-00005
    * Fecha: 25-02-2019
    * Descripcion: Metodo para obtener los Datos de todos las Ubicaciones
    * Objetivo: datos de las Ubicaciones
    * Params: { idActividad }
    ****************************************************************************/
  getUbicacionesByIdActividad(idActividadIn: number): Observable<any> {
    // Parametros
    const paramSend: number = idActividadIn;

    // Retorno de la Funcion
    return this._http.get(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 12) + paramSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00005
}
