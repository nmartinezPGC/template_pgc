import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

// Servicios que la Clase nesesitara para su funcionanmiento
import { UserService } from '../../../@core/data/users.service'; // Servicio de Usuarios
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster'; // Servicio de Notificaciones
// import 'style-loader!angular2-toaster/toaster.css';
import { LocalDataSource } from 'ng2-smart-table'; // DataLocal de Ejemplo para el JSON de envio
import { SmartTableService } from '../../../@core/data/smart-table.service'; // Servicio de la SmartTable de la API

import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-new-activity',
  templateUrl: './new-activity.component.html',
  styleUrls: ['./new-activity.component.scss', '../../components/notifications/notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  config: ToasterConfig;

  position = 'toast-top-right';
  animationType = 'fade';
  title = 'HI there! soy Nahum Martinez, creador de la PGC';
  content = `I'm cool toaster!`;
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
        title: 'ID',
        type: 'number',
        width: '20%',
      },
      firstName: {
        title: 'Organización',
        width: '80%',
        edit: false,
        /*editor: {
          type: 'completer',
          config: {
            completer: {
              data: this.data,
              searchFields: 'firstName',
              titleField: 'firstName',
              descriptionField: 'firstName',
            },
          },
        },*/
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

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
               private _toasterService: ToasterService,
               private service: SmartTableService ) {
    this.data = this.service.getData();
    // console.log( this.data );
    this.source.load( this.data );
      // Inicializa el ToasterService
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
  // console.log(this._userService.getIdentity().userName);
    // Llamado a la Funcion: 005, la cual obtiene el detalle da la Info. del User
    this.userDatailsService();
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
      // event.newData['firstName'] += ' + added in code';
      event.confirm.resolve(event.newData);
      // console.log('Dato de la Fila Nueva ' + event.newData.id );
      // const parseEvent: any = JSON.stringify(event.newData);
      // console.log('onCreateConfirm +++ ' + parseEvent);
    } else {
      event.confirm.reject();
    }
  } // FIN | onDeleteConfirm


  /* ********************************************************************************************************** */
  /* ***************************** Funciones Propias de la Clase ************************************************/

  /****************************************************************************
  * Funcion: userDatailsService
  * Object Number: 00
  * Fecha: 16-08-2018
  * Descripcion: Method userDatailsService of the Class
  * Objetivo: userDatailsService detalle del Usuario llamando a la API
  ****************************************************************************/
  private userDatailsService() {
    this._userService.getUserDetails( this._userService.getIdentity().userName ).subscribe(
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

}
