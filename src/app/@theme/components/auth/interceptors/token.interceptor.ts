import { Injectable } from '@angular/core';

// Imports las Librerias nesesarias para las escuchas
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent,
  // HttpHeaders,
 } from '@angular/common/http'

import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/observable';
// import { Location } from '@angular/common';
import 'rxjs/add/observable/fromPromise';


@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(public auth: AuthService) {  }


  /****************************************************************************
  * Funcion: FND-00001
  * Fecha: 05-07-2018
  * Descripcion: Metodo para Insertar en el Header la Authorization del Token
  * Objetivo: Seteo de las variables en el Headers
  ****************************************************************************/
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newRequest = req.clone({
      headers: req.headers.set (
        'Authorization', `Bearer ${this.auth.getToken()}`),
    });

    // console.log(newRequest);
    return next.handle(newRequest);
    // return Observable.fromPromise(this.handleAccess(req, next));
  }// FIN | FND-00001


  /*private async handleAccess(request: HttpRequest<any>, next: HttpHandler):
  Promise<HttpEvent<any>> {
    // console.log('Datos de la Funcion handleAccess');
    const token = await this.auth.getToken();

    let changedRequest = request;

    // HttpHeader object immutable - copy values
    const headersSettings: {[name: string]: string | string[]; } = {};
    for (const key of request.headers.keys()) {
      headersSettings[key] = request.headers.getAll(key);
    }

    if (token) {
      headersSettings['Authorization'] = 'Bearer ' + token;
    }

    headersSettings['Content-Type'] = 'application/json';

    const newHeader = new HttpHeaders(headersSettings);

    changedRequest = request.clone({
      headers: newHeader,
    });

    return next.handle(changedRequest).toPromise();
  }*/

}
