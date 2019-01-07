
import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';

// Clases nesesarias para el envio via Ajax
import {HttpClient, HttpHeaders } from '@angular/common/http';
// import { catchError } from 'rxjs/operators';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';

// Importamos la Clase de las Propiedades del Sistema
import { SystemPropertiesService } from '../../shared/system-properties.service';
import { SystemEndPointsService } from '../../shared/system-end-points.service';

let counter = 0;

@Injectable()
export class UserService {

  public users = {
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

  public tokenHeader = this._systemPropertiesService.getIdentity().token;
  public usernameHeader = this._systemPropertiesService.getIdentity().userName;
  // httpOptions = new HttpHeaders();

  public headers = new HttpHeaders();


  /****************************************************************************
  * Funcion: FND-00001
  * Fecha: 01-06-2018
  * Descripcion: Metodo para obtener los Datos de la
  * variable identity del localStorage
  * Objetivo: Seteo de las variables en json
  ****************************************************************************/
  constructor( private _http: HttpClient,
    private _systemEndPointsService: SystemEndPointsService,
    private _systemPropertiesService: SystemPropertiesService ) {
    // Instanciamos la Url de la API
    // this._url = this._systemProperties.getmethodUrlService();

    // Seteo de los Headers
    this.headers = new HttpHeaders({'Content-Type': 'application/json',
                                    'Authorization': this.tokenHeader, 'Access-Control-Allow-Origin': '*' });
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
  * Fecha: 04-07-2018
  * Descripcion: Metodo para obtener los Datos del Usuario
  * Objetivo: datos generales del Usuario
  * Params: { userName }
  ****************************************************************************/
  getUserDetails( user_to_name ): Observable<any> {
    // Email del Usuario que se logea
    const paramsU = user_to_name;
    // Retorno de la Funcion
    return this._http.get(this._systemEndPointsService.getEndPointService( 'userGroup', 1) + paramsU, { headers: this.headers,
                        params: {'tokenApi': this.tokenHeader } } );
  }// FIN | FND-00001

}
