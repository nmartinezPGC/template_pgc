	/**
   * @author Jorge Escamilla
   * @returns Servicio de request-password
   * @name ServiceRequest-passwordService
   * @alias _serviceRequest-passwordService
   * @version 1.0.0
   * @fecha 15-05-2019
   */
  import { Injectable } from '@angular/core';

  // Clases nesesarias para el envio via Ajax
  import { Http, Headers } from '@angular/http';
  import 'rxjs/add/operator/catch';
  import 'rxjs/add/operator/map';
  // import { Observable } from 'rxjs/Observable';
  
  // Importamos la Clase de las Propiedades del Sistema
  import { SystemPropertiesService } from '../../../../shared/system-properties.service';
  
  
  // Clase de Propieades Globales de la PGC
  @Injectable()
  export class requestpasswordService {
    // Propiedades de la Clases *************************************************
    // URL Base de la Clase, Referencia a la API | Spring
    public _url: string;
  
    // Variables para el localStorage
    public _identity;
    public _token;
  
    /****************************************************************************
    * Funcion: Constructor
    * Fecha: 01-06-2018
    * Descripcion: Method Contructor of the Class
    * Objetivo: Login in the API
    ****************************************************************************/
    constructor( private _http: Http,
                  private _systemPropertiesService: SystemPropertiesService ) {
      this._url = this._systemPropertiesService.getmethodUrlService();
    }// FIN | Contructor
  
  
    /****************************************************************************
    * Funcion: FND-00001
    * Fecha: 01-06-2018
    * Descripcion: Metodo Ajax, para Invocar el servicio
    * a la API (login).
    * Objetivo: Logearse a la Aplicacion
    ****************************************************************************/
    request( user_to_request_password) {
      const json = JSON.stringify( user_to_request_password );
        // let params = "json=" + json;
      const params = json;
        // let headers = new Headers({ 'Content-Type':'application/x-www-form-urlencoded'});
        // let headers = new Headers({ 'Content-Type': 'application/json'});
  
      // return this._http.post(this._url + "/auth/login", params, { headers:headers }).map( res => res.json());
      return this._http.post(this._url + '/auth/request-password', params)
                .map( res => res.json() );
    }// FIN | FND-00001
  
    estados() {
      const headers = new Headers({ 'Content-Type': 'application/json'});
      // let headers = new Headers({ 'Content-Type':'application/x-www-form-urlencoded' });
      // let headers = new Headers({ 'Access-Control-Allow-Origin': 'http://localhost:8090'});
      /*let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Accept', 'application/json');
      headers.append('Access-Control-Allow-Headers', 'Content-Type');
      headers.append('Access-Control-Allow-Methods', 'GET');
      headers.append('Access-Control-Allow-Origin', 'http://localhost:8090');*/
  
      return this._http.get(this._url + '/estados', { headers: headers })
                .map( res => res.json().data );
    }

    /****************************************************************************
    * Funcion: FND-00002.1
    * Fecha: 01-06-2018
    * Descripcion: Metodo Ajax, para Invocar el servicio
    * a la API ( usuario/change-pass-user ).
    * Objetivo: Cambiar Password a Usuario
    ****************************************************************************/
    changePassUser( user_to_change_pass ) {
        const json = JSON.stringify( user_to_change_pass );
        const params = 'json=' + json + '&authorization=' + this.getToken();
        // console.log(json);
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
  
      return this._http.post(this._url + '/auth/user/change-pass-user', params, { headers: headers })
                .map( res => res.json());
    } // FIN | FND-00002
  
  
  
  
    /****************************************************************************
    * Funcion: FND-00003
    * Fecha: 01-06-2018
    * Descripcion: Metodo para obtener los Datos de la
    * variable identity del localStorage
    * Objetivo: Seteo de las variables en json
    ****************************************************************************/
    getIdentity() {
  
      const identity = JSON.parse(localStorage.getItem('identity'));
      // Pregunta por el valor de la identity
        if (identity !== 'undefined') {
          this._identity = identity;
        }else {
          this._identity = null;
        }
  
      return this._identity;
    }// FIN | FND-00003
  
  
    /****************************************************************************
    * Funcion: FND-00004
    * Fecha: 01-06-2018
    * Descripcion: Metodo para obtener los Datos de la
    * variable identity del localStorage
    * Objetivo: Seteo de las variables en json
    ****************************************************************************/
    getToken() {
      // No hace el parse; porque no es Json
      const token = localStorage.getItem('token');
      // Pregunta por el valor del Token
        if (token !== 'undefined') {
          this._token = token;
        }else {
          this._token = null;
        }
  
      return this._token;
    }// FIN | FND-00004
  
  }// FIN | Clase
  