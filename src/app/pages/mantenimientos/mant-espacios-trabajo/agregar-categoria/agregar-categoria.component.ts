/**
 * @author David Pavon
 * @returns mantenimiento de tipo de organizacion.
 * @name GrupoTrabajoComponent
 * @alias GrupoTrabajoComponent
 * @version 1.0.0
 *
 */

import { Component, OnInit, Input, ChangeDetectorRef, OnChanges } from '@angular/core';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster'; // Servicio de Notificaciones
import { Router } from '@angular/router';
import {KeyFilterModule} from 'primeng/keyfilter';
import {ToastModule} from 'primeng/toast';
import { TreeNode, MessageService, MenuItem } from 'primeng/primeng';



// model class
// Model of Class
import { AgregarCategoriaModel } from '../../models/agregar.categoria.model';
import { ConfigSmartTableService } from '../../services/agregar-categoria.settings.smart-table.service';
import { CategoriaService } from '../../services/agregar.categoria.service';


@Component({
  selector: 'ngx-agregar-categoria',
  templateUrl: './agregar-categoria.component.html',
  styleUrls: ['./agregar-categoria.component.scss'],
  providers: [ConfigSmartTableService, CategoriaService, KeyFilterModule, ToastModule, MessageService],
})
export class AgregarCategoriaComponent implements OnInit {
  public _CategoriaModel: AgregarCategoriaModel;
  public JsonReceptionPrefiles: any;
  public JsonReceptionTipoPerfiles: any;
  data: any;
  config: ToasterConfig;
  data1: any;
  arrayTipoPerfiles: any

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
    private messageService: MessageService,
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
    this._toasterService.pop(toast);
  } // FIN | showToast

  ngOnInit() {
    this._CategoriaModel = new AgregarCategoriaModel(null,
      true, null, null, null, null, null, null, null, null, null);
    this.listarTipoOrganizacion();
    this.TipoOrganizacion();

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

  /****************************************************************************
* Funcion: perfilesTipoService
* Object Number: 004
* Fecha: 08-01-2019
* Descripcion: Method perfilesTipoService of the Class
* Objetivo: perfilesTipoService detalle de los Tipos de Perfil llamando a la API
****************************************************************************/
  private TipoOrganizacion() {
    this._categoriaService.listAllTipoOrganizaciones().subscribe(
      response => {
        if (response.status !== 200) {
        } else if (response.status === 200) {
          this.JsonReceptionTipoPerfiles = response.data;
          // instancia data con los perfiles;
          this.data1 = this.JsonReceptionTipoPerfiles;
          // Carga los Items para el List de la Smart table
          this.arrayTipoPerfiles = new Array();
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
  * Funcion: newPerfilService
  * Object Number: 003
  * Fecha: 07-01-2019
  * Descripcion: Method newPerfilService
  * Objetivo: crear nuevos perfiles.
  ****************************************************************************/
  private newCategoria() {
    this.validateCtegoria(this._CategoriaModel);
    // Seteo de las variables del Model al json de Java
    this._CategoriaModel.idTipoOrganizacionCat = { idTipoOrganizacion: this._CategoriaModel.idTipoOrganizacion };
    // this.validatePerfiles(this._perfilModel);
    const responsedataExt: any = this.responsedata;

    if (responsedataExt.error === true) {
      this.showToast('error', 'Error al ingresar los datos', responsedataExt.msg);
      return -1;
    }
    // Ejecutamos el Recurso del EndPoint
    this._categoriaService.newCategegoria(this._CategoriaModel).subscribe(
      response => {
        if (response.status !== 200) {
          this.showToast('error', 'Error al Ingresar la Información del Perfil', response.message);
        } else if (response.tatus === 200) {
          // console.log(result.status);
          this.showToast('default', 'de la categoria se ingreso con exito, se ha ingresado con exito', response.message);
          // console.log(response.data);
          // Carga la tabla Nuevamente
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
   * Funcion: upTipoOrganzacion()
   * Object Number: 0003
   * Fecha: 21-01-2019
   * Descripcion: Method updateTipoOganizacion
   * Objetivo: actualizar los Tipo de organizacion existentes perfiles.
   ****************************************************************************/
  private updateCategoria() {
    // Seteo de las variables del Model al json de Java
    const responsedataExt: any = this.responsedata;

    if (responsedataExt === true) {
      this.showToast('error', 'Error al actualizar los cambios', responsedataExt);
      return -1;
    }
    // Ejecutamos el Recurso del EndPoint
    this._categoriaService.CategoriaUpdate(this._CategoriaModel, this._CategoriaModel.idCatOrganizacion).subscribe(
      result => {
        if (result.status !== 200) {
          this.showToast('error', 'Error al actualizar los cambios', JSON.stringify(result.message))
        } else if (result.status === 200) {
          // console.log(result.status);
          this.showToast('success', 'se actualizaron con exito los datos', JSON.stringify(result.message))
          // Carga la tabla Nuevamente
           this.updateCategoria
        }
      },
      error => {
        // Redirecciona al Login
        // alert('Error en la petición de la API ' + <any>error);

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
      // Seteo de las variables del Model al json de Java.
      this._CategoriaModel.acronimoCatOrganizacion = event.newData.acronimoCatOrganizacion;
      this._CategoriaModel.descCatOrganizacion = event.newData.descCatOrganizacion;
      this._CategoriaModel.activo = event.newData.activo;
      this._CategoriaModel.idCatOrganizacion = event.newData.idCatOrganizacion;
      /// setep de variavles realcionadas
      this._CategoriaModel.idTipoOrganizacion = event.newData.descTipoOrganizacion;
      this._CategoriaModel.idTipoOrganizacionCat = { idTipoOrganizacion: this._CategoriaModel.idTipoOrganizacion };
      // this._grupoModel.codTipoOrganizacion = event.newData.codTipoOrganizacion;
      // validamos campos

      if (this.responsedata === true) {
      }
      // Ejecutamos las Funcion
      this.updateCategoria();
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
  private deleteCategoria(): void {
    // Seteo de las variables del Model al json de Java
    const responsedataExt: any = this.responsedata;
    if (responsedataExt === true) {
      this.showToast('error', 'Error al actualizar los cambios', responsedataExt);
    }
    // Ejecutamos el Recurso del EndPoint
    this._categoriaService.categoriaDelete(this._CategoriaModel.idCatOrganizacion).subscribe(
      result => {
        if (result.status !== 200) {
          this.showToast('error', 'Error al actualizar los cambios', JSON.stringify(result.message))
        } else if (result.status === 200) {
          // console.log(result.status);
          this.showToast('success', 'se inhabilito con éxito', JSON.stringify(result.message))
          // Carga la tabla Nuevamente
          // this.perfilesDatailsService();
          this.listarTipoOrganizacion();
        }
      },
      error => {
      },
    );
  } // FIN | ondelete

  /**
     * onDeleteConfirm
     * @param event
     */
  onDeleteConfirm1(event) {
    if (window.confirm('Esta seguro en Inhabilitar este tipo de organizacion?')) {
      this._CategoriaModel.idCatOrganizacion = event.data.idCatOrganizacion;
      // this._perfilModel.idTipo = event.data.idTipoPerfil.idTipo;
      this.deleteCategoria();
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
  private validateCtegoria(_CategoriaModel: any) {
    // seteo el modelo para que los campos sean verificados
    this.responsedata.error = false;
    if (_CategoriaModel.acronimoCatOrganizacion === null || _CategoriaModel.acronimoCatOrganizacion === '') {
      this.responsedata.msg = 'Debes de ingresar un acronimo para la categoria';
      this.responsedata.error = true;
    }  if (_CategoriaModel.codCatOrganizacion === null || _CategoriaModel.codCatOrganizacion === '') {
      this.responsedata.msg = 'Debes ingresar un codigo de la Categoria';
      this.responsedata.error = true;
    }  if (_CategoriaModel.descCatOrganizacion === null || _CategoriaModel.descCatOrganizacion === '') {
      this.responsedata.msg = 'Debes ingresar el nombre de la Categoria';
      this.responsedata.error = true;
    }
    return this.responsedata;
  } // FIN | validateTipoOganizacion(_grupoModel: any)
}
