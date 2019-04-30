/**
* @author Allan Madrid
* @returns Servicio de Vision Pais
* @name ServiceVisionPaisService
* @alias _serviceVisionPaisService
* @version 1.0.0
* @fecha 30-04-2019
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
export class ServiceVisionPaisService {
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
  } // FIN | Constructor


  /****************************************************************************
  * Funcion: FND-00002
  * Fecha: 15-03-2019
  * Descripcion: Metodo para obtener los Datos de la prueba para el Treeview
  * Objetivo: Seteo de las variables en json, con datos de prueba
  ****************************************************************************/
  getFiles() {
    return this.http.get('../assets/json/sectores-programas/programas/filesVisionPais.json')
      .toPromise()
      .then(res => <TreeNode[]>res.json().data);
  }

  /****************************************************************************
    * Funcion: FND-00003
    * Fecha: 17-04-2019
    * Descripcion: Metodo para obtener los Datos de Vision Pais
    * Objetivo: datos de Vision de Pais
    * Params: { }
    ****************************************************************************/
  getAllProgramasVisionPais(): Observable<any> {
    // Retorno de la Funcion
    return this._http.get(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 50), {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    }).map(response => <TreeNode[]>response);
  } // FIN | FND-00003


  /****************************************************************************
    * Funcion: FND-00004
    * Fecha: 17-04-2019
    * Descripcion: Metodo para obtener los Datos del Plan de Nacion
    * Objetivo: datos del Plan de Nacion
    * Params: { idPrograma }
    ****************************************************************************/
  getfindByIdPrograma(idPrograma: number): Observable<any> {
    // Parametros del EndPoint
    const paramSend = idPrograma;

    // Retorno de la Funcion
    return this._http.get(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 51) + paramSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    }).map(response => <TreeNode[]>response);
  } // FIN | FND-00004


  /****************************************************************************
    * Funcion: FND-00005
    * Fecha: 17-04-2019
    * Descripcion: Metodo para obtener los Datos del Plan de Nacion
    * Objetivo: datos del Plan de Nacion, pr Nivel
    * Params: { idNivelPrograma }
    ****************************************************************************/
  getfindByIdNivelPrograma(idNivelPrograma: number): Observable<any> {
    // Parametros del EndPoint
    const paramSend = idNivelPrograma;

    // Retorno de la Funcion
    return this._http.get(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 52) + paramSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    }).map(response => <TreeNode[]>response);
  } // FIN | FND-00005


  /****************************************************************************
    * Funcion: FND-00006
    * Fecha: 17-04-2019
    * Descripcion: Metodo para obtener los Datos del Programa Plan de Nacion
    * Objetivo: datos del Plan de Nacion, pr Nivel
    * Params: { idNivelPrograma, ProgramaPadreId }
    ****************************************************************************/
  getfindByIdNivelProgramaAndProgramaPadreId(idNivelPrograma: number, ProgramaPadreId: number): Observable<any> {
    // Parametros del EndPoint
    const paramSend = idNivelPrograma + '/findByProgramaPadreId/' + ProgramaPadreId;

    // Retorno de la Funcion
    return this._http.get(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 53) + paramSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    }).map(response => <TreeNode[]>response);
  } // FIN | FND-00006


  /****************************************************************************
    * Funcion: FND-00007
    * Fecha: 30-04-2019
    * Descripcion: Metodo para Ingresar los Datos de Vision de Pais
    * Objetivo: Ingresar datos de Vision Pais , por Nivel
    * Params: { jsonSendActividadProgramaVisionpais }
    ****************************************************************************/
  saveActividadProgramaPlanNacion(jsonSendActividadProgramaVisionpais: any): Observable<any> {
    // Parametros del EndPoint
    const paramSend = jsonSendActividadProgramaVisionpais;

    // Retorno de la Funcion
    return this._http.post(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 54), paramSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    }).map(response => <TreeNode[]>response);
  } // FIN | FND-00007

}
