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
import { delay } from 'q';

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
  public JsonReceptionCatOrganizacion: any;
  public JsonReceptionTipoOrganizacion: any;
  public JsonReceptionOrganizacion: any;

  public JsonReceptionCategoriasOrganizacion: any;
  protected JsonReceptionPaisOrganizacionesData: any;
  protected JsonReceptionTipoPaisOrganizacionesData: any;

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
  data2: any;
  data3: any;
  data4: any;
  data5: any;
  data6: any;
  arrayTipoUsuarios: any
  arrayEstados: any
  arrayPaises: any
  arrayCatOrg: any
  arrayTipoOrganizacion: any
  arrayOrganizacion: any
  responseStatus: number

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
    this._configSmartTableService.configSmartTable('userSmart', 1, null, null, null, null, null, null);
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
      true, null, null, null, null,
      null, null, null, null, null, null, /* comienza los campos relacion */ null, 0, '', null, 0, '', null, 0, '', null, 0, '', null, 0, '', null, 0, '', /* datos del usuario */ 0, null, null, null, null, null, null, 1);
    // inicializar la lista de tipo de perfiles
    this.usuariosTipoService();
    // inicializa la lista de estados del usuario
    this.estadoService();
    // inicializa la lista de paises de la base de datos
    this.paisesAllListService();
    // inicializa la lista de categoria de organizaciones
    this.categoriaOrganizacionService();
    // inicializa la lista de tipo de organizacion
    this.TipoOrganizacionService();
    // inicializa la lista de organizaciones
    this.OrganizacionService();


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
  } // FIN | usuariosDatailsService

  /****************************************************************************
 * Funcion: newUsuarioService
 * Object Number: 005
 * Fecha: 21-01-2019
 * Descripcion: Method newUsuarioService
 * Objetivo: crear nuevos usuarios.
 * Autor: Edgar Ramirez
 ****************************************************************************/
  async newUsuarioService() {
    // Seteo de las variables del Model al json de Java
    this._usuarioModel.idTipoUsuario = { idTipo: this._usuarioModel.idTipo };
    this._usuarioModel.idPaisUsuario = { idPais: this._usuarioModel.idPais };
    this._usuarioModel.idEstadoUsuario = { idEstado: this._usuarioModel.idEstado };
    this._usuarioModel.idTipoOrganizacionUsuario = { idTipoOrganizacion: this._usuarioModel.idTipoOrganizacion };
    this._usuarioModel.idCatOrganizacionUsuario = { idCatOrganizacion: this._usuarioModel.idCatOrganizacion };
    this._usuarioModel.idOrganizacionUsuario = { idOrganizacion: this._usuarioModel.idOrganizacion };
    this.validateUsuarios(this._usuarioModel);

    const responsedataExt: any = this.responsedata;
    // console.log(this._usuarioModel);

    if (responsedataExt.error === true) {
      this.showToast('error', 'Error al ingresar los datos', responsedataExt.msg);
      return -1;
    }

    this.usuariosCodValidate();

    await delay(100);

    if (this.responseStatus === 200) {
      this.showToast('error', 'Error ya existe el codigo del usuario', 'Intente con Otro');
      return -1;
    }

    this.mailValidate();

    await delay(100);

    if (this.responseStatus === 200) {
      this.showToast('error', 'Error ya existe el email del usuario', 'Intente con Otro');
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
        }
      },
      error => {
        // Redirecciona al Login
        // alert('Error en la petición de la API ' + <any>error);
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

          this.data1.forEach(element => {
            this.arrayTipoUsuarios.push({ title: element['descTipo'], value: element['idTipo'] });
          });
          // console.log(this.arrayTipoUsuarios);
          this.settings.columns.idTipo.editor.config.list = this.arrayTipoUsuarios;
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
          this.data2 = this.JsonReceptionEstados;
          // Carga los Items para el List de la Smart table
          this.arrayEstados = new Array();
          this.data2.forEach(element => {
            this.arrayEstados.push({ title: element['descEstado'], value: element['idEstado'] });
          });
          this.settings.columns.idEstado.editor.config.list = this.arrayEstados;
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

          this.data3 = this.JsonReceptionPaises;
          this.arrayPaises = new Array();

          this.data3.forEach(element => {
            this.arrayPaises.push({ title: element['descPais'], value: element['idPais'] });
          });

          this.settings.columns.idPais.editor.config.list = this.arrayPaises;
          this.settings = Object.assign({}, this.settings);

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


  /****************************************************************************
  * Funcion: OnItemDeSelect
  * Object Number: 009
  * Fecha: 24-01-2019
  * Descripcion: Method para Seleccionar Items de Pais para usarlo usuarios
  * Objetivo: enviar al Json de ID'Intermas la información que ocupa la API
  * Autor: Edgar Ramirez
  ****************************************************************************/
  onItemSelectPais(item: any) {
    // Asignamos el Pais seleccionado
    this._usuarioModel.idPais = item.id;
    // console.log(this._usuarioModel.idPais);
    // this.inicialesPais = item.iniciales;

  } // FIN | OnItemDeSelect


  /* **************************************************************************/
  /* ****************** Funciones Propias de la Clase *************************/

  /****************************************************************************
  * Funcion: usuariosDatailsService
  * Object Number: 010
  * Fecha: 29-01-2019
  * Descripcion: Method usuariosDatailsService of the Class
  * Objetivo: usuariosDatailsService detalle del Usuario llamando a la API
  * Autor: Edgar Ramirez
  ****************************************************************************/
  private usuariosDatailsService() {
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
  } // FIN | usuariosDatailsService


  /****************************************************************************
 * Funcion: updateUsuarioService
 * Object Number: 011
 * Fecha: 29-01-2019
 * Descripcion: Method updateUsuarioService
 * Objetivo: actualizar los usuarios existentes.
 * Autor: Edgar Ramirez
 ****************************************************************************/
  private updateUsuarioService() {
    // Seteo de las variables del Model al json de Java
    this.validateUsuarios(this._usuarioModel);
    const responsedataExt: any = this.responsedata;

    if (responsedataExt.error === true) {
      this.showToast('error', 'Error al actualizar los cambios', responsedataExt);
      return -1;
    }
    // Ejecutamos el Recurso del EndPoint
    this._usuariosService.usuarioUpdate(this._usuarioModel, this._usuarioModel.idUsuario).subscribe(
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
          this.usuariosDatailsService();
        }
      },
      error => {
      },
    );
  } // FIN | updateUsuarioService


  onSaveConfirm1(event) {
    // Confirmacion del Update
    if (window.confirm('seguro que quiere actualizar los cambios?')) {
      // console.log(event.newData);
      // Seteo de las variables del Model al json de Java
      this._usuarioModel.idUsuario = event.newData.idUsuario;

      this._usuarioModel.activo = event.newData.activo;
      this._usuarioModel.apellido1Usuario = event.newData.apellido1Usuario;
      this._usuarioModel.apellido2Usuario = event.newData.apellido2Usuario;
      this._usuarioModel.codUsuario = event.newData.codUsuario;
      this._usuarioModel.direccion = event.newData.direccion;

      this._usuarioModel.idEstado = event.newData.idEstado;
      this._usuarioModel.idEstadoUsuario = { idEstado: this._usuarioModel.idEstado };

      this._usuarioModel.idPais = event.newData.idPais;
      this._usuarioModel.idPaisUsuario = { idPais: this._usuarioModel.idPais };

      this._usuarioModel.idTipo = event.newData.idTipo;
      this._usuarioModel.idTipoUsuario = { idTipo: this._usuarioModel.idTipo };

      this._usuarioModel.idTipoOrganizacion = event.newData.idTipoOrganizacion;
      this._usuarioModel.idTipoOrganizacionUsuario = { idTipoOrganizacion: this._usuarioModel.idTipoOrganizacion };

      this._usuarioModel.idCatOrganizacion = event.newData.idCatOrganizacion;
      this._usuarioModel.idCatOrganizacionUsuario = { idCatOrganizacion: this._usuarioModel.idCatOrganizacion };

      this._usuarioModel.idOrganizacion = event.newData.idOrganizacion;
      this._usuarioModel.idOrganizacionUsuario = { idOrganizacion: this._usuarioModel.idOrganizacion };

      this._usuarioModel.inicialesUsuario = event.newData.inicialesUsuario;
      this._usuarioModel.nombre1Usuario = event.newData.nombre1Usuario;
      this._usuarioModel.nombre2Usuario = event.newData.nombre2Usuario;

      // validamos campos

      if (this.responsedata.error === true) {

      }
      // console.log('Tipo de Perfil ' + JSON.stringify(this._perfilModel));
      // Ejecutamos las Funcion
      this.updateUsuarioService();
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  } // fin de onSaveConfirm1


  /**
 * onDeleteConfirm
 * @param event
 */
  onDeleteConfirm(event) {
    if (window.confirm('Esta seguro en Inhabilitar este usuario?')) {
      this._usuarioModel.idUsuario = event.data.idUsuario;

      this.deleteUsuario();
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }


  /****************************************************************************
 * Funcion: usuariosCodValidate
 * Object Number: 012
 * Fecha: 31-01-2019
 * Descripcion: Method usuariosCodValidate of the Class
 * Objetivo: usuariosCodValidate detalle de los codigos de usuario llamando a la API
 * Autor: Edgar Ramirez
 ****************************************************************************/
  private usuariosCodValidate() {
    // console.log('Entro a la Funcion');
    this._usuariosService.usuarioValidate(this._usuarioModel.codUsuario).subscribe(
      response => {

        if (response.status !== 200) {
          // console.log(response.status);
          // console.log("ingreso con exito");
          this.responseStatus = 0;
          // this.showToast('error', 'Error al Obtener la Información del usuario', response.message);
        } else if (response.status === 200) {
          // console.log("el codigo ya existe " + JSON.stringify( response));
          this.responseStatus = response.status;
          // console.log(this.responseStatus);
        }
      },
      error => {
        // Redirecciona al Login
        alert('Error en la petición de la API ' + <any>error);
      },
    );
    return this.responseStatus;
  } // FIN | usuariosCodValidate


  /****************************************************************************
* Funcion: mailValidate
* Object Number: 013
* Fecha: 31-01-2019
* Descripcion: Method mailValidate of the Class
* Objetivo: mailValidate detalle de los codigos de usuario llamando a la API
* Autor: Edgar Ramirez
****************************************************************************/
  private mailValidate() {
    // console.log('Entro a la Funcion');
    this._usuariosService.mailValidate(this._usuarioModel.emailUsuario).subscribe(
      response => {

        if (response.status !== 200) {
          this.responseStatus = 0;

        } else if (response.status === 200) {
          this.responseStatus = response.status;
        }
      },
      error => {
        // Redirecciona al Login
        alert('Error en la petición de la API ' + <any>error);
      },
    );
    return this.responseStatus;
  } // FIN | mailValidate


  /****************************************************************************
 * Funcion: validateUsuarios
 * Object Number: 014
 * Fecha: 31-01-2019
 * Descripcion: Method para validar que los campos esten llenos
 * Objetivo: validateUsuarios  procurar que llegue a la base de datos toda la informacion de usuarios
 ****************************************************************************/
  private validateUsuarios(usuarioModelIn: any) {
    // seteo el modelo para que los campos sean verificados
    this.responsedata.error = false;
    if (usuarioModelIn.nombre1Usuario === null || usuarioModelIn.nombre1Usuario === '') {
      this.responsedata.msg = 'Debes ingresar el primer nombre del usuario';
      this.responsedata.error = true;
    } else if (usuarioModelIn.nombre2Usuario === null || usuarioModelIn.nombre2Usuario === '') {
      this.responsedata.msg = 'Desbes ingresar el segundo nombre del usuario';
      this.responsedata = true;
    } else if (usuarioModelIn.apellido1Usuario === null || usuarioModelIn.apellido1Usuario === '') {
      this.responsedata.msg = 'Debes ingresar el primer apellido del usuario';
      this.responsedata = true;
    } else if (usuarioModelIn.apellido2Usuario === null || usuarioModelIn.apellido2Usuario === '') {
      this.responsedata.msg = 'Debes ingresar el segundo apellido del usuario';
      this.responsedata = true;
    } else if (usuarioModelIn.inicialesUsuario === null || usuarioModelIn.inicialesUsuario === '') {
      this.responsedata.msg = 'Debes ingresar las iniciales del usuario';
      this.responsedata = true;
    } else if (usuarioModelIn.codUsuario === null || usuarioModelIn.codUsuario === '') {
      this.responsedata.msg = 'Debes ingresar el codigo del usuario';
      this.responsedata = true;
    } else if (usuarioModelIn.emailUsuario === null || usuarioModelIn.emailUsuario === '') {
      this.responsedata.msg = 'Debes ingresar el email del usuario';
      this.responsedata = true;
    } else if (usuarioModelIn.direccion === null || usuarioModelIn.direccion === '') {
      this.responsedata.msg = 'Debes ingresar la direccion del usuario';
      this.responsedata = true;
    } else if (usuarioModelIn.passwordUsuario === null || usuarioModelIn.passwordUsuario === '') {
      this.responsedata.msg = 'Debes ingresar el segundo apellido del usuario';
      this.responsedata = true;
    } else if (usuarioModelIn.descPais === null || usuarioModelIn.descPais === '') {
      this.responsedata.msg = 'Debes ingresar el pais del usuario';
      this.responsedata = true;
    } else if (usuarioModelIn.descEstado === null || usuarioModelIn.descEstado === '') {
      this.responsedata.msg = 'Debes ingresar el estado del usuario';
      this.responsedata = true;
    } else if (usuarioModelIn.descTipo === null || usuarioModelIn.descTipo === '') {
      this.responsedata.msg = 'Debes ingresar el tipo de perfil del usuario';
      this.responsedata = true;
    } else if (usuarioModelIn.descTipoOrganizacion === null || usuarioModelIn.descTipoOrganizacion === '') {
      this.responsedata.msg = 'Debes ingresar el tipo de organizacion del usuario';
      this.responsedata = true;
    } else if (usuarioModelIn.descCatOrganizacion === null || usuarioModelIn.descCatOrganizacion === '') {
      this.responsedata.msg = 'Debes ingresar la categoria de la organizacion del usuario';
      this.responsedata = true;
    } else if (usuarioModelIn.descOrganizacion === null || usuarioModelIn.descOrganizacion === '') {
      this.responsedata.msg = 'Debes ingresar la organizacion del usuario';
      this.responsedata = true;
    }
    return this.responsedata;
  } // FIN | validateUsuarios


  /****************************************************************************
* Funcion: deleteUsuario
* Object Number: 015
* Fecha: 01-02-2019
* Descripcion: Method deleteUsuario
* Objetivo: actualizar los usuarios existentes.
****************************************************************************/
  private deleteUsuario(): void {
    // Seteo de las variables del Model al json de Java

    // Ejecutamos el Recurso del EndPoint
    this._usuariosService.usuariodelete(this._usuarioModel.idUsuario).subscribe(
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
          this.usuariosDatailsService();
        }
      },
      error => {
        // Redirecciona al Login
        alert('Error en la petición de la API ' + <any>error);
      },
    );
  } // FIN | deleteUsuario

  /****************************************************************************
 * Funcion: categoriaOrganizacionService
 * Object Number: 016
 * Fecha: 12-02-2019
 * Descripcion: Method categoriaOrganizacionService of the Class
 * Objetivo: categoriaOrganizacionService detalle de las categoria de la organizacion llamando a la API
 * Autor: Edgar Ramirez
 ****************************************************************************/
  private categoriaOrganizacionService() {
    this._usuariosService.listAllCategoria().subscribe(
      response => {
        if (response.status !== 200) {
          // console.log(response.status);
          // console.log(response.message);
          // this.showToast('error', 'Error al Obtener la Información del usuario', response.message);
        } else if (response.status === 200) {
          this.JsonReceptionCatOrganizacion = response.data;
          // instancia data con los tipos de usuarios;
          this.data5 = this.JsonReceptionCatOrganizacion;
          // Carga los Items para el List de la Smart table
          this.arrayCatOrg = new Array();

          this.data5.forEach(element => {
            this.arrayCatOrg.push({ title: element['descCatOrganizacion'], value: element['idCatOrganizacion'] });
          });
          this.settings.columns.idCatOrganizacion.editor.config.list = this.arrayCatOrg;
          this.settings = Object.assign({}, this.settings);
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
  } // FIN | categoriaOrganizacionService


  /****************************************************************************
 * Funcion: TipoOrganizacionService
 * Object Number: 017
 * Fecha: 12-02-2019
 * Descripcion: Method TipoOrganizacionService of the Class
 * Objetivo: TipoOrganizacionService detalle de los Tipos de organizacion llamando a la API
 * Autor: Edgar Ramirez
 ****************************************************************************/
  private TipoOrganizacionService() {
    this._usuariosService.listAllTipoOrganizaciones().subscribe(
      response => {
        if (response.status !== 200) {
          // console.log(response.status);
          // console.log(response.message);
          // this.showToast('error', 'Error al Obtener la Información del usuario', response.message);
        } else if (response.status === 200) {
          this.JsonReceptionTipoOrganizacion = response.data;
          // instancia data con los tipos de usuarios;
          this.data4 = this.JsonReceptionTipoOrganizacion;
          // Carga los Items para el List de la Smart table
          this.arrayTipoOrganizacion = new Array();

          this.data4.forEach(element => {
            this.arrayTipoOrganizacion.push({ title: element['descTipoOrganizacion'], value: element['idTipoOrganizacion'] });
          });
          this.settings.columns.idTipoOrganizacion.editor.config.list = this.arrayTipoOrganizacion;
          this.settings = Object.assign({}, this.settings);
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
  } // FIN | TipoOrganizacionService


  /****************************************************************************
 * Funcion: OrganizacionService
 * Object Number: 017
 * Fecha: 12-02-2019
 * Descripcion: Method OrganizacionService of the Class
 * Objetivo: OrganizacionService detalle de las organizaciones llamando a la API
 * Autor: Edgar Ramirez
 ****************************************************************************/
  private OrganizacionService() {
    // Resetea todos los valores previos
    this.JsonReceptionCategoriasOrganizacion = null;
    this._usuariosService.ListAllOrganizaciones().subscribe(
      response => {
        if (response.status !== 200) {
          // console.log(response.status);
          // console.log(response.message);
          // this.showToast('error', 'Error al Obtener la Información del usuario', response.message);
        } else if (response.status === 200) {
          this.JsonReceptionOrganizacion = response.data;
          // instancia data con los tipos de usuarios;
          this.data6 = this.JsonReceptionOrganizacion;
          // Carga los Items para el List de la Smart table
          this.arrayOrganizacion = new Array();

          this.data6.forEach(element => {
            this.arrayOrganizacion.push({ title: element['descOrganizacion'], value: element['idOrganizacion'] });
          });
          this.settings.columns.idOrganizacion.editor.config.list = this.arrayOrganizacion;
          this.settings = Object.assign({}, this.settings);
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
  } // FIN | OrganizacionService


    /****************************************************************************
  * Funcion: categoriasOrganizacionListService
  * Object Number: 013.1
  * Fecha: 18-02-2019
  * Descripcion: Method categoriasOrganizacionListService of the Class
  * Objetivo: categoriasOrganizacionListService listados de las Categorias de la
  * Organizacion del Formulario de Actividad llamando a la API
  ****************************************************************************/
 private categoriasOrganizacionListService(idTipoOrganizacionSend: number) {
  this._listasComunesService.getCategoriaOrganizacionByTipo(idTipoOrganizacionSend).subscribe(
    result => {
      // console.log(result.status);
      if (result.status !== 200) {
        // Respuesta del Error
        this.JsonReceptionCategoriasOrganizacion = null;
        this.showToast('error', 'Error al Obtener la Información de las Categorias de Organizacion', result.message);
      } else if (result.status === 200) {
        this.JsonReceptionCategoriasOrganizacion = result.data;
        // console.log(this.JsonReceptionCategoriasOrganizacion);

        // Ejecutamos la Consulta de las Organizaciones, segun el Tipo Seleccionado
        if (this._usuarioModel.idPais === 0 || this._usuarioModel.idPais == null) {
          this.organizacionesIdTipoListService(this._usuarioModel.idTipoOrganizacion);
        } else {
          this.organizacionesIdTipoIdPaisListService(this._usuarioModel.idTipoOrganizacion, this._usuarioModel.idPais)
        }
      }
    },
    error => {
      this.showToast('error', 'Error al Obtener la Información de las Categorias de Organizacion', JSON.stringify(error.message));
    },
  );
} // FIN | tiposOrganizacionListService


  /****************************************************************************
  * Funcion: organizacionesIdTipoListService
  * Object Number: 016.2
  * Fecha: 18-02-2019
  * Descripcion: Method organizacionesIdTipoListService of the Class
  * Objetivo: Buscar las Organizaciones segun el Filtro Aplicado, Tipo de
  * Organizacion, en Formulario de Actividad llamando a la API
  ****************************************************************************/
 private organizacionesIdTipoListService(idTipoOrganizacion: number) {
  // Cargamos el compoenete de AutoCompletar
  this.dropdownList = [];
  this.selectedItems = [];

  // Condicion para evaluar que opcion se pulsa
  this._listasComunesService.getIdTipoOrganizaciones(idTipoOrganizacion).subscribe(
    result => {
      // console.log(result.status);
      if (result.status !== 200) {
        // Resultados del Error
        // Cargamos el compoenete de AutoCompletar
        this.dropdownList = [];
        this.selectedItems = [];

        this.showToast('error', 'Error al Obtener la Información de las Organizaciones, con los parametros enviados', result.message);
      } else if (result.status === 200) {
        this.JsonReceptionPaisOrganizacionesData = result.data;
        // console.log(this.JsonReceptionPaisOrganizacionesData);
        // Asignacion de los Valores del Json al Select
        this.dropdownList = this.JsonReceptionPaisOrganizacionesData.map((item) => {
          return {
            id: item.idOrganizacion,
            itemName: item.descOrganizacion,
            nombreTipoOrganizacion: item.idTipoOrganizacion.descTipoOrganizacion,
            descPais: item.idPaisOrganizacion.descPais,
            inicialesOrganizacion: item.inicalesOrganizacion,
          }
        })
      }
    },
    error => {
      this.showToast('error', 'Error al Obtener la Información de las Organizaciones, con los parametros enviados', JSON.stringify(error));
    },
  );
} // FIN | organizacionesIdTipoListService


  /****************************************************************************
  * Funcion: organizacionesIdTipoIdPaisListService
  * Object Number: 016
  * Fecha: 18-02-2019
  * Descripcion: Method organizacionesIdTipoIdPaisListService of the Class
  * Objetivo: Buscar las Organizaciones segun el Filtro Aplicado, Tipo, Categoria
  * y Pais de Organizacion, en Formulario de Usuarios llamando a la API
  ****************************************************************************/
 private organizacionesIdTipoIdPaisListService(idTipoOrganizacionSend: number, idPais: number) {
  // Condicion para evaluar que opcion se pulsa
  this._listasComunesService.getIdTipoIdPaisOrganizaciones(idTipoOrganizacionSend, idPais).subscribe(
    result => {
      if (result.status !== 200) {
        // Resultados del Error
        // Cargamos el compoenete de AutoCompletar
        this.dropdownList = [];
        this.selectedItems = [];

        this.showToast('error', 'Error al Obtener la Información de las Organizaciones, con los parametros enviados', result.message);
      } else if (result.status === 200) {
        this.JsonReceptionTipoPaisOrganizacionesData = result.data;
        /*this.data1 = this.JsonReceptionTipoPaisOrganizacionesData;

        // Carga los Items para el List de la Smart table
        this.listArrayOrg = new Array();

        this.data1.forEach(element => {
          this.listArrayOrg.push({ title: element['descOrganizacion'], value: element['idOrganizacion'] });
        });

        this.settings.columns.idOrganizacion.editor.config.list = this.listArrayOrg;
        this.settings = Object.assign({}, this.settings);*/

        // Asignacion de los Valores del Json al Select
        this.dropdownList = this.JsonReceptionTipoPaisOrganizacionesData.map((item) => {
          return {
            id: item.idOrganizacion,
            itemName: item.descOrganizacion,
            nombreTipoOrganizacion: item.idTipoOrganizacion.descTipoOrganizacion,
            descPais: item.idPaisOrganizacion.descPais,
            inicialesOrganizacion: item.inicalesOrganizacion,
          }
        })
      }
    },
    error => {
      this.showToast('error', 'Error al Obtener la Información de las Organizaciones, con los parametros enviados', JSON.stringify(error.message));
    },
  );
} // FIN | organizacionesIdTipoIdPaisListService

}
