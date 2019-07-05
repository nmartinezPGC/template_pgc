import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import {ContactosModel } from '../../../../models/recursos-proyecto/contactos.model';
import { ContactosService } from '../../../../services/contactos.service';
import { delay } from 'q';
import { UserService } from '../../../../../../@core/data/users.service';


@Component({
  selector: 'ngx-modal-new-contacto',
  templateUrl: './modal-new-contacto.component.html',
  styleUrls: ['./modal-new-contacto.component.scss'],
  providers: [ContactosService, ToasterService],
})
export class ModalNewContactoComponent implements OnInit {

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
  public secuenciaDeActividad: any;
  marked = false;
  theCheckbox = false;

  p: number = 1;
  dropdownList = [];
  dropdownListPais = [];
  selectedItems = [];
  selectedItemsPais = [];
  dropdownSettings = {};
  public JsonReceptionUserDetail: any;
  public idUsuarioSed: number;


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
    protected _router: Router, private _toasterService: ToasterService, public _userService: UserService) {
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

    this._contactosModel1 = new ContactosModel(
      true, 0, null, // datos generales
      null, null, null, null, null, null, null, null, null, null, null, null, null, // datos de tabla generales
      null, 0, null, 0,
      );



    this.selectedItemsPais = [
    ];

    this.userDatailsService();
    this.ListAllTrato();
    this.ListAllOrg()
    this.userDatailsService();

  }


  /****************************************************************************
  * Funcion: newUsuarioService
  * Object Number: 005
  * Fecha: 21-01-2019
  * Descripcion: Method newUsuarioService
  * Objetivo: crear nuevos usuarios.
  * Autor: Edgar Ramirez
  ****************************************************************************/
 async  newOrganizacion() {


  this.getSecuenciaListService('NEW-CT');


  await delay(100);
  this.validateContactos(this._contactosModel1);

  const responsedataExt: any = this.responsedata;

  if (responsedataExt.error === true) {
    this.showToast('error', 'Error al ingresar los datos', responsedataExt.msg);
    return -1;
  }

  this._contactosModel1.idOrganizacion = { idOrganizacion: this._contactosModel1.IdOrgIN };
  this._contactosModel1.idTrato = { idTrato: this._contactosModel1.idTratoIN };
 // this._OrganizacionModal1.idTipoOrganizacion = { idTipoOrganizacion: this._OrganizacionModal1.idTipoOrganizacion1 };


  if (responsedataExt.error === true) {
    this.showToast('error', 'Error al ingresar los datos', responsedataExt.msg);
    return -1;
  }
  // Ejecutamos el Recurso del EndPoint
  this._contactosService1.newContactos(this._contactosModel1).subscribe(
    response => {

      if (response.status !== 200) {
        // console.log('antes de---NEW')
        this.showToast('error', 'Error al Ingresar la Información del Usuario', response.message);
      } else if (response.status === 200) {
        this.showToast('default', 'La Información de la Organizacion, se ha ingresado con exito', response.message);
        //  this.ListAllCategoria();

      }
      // this.ListAllOranizacion();
      this.updateSecuenciaService(this.idUsuarioSed, 2);
      this.ngOnInit();
    },
  );
} // FIN | newUsuarioService


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
} // FIN | perfilesTipoService


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
} // FIN | perfilesTipoService


