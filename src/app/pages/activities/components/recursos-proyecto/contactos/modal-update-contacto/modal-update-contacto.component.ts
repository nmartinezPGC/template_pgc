import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import {ContactosModel } from '../../../../models/recursos-proyecto/contactos.model';
import { ContactosService } from '../../../../services/contactos.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'ngx-modal-update-contacto',
  templateUrl: './modal-update-contacto.component.html',
  styleUrls: ['./modal-update-contacto.component.scss'],
  providers: [ContactosService, ToasterService],
})
export class ModalUpdateContactoComponent implements OnInit {
  @Input() modalHeader;
  // se crea la variable receptora de la Informacion
  @Input() idContactoHeader;

  public JsonReceptionFyByContactos: any;
  public _contactosModel1: ContactosModel;
  data4: any;
  public JsonReceptionTipoPerfiles: any;
  data1: any;
  arrayTipoPerfiles: any
  data2: any;
  arrayTratos: any;
  public JsonReceptionPaises: any;
  public JsonReceptionOrg: any;
  public JsonReceptionTratos: any
  marked = false;
  theCheckbox = false;

  p: number = 1;
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
  config: ToasterConfig;

  isNewestOnTop = true;
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;
  settings: any;
  public responsedata: any;



  constructor(private activeModal: NgbActiveModal, public _contactosService1: ContactosService,
    protected _router: Router, private _toasterService: ToasterService, private _spinner: NgxSpinnerService) {
    this.responsedata = { 'error': false, 'msg': 'error campos solicitado' }

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
  // this._toasterService.pop(toast);
} // FIN | showToast




  /**
   * closeModal
   * Cerrar ventana Modal desde el boton
   */
  closeModal() {
    this.activeModal.close();
  }
  ngOnInit() {
     /**
  * Configuracion Inicial del Dropdown List
  * Autor: Jorge Escamilla
  * Fecha: 05/07/2019
  */
    // console.log(this.modalidEspacioTrabajo);
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


    this._contactosModel1 = new ContactosModel(
      true, 0, null, // datos generales
      null, null, null, null, null, null, null, null, null, null, null, null, null, // datos de tabla generales
      null, 0, null, 0, null, 0, null,
      );
    this._contactosModel1.activo;
    this._contactosModel1.idContacto;
    this._contactosModel1.codigoContacto;
    this._contactosModel1.nombreContacto;
    this._contactosModel1.apellidoContacto;
    this._contactosModel1.funcionContacto;
    this._contactosModel1.organizacionContacto;
    this._contactosModel1.dFisicaContacto;
    this._contactosModel1.email1Contacto;
    this._contactosModel1.email2Contacto;
    this._contactosModel1.telefono1Contacto;
    this._contactosModel1.telefono2Contacto;
    this._contactosModel1.ext1Contacto;
    this._contactosModel1.ext2Contacto;
    this._contactosModel1.idTratoIN;
    this._contactosModel1.IdOrgIN;
    this._contactosModel1.idPaisIN;


    this.selectedItemsPais = [
    ];


   // this.onItemSlectPais(this.selectedItemsPais);
    this.fyByIdContactos(this.idContactoHeader);
    this.ListAllTrato();
    this.ListAllOrg()
    this.paisesAllListService();

  }

