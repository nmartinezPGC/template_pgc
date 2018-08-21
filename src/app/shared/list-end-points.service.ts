import { Injectable } from '@angular/core';
 
// Clase de Propieades Globales de la PGC
@Injectable()
export class ListEndPointsService {
  
  constructor() {}

  // Listado de los End Point que seran usados en la API ********************************
  // Modulo de Estados
  private estadosEndPoint: string = '/usuarios/findByMail/';
  
  // Modulo de Usuarios sss
  private suserfindByMail: string = '/usuarios/findByMail/';

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
  };

}
