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
import { AgregarCategoriaModel } from '../../models/agregar.categoria.model';
import { ConfigSmartTableService } from '../../services/grupo-trabajo.settings.smart-table.service';
import { CategoriaService } from '../../services/agregar.categoria.service';

@Component({
  selector: 'ngx-agregar-categoria',
  templateUrl: './agregar-categoria.component.html',
  styleUrls: ['./agregar-categoria.component.scss'],
  providers: [ConfigSmartTableService, CategoriaService],
})
export class AgregarCategoriaComponent implements OnInit {
  public _CategoriaModel: AgregarCategoriaModel;
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
    public _categoriaService: CategoriaService) {
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
    this._CategoriaModel = new AgregarCategoriaModel(null,
      null, null, null, null, null, null, null, null, null,
    );
    this.listarTipoOrganizacion();
  }
  /* **************************************************************************/
  /* ****************** Funciones Propias de la Clase *************************/

  /****************************************************************************
  * Funcion: listarTipoOrganizacion();
  * Object Number: 001
  * Fecha: 21-01-2019
  * Descripcion: Metodo para listar los tipos de perfiles.
  * Objetivo: llamar todos los tipo de organizaciones.
  ****************************************************************************/
  private listarTipoOrganizacion() {
    this._categoriaService.listAllCategoria().subscribe(
      response => {
        if (response.status !== 200) {
          this.showToast('error', 'Error al Obtener la Información del Perfil', response.message);
        } else if (response.status === 200) {
          this.JsonReceptionPrefiles = response.data;
          this.data = this.JsonReceptionPrefiles;
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
  } // FIN | listarTipoOrganizacion();
}
