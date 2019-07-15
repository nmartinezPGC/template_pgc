/**
 * @author Jorge Escamilla
 * @returns Contactos
 * @name ActivityService
 * @alias _activityService
 * @version 1.0.0
 * @fecha 01/07/2019
 */

import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';

// Clases nesesarias para el envio via Ajax
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Importamos la Clase de las Propiedades del Sistema
import { SystemEndPointsService } from '../../../shared/system-end-points.service';
import { SystemPropertiesService } from '../../../shared/system-properties.service';
// import { all } from 'q';


@Injectable({
  providedIn: 'root',
})
export class ContactosService {

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
* Funcion: FND-00001
* Fecha: 01-07-2019
* Descripcion: Metodo para obtener los Datos de la tabla contactos
* Objetivo: datos de la tabla contactos
* Params: { }
****************************************************************************/
getAllContactos(): Observable<any> {
 // Retorno de la Funcion

   return this._http.get(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 96), {
   headers: this.headers,
   params: { 'tokenApi': this.tokenHeader },
 });
}// FIN | FND-00001


  /****************************************************************************
* Funcion: FND-00009
* Fecha: 01-07-2019
* Descripcion: Metodo insertar un resgistro a la  tabla contactos
* Objetivo: insersion de un nuevo contacto
****************************************************************************/
newContactos(jsonPerfil): Observable<any> {
  // Parametros del EndPoint
  const paramsSend = jsonPerfil;
  // Retorno de la Funcion
  return this._http.post(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 98), paramsSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
  });
}// FIN | FND-00002


  /****************************************************************************
* Funcion: FND-00003
* Fecha: 01-07-2019
* Descripcion: Metodo para buscar registros por media del id
* Objetivo: registrso segun el id selecionado
* Params: { idContacto}
****************************************************************************/
FindByIdContacto(idContacto: number): Observable<any> {
  // Retorno de la Funcion
  const idContactos: number = idContacto;
   return this._http.get(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 97) + idContactos, {
    headers: this.headers,
    params: { 'tokenApi': this.tokenHeader },
  });
}// FIN | FND-00003


 /****************************************************************************
* Funcion: FND-00004
* Fecha: 01-07-2019
* Descripcion: Metodo para actualizar los registros de la tabla contactos por medio del id
* Objetivo: actualizar los resgistrso de la tabla contactos
* Params: { idTrato, idOrganizacion}
****************************************************************************/
UpdateContactos(jsonContactos, idContacto: number): Observable<any> {
  // Parametros del EndPoint
  const paramsSend = jsonContactos;
  const idC: number = idContacto;
  return this._http.put(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 99) + idC, paramsSend, {
    headers: this.headers,
    params: { 'tokenApi': this.tokenHeader },
  });
}// FIN | FND-00004


 /****************************************************************************
* Funcion: FND-00005
* Fecha: 01-07-2019
* Descripcion: Metodo para desabilitar el contacto por medio del id
* Objetivo: desabilitar el contacto por medio del id
* Params: { idContacto}
****************************************************************************/
DeleteContactos(idContacto: number): Observable<any> {
  // Parametros del EndPoint
  const idC: number = idContacto;
  // console.log('Parametros de Servicio ' + ' Modelo ' + JSON.stringify(paramsSend) + ' Where ' + idPerfil );
  // Retorno de la Funcion
  return this._http.delete(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 100) + idC, {
    headers: this.headers,
    params: { 'tokenApi': this.tokenHeader },
  });
}// FIN | FND-00005


/****************************************************************************
    * Funcion: FND-00006
    * Fecha: 04-07-2019
    * Descripcion: Metodo para obtener los Datos de los Tratos relacionados con el contacto
    * Objetivo: datos de los Tratos de los contactos
    ****************************************************************************/
listAllTratos(): Observable<any> {
    // Retorno de la Funcion
    return this._http.get(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 101), {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  }// FIN | FND-00006

  /****************************************************************************
    * Funcion: FND-00007
    * Fecha: 04-07-2019
    * Descripcion: Metodo para obtener los Datos de las organizacion relacionados con el contacto
    * Objetivo: datos de las organizaciones de los contactos
    ****************************************************************************/
listAllOrg(): Observable<any> {
  // Retorno de la Funcion
  return this._http.get(this._systemEndPointsService.getEndPointService('organizacionesGroup', 4), {
    headers: this.headers,
    params: { 'tokenApi': this.tokenHeader },
  });
}// FIN | FND-00007

/*****************************************************************************
* Funcion: FND-00008
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
  }// FIN | FND-00008


/****************************************************************************
    * Funcion: FND-00009
    * Fecha: 18-01-2019
    * Descripcion: Metodo para obtener los Datos de la Secuencia
    * Objetivo: Obtener la Secuencia de la Actividad
    * Params: { codSecuencia }
    ****************************************************************************/
   getSecuenciaActividad(codSecuencia: string): Observable<any> {
    // Parametros de la Funcion
    const paramsSend = codSecuencia  ;
    // Retorno de la Funcion
    return this._http.get(this._systemEndPointsService.getEndPointService('userGroup', 3) + paramsSend, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  }// FIN | FND-00009


  /****************************************************************************
    * Funcion: FND-00010
    * Fecha: 21-01-2019
    * Descripcion: Metodo para Actualizar el Valor de la Secuencia
    * Objetivo: Actualizar el valor de la Secuencia
    * Params: { jsonSecuencia, idSecuencia }
    ****************************************************************************/
   updateSecuence( jsonSecuencia, idSecuencia: number): Observable<any> {
    // Valores Constantes
    const idSecuenciaSend: number = idSecuencia;
    // Retorno de la Funcion
    return this._http.put(this._systemEndPointsService.getEndPointService('userGroup', 4) + idSecuenciaSend, jsonSecuencia, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
    });
  } // FIN | FND-00010

}
