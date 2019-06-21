/**
 * @author David Pavon
 * @returns mantenimiento de organizacion.
 * @name espacioTrabajoComponent
 * @alias espacioTrabajoComponent
 * @version 1.0.0
 *
 */
import { Component, OnInit, Input } from '@angular/core';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { Router } from '@angular/router';
import { EspaciosTrabajoService } from '../../services/espacio-trabajo.service';
import { EspaciosTrabajoModel } from '../../models/espacio.trabajo.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { delay } from 'q';
import { LoginService } from '../../../../@theme/components/auth/services/login.service';
import { EspacioModalTrabajoComponent } from './espacio-modal-trabajo.component';
import { templateJitUrl } from '@angular/compiler';
import { UserService } from '../../../../@core/data/users.service';
import { OrganizacionComponent } from '../organizacion/organizacion.component';
import { checkAndUpdateDirectiveDynamic } from '@angular/core/src/view/provider';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'ngx-espacios-trabajo',
  templateUrl: './espacios-trabajo.component.html',
  styleUrls: ['./espacios-trabajo.component.scss'],
  providers: [EspaciosTrabajoService, ToasterService],

})
export class EspaciosTrabajoComponent implements OnInit {
  // Se comenta; ya que la variable input solo carga en la Modal
   @Input() idEspacioTrabajo;

  public _espaciostrabajoModel: EspaciosTrabajoModel;

  // Json reception
  public JsonReceptionEstados: any;
  public JsonReceptionTipo: any;
  public JsonReceptionListEspacioTrabajo: any;
  public JsonReceptionPaises: any;
  public JsonReceptionF
  public JsonReceptionEspacioTrabajo: any;
  public JsonReceptionFyByEspacioTrabajo: any;
  public JsonReceptionListEspaciostrabajo: any;



  data2: any;
  data: any;
  config: ToasterConfig;
  data1: any;
  arrayTipoPerfiles: any
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

  // levanta la modal de mantenimineto de espacios de trabjo/consulta
  showLargeModal(idEspacioTrabajo: number) {
    const activeModal = this.modalService.open(EspacioModalTrabajoComponent, {
      size: 'lg',
      backdrop: 'static',
      container: 'nb-layout',
    });

    activeModal.componentInstance.modalHeader = 'Large Modal Parametro ';
    // Se cambia a un nombre que hace mencion de los parametros enviados por la Modal
    activeModal.componentInstance.modalidEspacioTrabajo = idEspacioTrabajo;
    // activeModal.componentInstance.idEspacioTrabajo = idEspacioTrabajo;
    // activeModal.componentInstance.JsonReceptionFyByEspaciostrabajo = this.JsonReceptionFyByEspaciotrabajo;

    // this.data3 = this.JsonReceptionEspaciotrabajo;
    // this.arrayEspaciostrabajo = new Array();

  }

  constructor(public _espacioTrabajoService: EspaciosTrabajoService, protected _router: Router, private modalService: NgbModal,
     private _toasterService: ToasterService ) {
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
    this._toasterService.pop(toast);
  } // FIN | showToast

  ngOnInit() {
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

    this._espaciostrabajoModel = new EspaciosTrabajoModel(
      true, 0, null, // datos generales
      null, null, null, null, false, false, // datos de la tabla
      null, 0, null, 0, null, null, 0, // datos relacionados con la tabla principal

    );

    this.estadoService();
    this.tipoService();
    this.paisesAllListService();
    this.ListAllEspaciosTrabajo();
 }


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

    this._espacioTrabajoService.getAllPaises2().subscribe(
      result => {
        if (result.status !== 200) {

          this.showToast('error', 'Error al Obtener la Información de los Paises', result.message);
        } else if (result.status === 200) {
          // console.log("paso por aqui 3");
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
        // console.log("paso por aqui 4");
        this.showToast('error', 'Error al Obtener la Información de los Paises', error);
      },
    );
  } // FIN | paisesAllListService
  // selector de paises
  onItemSlectPais(item: any) {
    this._espaciostrabajoModel.idPaisIN = item.id;
  }

