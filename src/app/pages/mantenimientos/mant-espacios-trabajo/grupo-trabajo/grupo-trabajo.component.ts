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
// model class
// Model of Class
import { GrupoTrabajoModel } from '../../models/grupo_trabajo.model';
import { ConfigSmartTableService } from '../../services/grupo-trabajo.settings.smart-table.service';
import { GrupoTrabajoService } from '../../services/grupo_trabajo.service';

@Component({
  selector: 'ngx-grupo-trabajo',
  templateUrl: './grupo-trabajo.component.html',
  styleUrls: ['./grupo-trabajo.component.scss'],

  providers: [ConfigSmartTableService, GrupoTrabajoService],
})

export class GrupoTrabajoComponent implements OnInit {
  // Instacia de la variable del Modelo | Json de Parametros
  public _Grupo: GrupoTrabajoModel;
  public JsonReceptionPrefiles: any;
  public JsonReceptionTipoPerfiles: any;
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
    public _configSmartTableService: ConfigSmartTableService,
    public _tipo: GrupoTrabajoService ) {
    // Llamamos a la Funcion de Configuracion de las Smart Table
    this._configSmartTableService.configSmartTable('userSmart', 1, null);
    this.settings = this._configSmartTableService.settings;
    //  this.listarTipoOrganizacion();
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
    // Inicializacion del Modelo de la Clase
    this._Grupo = new GrupoTrabajoModel(
      0, null, null, null,
      null,
    );
    // inicializar la lista de tipo de perfiles
    this.listarTipoOrganizacion();
  }
  /* **************************************************************************/
  /* ****************** Funciones Propias de la Clase *************************/

  /****************************************************************************
  * Funcion: perfilesDatailsService
  * Object Number: 001
  * Fecha: 07-01-2019
  * Descripcion: Method perfilesDatailsService of the Class
  * Objetivo: perfilesDatailsService detalle del Perfil llamando a la API
  ****************************************************************************/
  private listarTipoOrganizacion() {
    this._tipo.listAllTipoOrganizaciones().subscribe(
      response => {
        if (response.status !== 200) {
          // console.log(response.status);
          // console.log(response.message);
          this.showToast('error', 'Error al Obtener la Información del Perfil', response.message);
        } else if (response.status === 200) {
          // this.productos = result.data;
          //  console.log(response.status);
          this.JsonReceptionPrefiles = response.data;
          this.data = this.JsonReceptionPrefiles;
          // console.log(this.data);
        }
      },
      error => {
        // Redirecciona al Login
        alert('Error en la petición de la API ' + <any>error);

        // Borramos los datos del LocalStorage
        localStorage.removeItem('auth_app_token');
        localStorage.removeItem('identity');

        const redirect = '/auth/login';
        setTimeout(() => {
          // Iniciativa Temporal
          location.reload();
          return this._router.navigateByUrl(redirect);
        }, 2000);
      },
    );
  } // FIN | perfilesDatailsService

}
