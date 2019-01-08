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

/**
 * Generated Component
 */
@Component({
  selector: 'ngx-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.scss'],
  styles: [`
  nb-card {
    transform: translate3d(0, 0, 0);
  }
`],
  providers: [PerfilService],
})
export class PerfilesComponent implements OnInit {
  // Variables Tipo JSON, para usarlas en los Servicios Invocados
  public JsonReceptionPrefiles: any;

  // Instacia de la variable del Modelo | Json de Parametros
  public _perfilModel: PerfilModel;

  /**
   * Smart table Generated
   */
  data: any;

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      idPerfil: {
        title: 'Codigo de Perfil',
        type: 'number',
      },
      codPerfil: {
        title: 'Perfil',
        type: 'string',
      },
      descPerfil: {
        title: 'Descripcion de Perfil',
        type: 'string',
      },
    },
  };

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


  /**
   * Constructor
   * @param _router
   * @param _perfilesService
   */
  constructor(protected _router: Router,
    public _perfilesService: PerfilService,// Inicializa el ToasterService
    private _toasterService: ToasterService) {
    /* Llamado a la Funcion: 007, la cual obtiene el detalle da la Info.
     del Usuario */
    this.perfilesDatailsService();
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
      null, null, null
    );
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
        } else if (response.status == 200) {
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
  } // FIN | userDatailsService


  /**
   * onDeleteConfirm
   * @param event
   */
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }


  /****************************************************************************
   * Funcion: newPerfilService
   * Object Number: 002
   * Fecha: 07-01-2019
   * Descripcion: Method newPerfilService
   * Objetivo: crear nuevos perfiles.
   ****************************************************************************/
  private newPerfilService(): void {
    // Seteo de las variables del Model al json de Java
    this._perfilModel.idTipoPerfil = { idTipo: this._perfilModel.idTipo };

    // Ejecutamos el Recurso del EndPoint
    this._perfilesService.newPerfil(this._perfilModel).subscribe(
      response => {
        if (response.status !== 200) {
          // console.log(response.status);
          // console.log(response.message);
          this.showToast('error', 'Error al Ingresar la Información del Perfil', response.message);
        } else if (response.status == 200) {
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

}
