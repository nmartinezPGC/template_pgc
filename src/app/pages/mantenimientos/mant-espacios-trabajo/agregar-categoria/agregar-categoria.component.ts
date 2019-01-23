/**
 * @author David Pavon
 * @returns mantenimiento de tipo de organizacion.
 * @name GrupoTrabajoComponent
 * @alias GrupoTrabajoComponent
 * @version 1.0.0
 *
 */

import { Component, OnInit } from '@angular/core';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster'; // Servicio de Notificaciones
import { Router } from '@angular/router';
import { ConfigSmartTableService } from '../../services/grupo-trabajo.settings.smart-table.service';

@Component({
  selector: 'ngx-agregar-categoria',
  templateUrl: './agregar-categoria.component.html',
  styleUrls: ['./agregar-categoria.component.scss'],
  providers: [ConfigSmartTableService],
})
export class AgregarCategoriaComponent implements OnInit {
  data: any;
  config: ToasterConfig;

  position = 'toast-bottom-full-width';
  animationType = 'slideDown';
  title = 'Se ha grabado la Información! ';
  content = 'los cambios han sido grabados temporalmente, en la PGC!';
  timeout = 10000;
  toastsLimit = 5;
  type = 'default';

  isNewestOnTop = true;
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;
  settings: any;
  public responsedata: any;

  constructor(protected _router: Router, private _toasterService: ToasterService,
    public _configSmartTableService: ConfigSmartTableService) {
    this._configSmartTableService.configSmartTable('userSmart', 1, null);
    this.settings = this._configSmartTableService.settings;
    this.responsedata = { 'error': false, 'msg': 'error campos solicitado' };
  }
   /****************************************************************************
* Funcion: makeToast
* Object Number: 003
* Fecha: 16-08-2018
* Descripcion: Method makeToast of the Class
* Objetivo: makeToast in the method header API
****************************************************************************/
makeToast() {
  this.showToast(this.type, this.title, this.content);
  // console.log('Opcion de Toaster 1.3 ' + JSON.stringify(this.content));
} // FIN | makeToast

/****************************************************************************
  * Funcion: showToast
  * Object Number: 004
  * Fecha: 16-08-2018
  * Descripcion: Method showToast of the Class
  * Objetivo: showToast in the method header API
  ****************************************************************************/
 private showToast(type: string, title: string, body: string) {
  this.config = new ToasterConfig({
    positionClass: this.position,
    timeout: this.timeout,
    newestOnTop: this.isNewestOnTop,
    tapToDismiss: this.isHideOnClick,
    preventDuplicates: this.isDuplicatesPrevented,
    animation: this.animationType,
    limit: this.toastsLimit,
  });
  const toast: Toast = {
    type: type,
    title: title,
    body: body,
    timeout: this.timeout,
    showCloseButton: this.isCloseButton,
    bodyOutputType: BodyOutputType.TrustedHtml,
  };
  // this._toasterService.popAsync(toast);
  this._toasterService.pop(toast);
} // FIN | showToast

  ngOnInit() {
  }

}
