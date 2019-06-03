/**
* @author Nahum Martinez
* @returns Servicio de Compartido de Organizaciones
* @name SharedOrganizacionesService
* @alias _sharedOrganizacionesService
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
export class SharedOrganizacionesService {
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
    * Fecha: 03-05-2019
    * Descripcion: Metodo para obtener los Datos de Organizacion segun el param
    * Objetivo: datos de Organizacion de Proyecto
    * Params: { caseOrganizacion }
    ****************************************************************************/
  getAllSociosDesarrollo(caseOrganizacion: number): Observable<any> {
    const paramsSend: number = caseOrganizacion;

    // Retorno de la Funcion
    return this._http.get(this._systemEndPointsService.getEndPointService('organizacionesGroup', 23) + paramsSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00003

  /****************************************************************************
    * Funcion: FND-00002
    * Fecha: 17-04-2019
    * Descripcion: Metodo para obtener los Datos de Admon Financiero
    * Objetivo: datos de Admon Financiero
    * Params: { }
    ****************************************************************************/
   getAllAdmonFinanciero(caseOrganizacion: number): Observable<any> {
    const paramsSend: number = caseOrganizacion;

    // Retorno de la Funcion
    return this._http.get(this._systemEndPointsService.getEndPointService('organizacionesGroup', 23) + paramsSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00002

/****************************************************************************
    * Funcion: FND-00002
    * Fecha: 17-04-2019
    * Descripcion: Metodo para obtener los Datos de agencia beneficiaria
    * Objetivo: datos de agencia beneficiaria
    * Params: { }
    ****************************************************************************/
    getAllAgenciaBeneficiaria(caseOrganizacion: number): Observable<any> {
    const paramsSend: number = caseOrganizacion;

    // Retorno de la Funcion
    return this._http.get(this._systemEndPointsService.getEndPointService('organizacionesGroup', 23) + paramsSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00002





}