/****************************************************************************
   * Funcion: validateTipoOganizacion(_grupoModel: any)
   * Object Number: 0005
   * Fecha: 22-01-2019
   * Descripcion: Method para validar que los campos esten llenos
   * Objetivo: validatePerfiles  procurar que llegue a la base de datos toda la informacion de tipo de organizacion.
   ****************************************************************************/
  private validateContactos(_contactosModel1: any) {
    // seteo el modelo para que los campos sean verificados
    this.responsedata.error = false;
    if (_contactosModel1.codigoContacto === '' || _contactosModel1.codigoContacto === null) {
      this.responsedata.msg = 'Por favor ingresa el nombre del contacto';
      this.responsedata.error = true;
    {if (_contactosModel1.nombreContacto === '' || _contactosModel1.nombreContacto === null) {
      this.responsedata.msg = 'Por favor ingresa el nombre del contacto';
      this.responsedata.error = true;
    } if (_contactosModel1.apellidoContacto === '' || _contactosModel1.apellidoContacto === null) {
      this.responsedata.msg = 'Por favor ingrese el apellido del contacto';
      this.responsedata.error = true;
    } if (_contactosModel1.funcionContacto === '' || _contactosModel1.funcionContacto === null) {
      this.responsedata.msg = 'Por favor ingrese la funcion del contacto';
      this.responsedata.error = true;
    } if (_contactosModel1.organizacionContacto === '' || _contactosModel1.organizacionContacto === null) {
      this.responsedata.msg = 'Por favor ingrese el nombre de la organizacion';
      this.responsedata.error = true;
    } if (_contactosModel1.dFisicaContacto === '' || _contactosModel1.dFisicaContacto === null) {
      this.responsedata.msg = 'Por favor ingrese la direcion fisica del contacto';
      this.responsedata.error = true;
    } if (_contactosModel1.email1Contacto === '' || _contactosModel1.email1Contacto === null) {
      this.responsedata.msg = 'Por favor ingrese un email1 del contacto';
      this.responsedata.error = true;
    } if (_contactosModel1.email2Contacto === '' || _contactosModel1.email2Contacto === null) {
      this.responsedata.msg = 'Por favor ingrese un email2 del contacto';
      this.responsedata.error = true;
    } if (_contactosModel1.telefono1Contacto === '' || _contactosModel1.telefono1Contacto === null) {
      this.responsedata.msg = 'Por favor ingrese un telefono1 del contacto';
      this.responsedata.error = true;
    } if (_contactosModel1.telefono2Contacto === '' || _contactosModel1.telefono2Contacto === null) {
      this.responsedata.msg = 'Por favor ingrese un telefono2 del contacto';
      this.responsedata.error = true;
    } if (_contactosModel1.ext1Contacto === '' || _contactosModel1.ext1Contacto === null) {
      this.responsedata.msg = 'Por favor ingrese la extencion1 del contacto';
      this.responsedata.error = true;
    } if (_contactosModel1.ext2Contacto === '' || _contactosModel1.ext2Contacto === null) {
      this.responsedata.msg = 'Por favor ingrese un extencion2 del contacto';
      this.responsedata.error = true;
    }
    return this.responsedata;
  } // FIN
    }
  }
 /*****************************************************
    * Funcion: FND-00001
    * Fecha: 21-01-2019
    * Descripcion: Funcion que Obtiene la Secuencia del
    * Proyecto o Actividad
    * Params: codSecuencia
    ******************************************************/
   protected getSecuenciaListService(codSecuencia: string) {
    // Envia la Secuencia a Buscar
    this._contactosService1.getSecuenciaActividad(codSecuencia).subscribe(
      result => {
        if (result.status !== 200) {
          this.showToast('error', 'Error al Obtener la Información de la Secuencia', JSON.stringify(result.message));
        } else if (result.status === 200) {
          this.secuenciaDeActividad = result.data;

          // Componemos la Secuencia a Generar
          const prefixHND: string = 'CT-';
          this._contactosModel1.codigoContacto = prefixHND + (Number(this.secuenciaDeActividad.valor2));
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
    // console.log('ID Usuario ' + this.idOrganizacion);

    this._contactosService1.updateSecuence(jsonSecuencia, idSecuencia).subscribe(
      result => {
        // console.log(this._OrganizacionService.updateSecuence,'paso por aqui')
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

  protected cleanOrganizacione() {

    this.ngOnInit();
  }
  ;
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
          this.idUsuarioSed = this.JsonReceptionUserDetail.idUsuario;
         // console.log( 'Datos de Usaurio' + this.idUsuarioSed);


        }
      },
      error => {
        // Redirecciona al Login
        alert('Error en la petición de la API ' + <any>error);

      },
    );
  } // FIN | userDatailsService

}
