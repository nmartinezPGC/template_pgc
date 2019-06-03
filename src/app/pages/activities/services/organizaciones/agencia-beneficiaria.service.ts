	/**
   * @author Jorge Escamilla
   * @returns Servicio de agencia-beneficiaria
   * @name ServiceAgencia-BeneficiariaPublicasService
   * @alias _serviceAgenica-BeneficiariaPublicasService
   * @version 1.0.0
   * @fecha 06-05-2019
   */

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SystemEndPointsService } from '../../../../shared/system-end-points.service';
import { SystemPropertiesService } from '../../../../shared/system-properties.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgenciaBeneficiariaService {
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
   getAllAgenciaBeneficiaria(caseOrganizacion: number): Observable<any> {
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
    * Descripcion: Metodo para ingresar datos de agencia beneficiaria
    * Objetivo: Ingresar agencia beneficiaria al Proyecto
    * Params: { jsonSendActividadAgenciaBeneficiaria }
    ****************************************************************************/
  newActividadAgenciaBeneficiaria(jsonSendActividadAgenciaBeneficiaria: any): Observable<any> {
    const paramsSend: number = jsonSendActividadAgenciaBeneficiaria;

    // Retorno de la Funcion
    return this._http.post(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 84), paramsSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00003

/****************************************************************************
      * Funcion: FND-00004
      * Fecha: 21-01-2019
      * Descripcion: Metodo que sirve para actualizar los Tipo de organizacion que utilizara el usuario
      * Params: { jsonTipoOrganizacio, idTipoOrganizacion }
      ****************************************************************************/
     AgenciaBeneficiariaUpdate(idactividadAgenciaEjecutora: number): Observable<any> {
      // Parametros del EndPoint
      const paramsSend = idactividadAgenciaEjecutora;
      const idAct: number = idactividadAgenciaEjecutora;
      // Retorno de la Funcion
      return this._http.put(this._systemEndPointsService.getEndPointService('organizacionesGroup', 85) + idAct, paramsSend, {
        headers: this.headers,
        params: { 'tokenApi': this.tokenHeader },
      }); // FIN | FND-00004
    }

  /****************************************************************************
    * Funcion: FND-00004
    * Fecha: 15-05-2019
    * Descripcion: Metodo para borrar datos de agencia beneficiaria
    * Objetivo: Borrar agencia beneficiaria al Proyecto
    * Params: { codigoActividad }
    ****************************************************************************/
  deleteActividadAgenciaBeneficiaria(codigoActividad: string): Observable<any> {
    const paramsSend: string = codigoActividad;

    // Retorno de la Funcion
    return this._http.delete(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 86) + paramsSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00004



}
