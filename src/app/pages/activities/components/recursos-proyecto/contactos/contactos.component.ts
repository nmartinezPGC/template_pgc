/**
* @author Jorge Escamilla
* @returns Componente de Documentos
* @name ContactosComponent
* @alias _contactosComponent
* @version 2.0.0
* @fecha 21-06-2019
*/

import { Component, OnInit, Input, ChangeDetectorRef, OnChanges } from '@angular/core';
import { ToasterConfig, ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import { NotificacionesService } from '../../../../shared/services/notificaciones.service';
import {ContactosModel } from '../../../models/recursos-proyecto/contactos.model';
import { ContactosService } from '../../../services/contactos.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {ModalUpdateContactoComponent} from '../../recursos-proyecto/contactos/modal-update-contacto/modal-update-contacto.component';
import {ModalNewContactoComponent} from '../../recursos-proyecto/contactos/modal-new-contacto/modal-new-contacto.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ngx-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.scss'],
  providers: [ContactosService, NotificacionesService],
})
export class ContactosComponent implements OnInit, OnChanges {
  // Variables entre Tabs | Components
  @Input() idProyectoTab: number;
  @Input() idUsuarioTab: number;
  @Input() codigoProyectoTab: string;
  // variable del Json
  @Input() JsonPassData: any;
  // Se comenta; ya que la variable input solo carga en la Modal
  @Input() idContacto;
  data1: any;
  arrayTipoPerfiles: any
  public _contactoModel: ContactosModel;
  // Json reception
  public JsonReceptionEstados: any;
  public JsonReceptionTipo: any;
  public JsonReceptionListContactos: any;
  public JsonReceptionPaises: any;
  public JsonReceptionF
  public JsonReceptionContactos: any;
  public JsonReceptionFyByContactos: any;


  data2: any;
  data: any;
  config: ToasterConfig;
  arrayCategoria: any;
  marked = false;
  theCheckbox = false;
  data3: any;
  arrayOrganizacion: any;
  data4: any;

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
  arrayEspacioTrabajo: any;
  public responsedata: any;



  ngOnChanges(changes) {
   if (changes['idProyectoTab']) {
     // Aquí ya sabes que has recibido un nuevo dato desde cualquier componente.
     const nuevoDato = changes.idProyectoTab;
   }

   if (changes['idUsuarioTab']) {
     // Aquí ya sabes que has recibido un nuevo dato desde cualquier componente.
     const nuevoDato = changes.idUsuarioTab;
   }

   if (changes['codigoProyectoTab']) {
     // Aquí ya sabes que has recibido un nuevo dato desde cualquier componente.
     const nuevoDato = changes.idUsuarioTab;
   }

   if (changes['JsonPassData']) {
     // Aquí ya sabes que has recibido un nuevo dato desde cualquier componente.
     const nuevoDato = changes.JsonPassData;
   }
 }


   // levanta la modal de mantenimineto de espacios de trabjo/consulta
   showLargeModal(idContacto: number) {
    const activeModal = this.modalService.open(ModalUpdateContactoComponent, {
      size: 'lg',
      backdrop: 'static',
      container: 'nb-layout',
    });

    activeModal.componentInstance.modalHeader = 'Large Modal Parametro ';
    // Se cambia a un nombre que hace mencion de los parametros enviados por la Modal
    activeModal.componentInstance.idContactoHeader = idContacto
    // activeModal.componentInstance.idEspacioTrabajo = idEspacioTrabajo;
    // activeModal.componentInstance.JsonReceptionFyByEspaciostrabajo = this.JsonReceptionFyByEspaciotrabajo;

    // this.data3 = this.JsonReceptionEspaciotrabajo;
    // this.arrayEspaciostrabajo = new Array();

  }

  // levanta la modal de mantenimineto de espacios de trabjo/consulta
  showLargeModal1() {
    const activeModal = this.modalService.open(ModalNewContactoComponent, {
      size: 'lg',
      backdrop: 'static',
      container: 'nb-layout',
    });

    activeModal.componentInstance.modalHeader = 'Large Modal Parametro ';
    // Se cambia a un nombre que hace mencion de los parametros enviados por la Modal
    // activeModal.componentInstance.idContactoHeader = idContacto
    // activeModal.componentInstance.idEspacioTrabajo = idEspacioTrabajo;
    // activeModal.componentInstance.JsonReceptionFyByEspaciostrabajo = this.JsonReceptionFyByEspaciotrabajo;

    // this.data3 = this.JsonReceptionEspaciotrabajo;
    // this.arrayEspaciostrabajo = new Array();

  }


 constructor(public _contactoService: ContactosService, protected _router: Router, private modalService: NgbModal,
  private _notificacionesService: NotificacionesService, private _spinner: NgxSpinnerService) {
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
  this._notificacionesService.showToast(this.type, this.title, this.content);
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

} // FIN | showToast



  ngOnInit() {
    /**
    * Configuracion Inicial del Dropdown List
    * Autor: Jorge Escamilla
    * Fecha:01/07/2019
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
  // Ocultamos el Loader la Funcion
  setTimeout(() => {
    this._spinner.hide();
  }, 2000);

  this._contactoModel = new ContactosModel(
   true, 0, null, // datos generales
  null, null, null, null, null, null, null, null, null, null, null, null, null, // datos de tabla generales
  null, 0, null, 0, null, 0, null,
  );

  this.ListAllContactos();


  }

  /****************************************************************************
  * Funcion: getallContacto
  * Object Number: 001
  * Fecha:01-07-2019
  * Descripcion: Method de contactos
  * Objetivo:cargar todos los registrso de la tabla contactos
  * Autor: Jorge Escamilla
  ****************************************************************************/
 private ListAllContactos() {

  this._contactoService.getAllContactos().subscribe(
    response => {
      if (response.status !== 200) {
      } else if (response.status === 200) {
        this.JsonReceptionListContactos = response.data;
        // instancia data con los perfiles;
        this.data3 = this.JsonReceptionListContactos;
        // Carga los Items para el List de la Smart table
        this.arrayOrganizacion = new Array();
      }
    },
    error => {
      // Redirecciona al Login
      alert('Error en la petición de la API ' + <any>error);


    },
  );
}// FIN | function getallContacto

/****************************************************************************
  * Funcion: deleteContactos
  * Object Number: 001
  * Fecha:04-07-2019
  * Descripcion: Method de contactos
  * Objetivo:desabilitar el registrso seleccionado de la tabla contactos
  * Autor: Jorge Escamilla
  ****************************************************************************/

 private deleteContactos(idContacto: number) {

  const responsedataExt: any = this.responsedata;

  if (responsedataExt.error === true) {
    this._notificacionesService.showToast('error', 'Error al ingresar los datos', responsedataExt.msg);
    return -1;
  }
  // Ejecutamos el Recurso del EndPoint
  this._contactoService.DeleteContactos(idContacto).subscribe(
    result => {
      if (result.status !== 200) {
        this._notificacionesService.showToast('error', 'Error al desahabilitar el Contacto con exito', JSON.stringify(result.message));
      } else if (result.status === 200) {
        this._notificacionesService.showToast('default', 'se deshabilito el Contacto de forma exitosa', result.message);
        // this.ListAllCategoria();
      }
      this.ngOnInit();
      this.ListAllContactos();
    },
  );
} // FIN | deleteContactos


}
