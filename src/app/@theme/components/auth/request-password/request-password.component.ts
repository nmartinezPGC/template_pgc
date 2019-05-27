import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NB_AUTH_OPTIONS, NbAuthSocialLink } from '../../../../../../node_modules/@nebular/auth/auth.options';
import { getDeepFromObject } from '../../../../../../node_modules/@nebular/auth/helpers';

import { NbAuthService } from '../../../../../../node_modules/@nebular/auth/services/auth.service';
import { NbAuthResult } from '../../../../../../node_modules/@nebular/auth/services/auth-result';

@Component({
  selector: 'ngx-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.scss'],
})
export class RequestPasswordComponent {
// Variables de la Clase
  msgErrorApi: string[];
  jsonUser;

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  socialLinks: NbAuthSocialLink[] = [];

  constructor(protected service: NbAuthService,

              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected router: Router,
              private _route: ActivatedRoute) {

   // this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.strategy = this.getConfigValue('forms.login.strategy');
    // this.socialLinks = this.getConfigValue('forms.login.socialLinks');

    // Variables de paso para el logout
  }
  /****************************************************************************
  * Funcion: FND-00001
  * Fecha: 30-06-2018
  * Descripcion: Metodo Ajax, para Invocar el servicio
  * a la API (login).
  * Objetivo: Logearse a la Aplicacion
  ****************************************************************************/
  requestpassword(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    // Convertimos la Informacion para enviarla a la API
    this.jsonUser = JSON.stringify( this.user );

    // console.log( jsonUser );

    this.service.authenticate( this.strategy, this.jsonUser ).subscribe(( result: NbAuthResult ) => {
      this.submitted = false;

      if (result.isSuccess()) {
        this.messages = result.getMessages();

        const identity = result.getResponse().body;

        // Generamos la nueva variable LocalStorage
        localStorage.setItem('identity', JSON.stringify(identity));

      }else {
        this.msgErrorApi = [ result.getResponse().error.message ];

        this.errors = this.msgErrorApi;
      }


    },
  );
  } // FIN | FND-00001
 getConfigValue(key: string): any {
 return getDeepFromObject(this.options, key, null);
  }
}
