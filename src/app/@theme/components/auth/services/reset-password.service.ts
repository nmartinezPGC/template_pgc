
/**
   * @author Jorge Escamilla
   * @returns Servicio de request-password
   * @name ServiceReset-passwordPublicasService
   * @alias _ServiceReset-passwordPublicasServicee
   * @version 1.0.0
   * @fecha 06-05-2019
   */

import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';

// Clases nesesarias para el envio via Ajax
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Importamos la Clase de las Propiedades del Sistema
import { SystemPropertiesService } from '../../../../shared/system-properties.service';
import { SystemEndPointsService } from '../../../../shared/system-end-points.service';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
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
    * Fecha: 01-06-2018
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
}     // FIN | constructor
    /****************************************************************************
    * Funcion: FND-00004
    * Fecha: 21-01-2019
    * Descripcion: Metodo que sirve para actualizar los Tipo de organizacion que utilizara el usuario
    * Params: { jsonTipoOrganizacio, idTipoOrganizacion }
    ****************************************************************************/
   resetpassword(jsonresetpassword, idTusuario: number): Observable<any> {
    // Parametros del EndPoint
    const paramsSend = jsonresetpassword;
    const idTrest: number = idTusuario;
    // Retorno de la Funcion
    return this._http.put(this._systemEndPointsService.getEndPointService('organizacionesGroup', 12) + idTrest, paramsSend, {
        headers: this.headers,
        params: { 'tokenApi': this.tokenHeader },
    });
}// FIN | FND-00004


}
