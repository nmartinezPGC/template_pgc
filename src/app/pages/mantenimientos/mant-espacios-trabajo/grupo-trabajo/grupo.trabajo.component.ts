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
import { GrupoTrabajoModel } from '../../models/grupo.trabajo.model';
import { ConfigSmartTableService } from '../../services/grupo-trabajo.settings.smart-table.service';
import { GrupoTrabajoService } from '../../services/grupo.trabajo.service';

@Component({
  selector: 'ngx-grupo-trabajo',
  templateUrl: './grupo.trabajo.component.html',
  styleUrls: ['./grupo.trabajo.component.scss'],

  providers: [ConfigSmartTableService, GrupoTrabajoService],
})

export class GrupoTrabajoComponent implements OnInit {
  // Instacia de la variable del Modelo | Json de Parametros
  public _grupoModel: GrupoTrabajoModel;
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
    public _tipo: GrupoTrabajoService,
  ) {
    // Llamamos a la Funcion de Configuracion de las Smart Table
    this._configSmartTableService.configSmartTable('userSmart', 1, null);
    this.settings = this._configSmartTableService.settings;
    this.responsedata = { 'error': false, 'msg': 'error campos solicitado' };
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
    this._grupoModel = new GrupoTrabajoModel(
      0, null, null, null,
      true, null, null,
    );
    // inicializar la lista de tipo de perfiles
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
    this._tipo.listAllTipoOrganizaciones().subscribe(
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


  /****************************************************************************
  * Funcion:newTipoOrganizacionnewTipoOrganizacion
  * Object Number: 002
  * Fecha: 21-01-2019
  * Descripcion: Method newTipoOrganizacion
  * Objetivo: crear nuevos tipos de organizacion.
  ****************************************************************************/
  private newTipoOrganizacion() {

    this.validateTipoOganizacion(this._grupoModel);
    const responsedataExt: any = this.responsedata;

    if (responsedataExt.error === true) {
      this.showToast('error', 'Error al ingresar los datos', responsedataExt.msg);
      return -1;
    }
    // Ejecutamos el Recurso del EndPoint
    this._tipo.newTipoOrganizacion(this._grupoModel).subscribe(
      response => {
        if (response.status !== 200) {
          this.showToast('error', 'Error al Ingresar la Información del Perfil', response.message);
        } else if (response.status === 200) {
          this.showToast('default', 'La Información del Tipo de Organozacion, se ha ingresado con exito', response.message);

        }
         // Carga la tabla Nuevamente
        this.listarTipoOrganizacion();
        this.ngOnInit();

      },
      error => {
        // Redirecciona al Login
        alert('Error en la petición de la API ' + <any>error);

      },
    );
  } // FIN | newPerfilService


  /****************************************************************************
   * Funcion: upTipoOrganzacion()
   * Object Number: 0003
   * Fecha: 21-01-2019
   * Descripcion: Method updateTipoOganizacion
   * Objetivo: actualizar los Tipo de organizacion existentes perfiles.
   ****************************************************************************/
  private upTipoOrganzacion() {
    // Seteo de las variables del Model al json de Java
    const responsedataExt: any = this.responsedata;

    if (responsedataExt === true) {
      this.showToast('error', 'Error al actualizar los cambios', responsedataExt);
      return -1;
    }
    // Ejecutamos el Recurso del EndPoint ///update
    this._tipo.tipoOganizacionUpdate(this._grupoModel, this._grupoModel.idTipoOrganizacion).subscribe(
      response => {
        if (response.status !== 200) {
          this.showToast('error', 'Error al actualizar los cambios', response.message);
        } else if (response.status === 200) {
          // console.log(result.status);
          this.showToast('default', 'se actualizaron con exito los datos', response.message);
          // Carga la tabla Nuevamente
          // this.perfilesDatailsService();
          this.listarTipoOrganizacion();
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

  onSaveConfirm1(event) {
    // Confirmacion del Update
    if (window.confirm('seguro que quiere actualizar los cambios?')) {
      // Seteo de las variables del Model al json de Java
      this._grupoModel.acronimoTipoOrganizacion = event.newData.acronimoTipoOrganizacion;
      this._grupoModel.descTipoOrganizacion = event.newData.descTipoOrganizacion;
      this._grupoModel.activo = event.newData.activo;
      this._grupoModel.idTipoOrganizacion = event.newData.idTipoOrganizacion;
      this._grupoModel.codTipoOrganizacion = event.newData.codTipoOrganizacion;
      // validamos campos

      if (this.responsedata === true) {
      }
      // Ejecutamos las Funcion
      this.upTipoOrganzacion();
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }


  /****************************************************************************
* Funcion: deleteTipoOrganizacion();
* Object Number: 0004
* Fecha: 07-01-2019
* Descripcion: inhabilitar los tipo de organizacion
* Objetivo: inhabilitar los tipo de organizacion que estan en la API
****************************************************************************/
  private deleteTipoOrganizacion(): void {
    // Seteo de las variables del Model al json de Java

    // Ejecutamos el Recurso del EndPoint
    this._tipo.organizacionTipodelete(this._grupoModel.idTipoOrganizacion).subscribe(
      response => {
        if (response.status !== 200) {
          this.showToast('error', 'Error al actualizar los cambios', response.message);
        } else if (response.status === 200) {
          this.showToast('default', 'se inhabilito el tipo de organizacion', response.message);
          // Carga la tabla Nuevamente
          // this.perfilesDatailsService();
        }
        this.listarTipoOrganizacion();
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
  } // FIN | ondelete
  /**
   * onDeleteConfirm
   * @param event
   */
  onDeleteConfirm1(event) {
    if (window.confirm('Esta seguro en Inhabilitar este tipo de organizacion?')) {
      this._grupoModel.idTipoOrganizacion = event.data.idTipoOrganizacion;
      // this._perfilModel.idTipo = event.data.idTipoPerfil.idTipo;
      this.deleteTipoOrganizacion();
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  /****************************************************************************
   * Funcion: validateTipoOganizacion(_grupoModel: any)
   * Object Number: 0005
   * Fecha: 22-01-2019
   * Descripcion: Method para validar que los campos esten llenos
   * Objetivo: validatePerfiles  procurar que llegue a la base de datos toda la informacion de tipo de organizacion.
   ****************************************************************************/
  private validateTipoOganizacion(_grupoModel: any) {
    // seteo el modelo para que los campos sean verificados
    this.responsedata.error = false;
    if (_grupoModel.codTipoOrganizacion === null || _grupoModel.codTipoOrganizacion === '') {
      this.responsedata.msg = 'Debes ingresar el codigo de Tipo de prganozacion para continuar';
      this.responsedata.error = true;
    } else if (_grupoModel.descTipoOrganizacion === null || _grupoModel.descTipoOrganizacion === '') {
      this.responsedata.msg = 'Desbes ingresar un nombre de organizacion para continuar';
      this.responsedata = true;
    } else if (_grupoModel.acronimoTipoOrganizacion === null || _grupoModel.acronimoTipoOrganizacion === '') {
      this.responsedata.msg = 'Debes de ingresar un acronimo a la organiacion para continuar';
      this.responsedata = true;
    }
    return this.responsedata;
  } // FIN | validateTipoOganizacion(_grupoModel: any)

   private cleanTipoOrganizacion(){
     this.ngOnInit();

   };

}