  /****************************************************************************
* Funcion: estadoService
* Object Number: 007
* Fecha: 22-01-2019
* Descripcion: Method estadoService of the Class
* Objetivo: estadoService detalle de los estados del usuario llamando a la API
* Autor: Edgar Ramirez
****************************************************************************/
  private estadoService() {
    const idGroupSen: number = 4;
    this._espacioTrabajoService.getAllEstados(idGroupSen).subscribe(
      response => {
        if (response.status !== 200) {

        } else if (response.status === 200) {
          this.JsonReceptionEstados = response.data;
          this.data2 = this.JsonReceptionEstados;
          // Carga los Items para el List de la Smart table
        }
      },
      error => {
        // Redirecciona al Login
        alert('Error en la petición de la API ' + <any>error);
      },
    );
  } // FIN | estadoService

  /****************************************************************************
* Funcion: estadoService
* Object Number: 007
* Fecha: 22-01-2019
* Descripcion: Method estadoService of the Class
* Objetivo: estadoService detalle de los estados del usuario llamando a la API
* Autor: Edgar Ramirez
****************************************************************************/
  private tipoService() {
    const idTipoSen: number = 4;
    //  console.log(this.data3);
    this._espacioTrabajoService.getAllTipo(idTipoSen).subscribe(
      response => {
        // console.log(this.data3)
        if (response.status !== 200) {
          // console.log(response.status);
        } else if (response.status === 200) {
          this.JsonReceptionTipo = response.data;
          this.data2 = this.JsonReceptionTipo;
          // console.log(this.data3);
          // Carga los Items para el List de la Smart table
        }
      },
      error => {
        // Redirecciona al Login
        alert('Error en la petición de la API ' + <any>error);

      },
    );
  } // FIN | estadoService

  /****************************************************************************
  * Funcion:newEspacioTrbajo
  * Object Number: 002
  * Fecha: 21-01-2019
  * Descripcion: Method newEspacio de trabajo
  * Objetivo: crear nuevos Espacios de trabajo
  ****************************************************************************/
  private newEspacioTrabajo() {
    this.validateEspaciotrabajo(this._espaciostrabajoModel);
    // Seteo de las variables del Model al json de Java
    this._espaciostrabajoModel.idEstadoEspacioTrabajo = { idEstado: this._espaciostrabajoModel.idEstadoIN };
    this._espaciostrabajoModel.idTipoEspacioTrabajo = { idTipo: this._espaciostrabajoModel.idTipoIN };
    this._espaciostrabajoModel.idPais = { idPais: this._espaciostrabajoModel.idPaisIN };

    // Ejecutamos el Recurso del EndPoint
    this._espacioTrabajoService.newEspaciosTrabajo(this._espaciostrabajoModel).subscribe(
      response => {
        if (response.status !== 200) {
          // console.log("no paso el recurso 3");
          this.showToast('error', 'Error al Ingresar la Información del Perfil', response.message);
        } else if (response.status === 200) {
          this.showToast('default', 'La Información del espacio trabajo, se ha ingresado con exito', response.message);
          this.ngOnInit();

        }
        // Carga la tabla Nuevamente


      },
      error => {
        // Redirecciona al Login
        alert('Error en la petición de la API ' + <any>error);

      },
    );
  } // FIN | newPerfilService


  // * Funcion: perfilesTipoService
  // * Object Number: 004
  // * Fecha: 08-01-2019
  // * Descripcion: Method perfilesTipoService of the Class
  // * Objetivo: perfilesTipoService detalle de los Tipos de Perfil llamando a la API
  // ****************************************************************************//

  private ListAllEspaciosTrabajo() {

    this._espacioTrabajoService.getAllEspaciostrabajo().subscribe(
      response => {
        if (response.status !== 200) {
        } else if (response.status === 200) {
          this.JsonReceptionListEspaciostrabajo = response.data;
          // instancia data con los perfiles;
          this.data3 = this.JsonReceptionListEspaciostrabajo;
          // Carga los Items para el List de la Smart table
          this.arrayOrganizacion = new Array();
        }
      },
      error => {
        // Redirecciona al Login
        alert('Error en la petición de la API ' + <any>error);


      },
    );
  }// FIN | perfilesTipoService

