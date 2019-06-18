/**
* @author Allan Madrid
* @returns Servico de Recursos de Proyecto
* @name ServicerecursosproyectoService
* @alias _servicerecursosproyectosService
* @version 1.0.0
* @fecha 11-06-2019
*/
import { Injectable } from '@angular/core';
// Clases nesesarias para el envio via Ajax
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SystemEndPointsService } from '../../../../shared/system-end-points.service';
import { SystemPropertiesService } from '../../../../shared/system-properties.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServicerecursosproyectoService {
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
    private _systemPropertiesService: SystemPropertiesService) { // Seteo de los Headers
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.tokenHeader, 'Access-Control-Allow-Origin': '*',
      });
     } // Fin Constructor
     /****************************************************************************
      * Funcion: FND-00002
      * Fecha: 28-12-2018
      * Descripcion: Metodo para obtener los Datos de todos los perfiles
      * Objetivo: datos generales de los perfiles
      * Params: { }
      ****************************************************************************/
    getAllPerfiles(): Observable<any> {
      // Retorno de la Funcion
      return this._http.get(this._systemEndPointsService.getEndPointService('mantGenericosGroup', 4), {
          headers: this.headers,
          params: { 'tokenApi': this.tokenHeader },
      });
  }// FIN | FND-00002


  /****************************************************************************
  * Funcion: FND-00003
  * Fecha: 07-01-2019
  * Descripcion: Metodo que sirve para poder ingresar un nuevo perfil
  * Params: { jsonPerfil }
  ****************************************************************************/
  newPerfil(jsonPerfil): Observable<any> {
      // Parametros del EndPoint
      const paramsSend = jsonPerfil;
      // console.log(paramsSend);
      // Retorno de la Funcion
      return this._http.post(this._systemEndPointsService.getEndPointService('mantGenericosGroup', 5), paramsSend, {
          headers: this.headers,
          params: { 'tokenApi': this.tokenHeader },
      });
  }// FIN | FND-00003


  getAllTipo(): Observable<any> {
    // Parametros solicitados (Grupo Solicitao)
    // Retorno de la Funcion
    return this._http.get(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 90),  {
        headers: this.headers,
        params: { 'tokenApi': this.tokenHeader },
    });
}// FIN | FND-00001

  /****************************************************************************
  * Funcion: FND-00005
  * Fecha: 11-01-2019
  * Descripcion: Metodo que sirve para actualizar los perfiles que utilizara el usuario
  * Params: { jsonPerfil, idPerfilIn }
  ****************************************************************************/
  perfilUpdate(jsonPerfil, idPerfilIn: number): Observable<any> {
      // Parametros del EndPoint
      const paramsSend = jsonPerfil;
      const idPerfil: number = idPerfilIn;
      // console.log('Parametros de Servicio ' + ' Modelo ' + JSON.stringify(paramsSend) + ' Where ' + idPerfil );
      // Retorno de la Funcion
      return this._http.put(this._systemEndPointsService.getEndPointService('mantGenericosGroup', 7) + idPerfil, paramsSend, {
          headers: this.headers,
          params: { 'tokenApi': this.tokenHeader },
      });
  }// FIN | FND-00005

   /****************************************************************************
  * Funcion: FND-00006
  * Fecha: 15-01-2019
  * Descripcion: Metodo que sirve para inhabilitar los perfiles
  * Params: { idPerfilIn }
  ****************************************************************************/
 perfildelete( idPerfilIn: number): Observable<any> {
  // Parametros del EndPoint
  const idPerfil: number = idPerfilIn;
  // console.log('Parametros de Servicio ' + ' Modelo ' + JSON.stringify(paramsSend) + ' Where ' + idPerfil );
  // Retorno de la Funcion
  return this._http.delete(this._systemEndPointsService.getEndPointService('mantGenericosGroup', 8) + idPerfil, {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
  });
}// FIN | FND-00006
}
