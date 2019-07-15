/**
* @author Nahum Martinez
* @returns Servico de Sectores de Gobierno
* @name ServiceSectoresGobiernoService
* @alias _serviceSectoresGobiernoService
* @version 1.0.0
* @fecha 2019-04-15
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
export class ServiceSectoresGobiernoService {
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
    return this.http.get('../assets/json/sectores-programas/sectores/filesGobierno.json')
      .toPromise()
      .then(res => <TreeNode[]>res.json().data);
  }

  /****************************************************************************
    * Funcion: FND-00003
    * Fecha: 15-04-2019
    * Descripcion: Metodo para obtener los Datos de Sector de Gobierno
    * Objetivo: datos de Sector de Gobierno
    * Params: { }
    ****************************************************************************/
  getAllSectoresGobierno(): Observable<any> {
    // Retorno de la Funcion
    return this._http.get(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 20), {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00003


  /****************************************************************************
    * Funcion: FND-00004
    * Fecha: 15-04-2019
    * Descripcion: Metodo para obtener los Datos del Sector de Gobierno
    * Objetivo: datos del Sector de Gobierno
    * Params: { idSector }
    ****************************************************************************/
  getfindByIdSector(idSector: number): Observable<any> {
    // Parametros del EndPoint
    const paramSend = idSector;

    // Retorno de la Funcion
    return this._http.get(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 21) + paramSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    }).map(response => <TreeNode[]>response);
  } // FIN | FND-00004


  /****************************************************************************
    * Funcion: FND-00005
    * Fecha: 15-04-2019
    * Descripcion: Metodo para obtener los Datos del Sector de Gobierno
    * Objetivo: datos del Sector de Gobierno, pr Nivel
    * Params: { idNivelSector }
    ****************************************************************************/
  getfindByIdNivelSector(idNivelSector: number): Observable<any> {
    // Parametros del EndPoint
    const paramSend = idNivelSector;

    // Retorno de la Funcion
    return this._http.get(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 22) + paramSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    }).map(response => <TreeNode[]>response);
  } // FIN | FND-00005


  /****************************************************************************
    * Funcion: FND-00006
    * Fecha: 15-04-2019
    * Descripcion: Metodo para obtener los Datos del Sector Sector de Gobierno
    * Objetivo: datos del Sector de Gobierno, pr Nivel
    * Params: { idNivelSector, sectorPadreId }
    ****************************************************************************/
  getfindByIdNivelSectorAndSectorPadreId(idNivelSector: number, sectorPadreId: number): Observable<any> {
    // Parametros del EndPoint
    const paramSend = idNivelSector + '/findBySectorPadreId/' + sectorPadreId;

    // Retorno de la Funcion
    return this._http.get(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 23) + paramSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    }).map(response => <TreeNode[]>response);
  } // FIN | FND-00006


  /****************************************************************************
    * Funcion: FND-00007
    * Fecha: 15-04-2019
    * Descripcion: Metodo para Ingresar los Datos del Sector de Gobierno
    * Objetivo: Ingresar datos del Sector de Gobierno, pr Nivel
    * Params: { jsonSendActividadSectorGobierno }
    ****************************************************************************/
  saveActividadSectorGobierno(jsonSendActividadSectorOcde: any): Observable<any> {
    // Parametros del EndPoint
    const paramSend = jsonSendActividadSectorOcde;

    // Retorno de la Funcion
    return this._http.post(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 24), paramSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    }).map(response => <TreeNode[]>response);
  } // FIN | FND-00007


  /****************************************************************************
    * Funcion: FND-00004
    * Fecha: 15-04-2019
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
  } // FIN | FND-00008

     /****************************************************************************
    * Funcion: FND-00004
    * Fecha: 15-05-2019
    * Descripcion: Metodo para borrar datos de Socio al Desarrollo
    * Objetivo: Borrar Socio al Desarrollo al Proyecto
    * Params: { codigoActividad }
    ****************************************************************************/
   deleteActividadGobierno(codigoActividad: string): Observable<any> {
    const paramsSend: string = codigoActividad;

    // Retorno de la Funcion
    return this._http.delete(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 25) + paramsSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00004
}
