/**
 * @author Edgar Ramirez
 * @returns mantenimientos de usuario
 * @name UsuariosComponent
 * @alias _usuariosComponent
 * @version 1.0.0
 * @fecha 17/01/2019
 */
import { Component, OnInit } from '@angular/core';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster'; // Servicio de Notificaciones

// Services uses of thw Class
import { UsuarioService } from '../../services/usuarios.service';
import { Router } from '@angular/router';

// Model of Class
import { UsuarioModel } from '../../models/usuarios.model';
import { ConfigSmartTableService } from '../../services/usuarios.settings.smart-table.service';
import { ListasComunesService } from '../../../common-list/services/listas-comunes.service';

// Varieble Jquey
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'ngx-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [UsuarioService, ConfigSmartTableService, ListasComunesService],
})
export class UsuariosComponent implements OnInit {

  // Variables Tipo JSON, para usarlas en los Servicios Invocados
  public JsonReceptionUsuarios: any;
  public JsonReceptionTipoUsuarios: any;
  public JsonReceptionEstados: any;
  public JsonReceptionPaises: any;

  // Instacia de la variable del Modelo | Json de Parametros
  public _usuarioModel: UsuarioModel;


  /**
   * Configuracion del Dropdow List
   * Autor: Edgar Ramirez
   * Fecha: 23/01/2019
   */
  dropdownList = [];
  dropdownListPais = [];
  selectedItems = [];
  selectedItemsPais = [];
  dropdownSettings = {};

  /**
     * Smart table Generated
     */
  data: any;
  listArrayData3: any
  data1: any;
  arrayTipoUsuarios: any
  arrayEstados: any

  public onSaveConfirm(id) {
    alert('id selecionado ' + id)
  }

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

  /****************************************************************************
 * Funcion: makeToast
 * Object Number: 001
 * Fecha: 17-01-2019
 * Descripcion: Method makeToast of the Class
 * Objetivo: makeToast in the method header API
 ****************************************************************************/
  makeToast() {
    this.showToast(this.type, this.title, this.content);
    // console.log('Opcion de Toaster 1.3 ' + JSON.stringify(this.content));
  } // FIN | makeToast

  /****************************************************************************
  * Funcion: showToast
  * Object Number: 002
  * Fecha: 17-01-2019
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

  /**
   * Constructor
   * @param _router
   * @param _usuariosService
   */
  constructor(protected _router: Router,
    public _usuariosService: UsuarioService, // Inicializa el ToasterService
    private _toasterService: ToasterService,
    public _configSmartTableService: ConfigSmartTableService, public _listasComunesService: ListasComunesService) {
    // Llamamos a la Funcion de Configuracion de las Smart Table
    this._configSmartTableService.configSmartTable('userSmart', 1, null);
    this.settings = this._configSmartTableService.settings;
    /* Llamado a la Funcion: 007, la cual obtiene el detalle da la Info.
     del Usuario */
    this.usuariosListAllService();
    this.responsedata = { 'error': false, 'msg': 'error campos solicitado' };
  }

  /****************************************************************************
* Funcion: ngOnInit
* Object Number: 003
* Fecha: 17-01-2019
* Descripcion: Method ngOnInit of the Class
* Objetivo: ngOnInit in the method header API
****************************************************************************/
  ngOnInit() {
    // Inicializacion del Modelo de la Clase
    this._usuarioModel = new UsuarioModel(
      0, null, null, null, null,
      null, null, null, null, null, null, null, null, null, null, null, 0, '', null, 0, '', null, 0, '', null, 0, '',
    );
    // inicializar la lista de tipo de perfiles
    this.usuariosTipoService();
    // inicializa la lista de estados del usuario
    this.estadoService();
    // inicializa la lista de paises de la base de datos
    this.paisesAllListService();

    /**
    * Configuracion Inicial del Dropdown List
    * Autor: Edgar RAmirez
    * Fecha: 23/01/2019
    */
    this.selectedItems = [
    ];

    this.selectedItemsPais = [
    ];

    this.dropdownSettings = {
      singleSelection: true,
      text: 'Seleccione una Opción',
      enableSearchFilter: true,
      searchPlaceholderText: 'Buscar Elemento',
      classes: 'comboSea',
      showCheckbox: false,
      lazyLoading: false,
    };

  }


  /* **************************************************************************/
  /* ****************** Funciones Propias de la Clase *************************/

