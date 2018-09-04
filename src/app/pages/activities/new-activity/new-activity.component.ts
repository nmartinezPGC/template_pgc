import { Component, OnInit } from '@angular/core';

// import { CompleterService, CompleterData } from 'ng2-completer';
import { CompleterData } from 'ng2-completer';

// import {MatButtonModule} from '@angular/material/button';

// Servicios que la Clase nesesitara para su funcionanmiento
import { UserService } from '../../../@core/data/users.service'; // Servicio de Usuarios
import { ListasComunesService } from '../../common-list/services/listas-comunes.service'; // Servicio de Lista de Estados

import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster'; // Servicio de Notificaciones
// import 'style-loader!angular2-toaster/toaster.css';
import { LocalDataSource } from 'ng2-smart-table'; // DataLocal de Ejemplo para el JSON de envio
// import { SmartTableService } from '../../../@core/data/smart-table.service'; // Servicio de la SmartTable de la API

import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-new-activity',
  templateUrl: './new-activity.component.html',
  styleUrls: ['./new-activity.component.scss', '../../components/notifications/notifications.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush, // Se usa para Actualizar la Informacion con otro evento
  // providers: [ ToasterService, SmartTableService ],
})
export class NewActivityComponent implements OnInit {
  /****************************************************************************
  * Variables: Definicion de las Variables de la Clase
  * Fecha: 16-08-2018
  * Descripcion: variables que se usan en toda la Clase de forma publica y
  * privada
  * Objetivo: Tener el acceso a todas las variables de la Clase
  ****************************************************************************/
 // Configuracion del Toaster-Notifications
 protected captain: string;

 protected captains = ['James T. Kirk', 'Benjamin Sisko', 'Jean-Luc Picard', 'Spock', 'Jonathan Archer', 'Hikaru Sulu', 'Christopher Pike', 'Rachel Garrett' ];

 protected dataService: CompleterData;

 datos = [
  {organinizacion : 'Organinizacion 1'},
  {organinizacion : 'Organinizacion 2'},
  {organinizacion : 'Organinizacion 3'},
]


  config: ToasterConfig;

  position = 'toast-bottom-right';
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

  // Configuracion de la SmartTable
  data: any;

  settings = {
    add: {
      confirmCreate: true,
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
    actions: {
      columnTitle: 'Acciones',
      add: true,
      delete: true,
      edit: true,
    },
    columns: {
      id: {
        title: 'ID Interna',
        type: 'number',
        width: '20%',
      },
      firstName: {
        title: 'Organización',
        width: '80%',
        disable: false,
        editor: {
          type: 'completer',
          config: {
            completer: {
              data: this.datos,
              searchFields: 'organinizacion',
              titleField: 'organinizacion',
              descriptionField: 'organinizacion',
              // valuePrepareFunction: (value) => { return this.datos }
            },
          },
        },
      },
    },
    attr: {
      class: 'form-control',
    },
  };

  source: LocalDataSource = new LocalDataSource();

  // Variables Tipo JSON, para usarlas en los Servicios Invocados
  public JsonReceptionEstados: any;
  public JsonReceptionSectorEjecutor: any;
  public JsonReceptionEstrategias: any;
  public JsonReceptionPresupuesto: any;

  public JsonOrganizationSelect: any;

  // private toasterService: ToasterService;

  // FIN | Definicion de las Variables de la Clase


  /****************************************************************************
  * Funcion: constructor
  * Object Number: 001
  * Fecha: 16-08-2018
  * Descripcion: Method constructor of the Class
  * Objetivo: constructor in the method header API
  ****************************************************************************/
  constructor( private _userService: UserService,
               private _listasComunesService: ListasComunesService,
               // private service: SmartTableService,
               private _toasterService: ToasterService ) {
              // private _completerService: CompleterService ) {
    // this.data = this.service.getData();
    // console.log( this.data );
    // this.source.load( this.data );
      // Inicializa el ToasterService
      // this.dataService = _completerService.local(this.datos, 'color', 'color');
    // this.toasterService = _toasterService;

  } // FIN | constructor


  /****************************************************************************
  * Funcion: ngOnInit
  * Object Number: 002
  * Fecha: 16-08-2018
  * Descripcion: Method ngOnInit of the Class
  * Objetivo: ngOnInit in the method header API
  ****************************************************************************/
  ngOnInit() {
    // Llamado a la Funcion: 007, la cual obtiene el detalle da la Info.
    // del Usuario
    this.userDatailsService();

    // Llamado a la Funcion: 008, la cual obtiene el listado de los Estados de
    // que nesesita el Formulario de Actividades
    this.estadosListService();

    // Llamado a la Funcion: 009, la cual obtiene el listado de los Estados de
    // que nesesita el Formulario de Actividades
    this.sectorEjecutorListService();

    // Llamado a la Funcion: 010, la cual obtiene el listado de las Estretegias
    // de que nesesita el Formulario de Actividades
    this.estrategiasListService();

    // Llamado a la Funcion: 011, la cual obtiene el listado de los Presupuestos
    // de que nesesita el Formulario de Actividades
    this.presupuestoListService();

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
  * Funcion: toasterconfig
  * Object Number: 004.1
  * Fecha: 16-08-2018
  * Descripcion: Method showToast of the Class
  * Objetivo: showToast in the method header API
  ****************************************************************************/
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      showCloseButton: { 'warning': true, 'error': false },
    }); // FIN | toasterconfig


