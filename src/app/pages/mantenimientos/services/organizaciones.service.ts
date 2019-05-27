/**
 * @author David Pavon
 * @returns servicios de Organizaciones
 * @name OrganizacionesService
 * @alias _OrganizacionesService
 * @version 1.0.0
 * @fecha 07/02/2019
 */
import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';

// Clases nesesarias para el envio via Ajax
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Importamos la Clase de las Propiedades del Sistema
import { SystemPropertiesService } from '../../../shared/system-properties.service';
import { SystemEndPointsService } from '../../../shared/system-end-points.service';

@Injectable()
export class OrganizacionService {

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
  * Fecha: 07-02-2019
  * Descripcion: Metodo para obtener los Datos de la
  * variable identity del localStorage
  * Objetivo: Seteo de las variables en json
  ****************************************************************************/
  constructor(private _http: HttpClient,
    private _systemEndPointsService: SystemEndPointsService,
    private _systemPropertiesService: SystemPropertiesService) {
    // Instanciamos la Url de la API
    // this._url = this._systemProperties.getmethodUrlService();

    // Seteo de los Headers
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.tokenHeader, 'Access-Control-Allow-Origin': '*',
    });
  }// FIN DE CONSTRUCTOR


  /****************************************************************************
     * Funcion: FND-00003
     * Fecha: 24-01-2019
     * Descripcion: Metodo para obtener los tipo de organizacion
     * Objetivo: datos para obtener los tipo de organizacion
     * Params: { }
     ****************************************************************************/
  listAllTipoOrganizaciones(): Observable<any> {
    // Retorno de la Funcion
    return this._http.get(this._systemEndPointsService.getEndPointService('organizacionesGroup', 1), {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  }// FIN | FND-00003

  /****************************************************************************
     * Funcion: FND-00002
     * Fecha: 21-01-2019
     * Descripcion: Metodo para obtener los tipo de organizacion
     * Objetivo: datos para obtener los tipo de organizacion
     * Params: { }
     ****************************************************************************/
  listAllCategoria(): Observable<any> {
    // Retorno de la Funcion
    return this._http.get(this._systemEndPointsService.getEndPointService('organizacionesGroup', 14), {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  }// FIN | FND-00002

  /****************************************************************************
* Funcion: FND-00009
* Fecha: 13-10-2018
* Descripcion: Metodo para obtener los Datos de los Paises
* Objetivo: datos de los Tipos de Paises
* Params: { }
****************************************************************************/
  getAllPaises(): Observable<any> {
    // Retorno de la Funcion
    return this._http.get(this._systemEndPointsService.getEndPointService('mantGenericosGroup', 1), {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  }// FIN | FND-00009

  /****************************************************************************
* Funcion: FND-00003
* Fecha: 21-01-2019
* Descripcion: Metodo que sirve para poder ingresar un nuevo Usuario
* Params: { jsonPerfil }
* autor: Edgar Ramirez
****************************************************************************/
  newOrganizacion(jsonOrganizacion): Observable<any> {
    // Parametros del EndPoint
    const paramsSend = jsonOrganizacion;
    // console.log(paramsSend);
    // Retorno de la Funcion
    return this._http.post(this._systemEndPointsService.getEndPointService('organizacionesGroup', 8), paramsSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  }// FIN | FND-00003


  /****************************************************************************
* Funcion: FND-00009
* Fecha: 13-10-2018
* Descripcion: Metodo para obtener los Datos de los Paises
* Objetivo: datos de los Tipos de Paises
* Params: { }
****************************************************************************/
  getAllOrganizacion(): Observable<any> {
    // Retorno de la Funcion
    return this._http.get(this._systemEndPointsService.getEndPointService('organizacionesGroup', 4), {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  }// FIN | FND-00009

  /****************************************************************************
 * Funcion: FND-00009
 * Fecha: 13-10-2018
 * Descripcion: Metodo para obtener los Datos de los Paises
 * Objetivo: datos de los Tipos de Paises
 * Params: { }
 ****************************************************************************/
  FindByIdOrganizacion(idOrganizacionIn: number): Observable<any> {
    // Retorno de la Funcion
    const idOrganizacion: number = idOrganizacionIn;
    return this._http.get(this._systemEndPointsService.getEndPointService('organizacionesGroup', 5) + idOrganizacion, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  }// FIN | FND-00009

  /****************************************************************************
      * Funcion: FND-00004
      * Fecha: 21-01-2019
      * Descripcion: Metodo que sirve para actualizar los Tipo de organizacion que utilizara el usuario
      * Params: { jsonTipoOrganizacio, idTipoOrganizacion }
      ****************************************************************************/
  OrganizacionUpdate(jsonOrganizacion, idOrganizacion: number): Observable<any> {
    // Parametros del EndPoint
    const paramsSend = jsonOrganizacion;
    const idOrg: number = idOrganizacion;
    // Retorno de la Funcion
    return this._http.put(this._systemEndPointsService.getEndPointService('organizacionesGroup', 21) + idOrg, paramsSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    }); // FIN | FND-00004
  }



  /****************************************************************************
      * Funcion: FND-00004
      * Fecha: 21-01-2019
      * Descripcion: Metodo que sirve para actualizar los Tipo de organizacion que utilizara el usuario
      * Params: { jsonTipoOrganizacio, idTipoOrganizacion }
      ****************************************************************************/
  organizacionDelete(idOrgamizacion: number): Observable<any> {
    // Parametros del EndPoint
    const idOrg: number = idOrgamizacion;
    // console.log('Parametros de Servicio ' + ' Modelo ' + JSON.stringify(paramsSend) + ' Where ' + idPerfil );
    // Retorno de la Funcion
    return this._http.delete(this._systemEndPointsService.getEndPointService('organizacionesGroup', 22) + idOrg, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  }// FIN | FND-00006

  /****************************************************************************
    * Funcion: FND-00013
    * Fecha: 18-01-2019
    * Descripcion: Metodo para obtener los Datos de la Secuencia
    * Objetivo: Obtener la Secuencia de la Actividad
    * Params: { codSecuencia }
    ****************************************************************************/
  getSecuenciaActividad(codSecuencia: string): Observable<any> {
    // Parametros de la Funcion
    const paramsSend = codSecuencia;
    // Retorno de la Funcion
    return this._http.get(this._systemEndPointsService.getEndPointService('userGroup', 3) + paramsSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  }// FIN | FND-00013


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

}
