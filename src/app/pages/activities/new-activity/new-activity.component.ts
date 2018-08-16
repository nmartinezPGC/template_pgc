import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

// Servicios que la Clase nesesitara para su funcionanmiento
import { UserService } from '../../../@core/data/users.service'; // Servicio de Usuarios
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster'; // Servicio de Notificaciones

@Component({
  selector: 'ngx-new-activity',
  templateUrl: './new-activity.component.html',
  styleUrls: ['./new-activity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ ToasterService ],
})
export class NewActivityComponent implements OnInit {
  /****************************************************************************
  * Variables: Definicion de las Variables de la Clase
  * Fecha: 16-08-2018
  * Descripcion: variables que se usan en toda la Clase de forma publica y
  * privada
  * Objetivo: Tener el acceso a todas las variables de la Clase
  ****************************************************************************/
  config: ToasterConfig;

  position = 'toast-top-right';
  animationType = 'fade';
  title = 'HI there!';
  content = `I'm cool toaster!`;
  timeout = 5000;
  toastsLimit = 5;
  type = 'default';

  isNewestOnTop = true;
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;


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
               private _toasterService: ToasterService ) {
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
    this._toasterService.popAsync(toast);
  } // FIN | showToast

  /* ***************************** Funciones Propias de la Clase ************************************************/

  /****************************************************************************
  * Funcion: userDatailsService
  * Object Number: 005
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


  public toasterconfig1: ToasterConfig =
    new ToasterConfig({
      showCloseButton: { 'warning': true, 'error': false }
    });

}