  /****************************************************************************
  * Funcion: onDeleteConfirm
  * Object Number: 005
  * Fecha: 20-08-2018
  * Descripcion: Method para Borrar Items de la SmartTable
  * Objetivo: enviar al Json de ID'Intermas la información que ocupa la API
  ****************************************************************************/
  onDeleteConfirm(event): void {
    if (window.confirm('¿ Estas seguro de borrar la Organización ?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  } // FIN | onDeleteConfirm


  /****************************************************************************
  * Funcion: onCreateConfirm
  * Object Number: 006
  * Fecha: 20-08-2018
  * Descripcion: Method para Borrar Items de la SmartTable
  * Objetivo: enviar al Json de ID'Intermas la información que ocupa la API
  ****************************************************************************/
  onCreateConfirm(event) {
    if (window.confirm('¿ Estas seguro de agregar una organización ?')) {
      event.newData['firstName'] += ' + ' + this.JsonOrganizationSelect;
      event.confirm.resolve(event.newData);
      // console.log('Dato de la Fila Nueva ' + event.newData.id );
      // const parseEvent: any = JSON.stringify(event.newData);
      // this.JsonOrganizationSelect = event.newData;
     // console.log('onCreateConfirm +++ ' + this.JsonOrganizationSelect);
    } else {
      event.confirm.reject();
    }
  } // FIN | onCreateConfirm

  onEditedCompleter(event: { title: '' }): boolean {
    // this.cell.newValue = event.title;
    this.JsonOrganizationSelect = event.title;
    // const vari = JSON.stringify(event);
      // console.log('onCreateConfirm +++ ' + vari);
    return false;
  }


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
    this._userService.getUserDetails( this._userService.usernameHeader ).subscribe(
      result => {

        if (result.status !== 200) {
          // console.log(result.status);
        } else {
          // this.productos = result.data;
          // console.log(result.status);
          // console.log(result.data);
        }
      },
      error => {
        // console.log(error);
        // console.log(<any>error);
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
    this._listasComunesService.getAllEstados().subscribe(
      result => {
        if (result.status !== 200) {
          // console.log(result.status);
          this.showToast('danger', 'Error al Obtener la Información de Estados', result);
        } else if (result.status === 200) {
          this.JsonReceptionEstados = result.data;
        }
      },
      error => {
        // console.log(<any>error);
        this.showToast('danger', 'Error al Obtener la Información de Estados', error);
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
          // console.log(result.status);
        } else if (result.status === 200) {
          this.JsonReceptionSectorEjecutor = result.data;
        }
      },
      error => {
        // console.log(<any>error);
        this.showToast('danger', 'Error al Obtener la Información de Sectores', error);
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
          // console.log(result.status);
        } else if (result.status === 200) {
          this.JsonReceptionEstrategias = result.data;
        }
      },
      error => {
        // console.log(<any>error);
        this.showToast('danger', 'Error al Obtener la Información de las Estrategias', error);
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
          // console.log(result.status);
        } else if (result.status === 200) {
          this.JsonReceptionPresupuesto = result.data;
         // console.log(this.JsonReceptionPresupuesto);
        }
      },
      error => {
        // console.log(<any>error);
        this.showToast('danger', 'Error al Obtener la Información de los Presupuestos', error);
      },
    );
  } // FIN | presupuestoListService

}
