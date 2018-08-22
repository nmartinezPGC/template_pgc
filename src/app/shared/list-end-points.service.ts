import { Injectable } from '@angular/core';

// Clase de Propieades Globales de la PGC
@Injectable()
export class ListEndPointsService {

  constructor() {}

  // Listado de los End Point que seran usados en la API ********************************
  // Json de los End Points de la API disponibles
  getEndPoint = {
    endPointEstados: {
      listAllEstados: {
        id: 1,
        nameEndpoint: 'ListAllEstados',
        urlEndPoint: '/estados',
        groupEndPoint: 'estadosGroup',
        descEndPoint: 'Busca todos los Estados de la API',
      },
    },
    endPointUsers: {
      findByMail: {
        id: 1,
        nameEndpoint: 'findByMail',
        urlEndPoint: '/usuarios/findByMail/',
        groupEndPoint: 'userGroup',
        descEndPoint: 'Busca el Usuario con el Email, de parametro',
      },
    },
    endPointMantActividades: {
      listAllSectorEjecutor: {
        id: 1,
        nameEndpoint: 'ListAllSectoresEjecutores',
        urlEndPoint: '/mant-actividades/sector-ejecutor',
        groupEndPoint: 'matActGroup',
        descEndPoint: 'Busca el listado de los Sectores Ejecutores de la Actividad',
      },
      getSectorEjecutor: {
        id: 2,
        nameEndpoint: 'getSectorEjecutor',
        urlEndPoint: '/mant-actividades/sector-ejecutor/findById/',
        groupEndPoint: 'matActGroup',
        descEndPoint: 'Busca el Sectores Ejecutor de la Actividad',
      },
      listAllEstrategia: {
        id: 3,
        nameEndpoint: 'ListAllSEstrategia',
        urlEndPoint: '/mant-actividades/estrategia',
        groupEndPoint: 'matActGroup',
        descEndPoint: 'Busca el listado de los Sectores Ejecutores de la Actividad',
      },
      getEstrategia: {
        id: 4,
        nameEndpoint: 'getEstrategia',
        urlEndPoint: '/mant-actividades/estrategia/findById/',
        groupEndPoint: 'matActGroup',
        descEndPoint: 'Busca el Sectores Ejecutor de la Actividad',
      },
      listAllPresupuesto: {
        id: 5,
        nameEndpoint: 'listAllPresupuesto',
        urlEndPoint: '/mant-actividades/presupuesto',
        groupEndPoint: 'matActGroup',
        descEndPoint: 'Busca el listado de los Presupuesto de la Actividad',
      },
      getPresupuesto: {
        id: 6,
        nameEndpoint: 'getPresupuesto',
        urlEndPoint: '/mant-actividades/presupuesto/findById/',
        groupEndPoint: 'matActGroup',
        descEndPoint: 'Busca el Presupuesto de la Actividad',
      },
    },
  };

}
