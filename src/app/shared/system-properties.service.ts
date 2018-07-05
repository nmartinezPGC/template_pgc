import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';

// Clase de Propieades Globales de la PGC
@Injectable()
export class SystemPropertiesService {
  // Declaracion de las variables del Service
  public progressBar;

  constructor() {}

  // Varibles Gloables de Inicio del Systema
  // Entorno Localhost
  public urlLocalConfig: string = 'http://localhost:8090/rest';
  // public urlLocalConfig:string = "/rest";
  public urlLocalResourse: string = 'http://localhost:8090/rest';
  // public urlLocalResourse:string = "/rest";

  // Entorno de Servidor
  public urlServerConfig: string = 'http://172.17.0.250:8090/rest';
  public urlServerResourse: string = 'http://172.17.0.250:8090/rest';

  // Indicador del entorno a Copilar | 1 = Server | 2 = Localhost
  public indicatorIPCompiler: number = 2;

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
    if ( indicadorIp === 1 ) {
      urlEnviroment = this.urlServerConfig;
    }else if ( indicadorIp === 2 ) {
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
    if ( indicadorIp === 1 ) {
      urlEnviromentResourse = this.urlServerResourse;
    }else if ( indicadorIp === 2 ) {
      urlEnviromentResourse = this.urlLocalResourse;
    }

    return urlEnviromentResourse;
  } // FIN : 00002

}
