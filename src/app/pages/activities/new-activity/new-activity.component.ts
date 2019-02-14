/**
 * @author Nahum Martinez
 * @returns servicios de Actividades
 * @name NewActivityComponent
 * @alias _newActivityComponent
 * @version 1.0.0
 * @fecha 10/01/2019
 */
import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

// AutoCompleter Services
import { CompleterData, CompleterService, CompleterItem } from 'ng2-completer';

// Servicios que la Clase nesesitara para su funcionanmiento
import { UserService } from '../../../@core/data/users.service'; // Servicio de Usuarios
import { ListasComunesService } from '../../common-list/services/listas-comunes.service'; // Servicio de Lista de Comunes

import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster'; // Servicio de Notificaciones
import { LocalDataSource } from 'ng2-smart-table'; // DataLocal de Ejemplo para el JSON de envio
import { ActivityConfigSmartTableService } from '../services/activity-config-smart-table.service';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import 'style-loader!angular2-toaster/toaster.css';
// import { SmartTableService } from '../../../@core/data/smart-table.service'; // Servicio de la SmartTable de la API

// Modelo y Servicios de la Clase Activiades
import { ActivityPlanificacionModel } from '../models/model-planificacion-activity';
import { ActivityModel } from '../models/model-activity'; // Modelo de Planificacion
import { ActivityService } from '../services/service-activity.service';
import { ActivityValidateFormService } from '../services/activity-validate-form.service';
import { delay } from 'q';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivityIdInternaModel } from '../models/model-idinterna-activity';

