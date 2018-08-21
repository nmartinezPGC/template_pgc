import { Injectable } from '@angular/core';

// Importamos la Clase base de variables de Entorno
import { SystemPropertiesService } from './system-properties.service'
import { ListEndPointsService } from './list-end-points.service';

// Clase de Propieades Globales de la PGC
@Injectable()
export class SystemEndPointsService extends ListEndPointsService {

  constructor( private _systemPropertiesService: SystemPropertiesService) {
    super();
  }

  // Varibles Gloables de Inicio del Systema
  // private userfindByMail: string = '/usuarios/findByMail/';

  // Indicador del End Point que se Solicita | Modulo y Item
  public indicatorEndPoint: number;

  // Url base de la API
  public urlBaseAPI: string = this._systemPropertiesService.getmethodUrlService();

  /****************************************************
  * Funcion: FND-00001
  * Fecha: 21-08-2018
  * Descripcion: Genera la Url para End Point solicitado
  * Objetivo: Genera Url de los End Points de la API
  *****************************************************/
  getEndPointService( groupEndPoint: string, indicatorEndPointSend: number ) {
    // Instanciamos el Indicador del Entorno de Compilacion
    const indicadorEndPoint: number = indicatorEndPointSend;

    let endPointResult: string;

    // Evalua el caso de la selección del End Point solicitado
    switch ( groupEndPoint ) {
      case 'userGroup':
        switch ( indicadorEndPoint ) {
            case 1: // Llamados a los End Point del Modulo de Usuarios
              endPointResult = this.urlBaseAPI + this.getEndPoint.endPointUsers.findByMail.urlEndPoint;
              break;
          }
        break;
      case 'estadosGroup': // Llamados a los End Point del Modulo de Estados
        switch ( indicadorEndPoint ) {
            case 1:
              endPointResult = this.urlBaseAPI + this.getEndPoint.endPointEstados.listAllEstados.urlEndPoint;
              break;
          }
        break;
    }

    // Retorna el End Point solictado
    return endPointResult;
  } // FIN : 00001

}
