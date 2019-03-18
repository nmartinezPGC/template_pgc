/**
 * @author Edgar Ramirez
 * @returns servicios de usuarios
 * @name UsuarioService
 * @alias _usuarioService
 * @version 1.0.0
 * @fecha 28/12/2018
 */
import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';

// Clases nesesarias para el envio via Ajax
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Importamos la Clase de las Propiedades del Sistema
import { SystemPropertiesService } from '../../../shared/system-properties.service';
import { SystemEndPointsService } from '../../../shared/system-end-points.service';

@Injectable()
export class UsuarioService {
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
    } // FIN | Constructor


    /****************************************************************************
      * Funcion: FND-00002
      * Fecha: 17-01-2019
      * Descripcion: Metodo para obtener los Datos de todos los usuarios
      * Objetivo: datos generales de los usuarios
      * Params: { }
      ****************************************************************************/
    getAllUsuarios(): Observable<any> {
        // Retorno de la Funcion
        return this._http.get(this._systemEndPointsService.getEndPointService('mantGenericosUsuarioGroup', 1), {
            headers: this.headers,
            params: { 'tokenApi': this.tokenHeader },
        });
    }// FIN | FND-00002

    /****************************************************************************
* Funcion: FND-00003
* Fecha: 21-01-2019
* Descripcion: Metodo que sirve para poder ingresar un nuevo Usuario
* Params: { jsonUsuario }
* autor: Edgar Ramirez
****************************************************************************/
    newUsuario(jsonUsuario): Observable<any> {
        // Parametros del EndPoint
        const paramsSend = jsonUsuario;
        // console.log(paramsSend);
        // Retorno de la Funcion
        return this._http.post(this._systemEndPointsService.getEndPointService('mantGenericosUsuarioGroup', 2), paramsSend, {
            headers: this.headers,
            params: { 'tokenApi': this.tokenHeader },
        });
    }// FIN | FND-00003

    /****************************************************************************
    * Funcion: FND-00004
    * Fecha: 21-01-2019
    * Descripcion: Metodo que sirve para poder ingresar un nuevo tipo de usuario
    * Params: {  }
    * Autor: Edgar Ramirez
    ****************************************************************************/
    getAllTipoUsuario(): Observable<any> {
        // Retorno de la Funcion
        // console.log("hola");
        const idGroup: number = 1;
        return this._http.get(this._systemEndPointsService.getEndPointService('mantGenericosUsuarioGroup', 3) + idGroup, {
            headers: this.headers,
            params: { 'tokenApi': this.tokenHeader },
        });
    }// FIN | FND-00004


    /****************************************************************************
* Funcion: FND-00005
* Fecha: 29-01-2019
* Descripcion: Metodo que sirve para actualizar los usuarios
* Params: { jsonUsuario, idUsuarioIn }
****************************************************************************/
    usuarioUpdate(jsonUsuario, idUsuarioIn: number): Observable<any> {
        // Parametros del EndPoint
        const paramsSend = jsonUsuario;
        const idUsuario: number = idUsuarioIn;
        // console.log('Parametros de Servicio ' + ' Modelo ' + JSON.stringify(paramsSend) + ' Where ' + idPerfil );
        // Retorno de la Funcion
        return this._http.put(this._systemEndPointsService.getEndPointService('mantGenericosUsuarioGroup', 4) + idUsuario, paramsSend, {
            headers: this.headers,
            params: { 'tokenApi': this.tokenHeader },
        });
    }// FIN | FND-00005


    /****************************************************************************
  * Funcion: FND-00006
  * Fecha: 31-01-2019
  * Descripcion: Metodo que sirve para verificar si existe un codigo en los usuarios
  * Params: { jsonUsuario, idUsuarioIn }
  ****************************************************************************/
    usuarioValidate(codUsuarioIn: string): Observable<any> {
        // Parametros del EndPoint
        const codUsuario: string = codUsuarioIn;
        // console.log('Parametros de Servicio ' + ' Modelo ' + JSON.stringify(codUsuario) + ' Where ' );
        // Retorno de la Funcion
        return this._http.get(this._systemEndPointsService.getEndPointService('mantGenericosUsuarioGroup', 5) + codUsuario, {
            headers: this.headers,
            params: { 'tokenApi': this.tokenHeader },
        });
    }// FIN | FND-00006


    /****************************************************************************
      * Funcion: FND-00007
      * Fecha: 31-01-2019
      * Descripcion: Metodo que sirve para verificar si existe un codigo en los usuarios
      * Params: { jsonUsuario, idUsuarioIn }
      ****************************************************************************/
    mailValidate(mailUsuarioIn: string): Observable<any> {
        // Parametros del EndPoint
        const mailUsuario: string = mailUsuarioIn;
        // console.log('Parametros de Servicio ' + ' Modelo ' + JSON.stringify(codUsuario) + ' Where ' );
        // Retorno de la Funcion
        return this._http.get(this._systemEndPointsService.getEndPointService('userGroup', 1) + mailUsuario, {
            headers: this.headers,
            params: { 'tokenApi': this.tokenHeader },
        });
    }// FIN | FND-00007


    /****************************************************************************
  * Funcion: FND-00008
  * Fecha: 01-02-2019
  * Descripcion: Metodo que sirve para inhabilitar los usuarios
  * Params: { idUsuarioIn }
  * Autor: Edgar Ramirez
  ****************************************************************************/
    usuariodelete(idUsuarioIn: number): Observable<any> {
        // Parametros del EndPoint
        const idUsuario: number = idUsuarioIn;
        // console.log('Parametros de Servicio ' + ' Modelo ' + JSON.stringify(paramsSend) + ' Where ' + idPerfil );
        // Retorno de la Funcion
        return this._http.delete(this._systemEndPointsService.getEndPointService('mantGenericosUsuarioGroup', 6) + idUsuario, {
            headers: this.headers,
            params: { 'tokenApi': this.tokenHeader },
        });
    }// FIN | FND-00008


    /****************************************************************************
    * Funcion: FND-00009
    * Fecha: 08-02-2019
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
    }// FIN | FND-00009


    /****************************************************************************
     * Funcion: FND-00010
     * Fecha: 12-02-2019
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
    }// FIN | FND-00010


    /****************************************************************************
   * Funcion: FND-00011
   * Fecha: 12-02-2019
   * Descripcion: Metodo para obtener las organizaciones
   * Objetivo: datos para obtener las organizaciones
   * Params: { }
   ****************************************************************************/
    ListAllOrganizaciones(): Observable<any> {
        // Retorno de la Funcion
        return this._http.get(this._systemEndPointsService.getEndPointService('organizacionesGroup', 4), {
            headers: this.headers,
            params: { 'tokenApi': this.tokenHeader },
        });
    }// FIN | FND-00011


    /****************************************************************************
* Funcion: FND-00012
* Fecha: 27-02-2019
* Descripcion: Metodo para obtener los Datos de los espacios de trabajo por su tipo
* Objetivo: datos de los espacios de trabajo
* Params: { }
****************************************************************************/
    getAllEspaciosTrabajo(): Observable<any> {
        // Retorno de la Funcion
        return this._http.get(this._systemEndPointsService.getEndPointService('espacioTrabajoGroup', 1), {
            headers: this.headers,
            params: { 'tokenApi': this.tokenHeader },
        });
    }// FIN | FND-00012


    /****************************************************************************
* Funcion: FND-00013
* Fecha: 05-03-2019
* Descripcion: Metodo que sirve para poder optener los espacios de trabajo por
* Params: {  }
* Autor: Edgar Ramirez
****************************************************************************/
    fyByIdEspacioTrabajo(idEspacioTrabajoIn: number): Observable<any> {
        // Retorno de la Funcion
        // console.log("hola");
        const idEspacioTrabajo: number = idEspacioTrabajoIn;
        return this._http.get(this._systemEndPointsService.getEndPointService('espacioTrabajoGroup', 2) + idEspacioTrabajo, {
            headers: this.headers,
            params: { 'tokenApi': this.tokenHeader },
        });
    }// FIN | FND-00013


    /****************************************************************************
    * Funcion: FND-00014
    * Fecha: 08-03-2019
    * Descripcion: Metodo para obtener los Datos de la Organizacion por Codigo
    * Objetivo: Validar si una Organizacion existe por Codigo
    * Params: { codTipoRol }
    ****************************************************************************/
    getRolByCodigoCount(codTipoRol: string): Observable<any> {
        // Parametros de la Funcion
        const paramsSend = codTipoRol;
        // Retorno de la Funcion
        return this._http.get(this._systemEndPointsService.getEndPointService('idInternaGroup', 3) + paramsSend, {
            headers: this.headers,
            params: { 'tokenApi': this.tokenHeader },
        });
    }// FIN | FND-00014


    /****************************************************************************
  * Funcion: FND-00015
  * Fecha: 13-03-2019
  * Descripcion: Metodo para obtener los Datos de los roles
  * Objetivo: datos de los Roles de espacios de trabajo
  * Params: {  }
  ****************************************************************************/
    fyByIdRolEspacio(idGrupo): Observable<any> {
        // Parametros solicitados (Grupo Solicitao)
        const paramSend = idGrupo;
        // Retorno de la Funcion
        return this._http.get(this._systemEndPointsService.getEndPointService('mantGenericosGroup', 9) + paramSend, {
            headers: this.headers,
            params: { 'tokenApi': this.tokenHeader },
        });
    }// FIN | FND-00015

}
