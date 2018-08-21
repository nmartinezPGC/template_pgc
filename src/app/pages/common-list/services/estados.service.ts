
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

// Clases nesesarias para el envio via Ajax
import {HttpClient, HttpHeaders } from '@angular/common/http';

// Importamos la Clase de las Propiedades del Sistema
import { SystemPropertiesService } from '../../../shared/system-properties.service';
import { SystemEndPointsService } from '../../../shared/system-end-points.service';

@Injectable()
export class EstadosService {

  // private estadosArray: any[];

  public tokenHeader = this._systemPropertiesService.getIdentity().token;
  public usernameHeader = this._systemPropertiesService.getIdentity().userName;
  // httpOptions = new HttpHeaders();

  public headers = new HttpHeaders();


  /****************************************************************************
  * Funcion: FND-00001
  * Fecha: 01-06-2018
  * Descripcion: Metodo para obtener los Datos de la
  * variable identity del localStorage
  * Objetivo: Seteo de las variables en json
  ****************************************************************************/
  constructor( private _http: HttpClient,
    private _systemEndPointsService: SystemEndPointsService,
    private _systemPropertiesService: SystemPropertiesService ) {
    // Instanciamos la Url de la API
    // this._url = this._systemProperties.getmethodUrlService();

    // Seteo de los Headers
    this.headers = new HttpHeaders({'Content-Type': 'application/json',
                                    'Authorization': this.tokenHeader, 'Access-Control-Allow-Origin': '*' });
  }// FIN | Constructor


  /****************************************************************************
  * Funcion: FND-00001
  * Fecha: 04-07-2018
  * Descripcion: Metodo para obtener los Datos de la los datos del Usuario
  * Objetivo: datos generales del Usuario
  * Params: { userName }
  ****************************************************************************/
  getAllEstados(): Observable<any> {
    // Retorno de la Funcion
    // return this._http.get( 'http://localhost:8090/api/v1/usuarios/findByMail/' + params, { headers: this.headers,
    return this._http.get( this._systemEndPointsService.getEndPointService( 'estadosGroup', 1), { headers: this.headers,
                        params: {'tokenApi': this.tokenHeader } } );
  }// FIN | FND-00001

}