  /****************************************************************************
  * Funcion: usuariosDatailsService
  * Object Number: 004
  * Fecha: 17-01-2019
  * Descripcion: Method usuariosDatailsService of the Class
  * Objetivo: usuariosDatailsService detalle del Perfil llamando a la API
  ****************************************************************************/
  private usuariosListAllService() {
    this._usuariosService.getAllUsuarios().subscribe(
      response => {
        if (response.status !== 200) {
          // console.log(response.status);
          // console.log(response.message);
          this.showToast('error', 'Error al Obtener la Información del Usuario', response.message);
        } else if (response.status === 200) {
          // this.productos = result.data;
          // console.log(result.status);
          this.JsonReceptionUsuarios = response.data;
          this.data = this.JsonReceptionUsuarios;
          // console.log(this.data2);
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
  } // FIN | usuariosDatailsService

  /****************************************************************************
 * Funcion: newUsuarioService
 * Object Number: 005
 * Fecha: 21-01-2019
 * Descripcion: Method newUsuarioService
 * Objetivo: crear nuevos usuarios.
 * Autor: Edgar Ramirez
 ****************************************************************************/
  private newUsuarioService() {
    // Seteo de las variables del Model al json de Java
    this._usuarioModel.idTipoUsuario = { idTipo: this._usuarioModel.idTipo };
    this._usuarioModel.idPaisUsuario = { idPais: this._usuarioModel.idPais };
    this._usuarioModel.idEstadoUsuario = { idEstado: this._usuarioModel.idEstado };
    // this.validateUsuarios(this._usuarioModel);
    const responsedataExt: any = this.responsedata;

    if (responsedataExt.error === true) {
      this.showToast('error', 'Error al ingresar los datos', responsedataExt.msg);
      return -1;
    }
    // Ejecutamos el Recurso del EndPoint
    this._usuariosService.newUsuario(this._usuarioModel).subscribe(
      response => {
        if (response.status !== 200) {
          // console.log(response.status);
          // console.log(response.message);
          this.showToast('error', 'Error al Ingresar la Información del Usuario', response.message);
        } else if (response.status === 200) {
          // console.log(result.status);
          this.showToast('default', 'La Información del Usuario, se ha ingresado con exito', response.message);
          // console.log(response.data);
          // Carga la tabla Nuevamente
          // this.usuariosDatailsService();
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
  } // FIN | newUsuarioService

  /****************************************************************************
 * Funcion: usuariosTipoService
 * Object Number: 006
 * Fecha: 21-01-2019
 * Descripcion: Method usuariosTipoService of the Class
 * Objetivo: usuariosTipoService detalle de los Tipos de usuarios llamando a la API
 * Autor: Edgar Ramirez
 ****************************************************************************/
  private usuariosTipoService() {
    this._usuariosService.getAllTipoUsuario().subscribe(
      response => {
        if (response.status !== 200) {
          // console.log(response.status);
          // console.log(response.message);
          // this.showToast('error', 'Error al Obtener la Información del usuario', response.message);
        } else if (response.status === 200) {
          // this.productos = result.data;
          // console.log(result.status);
          this.JsonReceptionTipoUsuarios = response.data;
          // instancia data con los tipos de usuarios;
          this.data1 = this.JsonReceptionTipoUsuarios;
          // console.log(this.data1);
          // Carga los Items para el List de la Smart table
          this.arrayTipoUsuarios = new Array();

          // this.data1.forEach(element => {
          //   this.arrayTipoUsuarios.push({ title: element['descTipo'], value: element['idTipo'] });
          // });
          // console.log("hola");
          // this.settings.columns.descTipoUsuario.editor.config.list = this.arrayTipoUsuarios;
          // this.settings = Object.assign({}, this.settings);
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
  } // FIN | usuariosTipoService


  /****************************************************************************
 * Funcion: estadoService
 * Object Number: 007
 * Fecha: 22-01-2019
 * Descripcion: Method estadoService of the Class
 * Objetivo: estadoService detalle de los estados del usuario llamando a la API
 * Autor: Edgar Ramirez
 ****************************************************************************/
  private estadoService() {
    const idGroupSen: number = 1;
    this._listasComunesService.getAllEstados(idGroupSen).subscribe(
      response => {
        if (response.status !== 200) {
          // console.log(response.status);
          // console.log(response.message);
          // this.showToast('error', 'Error al Obtener la Información del usuario', response.message);
        } else if (response.status === 200) {
          // this.productos = result.data;
          // console.log(result.status);
          this.JsonReceptionEstados = response.data;
          // console.log(this.JsonReceptionEstados);
          // instancia data con los tipos de usuarios;
          // this.data2 = this.JsonReceptionEstados;
          // console.log(this.data1);
          // Carga los Items para el List de la Smart table
          // this.arrayEstados = new Array();
          // console.log(this.data2);
          // this.data2.forEach(element => {
          //   this.arrayEstados.push({ title: element['descEstado'], value: element['idEstado'] });
          // });
          // console.log("hola");
          // this.settings.columns.descTipoUsuario.editor.config.list = this.arrayTipoUsuarios;
          // this.settings = Object.assign({}, this.settings);
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
  } // FIN | estadoService


  /****************************************************************************
  * Funcion: paisesAllListService
  * Object Number: 008
  * Fecha: 23-01-2019
  * Descripcion: Method paisesAllListService of the Class
  * Objetivo: paisesAllListService listados de los Paises
  * del Formulario de Actividad llamando a la API
  * Autor: Edgar Ramirez
  ****************************************************************************/
  private paisesAllListService() {
    this._listasComunesService.getAllPaises().subscribe(
      result => {
        if (result.status !== 200) {
          // console.log(result.status);
          this.showToast('error', 'Error al Obtener la Información de los Paises', result.message);
        } else if (result.status === 200) {
          this.JsonReceptionPaises = result.data;

          // Setea la Lista del Dropdown List
          this.dropdownListPais = this.JsonReceptionPaises.map((item) => {
            return {
              id: item.idPais,
              itemName: item.descPais,
              iniciales: item.inicialesPais,
            }
          })
        }
      },
      error => {
        // console.log(<any>error);
        this.showToast('error', 'Error al Obtener la Información de los Paises', error);
      },
    );
  } // FIN | paisesAllListService


}
