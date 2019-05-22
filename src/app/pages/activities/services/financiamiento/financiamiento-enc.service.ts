/**
* @author Nahum Martinez
* @returns Servicio de Financiamiento Enc
* @name FinanciamientoEncService
* @alias _financiamientoEncService
* @version 1.0.0
* @fecha 21-05-2019
*/

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SystemEndPointsService } from '../../../../shared/system-end-points.service';
import { SystemPropertiesService } from '../../../../shared/system-properties.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinanciamientoEncService {
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
  * Fecha: 21-05-2019
  * Descripcion: Metodo para obtener las Monedas para el financiamiento
  * Objetivo: Monedas de Proyecto
  * Params: { }
  ****************************************************************************/
  getAllMonedasProyecto(): Observable<any> {
    // Retorno de la Funcion
    return this._http.get(this._systemEndPointsService.getEndPointService('mantActGroup', 8), {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00002

  /****************************************************************************
  * Funcion: FND-00002.1
  * Fecha: 21-05-2019
  * Descripcion: Metodo para obtener las Monedas para el financiamiento
  * Objetivo: Monedas de Proyecto
  * Params: { idMoneda }
  ****************************************************************************/
  getMonedaProyecto(idMoneda: number): Observable<any> {
    const paramsSend: number = idMoneda;
    // Retorno de la Funcion
    return this._http.get(this._systemEndPointsService.getEndPointService('mantActGroup', 9) + paramsSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00002.1
}
