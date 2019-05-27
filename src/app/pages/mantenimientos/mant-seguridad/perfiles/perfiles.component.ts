/**
 * @author David Pavon
 * @returns mantenimiento de perfiles
 * @name PerfilesComponent
 * @alias _perfilesComponent
 * @version 1.0.0
 *
 */
import { Component, OnInit } from '@angular/core';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster'; // Servicio de Notificaciones

// Services uses of thw Class
import { PerfilService } from '../../services/perfiles.service';
import { Router } from '@angular/router';

// Model of Class
import { PerfilModel } from '../../models/perfiles.model';
import { ConfigSmartTableService } from '../../services/perfiles.settings.smart-table.service';


/**
 * Generated Component
 */
@Component({
  selector: 'ngx-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.scss'],

  providers: [PerfilService, ConfigSmartTableService],
})
export class PerfilesComponent implements OnInit {
  // Variables Tipo JSON, para usarlas en los Servicios Invocados
  public JsonReceptionPrefiles: any;
  public JsonReceptionTipoPerfiles: any;

  // Instacia de la variable del Modelo | Json de Parametros
  public _perfilModel: PerfilModel;

  /**
   * Smart table Generated
   */
  data: any;
  listArrayData3: any
  data1: any;
  arrayTipoPerfiles: any

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


