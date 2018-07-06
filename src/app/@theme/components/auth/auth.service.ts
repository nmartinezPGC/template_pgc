import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  // Variables para el localStorage
  public _identity;
  public _token;

  /****************************************************************************
  * Funcion: FND-00001
  * Fecha: 01-06-2018
  * Descripcion: Metodo para obtener los Datos de la
  * variable identity del localStorage
  * Objetivo: Seteo de las variables en json
  ****************************************************************************/
  constructor() {
    // Constantes de la Libreria
    const helper = new JwtHelperService();
   }


  /****************************************************************************
  * Funcion: FND-00002
  * Fecha: 01-06-2018
  * Descripcion: Metodo para obtener los Datos de la
  * variable identity del localStorage
  * Objetivo: Seteo de las variables en json
  ****************************************************************************/
   public getToken(): string {
    const identity = JSON.parse(localStorage.getItem('identity'));
    // Pregunta por el valor de la identity
    if ( identity !== 'undefined' ) {
      this._identity = identity;
    } else {
      this._identity = null;
    }

    return this._identity.token;
   }// FIN | FND-00002


   public isAuthenticated(): boolean {
     // get the token
     const token = this.getToken();

     // return a boolean reflecting
     // whether or not the token is expired
     return true;
   }

}// FIN | Servicio Auth