  /****************************************************************************
  * Funcion: validateTipoOganizacion(_grupoModel: any)
  * Object Number: 0005
  * Feca: 22-01-2019
  * Descripcion: Method para validar que los campos esten llenos
  * Objetivo: validatePerfiles  procurar que llegue a la base de datos toda la informacion de tipo de organizacion.
  ****************************************************************************/
  private validateEspaciotrabajo(_espaciostrabajoModel: any) {
    // seteo el modelo para que los campos sean verificados
    // this.responsedata.error = false;
    if (_espaciostrabajoModel.codEspacioTrabajo === null || _espaciostrabajoModel.codEspacioTrabajo === '') {
      this.responsedata.msg = 'Debes ingresar el codigo espacio trabajo';
      this.responsedata.error = true;
    } else if (_espaciostrabajoModel.nombreEspacioTrabajo === null || _espaciostrabajoModel.nombreEspacioTrabajo === '') {
      this.responsedata.msg = 'Desbes ingresar un nombre espacio trabajo';
      this.responsedata.error = true;
    } else if (_espaciostrabajoModel.descripcionEspacioTrabajo === null || _espaciostrabajoModel.descripcionEspacioTrabajo === '') {
      this.responsedata.msg = 'Debes de ingresar una descripcion espacio trabajo';
      this.responsedata.error = true;
    }
    return this.responsedata;
  } // FIN | validateTipoOganizacion(_grupoModel: any)


  fyByIdEspaciosTrabajo(idEspacioTrabajo: number) {
    // Ejecutamos el Recurso del EndPoint
    this._espacioTrabajoService.FindByIdEspacioTrabajo(idEspacioTrabajo).subscribe(
      response => {
        // console.log("paso por aqui"+ idEspacioTrabajo);
        if (response.status !== 200) {
          this.showToast('error', 'Error al Eliminar la Id Interna de la Planificacion del Proyecto', response.message);
        } else if (response.status === 200) {
          this.JsonReceptionListEspacioTrabajo = response.data;
          // instancia data con los perfiles;
          this.data4 = this.JsonReceptionListEspacioTrabajo;
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

  private cleanEspaciosTrabajos() {
    this.ngOnInit();

  };
/****************************************************************************
  * Funcion: toggleVisibility1
  * Object Number: 004
  * Fecha:13-02-2019
  * Descripcion: Method tIPO DE ORGANIZACION
  * Objetivo:asignar si es alguna unidad ejecutora en los chekcbox
  * Autor: David Ricardo Pavon
  ****************************************************************************/
 toggleVisibility1(e) {

  if (this.marked = e.target.checked) {
    this._espaciostrabajoModel.vistaPublica = true;
  } else {
    this._espaciostrabajoModel.vistaPublica = false;
  }
}
toggleVisibility2(e) {
  if (this.marked = e.target.checked) {
    this._espaciostrabajoModel.espacioPadre = true;
  } else {
    this._espaciostrabajoModel.espacioPadre = false;
  }
}

/*
* Funcion: deleteEspacioTrabajo
  * Object Number: 006
  * Fecha:19-06-2019
  * Descripcion: Method tIPO DE Espacio Trabajo
  * Objetivo:desabilitar un espacio de trabajo
  * Autor: jorge Rene Escamilla
*/
private deleteEspacioTrabajo(idEspacioTrabajo: number) {

  const responsedataExt: any = this.responsedata;

  if (responsedataExt.error === true) {
    this.showToast('error', 'Error al ingresar los datos', responsedataExt.msg);
    return -1;
  }
  // Ejecutamos el Recurso del EndPoint
  this._espacioTrabajoService.EspaciostrabajoDelete(idEspacioTrabajo).subscribe(
    response => {
      if (response.status !== 200) {
        this.showToast('error', 'Error al desahabilitar la organizacion con exito', response.message);
      } else if (response.status === 200) {
        this.showToast('default', 'se deshabilito la organizacion de forma exitosa', response.message);
        // this.ListAllCategoria();
      }
      this.ngOnInit();
      this.ListAllEspaciosTrabajo();
    },
  );
} // FIN | deleteEspacioTrabajo

}