  /**
   * Constructor
   * @param _router
   * @param _perfilesService
   */
  constructor(protected _router: Router,
    public _perfilesService: PerfilService, // Inicializa el ToasterService
    private _toasterService: ToasterService,
    public _configSmartTableService: ConfigSmartTableService) {
    // Llamamos a la Funcion de Configuracion de las Smart Table
    this._configSmartTableService.configSmartTable('userSmart', 1, null);
    this.settings = this._configSmartTableService.settings;
    /* Llamado a la Funcion: 007, la cual obtiene el detalle da la Info.
     del Usuario */
    this.perfilesDatailsService();
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

  /****************************************************************************
  * Funcion: ngOnInit
  * Object Number: 002
  * Fecha: 16-08-2018
  * Descripcion: Method ngOnInit of the Class
  * Objetivo: ngOnInit in the method header API
  ****************************************************************************/
  ngOnInit() {
    // Inicializacion del Modelo de la Clase
    this._perfilModel = new PerfilModel(
      0, null, null, null,
      null, 0, '',
    );
    // inicializar la lista de tipo de perfiles
    this.perfilesTipoService();
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
  private perfilesDatailsService() {
    this._perfilesService.getAllPerfiles().subscribe(
      response => {
        if (response.status !== 200) {
          // console.log(response.status);
          // console.log(response.message);
          this.showToast('error', 'Error al Obtener la Información del Perfil', response.message);
        } else if (response.status === 200) {
          // this.productos = result.data;
          // console.log(result.status);
          this.JsonReceptionPrefiles = response.data;
          this.data = this.JsonReceptionPrefiles;
          // console.log(response.data);
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


  /**
   * onDeleteConfirm
   * @param event
   */
  onDeleteConfirm(event) {
    if (window.confirm('Esta seguro en Inhabilitar este perfil?')) {
      this._perfilModel.idPerfil = event.data.idPerfil;
      this._perfilModel.idTipo = event.data.idTipoPerfil.idTipo;
      this.deleteperfil();
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm1(event) {
    // Confirmacion del Update
    if (window.confirm('seguro que quiere actualizar los cambios?')) {
      // Seteo de las variables del Model al json de Java
      this._perfilModel.idPerfil = event.newData.idPerfil;
      this._perfilModel.idTipoPerfil = event.newData.idTipoPerfil;
      this._perfilModel.idTipo = event.newData.idTipoPerfil.idTipo;
      this._perfilModel.codPerfil = event.newData.codPerfil;
      this._perfilModel.descPerfil = event.newData.descPerfil;
      this._perfilModel.estadoPerfil = event.newData.activado;
      // this._perfilModel.descripcionTipoPerfil = event.newData.descripcionTipoPerfil;
      this._perfilModel.idTipo = event.newData.descripcionTipoPerfil;
      this._perfilModel.idTipoPerfil = { idTipo: this._perfilModel.idTipo };
      // validamos campos

      if (this.responsedata.error === true) {

      }
      // console.log('Tipo de Perfil ' + JSON.stringify(this._perfilModel));
      // Ejecutamos las Funcion
      this.updatePerfilService();
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }


  /****************************************************************************
   * Funcion: updatePerfilService
   * Object Number: 002
   * Fecha: 07-01-2019
   * Descripcion: Method newPerfilService
   * Objetivo: actualizar los perfiles existentes perfiles.
   ****************************************************************************/
  private updatePerfilService() {
    // Seteo de las variables del Model al json de Java
    this.validatePerfiles(this._perfilModel);
    const responsedataExt: any = this.responsedata;

    if (responsedataExt.error === true) {
      this.showToast('error', 'Error al actualizar los cambios', responsedataExt);
      return -1;
    }
    // Ejecutamos el Recurso del EndPoint
    this._perfilesService.perfilUpdate(this._perfilModel, this._perfilModel.idPerfil).subscribe(
      response => {
        if (response.status !== 200) {
          // console.log(response.status);
          // console.log(response.message);
          this.showToast('error', 'Error al actualizar los cambios', response.message);
        } else if (response.status === 200) {
          // console.log(result.status);
          this.showToast('default', 'se actualizaron con exito los datos', response.message);
          // console.log(response.data);
          // Carga la tabla Nuevamente
          this.perfilesDatailsService();
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
  } // FIN | newPerfilService

  /****************************************************************************
 * Funcion: deleteperfil
 * Object Number: 002
 * Fecha: 07-01-2019
 * Descripcion: Method newPerfilService
 * Objetivo: actualizar los perfiles existentes perfiles.
 ****************************************************************************/
  private deleteperfil(): void {
    // Seteo de las variables del Model al json de Java

    // Ejecutamos el Recurso del EndPoint
    this._perfilesService.perfildelete(this._perfilModel.idPerfil).subscribe(
      response => {
        if (response.status !== 200) {
          // console.log(response.status);
          // console.log(response.message);
          this.showToast('error', 'Error al actualizar los cambios', response.message);
        } else if (response.status === 200) {
          // console.log(result.status);
          this.showToast('default', 'se actualizaron con exito los datos', response.message);
          // console.log(response.data);
          // Carga la tabla Nuevamente
          this.perfilesDatailsService();
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
  } // FIN | newPerfilService

  /****************************************************************************
 * Funcion: newPerfilService
 * Object Number: 003
 * Fecha: 07-01-2019
 * Descripcion: Method newPerfilService
 * Objetivo: crear nuevos perfiles.
 ****************************************************************************/
  private newPerfilService() {
    // Seteo de las variables del Model al json de Java
    this._perfilModel.idTipoPerfil = { idTipo: this._perfilModel.idTipo };
    this.validatePerfiles(this._perfilModel);
    const responsedataExt: any = this.responsedata;

    if (responsedataExt.error === true) {
      this.showToast('error', 'Error al ingresar los datos', responsedataExt.msg);
      return -1;
    }
    // Ejecutamos el Recurso del EndPoint
    this._perfilesService.newPerfil(this._perfilModel).subscribe(
      response => {
        if (response.status !== 200) {
          // console.log(response.status);
          // console.log(response.message);
          this.showToast('error', 'Error al Ingresar la Información del Perfil', response.message);
        } else if (response.status === 200) {
          // console.log(result.status);
          this.showToast('default', 'La Información del Perfil, se ha ingresado con exito', response.message);
          // console.log(response.data);
          // Carga la tabla Nuevamente
          this.perfilesDatailsService();
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
  } // FIN | newPerfilService

  /****************************************************************************
 * Funcion: perfilesTipoService
 * Object Number: 004
 * Fecha: 08-01-2019
 * Descripcion: Method perfilesTipoService of the Class
 * Objetivo: perfilesTipoService detalle de los Tipos de Perfil llamando a la API
 ****************************************************************************/
  private perfilesTipoService() {
    this._perfilesService.getAllTipoPerfiles().subscribe(
      response => {
        if (response.status !== 200) {
          // console.log(response.status);
          // console.log(response.message);
          // this.showToast('error', 'Error al Obtener la Información del Perfil', response.message);
        } else if (response.status === 200) {
          // this.productos = result.data;
          // console.log(result.status);
          this.JsonReceptionTipoPerfiles = response.data;
          // instancia data con los perfiles;
          this.data1 = this.JsonReceptionTipoPerfiles;
          // console.log(this.data1);
          // Carga los Items para el List de la Smart table
          this.arrayTipoPerfiles = new Array();

          this.data1.forEach(element => {
            this.arrayTipoPerfiles.push({ title: element['descTipo'], value: element['idTipo'] });
          });

          this.settings.columns.descripcionTipoPerfil.editor.config.list = this.arrayTipoPerfiles;
          this.settings = Object.assign({}, this.settings);
          // console.log(response.data);
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
  } // FIN | perfilesTipoService


  /****************************************************************************
   * Funcion: validatePerfiles
   * Object Number: 006
   * Fecha: 16-01-2019
   * Descripcion: Method para validar que los campos esten llenos
   * Objetivo: validatePerfiles  procurrar que llegue a la base de datos toda la informacion de perfiles
   ****************************************************************************/
  private validatePerfiles(perfilModelIn: any) {
    // seteo el modelo para que los campos sean verificados
    this.responsedata.error = false;
    if (perfilModelIn.codPerfil === null || perfilModelIn.codPerfil === '') {
      this.responsedata.msg = 'Debes ingresar el codigo de perfil para continuar';
      this.responsedata.error = true;
    } else if (perfilModelIn.descPerfil === null || perfilModelIn.descPerfil === '') {
      this.responsedata.msg = 'Debes de ingresar una descripcion de este perfil';
      this.responsedata.error = true;
    }
    return this.responsedata;
  } // FIN | perfilesTipoService
}
