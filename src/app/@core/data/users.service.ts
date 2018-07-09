
import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';

// Clases nesesarias para el envio via Ajax
import {HttpClient, HttpHeaders } from '@angular/common/http';
// import { catchError } from 'rxjs/operators';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';

// Importamos la Clase de las Propiedades del Sistema
// import { SystemPropertiesService } from '../../shared/system-properties.service';

let counter = 0;

/*const httpOptions = {
  headers: new HttpHeaders({
    // 'Content-Type':  'application/json',
    'Authorization': 'Bearer NAM',
    'Content-Type': 'application/x-www-form-urlencoded',
  }),
};*/

@Injectable()
export class UserService {

  private users = {
    nick: { name: 'Nick Jones', picture: 'assets/images/nick.png' },
    eva: { name: 'Eva Moor', picture: 'assets/images/eva.png' },
    jack: { name: 'Jack Williams', picture: 'assets/images/jack.png' },
    lee: { name: 'Lee Wong', picture: 'assets/images/lee.png' },
    alan: { name: 'Alan Thompson', picture: 'assets/images/alan.png' },
    kate: { name: 'Kate Martinez', picture: 'assets/images/kate.png' },
  };

  private userArray: any[];

  // Variables de la Ruta de la API
  public _url: string;
  public _urlResourses: string;

  // Variables para el localStorage
  public _identity;
  public _token;

  tokenHeader = this.getIdentity().token;
  // httpOptions = new HttpHeaders();

  /****************************************************************************
  * Funcion: FND-00001
  * Fecha: 01-06-2018
  * Descripcion: Metodo para obtener los Datos de la
  * variable identity del localStorage
  * Objetivo: Seteo de las variables en json
  ****************************************************************************/
  constructor( private _http: HttpClient ) {
     // this.httpOptions.set('Access-Control-Allow-Origin', '*');
    // this.httpOptions.set('Content-Type', 'application/json');
    // this.httpOptions.append('Authorization', 'Bearer ' + this.tokenHeader );
    // this.userArray = Object.values(this.users);
    // this.httpOptions.keys();
    // this._url = this._systemPropertiesService.getmethodUrlService();
    // this._urlResourses = this._systemPropertiesService.getmethodUrlResourses();
  }// FIN | Constructor


  getUsers(): Observable<any> {
    return observableOf(this.users);
  }

  getUserArray(): Observable<any[]> {
    return observableOf(this.userArray);
  }

  getUser(): Observable<any> {
    counter = (counter + 1) % this.userArray.length;
    return observableOf(this.userArray[counter]);
  }


  /****************************************************************************
  * Funcion: FND-00001
  * Fecha: 01-06-2018
  * Descripcion: Metodo para obtener los Datos de la
  * variable identity del localStorage
  * Objetivo: Seteo de las variables en json
  ****************************************************************************/
  getToken() {
    // No hace el parse; porque no es Json
    const token = localStorage.getItem('auth_app_token');
    // Pregunta por el valor del Token
    if ( token !== 'undefined' ) {
      this._token = token;
    } else {
      this._token = null;
    }

    return this._token;
  }// FIN | FND-00001


  /****************************************************************************
  * Funcion: FND-00002
  * Fecha: 01-06-2018
  * Descripcion: Metodo para obtener los Datos de la
  * variable identity del localStorage
  * Objetivo: Seteo de las variables en json
  ****************************************************************************/
  getIdentity() {
    const identity = JSON.parse(localStorage.getItem('identity'));
    // Pregunta por el valor de la identity
    if ( identity !== 'undefined' ) {
      this._identity = identity;
    } else {
      this._identity = null;
    }

    return this._identity;
  }// FIN | FND-00002


  /****************************************************************************
  * Funcion: FND-00003
  * Fecha: 04-07-2018
  * Descripcion: Metodo para obtener los Datos de la los datos del Usuario
  * Objetivo: datos generales del Usuario
  * Params: { userName }
  ****************************************************************************/
  getUserDetails( user_to_name ): Observable<any> {
    // const json = JSON.stringify( user_to_name );
    const params = user_to_name;

    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.tokenHeader, 'Nahum': '1212121' });

   // console.log(headers);
   // console.log('Paso 1 por getUserDetails');

    return this._http.get('http://localhost:8090/rest/usuarios/user/mail/' + params, { headers: headers } );
    // return this._http.get('http://localhost:8090/rest/usuarios/user/mail/' + params ) ;
  }// FIN | FND-00003

}
