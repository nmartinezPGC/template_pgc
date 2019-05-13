import { Injectable } from '@angular/core';

// Clase de Propieades Globales de la PGC
@Injectable()
export class SystemPropertiesService {
  // Declaracion de las variables del Service
  public progressBar;

  // Variables para el localStorage
  public _identity;
  public _token;
  public _timeExpired;

  constructor() { }

  // Varibles Gloables de Inicio del Systema
  // Entorno Localhost
  public urlLocalConfig: string = 'http://localhost:8090/api/v1';
  // public urlLocalConfig:string = "/rest";
  public urlLocalResourse: string = 'http://localhost:8090/api/v1';
  // public urlLocalResourse:string = "/rest";

  // Entorno de Servidor
  // public urlServerConfig: string = 'http://172.17.0.128:8090/API-Rest-PGC/api/v1';
  // public urlServerResourse: string = 'http://172.17.0.128:8090/API-Rest-PGC/api/v1';
   public urlServerConfig: string = 'http://172.17.0.128:8090/api/v1';
  public urlServerResourse: string = 'http://172.17.0.128:8090/api/v1';

  // Indicador del entorno a Copilar | 1 = Server | 2 = Localhost
  public indicatorIPCompiler: number = 1;

  /****************************************************
  * Funcion: FND-00001
  * Fecha: 17-02-2018
  * Descripcion: Genera la Url para los Services
  * Objetivo: Genera Url de los Services
  *****************************************************/
  getmethodUrlService() {
    // Instanciamos el Indicador del Entorno de Compilacion
    const indicadorIp: number = this.indicatorIPCompiler;

    let urlEnviroment: string;
    // Evalua el Entorno y Proporciona la URL
    if (indicadorIp === 1) {
      urlEnviroment = this.urlServerConfig;
    } else if (indicadorIp === 2) {
      urlEnviroment = this.urlLocalConfig;
    }

    return urlEnviroment;
  } // FIN : 00001


  /****************************************************
  * Funcion: FND-00002
  * Fecha: 17-02-2018
  * Descripcion: Recupera la Ruta de los Recursos del
  * Servidor
  * Objetivo: Recupera la Ruta de los Recursos
  *****************************************************/
  getmethodUrlResourses() {
    // Instanciamos el Indicador del Entorno de Compilacion
    const indicadorIp: number = this.indicatorIPCompiler;

    let urlEnviromentResourse: string;
    // Evalua el Entorno y Proporciona la URL
    if (indicadorIp === 1) {
      urlEnviromentResourse = this.urlServerResourse;
    } else if (indicadorIp === 2) {
      urlEnviromentResourse = this.urlLocalResourse;
    }

    return urlEnviromentResourse;
  } // FIN : 00002


  /****************************************************************************
  * Funcion: FND-00003
  * Fecha: 01-06-2018
  * Descripcion: Metodo para obtener los Datos de la
  * variable identity del localStorage
  * Objetivo: Seteo de las variables en json
  ****************************************************************************/
  getToken() {
    // No hace el parse; porque no es Json
    const token = localStorage.getItem('auth_app_token');
    // Pregunta por el valor del Token
    if (token !== 'undefined') {
      this._token = token;
    } else {
      this._token = null;
    }

    return this._token;
  }// FIN | FND-00003


  /****************************************************************************
  * Funcion: FND-00004
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
    } else {
      this._identity = null;
    }

    return this._identity;
  }// FIN | FND-00004

  /****************************************************************************
  * Funcion: FND-00005
  * Fecha: 14-11-2018
  * Descripcion: Metodo para obtener el tiempo que el token expira
  * Objetivo: Obtener el tiempo de expiracion del Token
  ****************************************************************************/
  getTimeExperired() {
    const timeExpired = JSON.parse(localStorage.getItem('timeExpired'));
    // Pregunta por el valor de la timeExpired
    if (timeExpired !== 'undefined') {
      this._timeExpired = timeExpired;
    } else {
      this._timeExpired = null;
    }
    return this._timeExpired;
  }// FIN | FND-00005

}
