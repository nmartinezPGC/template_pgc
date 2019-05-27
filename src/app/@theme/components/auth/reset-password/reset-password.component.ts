	/**
   * @author Jorge Escamilla
   * @returns componente de reset-password
   * @name ComponentReset-password
   * @alias _serviceRequest-passwordPublicasService
   * @version 1.0.0
   * @fecha 06-05-2019
   */
import { Component, OnInit } from '@angular/core';
import { ResetPasswordService } from '../services/reset-password.service';
//import { Component, OnInit } from '@angular/core';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster'; // Servicio de Notificaciones
import { Router } from '@angular/router';
// model class
// Model of Class
//import { GrupoTrabajoModel } from '../pages/manteniminetos/models/usuarios.';
import { UsuarioModel } from '../../../../pages/mantenimientos/models/usuarios.model';
//import { ConfigSmartTableService } from '../../services/grupo-trabajo.settings.smart-table.service';
//import { GrupoTrabajoService } from '../../services/grupo.trabajo.service';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public _grupoModel: UsuarioModel ;
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
    //public _configSmartTableService: ConfigSmartTableService,
    public _tipo: ResetPasswordService,
  ) {
    // Llamamos a la Funcion de Configuracion de las Smart Table
    //this._configSmartTableService.configSmartTable('userSmart', 1, null);
    //this.settings = this._configSmartTableService.settings;
    //this.responsedata = { 'error': false, 'msg': 'error campos solicitado' };
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

  /****************************************************************************
   * Funcion: upTipoOrganzacion()
   * Object Number: 0003
   * Fecha: 21-01-2019
   * Descripcion: Method updateTipoOganizacion
   * Objetivo: actualizar los Tipo de organizacion existentes perfiles.
   ****************************************************************************/
  private UPrestpassword() {
    // Seteo de las variables del Model al json de Java
    const responsedataExt: any = this.responsedata;

    if (responsedataExt === true) {
      this.showToast('error', 'Error al actualizar los cambios', responsedataExt);
      return -1;
    }
    // Ejecutamos el Recurso del EndPoint ///update
    this._tipo.resetpassword(this._grupoModel, this._grupoModel.idUsuario).subscribe(
      response => {
        if (response.status !== 200) {
          this.showToast('error', 'Error al actualizar los cambios', response.message);
        } else if (response.status === 200) {
          // console.log(result.status);
          this.showToast('default', 'se actualizaron con exito los datos', response.message);
          // Carga la tabla Nuevamente
          // this.perfilesDatailsService();
        }
      },
      error => {
        // Redirecciona al Login
        alert('Error en la petición de la API ' + <any>error);

        // Borramos los datos del LocalStorage
        /*localStorage.removeItem('auth_app_token');
        localStorage.removeItem('identity');

        const redirect = '/auth/login';
        setTimeout(() => {
          // Iniciativa Temporal
          location.reload();
          return this._router.navigateByUrl(redirect);
        }, 2000);*/
      },
    );
  } // FIN | upTipoOrganzacion()


  ngOnInit() {
  }

}
