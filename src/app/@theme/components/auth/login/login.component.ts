/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS, NbAuthSocialLink } from '../../../../../../node_modules/@nebular/auth/auth.options';
import { getDeepFromObject } from '../../../../../../node_modules/@nebular/auth/helpers';

import { NbAuthService } from '../../../../../../node_modules/@nebular/auth/services/auth.service';
import { NbAuthResult } from '../../../../../../node_modules/@nebular/auth/services/auth-result';

@Component({
  selector: 'ngx-login',
  template: `
    <nb-auth-block>
      <h2 class="title">Plataforma de Gestión de la Cooperación | PGC</h2>
      <small class="form-text sub-title">Hola! resgitrate con tu email</small>
      <form (ngSubmit)="login()" #form="ngForm" autocomplete="nope">
        <div *ngIf="showMessages.error && errors && errors.length > 0 && !submitted"
             class="alert alert-danger" role="alert">
          <div><strong>Oh snap!</strong></div>
          <div *ngFor="let error of errors">{{ error }}</div>
        </div>
        <div *ngIf="showMessages.success && messages && messages.length > 0 && !submitted"
             class="alert alert-success" role="alert">
          <div><strong>Hooray!</strong></div>
          <div *ngFor="let message of messages">{{ message }}</div>
        </div>
        <div class="form-group">
          <label for="input-email" class="sr-only">Email address</label>
          <input name="emailUsuario" [(ngModel)]="user.emailUsuario" id="input-email" pattern=".+@.+\..+"
                 class="form-control" placeholder="Ingresa el Email" #emailUsuario="ngModel"
                 [class.form-control-danger]="emailUsuario.invalid && emailUsuario.touched" autofocus
                 [required]="getConfigValue('forms.validation.email.required')">
          <small class="form-text error" *ngIf="emailUsuario.invalid && emailUsuario.touched &&
            emailUsuario.errors?.required">
            Email es requerido!
          </small>
          <small class="form-text error"
                 *ngIf="emailUsuario.invalid && emailUsuario.touched && emailUsuario.errors?.pattern">
            Ingresa un Email real!
          </small>
        </div>
        <div class="form-group">
          <label for="input-password" class="sr-only">Password</label>
          <input name="passwordUsuario" [(ngModel)]="user.passwordUsuario" type="password" id="input-password"
                 class="form-control" placeholder="Ingresa el Password" #passwordUsuario="ngModel"
                 [class.form-control-danger]="passwordUsuario.invalid && passwordUsuario.touched"
                 [required]="getConfigValue('forms.validation.password.required')"
                 [minlength]="getConfigValue('forms.validation.password.minLength')"
                 [maxlength]="getConfigValue('forms.validation.password.maxLength')">
          <small class="form-text error" *ngIf="passwordUsuario.invalid && passwordUsuario.touched &&
              passwordUsuario.errors?.required">
            Password es requerido!
          </small>
          <small
            class="form-text error"
            *ngIf="passwordUsuario.invalid && passwordUsuario.touched && (passwordUsuario.errors?.minlength ||
                passwordUsuario.errors?.maxlength)">
            Password debe contener
            almenos {{ getConfigValue('forms.validation.password.minLength') }}
            a {{ getConfigValue('forms.validation.password.maxLength') }}
            caracteres
          </small>
        </div>
        <div class="form-group accept-group col-sm-12">
          <nb-checkbox name="rememberMe" [(ngModel)]="user.rememberMe" >Recuerdame</nb-checkbox>
          <a class="forgot-password" routerLink="../request-password">Olvidaste el Password?</a>
        </div>
        <button [disabled]="submitted || !form.valid" class="btn btn-block btn-hero-success"
                [class.btn-pulse]="submitted">
          Ingresar
        </button>
      </form>
      <div class="links">
        <ng-container *ngIf="socialLinks && socialLinks.length > 0">
          <small class="form-text">Or connect with:</small>
          <div class="socials">
            <ng-container *ngFor="let socialLink of socialLinks">
              <a *ngIf="socialLink.link"
                 [routerLink]="socialLink.link"
                 [attr.target]="socialLink.target"
                 [attr.class]="socialLink.icon"
                 [class.with-icon]="socialLink.icon">{{ socialLink.title }}</a>
              <a *ngIf="socialLink.url"
                 [attr.href]="socialLink.url"
                 [attr.target]="socialLink.target"
                 [attr.class]="socialLink.icon"
                 [class.with-icon]="socialLink.icon">{{ socialLink.title }}</a>
            </ng-container>
          </div>
        </ng-container>
        <small class="form-text">
          No tiene una cuenta aún? <a routerLink="../register"><strong>Nuevo Registro</strong></a>
        </small>
      </div>
    </nb-auth-block>
  `,
})
export class NgxLoginComponent {

  // Variables de la Clase
  msgErrorApi:string[];
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
              protected router: Router) {

    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.strategy = this.getConfigValue('forms.login.strategy');
    this.socialLinks = this.getConfigValue('forms.login.socialLinks');
  }


  /****************************************************************************
  * Funcion: FND-00001
  * Fecha: 30-06-2018
  * Descripcion: Metodo Ajax, para Invocar el servicio
  * a la API (login).
  * Objetivo: Logearse a la Aplicacion
  ****************************************************************************/
  login(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    // Convertimos la Informacion para enviarla a la API
    this.jsonUser = JSON.stringify( this.user );

    // console.log( jsonUser );

    this.service.authenticate( this.strategy, this.jsonUser ).subscribe(( result: NbAuthResult ) => {
      this.submitted = false;

      if (result.isSuccess()) {
        this.messages = result.getMessages();
      }else {
        this.msgErrorApi = [ result.getResponse().error.message ];

        this.errors = this.msgErrorApi;
      }

      const redirect = result.getRedirect();

      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
    },
  );
  } // FIN | FND-00001


  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
