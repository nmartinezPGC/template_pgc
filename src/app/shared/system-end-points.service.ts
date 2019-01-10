import { Injectable } from '@angular/core';

// Importamos la Clase base de variables de Entorno
import { SystemPropertiesService } from './system-properties.service'
import { ListEndPointsService } from './list-end-points.service';

// Clase de Propieades Globales de la PGC
@Injectable()
export class SystemEndPointsService extends ListEndPointsService {

  constructor(private _systemPropertiesService: SystemPropertiesService) {
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
  getEndPointService(groupEndPoint: string, indicatorEndPointSend: number) {
    // Instanciamos el Indicador del Entorno de Compilacion
    const indicadorEndPoint: number = indicatorEndPointSend;

    let endPointResult: string;

    // Evalua el caso de la selección del End Point solicitado
    switch (groupEndPoint) {
      case 'userGroup':
        switch (indicadorEndPoint) {
          case 1: // Llamados a los End Point del Modulo de Usuarios
            endPointResult = this.urlBaseAPI + this.getEndPoint.endPointUsers.findByMail.urlEndPoint;
            break;
        }
        break;
      case 'estadosGroup': // Llamados a los End Point del Modulo de Estados
        switch (indicadorEndPoint) {
          case 1:
            endPointResult = this.urlBaseAPI + this.getEndPoint.endPointEstados.listAllEstados.urlEndPoint;
            break;
          case 2:
            endPointResult = this.urlBaseAPI + this.getEndPoint.endPointEstados.listAllEstadosActividades.urlEndPoint;
            break;
        }
        break;
      case 'matActGroup': // Llamados a los End Point del Modulo de Mantenimientos de Activdades
        switch (indicadorEndPoint) {
          case 1: // Sectores Ejecutores
            endPointResult = this.urlBaseAPI + this.getEndPoint.endPointMantActividades.listAllSectorEjecutor.urlEndPoint;
            break;
          case 2:
            endPointResult = this.urlBaseAPI + this.getEndPoint.endPointMantActividades.getSectorEjecutor.urlEndPoint;
            break;
          case 3: // Estrategias
            endPointResult = this.urlBaseAPI + this.getEndPoint.endPointMantActividades.listAllEstrategia.urlEndPoint;
            break;
          case 4:
            endPointResult = this.urlBaseAPI + this.getEndPoint.endPointMantActividades.getEstrategia.urlEndPoint;
            break;
          case 5: // Presupuesto
            endPointResult = this.urlBaseAPI + this.getEndPoint.endPointMantActividades.listAllPresupuesto.urlEndPoint;
            break;
          case 6:
            endPointResult = this.urlBaseAPI + this.getEndPoint.endPointMantActividades.getPresupuesto.urlEndPoint;
            break;
        }
        break;
      case 'espacioTrabajoGroup': // Llamados a los End Point del Espacios de Trabajo
        switch (indicadorEndPoint) {
          case 1:
            endPointResult = this.urlBaseAPI + this.getEndPoint.endPointEspaciosTrabajo.listAllEspaciosTrabajo.urlEndPoint;
            break;
          case 2:
            endPointResult = this.urlBaseAPI + this.getEndPoint.endPointEspaciosTrabajo.findByIdEspacioTrabajo.urlEndPoint;
            break;
          case 3:
            endPointResult = this.urlBaseAPI + this.getEndPoint.endPointEspaciosTrabajo.newEspacioTrabajo.urlEndPoint;
            break;
        }
        break;
      case 'espacioTrabajoUsuarioGroup': // Llamados a los EndPoint del Espacios de Trabajo Asignados a los Usuarios
        switch (indicadorEndPoint) {
          case 1:
            endPointResult = this.urlBaseAPI + this.getEndPoint.endPointEspaciosTrabajoUsuarios.listAllEspaciosTrabajoUsuarios.urlEndPoint;
            break;
          case 2:
            endPointResult = this.urlBaseAPI + this.getEndPoint.endPointEspaciosTrabajoUsuarios.findByIdEspacioTrabajoUsuarios.urlEndPoint;
            break;
          case 3:
            endPointResult = this.urlBaseAPI + this.getEndPoint.endPointEspaciosTrabajoUsuarios.newEspacioTrabajoUsuarios.urlEndPoint;
            break;
        }
        break;
      case 'organizacionesGroup': // Llamados a los EndPoint de Organizaciones
        switch (indicadorEndPoint) {
          case 1: // Organizaciones
            endPointResult = this.urlBaseAPI + this.getEndPoint.endPointOrganizaciones.listAllTipoOrganizaciones.urlEndPoint;
            break;
          case 2:
            endPointResult = this.urlBaseAPI + this.getEndPoint.endPointOrganizaciones.findByIdTipoOrganizacion.urlEndPoint;
            break;
          case 3:
            endPointResult = this.urlBaseAPI + this.getEndPoint.endPointOrganizaciones.newTipoOrganizacion.urlEndPoint;
            break;
          case 4:
            endPointResult = this.urlBaseAPI + this.getEndPoint.endPointOrganizaciones.listAllOrganizaciones.urlEndPoint;
            break;
          case 5:
            endPointResult = this.urlBaseAPI + this.getEndPoint.endPointOrganizaciones.findByIdOrganizacion.urlEndPoint;
            break;
          case 6:
            endPointResult = this.urlBaseAPI + this.getEndPoint.endPointOrganizaciones.findByIdTipoOrganizacionT.urlEndPoint;
            break;
          case 7:
            endPointResult = this.urlBaseAPI + this.getEndPoint.endPointOrganizaciones.findByIdTipoPaisOrganizacion.urlEndPoint;
            break;
          case 8:
            endPointResult = this.urlBaseAPI + this.getEndPoint.endPointOrganizaciones.newOrganizacion.urlEndPoint;
            break;
          case 9:
            endPointResult = this.urlBaseAPI + this.getEndPoint.endPointOrganizaciones.findByIdPaisOrganizacion.urlEndPoint;
            break;
          case 10:
            endPointResult = this.urlBaseAPI + this.getEndPoint.endPointOrganizaciones.findByCodOrganizacion.urlEndPoint;
            break;
          case 11:
            endPointResult = this.urlBaseAPI + this.getEndPoint.endPointOrganizaciones.countByCodOrganizacion.urlEndPoint;
            break;
        }
        break;
      case 'mantGenericosGroup': // Llamados a los EndPoint de Mantenimientos Genericos
        switch (indicadorEndPoint) {
          case 1:
            endPointResult = this.urlBaseAPI + this.getEndPoint.endPointMantGenericos.listAllPaises.urlEndPoint;
            break;
          case 2:
            endPointResult = this.urlBaseAPI + this.getEndPoint.endPointMantGenericos.findByIdTipoOrganizacion.urlEndPoint;
            break;
          case 3:
            endPointResult = this.urlBaseAPI + this.getEndPoint.endPointMantGenericos.newTipoOrganizacion.urlEndPoint;
            break;
          case 4:
            endPointResult = this.urlBaseAPI + this.getEndPoint.endPointMantGenericos.listAllPerfiles.urlEndPoint;
            break;
          case 5:
            endPointResult = this.urlBaseAPI + this.getEndPoint.endPointMantGenericos.newPerfil.urlEndPoint;
            break;
          case 6:
            endPointResult = this.urlBaseAPI + this.getEndPoint.endPointMantGenericos.getAllTipoPerfil.urlEndPoint;
            break;
        }
        break;
      case 'idInternaGroup': // Llamados a los EndPoint de Id Internas de los Proyectos
        switch (indicadorEndPoint) {
          case 1:
            endPointResult = this.urlBaseAPI + this.getEndPoint.endPointIdInternasActividades.listAllidInternas.urlEndPoint;
            break;
          case 2:
            endPointResult = this.urlBaseAPI + this.getEndPoint.endPointIdInternasActividades.countByCodInterna.urlEndPoint;
            break;
          case 3:
            endPointResult = this.urlBaseAPI + this.getEndPoint.endPointIdInternasActividades.countByCodInterna.urlEndPoint;
            break;
        }
        break;
    }

    // Retorna el End Point solictado
    return endPointResult;
  } // FIN : 00001

}
