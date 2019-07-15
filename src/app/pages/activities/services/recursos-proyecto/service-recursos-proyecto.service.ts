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
  providedIn: 'root',
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
  * Funcion: FND-Constructor
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
      * Funcion: FND-00001
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
  }// FIN | FND-00001

 /****************************************************************************
  * Funcion: FND-00002
  * Fecha: 24-06-2019
  * Descripcion: Metodo para obtener los Datos de los Tipos
  * Objetivo: Obtener todos los Tipos
  ****************************************************************************/
  getAllTipo(): Observable<any> {
    // Parametros solicitados (Grupo Solicitao)
    // Retorno de la Funcion
    return this._http.get(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 90),  {
        headers: this.headers,
        params: { 'tokenApi': this.tokenHeader },
    });
}// FIN | FND-00002


    /****************************************************************************
    * Funcion: FND-00001
    * Fecha: 21-08-2018
    * Descripcion: Metodo para obtener los Datos de los Estados de la Actividad
    * Objetivo: datos de los Estados de las Actividades
    * Params: {  }
    ****************************************************************************/
   getAllTipos(idTipo): Observable<any> {
    // Parametros solicitados (Grupo Solicitao)
    const paramSend = idTipo;
    // Retorno de la Funcion
    return this._http.get(this._systemEndPointsService.getEndPointService('estadosGroup', 3) + paramSend, {
        headers: this.headers,
        params: { 'tokenApi': this.tokenHeader },
    });
}// FIN | FND-00001

 /****************************************************************************
  * Funcion: FND-00003
  * Fecha: 25-06-2019
  * Descripcion: Metodo para obtener todos los datos de Recursos de Proyecto
  * Objetivo: Obtener los datos de Recursos de Proyecto de la bd
  ****************************************************************************/
findAllrecursosproyecto(): Observable<any> {
  // Parametros solicitados (Grupo Solicitao)
  // Retorno de la Funcion
  return this._http.get(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 87),  {
      headers: this.headers,
      params: { 'tokenApi': this.tokenHeader },
  });
}// FIN | FND-00003


    /****************************************************************************
    * Funcion: FND-00004
    * Fecha: 07-01-2019
    * Descripcion: Metodo que sirve para poder ingresar un nuevo Recurso Proyecto
    * Params: { actividadRecursoJson }
    ****************************************************************************/
   newrecurso(actividadRecursoJson): Observable<any> {
    // Parametros del EndPoint
    const paramsSend = actividadRecursoJson;
    return this._http.post(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 94), paramsSend, {
        headers: this.headers,
        params: { 'tokenApi': this.tokenHeader },
    });
}// FIN | FND-00004

    /****************************************************************************
 * Funcion: FND-00009
 * Fecha: 13-10-2018
 * Descripcion: Metodo para obtener los Datos de los Paises
 * Objetivo: datos de los Tipos de Paises
 * Params: { }
 ****************************************************************************/
FindByIdActividadRecurso(idActividadRecurso: number): Observable<any> {
  // Retorno de la Funcion

  const idActividadRecursos: number = idActividadRecurso;
   return this._http.get(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 95.1) + idActividadRecursos, {
    headers: this.headers,
    params: { 'tokenApi': this.tokenHeader },
  });
}// FIN | FND-00009


    /****************************************************************************
      * Funcion: FND-00004
      * Fecha: 21-01-201
      * Descripcion: Metodo que sirve para actualizar los Tipo de organizacion que utilizara el usuario
      * Params: { jsonTipoOrganizacio, idTipoOrganizacion }
      ****************************************************************************/
     LinkUpdate(jsonEspacios, idActividadRecurso: number): Observable<any> {
      // Parametros del EndPoint
      const paramsSend = jsonEspacios;
      const idET: number = idActividadRecurso;
      // Retorno de la Funcion

      return this._http.put(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 95) + idET, paramsSend, {
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
         ActividadRecursoDelete(idActividadRecurso: number): Observable<any> {
          // Parametros del EndPoint
          const idAct: number = idActividadRecurso;
          // Retorno de la Funcion
          return this._http.delete(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 95.2) + idAct, {
            headers: this.headers,
            params: { 'tokenApi': this.tokenHeader },
          });
        }// FIN | FND-00006

/****************************************************************************
* Funcion: FND-00007
* Fecha: 07-01-2019
* Descripcion: Metodo que sirve para poder ingresar un nuevo Recurso Proyecto
* Params: { actividadRecursoJson }
****************************************************************************/
   Uploadfile(uploadFile): Observable<any> {
    // Parametros del EndPoint
    const paramsSend = uploadFile;
    return this._http.post(this._systemEndPointsService.getEndPointService('actividadesCRUDGroup', 92), paramsSend, {
        headers: this.headers,
        params: { 'tokenApi': this.tokenHeader },
    });
}// FIN | FND-00007
}
