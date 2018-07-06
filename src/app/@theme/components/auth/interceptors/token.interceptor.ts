import { Injectable } from '@angular/core';

// Imports las Librerias nesesarias para las escuchas
import {
  HttpRequest,
  HttpHandler,
  // HttpEvent,
  HttpInterceptor,
 } from '@angular/common/http'

 import { AuthService } from '../auth.service';
 // import { Observable } from 'rxjs/observable';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(public auth: AuthService) {  }


  /****************************************************************************
  * Funcion: FND-00001
  * Fecha: 05-07-2018
  * Descripcion: Metodo para Insertar en el Header la Authorization del Token
  * Objetivo: Seteo de las variables en el Headers
  ****************************************************************************/
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const newRequest = req.clone({
      headers: req.headers.set (
        'Authorization', `Bearer ${this.auth.getToken()}`),
    });

    // console.log(newRequest);
    return next.handle(newRequest);
  }// FIN | FND-00001

}