@Component({
  selector: 'ngx-new-activity',
  /*template: `
    <nb-card>
      <nb-card-body>
        <nb-route-tabset [tabs]="tabs" fullWidth></nb-route-tabset>
      </nb-card-body>
    </nb-card>
  `,*/
  templateUrl: './new-activity.component.html',
  styleUrls: ['./new-activity.component.scss', '../../components/notifications/notifications.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush, // Se usa para Actualizar la Informacion con otro evento
  providers: [ToasterService, ActivityConfigSmartTableService, ActivityService, ActivityValidateFormService],
})
export class NewActivityComponent implements OnInit {
  /****************************************************************************
  * Variables: Definicion de las Variables de la Clase
  * Fecha: 16-08-2018
  * Descripcion: variables que se usan en toda la Clase de forma publica y
  * privada
  * Objetivo: Tener el acceso a todas las variables de la Clase
  ****************************************************************************/
  // Manipulacion del DOM
  @ViewChild('nombreActividad') mySelectnombreActividad: ElementRef;
  @ViewChild('idInterna') mySelectIdInterna: ElementRef;

  tabs: any[] = [
    {
      title: 'Users',
      icon: 'nb-person',
      route: './pages/activities/datos-generales',
    },
  ];

  // Variables de Configuracion del Usuario
  public idTipoOrganizacionUsario: number;

  // Configuracion del Toaster-Notifications
  protected captain: string;

  redirectDelay: number = 0;

  protected dataService: CompleterData;

  config: ToasterConfig;

  // Consfiguracion del Notificador
  position = 'toast-bottom-full-width';
  animationType = 'slideDown';
  title = 'Se ha grabado la Información! ';
  content = 'los cambios han sido grabados temporalmente, en la PGC!';
  timeout = 20000;
  toastsLimit = 5;
  type = 'default';

  isNewestOnTop = true;
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;

  p: number = 1;

  // Configuracion de la SmartTable
  data: any;

  // DataSource de la Smart Table
  data1: any;
  data2: any;

  public settings;
  source: LocalDataSource;
  public listArrayEstados: any;
  public listArrayTipoOrg: any;
  public listArrayPaisOrg: any;
  public listArrayOrg: any;

  // Variables Tipo JSON, para usarlas en los Servicios Invocados
  public JsonReceptionEstados: any;
  public JsonReceptionSectorEjecutor: any;
  public JsonReceptionEstrategias: any;
  public JsonReceptionPresupuesto: any;
  public JsonReceptionEspaciosTrabajo: any;
  public JsonReceptionEspaciosTrabajoUsuario: any;
  public JsonReceptionTiposOrganizacion: any;
  public JsonReceptionCategoriasOrganizacion: any;
  public JsonReceptionPaises: any;
  public JsonReceptionTipoIniciativaCss: any;
  public inicialesPais: string;
  public inicialesOrganizacion: any;

  // Organizaciones
  protected searchStrFunc: string;
  public JsonReceptionAllOrganizaciones: any;
  public JsonReceptionOrganizacionCode: any[];
  protected selectedOrganizicionesAll: string = '';
  protected selectedIdOrganizacion: string = '';
  protected selectedDescTipoOrganizacion: string = '';
  protected selectedPaisOrganizacion: string = '';
  protected selectedDescOrganizacion: string = '';
  public JsonReceptionAllOrganizacionesData: any;
  public countIdInternaFind: number;

  // Id Internas
  public JsonIdInternaOrganizacion = [];
  protected JsonReceptionTipoPaisOrganizacionesData: any;
  protected JsonReceptionTipoPaisCategoriaOrganizacionesData: any;
  protected JsonReceptionPaisOrganizacionesData: any;
  public JsonOrganizationSelect: any;
  public descPais: string;
  public descTipoOrganizacion: string;
  public descOrganizacion: string;

  // Audotoria
  public JsonReceptionUserDetail: any;
  public secuenciaDeActividad: any;

  // Instacia de la variable del Modelo | Json de Parametros
  public _activityModel: ActivityModel;
  public _activityPlanificacionModel: ActivityPlanificacionModel;
  public _activityIdInternaModel: ActivityIdInternaModel;

  /**
   * Configuracion del Dropdow List
   */
  dropdownList = [];
  dropdownListPais = [];
  dropdownListEspacioTrabajo = [];
  selectedItems = [];
  selectedItemsPais = [];
  selectedItemsEspacioTrabajo = [];
  dropdownSettings = {};

  /**
   * Configuracion del DatePicker
   */
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
    editableDateField: true,
  };

  // Initialized to specific date (09.10.2018).
  // public model: any = { date: { year: 2018, month: 10, day: 9 } };
  public model: any;
  public tipoEspacioTrabajo: number;

  // Loading data Loader
  public loadingData: boolean = true;
  public msgLoader;

  // FIN | Definicion de las Variables de la Clase


  /****************************************************************************
  * Funcion: constructor
  * Object Number: 001
  * Fecha: 16-08-2018
  * Descripcion: Method constructor of the Class
  * Objetivo: constructor in the method header API
  ****************************************************************************/
  constructor(private _userService: UserService,
    private completerService: CompleterService,
    private _listasComunesService: ListasComunesService,
    // private service: SmartTableService,
    private changeDetectorRef: ChangeDetectorRef,
    // Inicializa el ToasterService
    private _toasterService: ToasterService,
    protected _router: Router,
    public _activityConfigSmartTableService: ActivityConfigSmartTableService,
    public _activityService: ActivityService,
    public _activityValidateFormService: ActivityValidateFormService,
    private _spinner: NgxSpinnerService) {
    // Llamamos a la Funcion de Configuracion de las Smart Table
    this._activityConfigSmartTableService.configSmartTableIdInternas(null, null, null);
    this.settings = this._activityConfigSmartTableService.settings;

    /* Llamado a la Funcion: 007, la cual obtiene el detalle da la Info.
     del Usuario */
    this.userDatailsService();

    // this.source = new LocalDataSource(this.data); // create the source

  } // FIN | constructor


  /****************************************************************************
  * Funcion: ngOnInit
  * Object Number: 002
  * Fecha: 16-08-2018
  * Descripcion: Method ngOnInit of the Class
  * Objetivo: ngOnInit in the method header API
  ****************************************************************************/
  ngOnInit() {
    /** spinner starts on init */
    this.msgLoader = 'Cargand';
    this._spinner.show();

    /**
     * Inicializacion del Modelo de la Clase
     */
    this._activityModel = new ActivityModel(
      0, // Id Actividad
      '', null, 0, null, 0, null, 0, '', '', '', '', '', '', // Datos Generales de la Actividad
      null, 0, null, 0, null, 0, // Planificacion
      '', '', '', 0, null, 1, null, '', '', // Resultados
      null, 0, null, 0, null, 0, null, 0, '', // Organizaciones Relaciones
      '', '', '', // Organizaciones Descripciones
      null, 0, null, 0, true, // Datos de Auditoria
      null, null, null, null, null, // Fechas de Planifiacion
      null, 0, null, // CSS
    );

    /**
     * Inicializacion del Modelo de la Clase Planificacion
     */
    this._activityPlanificacionModel = new ActivityPlanificacionModel(
      null, 0, '', // Definificion
      null, null, null, null, null, // Fechas de Planificacion
      null, null, // Auditoria
    );

    /**
     * Inicializacion del Modelo de la Clase Id Interna
     */
    this._activityIdInternaModel = new ActivityIdInternaModel(
      0, // Identificacion
      null, 0, null, 0, // Definificion
      null, // Codigo de Actividad
      null, null, // Auditoria
    );

    /* Llamado a la Funcion: 008, la cual obtiene el listado de los Estados de
     que nesesita el Formulario de Actividades */
    this.estadosListService();

    /* Llamado a la Funcion: 009, la cual obtiene el listado de los Estados de
     que nesesita el Formulario de Actividades */
    this.sectorEjecutorListService();

    /* Llamado a la Funcion: 010, la cual obtiene el listado de las Estretegias
     de que nesesita el Formulario de Actividades */
    this.estrategiasListService();

    /* Llamado a la Funcion: 011, la cual obtiene el listado de los Presupuestos
     de que nesesita el Formulario de Actividades */
    this.presupuestoListService();

    /* Llamado a la Funcion: 012, la cual obtiene el listado de los Espacios de
     Trabajo de la BD */
    // this.espaciosTrabajoListService();

    /* Llamado a la Funcion: 013, la cual obtiene el listado de los Tipos de
     Organizaciones de que nesesita el Formulario de Actividades */
    this.tiposOrganizacionListService();

    /* Llamado a la Funcion: 014, la cual obtiene el listado de los Paises
     que nesesita el Formulario de Actividades */
    this.paisesAllListService();

    /* Llamado a la Funcion: 015, la cual obtiene el listado de las Organizaciones
     que nesesita el Formulario de Actividades */
    this.organizacionesAllListService();

    /* Llamado a la Funcion: 012.1, la cual obtiene el listado de los Espacios de
     Trabajo que nesesita el Formulario de Actividades */
    this.espaciosTrabajoUsuarioListService();

    /* Llamado a la Funcion: 023, la cual obtiene el listado de los Tipos de Iniciativa
     de CSS que nesesita el Formulario de Actividades */
    this.getTipoIniciativasCssService()

    /**
     * Configuracion Inicial del Dropdown List
     */
    this.selectedItems = [];

    this.selectedItemsPais = [];

    this.selectedItemsEspacioTrabajo = [];

    this.dropdownSettings = {
      singleSelection: true,
      text: 'Seleccione una Opción',
      enableSearchFilter: true,
      searchPlaceholderText: 'Buscar Elemento',
      classes: 'comboSea',
      showCheckbox: false,
      lazyLoading: false,
    };

    // Ocultamos el Loader la Funcion
    setTimeout(() => {
      this._spinner.hide();
    }, 2000);

  } // FIN | ngOnInit


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
    // this._toasterService.popAsync(toast);
    this._toasterService.pop(toast);
  } // FIN | showToast


  /****************************************************************************
  * Funcion: toasterconfig
  * Object Number: 004.1
  * Fecha: 16-08-2018
  * Descripcion: Method showToast of the Class
  * Objetivo: showToast in the method header API
  ****************************************************************************/
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      showCloseButton: { 'warning': true, 'error': true },
    }); // FIN | toasterconfig


  /****************************************************************************
  * Funcion: onItemSelect
  * Object Number: 005
  * Fecha: 09-01-2019
  * Descripcion: Method para Seleccionar Items de Organizacion para usarlo en Id
  * Internas
  * Objetivo: enviar al Json de ID'Intermas la información que ocupa la API
  ****************************************************************************/
  onItemSelect(item: any) {
    // Envia la Organizacion seleccionada
    this.selectedIdOrganizacion = item ? item.id : '';
    this.selectedDescOrganizacion = item ? item.itemName : '';
    this.selectedDescTipoOrganizacion = item ? item.nombreTipoOrganizacion : '';
    this.selectedPaisOrganizacion = item ? item.descPais : '';
    this.inicialesOrganizacion = item ? item.inicialesOrganizacion : '';

    // Setea al Model el valor de la Organizacion
    this._activityModel.idOrganizacion = Number(this.selectedIdOrganizacion);
    this._activityModel.descOrganizacion = this.selectedDescOrganizacion;
    this._activityModel.descTipoOrganizacion = this.selectedDescTipoOrganizacion;
    this._activityModel.descPaisOrganizacion = this.selectedPaisOrganizacion;
  } // FIN | onItemSelect


  /****************************************************************************
  * Funcion: OnItemDeSelect
  * Object Number: 006
  * Fecha: 09-01-2019
  * Descripcion: Method para Seleccionar Items de Pais para usarlo en Id
  * Internas
  * Objetivo: enviar al Json de ID'Intermas la información que ocupa la API
  ****************************************************************************/
  onItemSelectPais(item: any) {
    // Asignamos el Pais seleccionado
    this._activityModel.idPais = item.id;
    this.inicialesPais = item.iniciales;

    // Condicona los Datos a Consultar
    this.organizacionesIdPaisListService(this._activityModel.idPais);
    // this.organizacionesIdTipoIdPaisListService(this._activityModel.idCatOrganizacion, 0, this._activityModel.idPais)
  } // FIN | OnItemDeSelect


  /****************************************************************************
  * Funcion: OnItemDeSelectEspacioTrabajo
  * Object Number: 006
  * Fecha: 06-02-2019
  * Descripcion: Method para Seleccionar Items de Espacio de Trabajo y usarlo
  * en la Insercion del Proyecto
  * Objetivo: enviar al Json de Proyectos el Id Espacio de Trabajo la
  * información que ocupa la API
  ****************************************************************************/
  OnItemDeSelectEspacioTrabajo(item: any) {
    // Asignamos el Pais seleccionado
    this._activityModel.idEspacioTrabajo = item.id;
    this.tipoEspacioTrabajo = item.tipoEspacioTrabajo;
  } // FIN | OnItemDeSelectEspacioTrabajo


  /****************************************************************************
  * Funcion: onSaveConfirm
  * Object Number: 006
  * Fecha: 09-01-2019
  * Descripcion: Method para Guardar Items de la SmartTable
  * Objetivo: enviar al Json de ID'Intermas la información que ocupa la API
  ****************************************************************************/
  onSaveConfirm(event) {
    if (window.confirm('Estas seguro de grabar la información modificada?')) {
      // event.newData['name'] += ' + added in code';
      alert(event.newData['username']);
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }// FIN | onSaveConfirm


  /****************************************************************************
  * Funcion: onEditedCompleter
  * Object Number: 006.1
  * Fecha: 09-01-2019
  * Descripcion: Method para Editar listas Items de la SmartTable
  * Objetivo: enviar al Json de ID'Intermas la información que ocupa la API
  ****************************************************************************/
  onEditedCompleter(event: { title: '' }): boolean {
    // this.cell.newValue = event.title;
    this.JsonOrganizationSelect = event.title;
    return false;
  } // FIN | onEditedCompleter


  /* **************************************************************************/
  /* ****************** Funciones Propias de la Clase *************************/

  /****************************************************************************
  * Funcion: userDatailsService
  * Object Number: 007
  * Fecha: 16-08-2018
  * Descripcion: Method userDatailsService of the Class
  * Objetivo: userDatailsService detalle del Usuario llamando a la API
  ****************************************************************************/
  private userDatailsService() {
    this._userService.getUserDetails(this._userService.usernameHeader).subscribe(
      result => {

        if (result.status !== 200) {
          this.showToast('error', 'Error al Obtener la Información del Usuario', result.message);
        } else {
          this.JsonReceptionUserDetail = result.data;
          this.idTipoOrganizacionUsario = this.JsonReceptionUserDetail.idTipoOrganizacionUsario.idTipoOrganizacion;

          setTimeout(() => {
            /** spinner ends after 3 seconds */
            this._spinner.hide();
          }, 1500);
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
        }, this.redirectDelay);
      },
    );
  } // FIN | userDatailsService


  // ********** Invocacion de los Servicios Nesesarios para Funcionar *********

  /****************************************************************************
  * Funcion: estadosListService
  * Object Number: 008
  * Fecha: 16-08-2018
  * Descripcion: Method estListService of the Class
  * Objetivo: estListService listados de los Estados del Formulario de
  * Actividad llamando a la API
  ****************************************************************************/
  private estadosListService() {
    this._listasComunesService.getAllEstados(3).subscribe(
      result => {
        if (result.status !== 200) {
          this.showToast('error', 'Error al Obtener la Información de Estados', result.message);
        } else if (result.status === 200) {
          // NADA
          this.JsonReceptionEstados = result.data;
        }
      },
      error => {
        this.showToast('error', 'Error al Obtener la Información de Estados', JSON.stringify(error.message));
        // this.userDatailsService();
      },
    );
  } // FIN | estadosListService



  /****************************************************************************
  * Funcion: sectorEjecutorListService
  * Object Number: 009
  * Fecha: 22-08-2018
  * Descripcion: Method sectorEjecutorListService of the Class
  * Objetivo: sectorEjecutorListService listados de los Sectores Ejecutores
  * del Formulario de Actividad llamando a la API
  ****************************************************************************/
  private sectorEjecutorListService() {
    this._listasComunesService.getAllSectoresEjecutores().subscribe(
      result => {
        if (result.status !== 200) {
          this.showToast('error', 'Error al Obtener la Información de los Sectores Ejecutores', result.message);
        } else if (result.status === 200) {
          this.JsonReceptionSectorEjecutor = result.data;
        }
      },
      error => {
        this.showToast('error', 'Error al Obtener la Información de Sectores', JSON.stringify(error.message));
      },
    );
  } // FIN | sectorEjecutorListService


  /****************************************************************************
  * Funcion: estrategiasListService
  * Object Number: 010
  * Fecha: 22-08-2018
  * Descripcion: Method estrategiasListService of the Class
  * Objetivo: estrategiasListService listados de las Estrategias
  * del Formulario de Actividad llamando a la API
  ****************************************************************************/
  private estrategiasListService() {
    this._listasComunesService.getAllEstrategias().subscribe(
      result => {
        if (result.status !== 200) {
          this.showToast('error', 'Error al Obtener la Información de los Estrategias', result.message);
        } else if (result.status === 200) {
          this.JsonReceptionEstrategias = result.data;
        }
      },
      error => {
        this.showToast('error', 'Error al Obtener la Información de las Estrategias', JSON.stringify(error.message));
      },
    );
  } // FIN | estrategiasListService


  /****************************************************************************
  * Funcion: presupuestoListService
  * Object Number: 011
  * Fecha: 22-08-2018
  * Descripcion: Method presupuestoListService of the Class
  * Objetivo: presupuestoListService listados de los Presupuestos
  * del Formulario de Actividad llamando a la API
  ****************************************************************************/
  private presupuestoListService() {
    this._listasComunesService.getAllPresupuesto().subscribe(
      result => {
        if (result.status !== 200) {
          this.showToast('error', 'Error al Obtener la Información de los Presupuesto', result.message);
        } else if (result.status === 200) {
          this.JsonReceptionPresupuesto = result.data;
        }
      },
      error => {
        this.showToast('error', 'Error al Obtener la Información de los Presupuestos', JSON.stringify(error));
      },
    );
  } // FIN | presupuestoListService


  /****************************************************************************
  * Funcion: espaciosTrabajoListService
  * Object Number: 012
  * Fecha: 12-10-2018
  * Descripcion: Method espaciosTrabajoListService of the Class
  * Objetivo: espaciosTrabajoListService listados de los Espacios de Trabajo
  * llamando a la API
  ****************************************************************************/
  private espaciosTrabajoListService() {
    this._listasComunesService.getAllEspaciosTrabajo().subscribe(
      result => {
        if (result.status !== 200) {
          this.showToast('error', 'Error al Obtener la Información de los Espacios de Trabajo', result.message);
        } else if (result.status === 200) {
          this.JsonReceptionEspaciosTrabajo = result.data;
        }
      },
      error => {
        this.showToast('error', 'Error al Obtener la Información de los Espacios de Trabajo', JSON.stringify(error.message));
      },
    );
  } // FIN | espaciosTrabajoListService


  /****************************************************************************
  * Funcion: espaciosTrabajoUsuarioListService
  * Object Number: 012.1
  * Fecha: 12-10-2018
  * Descripcion: Method espaciosTrabajoUsuarioListService of the Class
  * Objetivo: espaciosTrabajoUsuarioListService listados de los Espacios de Tra-
  * bajo que tiene asignado el Usuario, llamando a la API
  ****************************************************************************/
  private espaciosTrabajoUsuarioListService() {
    this._listasComunesService.getAllEspaciosTrabajoUsuario(9).subscribe(
      result => {
        if (result.status !== 200) {
          this.showToast('error', 'Error al Obtener la Información de los Espacios de Trabajo', result.message);
        } else if (result.status === 200) {
          this.JsonReceptionEspaciosTrabajoUsuario = result.data;

          // Setea la Lista del Dropdown List
          this.dropdownListEspacioTrabajo = this.JsonReceptionEspaciosTrabajoUsuario.map((item) => {
            return {
              id: item.idEspacioTrabajo.idEspacioTrabajo,
              itemName: item.idEspacioTrabajo.descripcionEspacioTrabajo,
              codEspacioTrabajo: item.idEspacioTrabajo.codEspacioTrabajo,
              tipoEspacioTrabajo: item.idEspacioTrabajo.idTipoEspacioTrabajo.idTipo,
            }
          })
          this.tipoEspacioTrabajo = this.dropdownListEspacioTrabajo[0];
        }
      },
      error => {
        this.showToast('error', 'Error al Obtener la Información de los Espacios de Trabajo', JSON.stringify(error.message));
      },
    );
  } // FIN | espaciosTrabajoUsuarioListService


  /****************************************************************************
  * Funcion: tiposOrganizacionListService
  * Object Number: 013
  * Fecha: 13-10-2018
  * Descripcion: Method tiposOrganizacionListService of the Class
  * Objetivo: tiposOrganizacionListService listados de los Tipos de Organizacion
  * del Formulario de Actividad llamando a la API
  ****************************************************************************/
  private tiposOrganizacionListService() {
    this._listasComunesService.getAllTipoOrganizacion().subscribe(
      result => {
        if (result.status !== 200) {
          // Respuesta del Error
          this.showToast('error', 'Error al Obtener la Información de los Tipos de Organizacion', result.message);
        } else if (result.status === 200) {
          this.JsonReceptionTiposOrganizacion = result.data;
        }
      },
      error => {
        this.showToast('error', 'Error al Obtener la Información de los Tipos de Organizacion', JSON.stringify(error.message));
      },
    );
  } // FIN | tiposOrganizacionListService


  /****************************************************************************
  * Funcion: categoriasOrganizacionListService
  * Object Number: 013.1
  * Fecha: 17-01-2019
  * Descripcion: Method categoriasOrganizacionListService of the Class
  * Objetivo: categoriasOrganizacionListService listados de las Categorias de la
  * Organizacion del Formulario de Actividad llamando a la API
  ****************************************************************************/
  private categoriasOrganizacionListService(idTipoOrganizacionSend: number) {
    this._listasComunesService.getCategoriaOrganizacionByTipo(idTipoOrganizacionSend).subscribe(
      result => {
        if (result.status !== 200) {
          // Respuesta del Error
          this.JsonReceptionCategoriasOrganizacion = null;
          this.showToast('error', 'Error al Obtener la Información de las Categorias de Organizacion', result.message);
        } else if (result.status === 200) {
          this.JsonReceptionCategoriasOrganizacion = result.data;

          // Ejecutamos la Consulta de las Organizaciones, segun el Tipo Seleccionado
          if (this._activityModel.idPais === 0 || this._activityModel.idPais == null) {
            this.organizacionesIdTipoListService(this._activityModel.idTipoOrganizacion);
          } else {
            this.organizacionesIdTipoIdPaisListService(this._activityModel.idTipoOrganizacion, this._activityModel.idPais)
          }
        }
      },
      error => {
        this.showToast('error', 'Error al Obtener la Información de las Categorias de Organizacion', JSON.stringify(error.message));
      },
    );
  } // FIN | tiposOrganizacionListService


  /****************************************************************************
  * Funcion: paisesAllListService
  * Object Number: 014
  * Fecha: 13-10-2018
  * Descripcion: Method paisesAllListService of the Class
  * Objetivo: paisesAllListService listados de los Paises
  * del Formulario de Actividad llamando a la API
  ****************************************************************************/
  private paisesAllListService() {
    this._listasComunesService.getAllPaises().subscribe(
      result => {
        if (result.status !== 200) {
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
        this.showToast('error', 'Error al Obtener la Información de los Paises', JSON.stringify(error.message));
      },
    );
  } // FIN | paisesAllListService


  /****************************************************************************
  * Funcion: organizacionesAllListService
  * Object Number: 015
  * Fecha: 15-10-2018
  * Descripcion: Method organizacionesAllListService of the Class
  * Objetivo: organizacionesAllListService listados de los Paises
  * del Formulario de Actividad llamando a la API
  ****************************************************************************/
  private organizacionesAllListService() {
    // Resetea los valores Previos
    this._activityModel.idTipoOrganizacion = 0;
    this._activityModel.idCatOrganizacion = 0;
    this.JsonReceptionCategoriasOrganizacion = null;
    this.dropdownList = [];
    this.selectedItems = [];
    this.selectedItemsPais = [];

    // Invoca el Servicio de la Clase
    this._listasComunesService.getAllOrganizaciones().subscribe(
      result => {
        if (result.status !== 200) {
          this.dropdownList = [];
          this.selectedItems = [];

          this.showToast('error', 'Error al Obtener la Información de las Organizaciones', result.message);
        } else if (result.status === 200) {
          this.JsonReceptionAllOrganizaciones = result.data;

          // Asignacion de los Valores del Json al Select
          this.dropdownList = this.JsonReceptionAllOrganizaciones.map((item) => {
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
        this.showToast('error', 'Error al Obtener la Información de las Organizaciones', JSON.stringify(error.message));
      },
    );
  } // FIN | organizacionesAllListService


  /*****************************************************
  * Funcion: FND-00001
  * Fecha: 21-01-2019
  * Descripcion: Funcion que Obtiene la Secuencia del
  * Proyecto o Actividad
  * Params: codSecuencia
  ******************************************************/
  protected getSecuenciaListService(codSecuencia: string) {
    // Envia la Secuencia a Buscar
    this._listasComunesService.getSecuenciaActividad(codSecuencia).subscribe(
      result => {
        if (result.status !== 200) {
          this.showToast('error', 'Error al Obtener la Información de la Secuencia', JSON.stringify(result.message));
        } else if (result.status === 200) {
          this.secuenciaDeActividad = result.data;

          // Componemos la Secuencia a Generar
          const prefixHND: string = 'HND-';
          this._activityModel.codigoActividad = prefixHND + (Number(this.secuenciaDeActividad.valor2));
        }
      },
      error => {
        this.showToast('error', 'Error al Obtener la Información de la Secuencia', JSON.stringify(error.message));
      },
    );
  } // FIN | FND-00001


  /*****************************************************
  * Funcion: FND-00001.1
  * Fecha: 21-01-2019
  * Descripcion: Funcion que Actuaiza la Secuencia del
  * Proyecto o Actividad
  * Params: { jsonSecuencia, idSecuencia }
  ******************************************************/
  protected updateSecuenciaService(idUsuarioMod: number, idSecuencia: number) {
    // Envia la Secuencia a Buscar
    const jsonSecuencia = {
      'idUsuarioMod': {
        'idUsuario': idUsuarioMod,
      },
    };

    this._activityService.updateSecuence(jsonSecuencia, idSecuencia).subscribe(
      result => {
        if (result.status !== 200) {
          this.showToast('error', 'Error al Actualizar la Información de la Secuencia', JSON.stringify(result.message));
        } else if (result.status === 200) {
          // Result success
        }
      },
      error => {
        this.showToast('error', 'Error al Actualizar la Información de la Secuencia', JSON.stringify(error.message));
      },
    );
  } // FIN | FND-00001.1


  /****************************************************************************
  * Funcion: organizacionesIdTipoIdPaisListService
  * Object Number: 016
  * Fecha: 15-10-2018
  * Descripcion: Method organizacionesIdTipoIdPaisListService of the Class
  * Objetivo: Buscar las Organizaciones segun el Filtro Aplicado, Tipo, Categoria
  * y Pais de Organizacion, en Formulario de Actividad llamando a la API
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


  /****************************************************************************
  * Funcion: organizacionesIdTipoIdPaisIdCategoriaListService
  * Object Number: 016
  * Fecha: 15-10-2018
  * Descripcion: Method organizacionesIdTipoIdPaisIdCategoriaListService of the Class
  * Objetivo: Buscar las Organizaciones segun el Filtro Aplicado, Tipo, Categoria
  * y Pais de Organizacion, en Formulario de Actividad llamando a la API
  ****************************************************************************/
  private organizacionesIdTipoIdPaisIdCategoriaListService(idTipoOrganizacionSend: number, idPais: number, idCatOrganizacion: number) {
    // Condicion para evaluar que opcion se pulsa
    this._listasComunesService.getIdTipoIdPaisIdCategoriaOrganizaciones(idTipoOrganizacionSend, idPais, idCatOrganizacion).subscribe(
      result => {
        if (result.status !== 200) {
          // Resultados del Error
          // Cargamos el compoenete de AutoCompletar
          this.dropdownList = [];
          this.selectedItems = [];
          this.JsonReceptionTipoPaisCategoriaOrganizacionesData = null;

          this.showToast('error', 'Error al Obtener la Información de las Organizaciones, con los parametros enviados', result.message);
        } else if (result.status === 200) {
          this.JsonReceptionTipoPaisCategoriaOrganizacionesData = result.data;
          // Asignacion de los Valores del Json al Select
          this.dropdownList = this.JsonReceptionTipoPaisCategoriaOrganizacionesData.map((item) => {
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
  } // FIN | organizacionesIdTipoIdPaisIdCategoriaListService


  /****************************************************************************
  * Funcion: organizacionesIdPaisListService
  * Object Number: 016.1
  * Fecha: 22-01-2019
  * Descripcion: Method organizacionesIdPaisListService of the Class
  * Objetivo: Buscar las Organizaciones segun el Filtro Aplicado, Pais de
  * Organizacion, en Formulario de Actividad llamando a la API
  ****************************************************************************/
  private organizacionesIdPaisListService(idPais: number) {
    // Condicion para evaluar que opcion se pulsa
    this._listasComunesService.getIdPaisOrganizaciones(idPais).subscribe(
      result => {
        if (result.status !== 200) {
          // Resultados del Error
          // Cargamos el compoenete de AutoCompletar
          this.dropdownList = [];
          this.selectedItems = [];

          this.showToast('error', 'Error al Obtener la Información de las Organizaciones, con los parametros enviados', result.message);
        } else if (result.status === 200) {
          this.JsonReceptionPaisOrganizacionesData = result.data;

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
  } // FIN | organizacionesIdPaisListService


  /****************************************************************************
  * Funcion: organizacionesIdTipoListService
  * Object Number: 016.2
  * Fecha: 22-01-2019
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
        if (result.status !== 200) {
          // Resultados del Error
          // Cargamos el compoenete de AutoCompletar
          this.dropdownList = [];
          this.selectedItems = [];

          this.showToast('error', 'Error al Obtener la Información de las Organizaciones, con los parametros enviados', result.message);
        } else if (result.status === 200) {
          this.JsonReceptionPaisOrganizacionesData = result.data;

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
  * Funcion: pushJsonIdInterna
  * Object Number: 017
  * Fecha: 09-11-2018
  * Descripcion: Method Creacion de nuevo File input
  * Objetivo: Creacion de nuevo File input listados de las ID Internas
  * del Formulario de Actividad llamando a la API
  ****************************************************************************/
  private pushJsonIdInterna() {
    // Validacion de la Informacion a Ingresar
    if (this._activityModel.idInterna === '' || this._activityModel.idInterna === null) {
      this.showToast('error', 'Error al Ingresar la Información de las Organizaciones', 'Debes de Ingresar el Código del ID Interna, para continuar');
      this.mySelectIdInterna.nativeElement.focus();
      return -1;
    } else {
      // Busqueda del Codigo del Perfil si Existe
      this.findOrganizacionByCode(this._activityModel.idInterna);
    }

    // Validamos que se ha Seleccionado los Filtros Previos a la ID Interna
    if (this._activityModel.idPais === 0 && this._activityModel.idOrganizacion === 0) {
      this.showToast('error', 'Error al Ingresar la Información de las ID Internas', 'Debes Seleccionar el País, para continuar');
      return -1;
    } else if (this._activityModel.idTipoOrganizacion === 0 && this._activityModel.idOrganizacion === 0) {
      this.showToast('error', 'Error al Ingresar la Información de las ID Internas', 'Debes Seleccionar el Tipo de Organización, para continuar');
      return -1;
    } else if (this._activityModel.idCatOrganizacion === 0 && this._activityModel.idOrganizacion === 0) {
      this.showToast('error', 'Error al Ingresar la Información de las ID Internas', 'Debes Seleccionar la Categoría de Organización, para continuar');
      return -1;
    } else if (this._activityModel.idOrganizacion === 0) {
      this.showToast('error', 'Error al Ingresar la Información de las ID Internas', 'Debes Seleccionar la Organización, para continuar');
      return -1;
    }
  } // FIN | pushJsonIdInterna


  /****************************************************************************
  * Funcion: deleteRowHomeForm
  * Object Number: 018
  * Fecha: 09-11-2018
  * Descripcion: Method Delete de nuevo File input, en Tabla
  * Objetivo: Delete de nuevo File input, en Tabla listados de las ID Internas
  * del Formulario de Actividad llamando a la API
  ****************************************************************************/
  // deleteRowHomeForm(homeFormIndex: number, codDocumentoIn: string, extDocumentoIn: string) {
  deleteRowHomeForm(homeFormIndex: number, codIdInternaIn: string) {
    // Confirmar que se desea borrar ?
    const deletedItem = confirm('Esta seguro de borrar el Item de ID Interna Seleccionado ? ');

    if (deletedItem === true) {
      // Borra el Elemento al Json
      this.JsonIdInternaOrganizacion.splice(homeFormIndex, 1);
      this.changeDetectorRef.detectChanges();

      // Borramos la Id Interna de la BD
      this.deletedActividadIdInterna(codIdInternaIn);
    }
  } // FIN deleteRowHomeForm


  /****************************************************************************
  * Funcion: findOrganizacionByCode
  * Object Number: 019
  * Fecha: 09-01-2019
  * Descripcion: Method que valida si un Codigo de Organizacion para Id Interna
  * Existe, y no permitir su ingreso nuevamente
  * Objetivo: Validacion de Id Interna por Codigo
  ****************************************************************************/
  private findOrganizacionByCode(codeOrganizacionSend: string) {
    // Condicion para evaluar que opcion se pulsa
    this._listasComunesService.getOrganizacionByCodigoCount(codeOrganizacionSend).subscribe(
      result => {
        if (result.status !== 200) {
          // Resultadps del Error
          this.showToast('error', 'Error al Obtener la Información de la Organizacion, con los parametros enviados', result.message);
        } else if (result.status === 200) {
          this.countIdInternaFind = result.data;

          if (this.countIdInternaFind !== 0) {
            this.showToast('error', 'Error al Ingresar la Información de Id Interna en las Organizaciones', 'Ya existe un Código de Id Interna registrado en la BD');
            return -1;
          } else {
            // Ingresa el primer Item del json
            this.JsonIdInternaOrganizacion.push({
              'descTipoOrganizacion': this._activityModel.descTipoOrganizacion,
              'descPaisOrganizacion': this._activityModel.descPaisOrganizacion,
              'descOrganizacion': this._activityModel.descOrganizacion,
              'idOrganizacion': this._activityModel.idOrganizacion,
              'idInterna': this._activityModel.idInterna,
            });
            this._activityModel.idInterna = '';
            // this.data = this.JsonIdInternaOrganizacion;
            this.showToast('success', 'ID Interna Ingresada', 'Se ha Ingresado la ID Interna, a la Organización seleccionada');
          }
        }
      },
      error => {
        this.showToast('error', 'Error al Obtener la Información de las Organizaciones, con los parametros enviados', <any>error);
      },
    );
  } // FIN | findOrganizacionByCode


  /****************************************************************************
  * Funcion: saveActivity
  * Object Number: 019
  * Fecha: 09-01-2019
  * Descripcion: Method que INgresa la Informacion General del Proyecto, asi
  * como la Planificacion y las Id INternas si la Tiene
  * Objetivo: Ingresar un Nuevo proyecto a la PGC
  * @param { _activityModel }
  ****************************************************************************/
  async saveActivity(caseSave: number) {
    // Seteo de las variables del Model al json de Java
    this._activityModel.idEstadoActivity = { idEstado: this._activityModel.idEstado };
    this._activityModel.idEspacioTrabajoActivity = { idEspacioTrabajo: this._activityModel.idEspacioTrabajo };
    this._activityModel.idEstrategiaActivity = { idEstrategia: this._activityModel.idEstrategia };
    this._activityModel.idPresupuestoActivity = { idPresupuesto: this._activityModel.idPresupuesto };
    this._activityModel.idSectorEjecutorActivity = { idSectorEjecutor: this._activityModel.idSectorEjecutor };
    this._activityModel.idMonedaActividadActivity = { idMonedaActividad: this._activityModel.idMonedaActividad };
    this._activityModel.idTipoOrganizacionActivity = { idTipoOrganizacion: this._activityModel.idTipoOrganizacion };
    this._activityModel.idPaisActivity = { idPais: this._activityModel.idPais };
    this._activityModel.idOrganizacionActivity = { idOrganizacion: this._activityModel.idOrganizacion };
    this._activityModel.idTipoIniciativaCssAct = { idTipoIniciativa: this._activityModel.idTipoIniciativa };

    // Validamos los Campos enviados
    this._activityValidateFormService.validateFormActivity(this._activityModel);
    const responseData: any = this._activityValidateFormService.responseData;

    if (responseData.error === true) {
      this.showToast('error', 'Error al Ingresar la Información del Proyecto', responseData.msg);
      return -1;
    }

    /** spinner starts on Start Function */
    this.msgLoader = 'Ingresando la Información del Proyecto';
    this._spinner.show();

    /**
     * Evaluacion del Estado que Enviamos, para verificar si Ingresa o Actualiza
     */
    if (this._activityModel.idActividad === 0) {
      alert('Estado de Borrador Nuevo');
      // Estado de Validacion de Proyecto | Borrador Nuevo
      this._activityModel.idEstadoV = 12;
      this._activityModel.idEstadoValid = { idEstado: this._activityModel.idEstadoV };
      this.newActivity();
    } else {
      alert('Estado de Borrador Existente');
      // Estado de Validacion de Proyecto | Borrador Existente
      this._activityModel.idEstadoV = 15;
      this._activityModel.idEstadoValid = { idEstado: this._activityModel.idEstadoV };
      this.editActivity(this._activityModel.idActividad);
    }
    // Return nothing
  } // FIN saveActivity


  /****************************************************************************
  * Funcion: newActivity
  * Object Number: 019
  * Fecha: 09-01-2019
  * Descripcion: Method que INgresa la Informacion General del Proyecto, asi
  * como la Planificacion y las Id INternas si la Tiene
  * Objetivo: Ingresar un Nuevo proyecto a la PGC
  * @param { _activityModel }
  ****************************************************************************/
  async newActivity() {
    // Setea el Usuario que esta Creando el proytecto
    this._activityModel.idUsuarioCreador = { idUsuario: this.JsonReceptionUserDetail.idUsuario };

    // Creacion del Codigo de la Actividad | 1 = NEW-ACT Nueva Actividad(Proyecto)
    this.getSecuenciaListService('NEW-ACT');

    await delay(100);

    // Ejecutamos el Recurso del EndPoint | /activities/new-activity
    this._activityService.newActivityGeneral(this._activityModel).subscribe(
      response => {
        if (response.status !== 200) {
          this.showToast('error', 'Error en el Servidor al Ingresar la Información del Proyecto', response.message);
          // Ocultamos el Loader la Funcion
          setTimeout(() => {
            this._spinner.hide();
          }, 2000);
        } else if (response.status === 200) {
          // Verificamos que la Actividad no Exista en la BD
          if (response.find === true) {
            this.showToast('error', 'Error al Ingresar la Información del Proyecto', response.message);
            // Ocultamos el Loader la Funcion
            setTimeout(() => {
              this._spinner.hide();
            }, 2000);
          } else {
            // Asignamos los Valores del Proyecto recien Ingresado al Modelo
            this._activityModel.idActividad = response.data.idActividad;

            this._activityPlanificacionModel.codigoActividad = this._activityModel.codigoActividad;
            this._activityPlanificacionModel.idActividadPlan = { idActividad: this._activityModel.idActividad };

            // Ejecuta el Llenado de la Planificacion
            this.newActividadPlanificacion();

            // Ejecuta el Llenado de las Id Internas
            this.newActividadIdInterna();

            // Actualizamos la Siguiente Secuencia
            this.updateSecuenciaService(this.JsonReceptionUserDetail.idUsuario, 1);

            // Ocultamos el Loader la Funcion
            setTimeout(() => {
              this._spinner.hide();
            }, 2000);

            this.showToast('default', 'La Información del Proyecto, se ha ingresado con exito', response.message);
            // Carga la tabla Nuevamente
            // this.resetActivity();
          }
        }
      },
      error => {
        // Error en la petición de la API
        this.showToast('error', 'Ha ocurrido un Error al Registrar la información del Proyecto, por favor verifica que todo este bien!!', JSON.stringify(error.message));
        // Ocultamos el Loader la Funcion
        setTimeout(() => {
          this._spinner.hide();
        }, 2000);
      },
    );
  } // FIN newActivity


  /****************************************************************************
  * Funcion: editActivity
  * Object Number: 019.1
  * Fecha: 08-02-2019
  * Descripcion: Method que Actualiza la Informacion General del Proyecto, asi
  * como la Planificacion y las Id Internas si la Tiene
  * Objetivo: Actualizar un Nuevo proyecto a la PGC
  * @param { _activityModel }
  ****************************************************************************/
  async editActivity(idActividadIn: number) {
    // Setamos el Usuario que Modifica el Form
    this._activityModel.idUsuarioMod = { idUsuario: this.JsonReceptionUserDetail.idUsuario };

    // Ejecutamos el Recurso del EndPoint | /activities/edit-activity/{idActivity}
    this._activityService.editActivityGeneral(this._activityModel, idActividadIn).subscribe(
      response => {
        if (response.status !== 200) {
          this.showToast('error', 'Error en el Servidor al Actualizar la Información del Proyecto', response.message);
          // Ocultamos el Loader la Funcion
          setTimeout(() => {
            this._spinner.hide();
          }, 2000);
        } else if (response.status === 200) {
          // Ejecuta la Actualizacion de la Planificacion
          this.editActividadPlanificacion(idActividadIn);

          // Ocultamos el Loader la Funcion
          setTimeout(() => {
            this._spinner.hide();
          }, 2000);
          this.showToast('default', 'La Información del Proyecto, se ha Actualizado con exito', response.message);
        }
      },
      error => {
        // Error en la petición de la API
        this.showToast('error', 'Ha ocurrido un Error al Actualizar la información del Proyecto, por favor verifica que todo este bien!!', JSON.stringify(error.message));
        // Ocultamos el Loader la Funcion
        setTimeout(() => {
          this._spinner.hide();
        }, 2000);
      },
    );
  } // FIN editActivity


  /****************************************************************************
  * Funcion: resetActivity
  * Object Number: 020
  * Fecha: 15-01-2019
  * Descripcion: Method que Limpia el Formulario de Activiades
  * Objetivo: Limpiar Formulario
  ****************************************************************************/
  resetActivity() {
    // Limpiar Formulario de la Actividad
    this.ngOnInit();

    // Reiniciamos la tabla
    this.JsonIdInternaOrganizacion = [];

    // Reinciamos el Text de Autocomplete de Organizaciones
    this.dataService = null;
    this.dropdownList = [];
    this.JsonReceptionCategoriasOrganizacion = null;
  } // FIN resetActivity


  /****************************************************************************
  * Funcion: newActividadPlanificacion
  * Object Number: 021
  * Fecha: 24-01-2019
  * Descripcion: Method que Genera la Planificacion de la Actividad
  * Objetivo: Generar Planificacion del Proyecto
  * @param { _activityPlanificacionModel }
  ****************************************************************************/
  newActividadPlanificacion() {
    // Seteamos los valores del Modelo de Planificacion a Enviar

    // Ejecutamos el Recurso del EndPoint
    this._activityService.newActivityPlanificacion(this._activityPlanificacionModel).subscribe(
      response => {
        if (response.status !== 200) {
          this.showToast('error', 'Error al Ingresar la Información de la Planificacion del Proyecto', response.message);
        } else if (response.status === 200) {
          // Verificamos que la Actividad no Exista en la BD
          this.showToast('default', 'La Información de la Planificacion del Proyecto, se ha ingresado con exito', response.message);
        }
      },
      error => {
        // Informacion del Error que se capturo de la Secuencia
        this.showToast('error', 'Ha ocurrido un Error al Registrar la información de Planificación del Proyecto, por favor verifica que todo este bien!!', JSON.stringify(error.message));
      },
    );
    // Return
  } // FIN | newActividadPlanificacion


  /****************************************************************************
  * Funcion: editActividadPlanificacion
  * Object Number: 021.1
  * Fecha: 08-02-2019
  * Descripcion: Method que Actuliza la Planificacion de la Actividad
  * Objetivo: Actulizar la Planificacion del Proyecto
  * @param { _activityPlanificacionModel, idActividadPlan }
  ****************************************************************************/
  editActividadPlanificacion(idActividadIn: number) {
    // Ejecutamos el Recurso del EndPoint
    this._activityService.editActivityPlanificacion(this._activityPlanificacionModel, idActividadIn).subscribe(
      response => {
        if (response.status !== 200) {
          this.showToast('error', 'Error al Actualizar la Información de la Planificacion del Proyecto', response.message);
        } else if (response.status === 200) {
          // Verificamos que la Actividad no Exista en la BD
          this.showToast('default', 'La Información de la Planificacion del Proyecto, se ha Actualizar con exito', response.message);
        }
      },
      error => {
        // Informacion del Error que se capturo de la Secuencia
        this.showToast('error', 'Ha ocurrido un Error al Actualizar la información de Planificación del Proyecto, por favor verifica que todo este bien!!', JSON.stringify(error.message));
        // Ocultamos el Loader la Funcion
        setTimeout(() => {
          this._spinner.hide();
        }, 2000);
      },
    );
    // Return
  } // FIN | editActividadPlanificacion


  /****************************************************************************
  * Funcion: onDateChanged
  * Object Number: 022
  * Fecha: 28-01-2019
  * Descripcion: Method que Genera las fechas de Planificacion y las asigan al
  * Modelo de la Clase
  * Objetivo: Generar las Fechas de Planificacion al Modelo
  * @param event
  ****************************************************************************/
  onDateChanged(event: IMyDateModel, paraEvalDate: number) {
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    switch (paraEvalDate) {
      case 1:
        this._activityPlanificacionModel.fechaFirma = event.jsdate;
        break;
      case 2:
        this._activityPlanificacionModel.fechaEfectividad = event.jsdate;
        break;
      case 3:
        this._activityPlanificacionModel.fechaCierre = event.jsdate;
        break;
      case 4:
        this._activityPlanificacionModel.fechaPropuestaFinalizacion = event.jsdate;
        break;
      case 5:
        this._activityPlanificacionModel.fechaFinalizacion = event.jsdate;
        break;
    }
    // FIN | onDateChanged
  } // FIN | onDateChanged


  /****************************************************************************
  * Funcion: getTipoIniciativasCssService
  * Object Number: 023
  * Fecha: 07-02-2019
  * Descripcion: Method getTipoIniciativasCssService of the Class
  * Objetivo: getTipoIniciativasCssService listados de los Tipos de Iniciativa
  * CSS del Formulario de Actividad llamando a la API
  ****************************************************************************/
  private getTipoIniciativasCssService() {
    this._listasComunesService.getAllTipoIniciativasCSS().subscribe(
      result => {
        if (result.status !== 200) {
          this.showToast('error', 'Error al Obtener la Información de los Tipos de Iniciativa CSS', result.message);
        } else if (result.status === 200) {
          this.JsonReceptionTipoIniciativaCss = result.data;
        }
      },
      error => {
        this.showToast('error', 'Error al Obtener la Información de los Tipos de Iniciativa CSS', JSON.stringify(error.message));
      },
    );
  } // FIN | getTipoIniciativasCssService


  /****************************************************************************
  * Funcion: newActividadIdInterna
  * Object Number: 024
  * Fecha: 12-02-2019
  * Descripcion: Method que Genera las Id Internas de la Actividad
  * Objetivo: Generar Id internas del Proyecto
  * @param { _activityPlanificacionModel }
  ****************************************************************************/
  newActividadIdInterna() {
    // Seteamos los valores del Modelo de Planificacion a Enviar
    this.JsonIdInternaOrganizacion.forEach(element => {
      this._activityIdInternaModel.idOrganizacionIdInterna = { idOrganizacion: this._activityModel.idOrganizacion };
      this._activityIdInternaModel.idActividadIdInterna = { idActividad: this._activityModel.idActividad };
      this._activityIdInternaModel.codIdInterna = element.idInterna;

      // Ejecutamos el Recurso del EndPoint
      this._activityService.newActivityIdInterna(this._activityIdInternaModel).subscribe(
        response => {
          if (response.status !== 200) {
            this.showToast('error', 'Error al Ingresar la Información de la Id Interna del Proyecto', response.message);
          } else if (response.status === 200) {
            // Verificamos que la Actividad no Exista en la BD
            this.showToast('default', 'La Información de la Id Interna del Proyecto, se ha ingresado con exito', response.message);
          }
        },
        error => {
          // Informacion del Error que se capturo de la Secuencia
          this.showToast('error', 'Ha ocurrido un Error al Registrar la información de la Id Interna del Proyecto, por favor verifica que todo este bien!!', JSON.stringify(error.message));
        },
      );
    });
    // Return
  } // FIN | newActividadIdInterna


  /****************************************************************************
  * Funcion: deleteActividadIdInterna
  * Object Number: 024.1
  * Fecha: 11-02-2019
  * Descripcion: Method que Elimina la Id Interna de la Actividad
  * Objetivo: Eliminar la Id Interna del Proyecto
  * @param { codIdInterna }
  ****************************************************************************/
  deletedActividadIdInterna(codIdInterna: string) {
    // Ejecutamos el Recurso del EndPoint
    this._activityService.deletedActivityIdInterna(codIdInterna).subscribe(
      response => {
        if (response.status !== 200) {
          this.showToast('error', 'Error al Eliminar la Id Interna de la Planificacion del Proyecto', response.message);
        } else if (response.status === 200) {
          // Verificamos que la Actividad no Exista en la BD
          this.showToast('default', 'La Información de la Id Interna del Proyecto, se ha eliminado con exito', response.message);
        }
      },
      error => {
        // Informacion del Error que se capturo de la Secuencia
        this.showToast('error', 'Ha ocurrido un Error al Actualizar la información de Id Interna del Proyecto, por favor verifica que todo este bien!!', JSON.stringify(error.error.message));
        // Ocultamos el Loader la Funcion
        setTimeout(() => {
          this._spinner.hide();
        }, 2000);
      },
    );
    // Return
  } // FIN | deleteActividadIdInterna
}