  fyByIdContactos(idContacto: number) {
    // Ejecutamos el Recurso del EndPoint
    this._contactosService1.FindByIdContacto(idContacto).subscribe(
      response => {
        if (response.status !== 200) {
          this.showToast('error', 'Error al Eliminar la Id Interna de la Planificacion del Proyecto', response.message);
        } else if (response.status === 200) {
          this.JsonReceptionFyByContactos = response.data;
          // instancia data con los perfiles;
          this.data4 = this.JsonReceptionFyByContactos;
          this._contactosModel1.activo = this.data4.activo;
          this._contactosModel1.codigoContacto = this.data4.codigoContacto;
          this._contactosModel1.nombreContacto = this.data4.nombreContacto;
          this._contactosModel1.apellidoContacto = this.data4.apellidoContacto;
          this._contactosModel1.funcionContacto = this.data4.funcionContacto;
          this._contactosModel1.organizacionContacto = this.data4.organizacionContacto;
          this._contactosModel1.dFisicaContacto = this.data4.dFisicaContacto;
          this._contactosModel1.email1Contacto = this.data4.email1Contacto;
          this._contactosModel1.email2Contacto = this.data4.email2Contacto;
          this._contactosModel1.telefono1Contacto = this.data4.telefono1Contacto;
          this._contactosModel1.telefono2Contacto = this.data4.telefono2Contacto;
          this._contactosModel1.ext1Contacto = this.data4.ext1Contacto;
          this._contactosModel1.ext2Contacto = this.data4.ext2Contacto;
          // carga de los datos relacionales
          this._contactosModel1.idTratoIN = this.data4.idTrato.idTrato;
          this._contactosModel1.IdOrgIN = this.data4.idOrganizacion.idOrganizacion;
          this._contactosModel1.descPais = this.data4.idPais.descPais;
          this._contactosModel1.idPais = this.data4.idPais.idPais;

          this.selectedItemsPais = [
            { 'id': this._contactosModel1.idPais, 'itemName': this._contactosModel1.descPais },
          ];
          // Verificamos que la Actividad no Exista en la BD
        }
      },
      error => {
        // Informacion del Error que se capturo de la Secuencia
        this.showToast('error', 'Ha ocurrido un Error al cargar de orgnizacion, por favor verifica que todo este bien!!', JSON.stringify(error.error.message));
        // Ocultamos el Loader la Funcion
      },
    );
    // Return
  } // FIN | deleteActividadIdInterna



/****************************************************************************
  * Funcion: tratosService
  * Object Number: 0002
  * Fecha: 04-07-2019
  * Descripcion: Method tratos
  * Objetivo: hace un llmada a la tabla relacional tratos para carglos
  * Autor: Jorge Escamilla
  ****************************************************************************/
 private ListAllTrato() {
  this._contactosService1.listAllTratos().subscribe(
    response => {
      if (response.status !== 200) {
      } else if (response.status === 200) {
        this. JsonReceptionTratos = response.data;
        // instancia data con los perfiles;
        this.data2 = this. JsonReceptionTratos;
        // Carga los Items para el List de la Smart table
        this.arrayTratos = new Array();

      }
    },
    error => {
      // Redirecciona al Login
      alert('Error en la petición de la API ' + <any>error);

    },
  );
} // FIN | TratosService


/****************************************************************************
  * Funcion: OrgService
  * Object Number: 0003
  * Fecha: 04-07-2019
  * Descripcion: Method organizacion  relacionada con la tabla contactos
  * Objetivo: hace un llmada a la tabla relacional organizacion para carglos
  * Autor: Jorge Escamilla
  ****************************************************************************/
 private ListAllOrg() {
  this._contactosService1.listAllOrg().subscribe(
    response => {
      if (response.status !== 200) {
      } else if (response.status === 200) {
        this. JsonReceptionOrg = response.data;
        // instancia data con los perfiles;
        this.data2 = this. JsonReceptionOrg;
        // Carga los Items para el List de la Smart table
        this.arrayTratos = new Array();

      }
    },
    error => {
      // Redirecciona al Login
      alert('Error en la petición de la API ' + <any>error);

    },
  );
} // FIN | OrgService


 /****************************************************************************
 * Funcion: paisesAllListService
 * Object Number: 0004
 * Fecha:04-07-2019
 * Descripcion: Method paisesAllListService of the Class
 * Objetivo: paisesAllListService listados de los Paises
 * del Formulario de Actividad llamando a la API
 * Autor: Jorge Escamilla
 ****************************************************************************/
private paisesAllListService() {
  this._contactosService1.getAllPaises().subscribe(
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
      // console.log(<any>error);
      this.showToast('error', 'Error al Obtener la Información de los Paises', error);
    },
  );
} // FIN | paisesAllListService

onItemSlectPais(item: any) {
  this._contactosModel1.idPaisIN = item.id;
}


 /****************************************************************************
 * Funcion: updateContactos()
 * Object Number: 0005
 * Fecha: 04-07-2019
 * Descripcion: Method updateContacos
 * Objetivo: actualizar los Contactos existentes perfiles.
 ****************************************************************************/
private UpdateContactos() {
  // Seteo de las variables del Model al json de Java

  this._contactosModel1.idOrganizacion = { idOrganizacion: this._contactosModel1.IdOrgIN };
  this._contactosModel1.idTrato = { idTrato: this._contactosModel1.idTratoIN };
  this._contactosModel1.idPais = { idPais: this._contactosModel1.idPaisIN };

  // this.validateUsuarios(this._usuarioModel);
  const responsedataExt: any = this.responsedata;

  if (responsedataExt.error === true) {
    this.showToast('error', 'Error al ingresar los datos', responsedataExt.msg);
    return -1;
  }
  // Ejecutamos el Recurso del EndPoint
  this._contactosService1.UpdateContactos(this._contactosModel1, this.idContactoHeader).subscribe(
    response => {
      if (response.status !== 200) {
        this.showToast('error', 'Error al Ingresar la Información del Usuario', response.message);
      } else if (response.status === 200) {
        this.showToast('default', 'se actualizo con exito la informacion de la organizacion', response.message);
      this.activeModal.close(this.ngOnInit());
      }
    },

  );
} // FIN | newUsuarioService

}
