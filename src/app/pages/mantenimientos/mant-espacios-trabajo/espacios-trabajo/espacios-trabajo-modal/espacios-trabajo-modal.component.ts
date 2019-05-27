import { Component, OnInit, Input } from '@angular/core';
import { EspaciosTrabajoService } from '../../../services/espacio-trabajo.service';
import { EspaciosTrabajoModel } from '../../../models/espacio.trabajo.model';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-espacios-trabajo-modal',
  templateUrl: './espacios-trabajo-modal.component.html',
  styleUrls: ['./espacios-trabajo-modal.component.scss'],

  providers: [EspaciosTrabajoService],
})
export class EspaciosTrabajoModalComponent implements OnInit {
  @Input() idEspacioTrabajo;
  public JsonReceptionFyByOrganizaciones: any;
  public _espaciostrabajoModel1: EspaciosTrabajoModel;
  public JsonReceptionEstados: any;
  public JsonReceptionTipo: any;
  public JsonReceptionListEspaciostrabajo: any;


  data4: any;
  public JsonReceptionTipoPerfiles: any;
  data1: any;
  arrayTipoPerfiles: any
  public JsonCategoria: any;
  data2: any;
  arrayCategoria: any;
  public JsonReceptionPaises: any;
  marked = false;
  theCheckbox = false;
  data3: any;
  arrayOrganizacion: any;

  p: number = 1;

  /**
     * Configuracion del Dropdow List
     * Autor: david pavon
     * Fecha: 23/01/2019
     *
     */
    dropdownList = [];
    dropdownListPais = [];
    selectedItems = [];
    selectedItemsPais = [];
    dropdownSettings = {};
    position =  'toast-bottom-full-width';
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



constructor(private activeModal: NgbActiveModal, public _espaciostrabajoservice: EspaciosTrabajoService,
    protected _router: Router, private _toasterService: ToasterService) {this.responsedata = { 'error': false, 'msg': 'error campos solicitado' } }

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
  closeModal() {
    this.activeModal.close();
  }


  ngOnInit() {
        /**
    * Configuracion Inicial del Dropdown List
    * Autor: Edgar RAmirez
    * Fecha: 23/01/2019
    */
   this.selectedItems = [
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
  this._espaciostrabajoModel1 = new EspaciosTrabajoModel(
    0, null, // datos generales
    null, null, null, null, // datos de la tabla
    null, 0, null, 0, null, 0, // datos relacionados con la tabla principal
  );

  this.selectedItemsPais = [
  ];


  this.estadoService();
  this.tipoService();
  this.paisesAllListService();
  this.ListAllEspaciosTrabajo();


  }


  fyByIdEspaciosTrabajo(idEspacioTrabajo: number) {
    // Ejecutamos el Recurso del EndPoint
    this._espaciostrabajoservice.FindByIdEspacioTrabajo(idEspacioTrabajo).subscribe(
      response => {
        if (response.status !== 200) {
          this.showToast('error', 'Error al Eliminar la Id Interna de la Planificacion del Proyecto', response.message);
        } else if (response.status === 200) {
          this.JsonReceptionFyByOrganizaciones = response.data;
          // instancia data con los perfiles;
          this.data4 = this.JsonReceptionFyByOrganizaciones;
          this._espaciostrabajoModel1.codEspacioTrabajo = this.data4.codEspacioTrabajo;
          this._espaciostrabajoModel1.nombreEspacioTrabajo = this.data4.nombreEspacioTrabajo;
          this._espaciostrabajoModel1.descripcionEspacioTrabajo = this.data4.descripcionEspacioTrabajo;
          this._espaciostrabajoModel1.idTipoIN = this.data4.idTipoIN;
          this._espaciostrabajoModel1.idPaisIN = this.data4.idPaisIN;
          this._espaciostrabajoModel1.idEstadoIN = this.data4.idEstadoIN;


          this.selectedItemsPais = [
            { 'id': this._espaciostrabajoModel1.idPaisIN, 'itemName': this._espaciostrabajoModel1.idPaisIN },
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
  * Funcion: paisesAllListService
  * Object Number: 008
  * Fecha: 23-01-2019
  * Descripcion: Method paisesAllListService of the Class
  * Objetivo: paisesAllListService listados de los Paises
  * del Formulario de Actividad llamando a la API
  * Autor: Edgar Ramirez
  ****************************************************************************/

 private paisesAllListService() {

 this._espaciostrabajoservice.getAllPaises2().subscribe(
    result => {
    if (result.status !== 200) {

        this.showToast('error', 'Error al Obtener la Información de los Paises', result.message);
      } else if (result.status === 200) {
       // console.log("paso por aqui 3");
        this.JsonReceptionPaises = result.data;
// console.log(this.JsonReceptionPaises);

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
  this._espaciostrabajoModel1.idPaisIN = item.id;
} /****************************************************************************
* Funcion: estadoService
* Object Number: 007
* Fecha: 22-01-2019
* Descripcion: Method estadoService of the Class
* Objetivo: estadoService detalle de los estados del usuario llamando a la API
* Autor: Edgar Ramirez
****************************************************************************/
  private estadoService() {
    const idGroupSen: number = 4;
    this._espaciostrabajoservice.getAllEstados(idGroupSen).subscribe(
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
    this._espaciostrabajoservice.getAllTipo(idTipoSen).subscribe(
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

 this.validateEspaciotrabajo(this._espaciostrabajoModel1);
  // Seteo de las variables del Model al json de Java
    this._espaciostrabajoModel1.idEstadoEspacioTrabajo = { idEstado: this._espaciostrabajoModel1.idEstadoIN };
    // console.log("pasa por aqui el tipo");

    this._espaciostrabajoModel1.idTipoEspacioTrabajo = { idTipo: this._espaciostrabajoModel1.idTipoIN };
    this._espaciostrabajoModel1.idPais = { idPais: this._espaciostrabajoModel1.idPaisIN };

  // Ejecutamos el Recurso del EndPoint
  this._espaciostrabajoservice.newEspaciosTrabajo(this._espaciostrabajoModel1).subscribe(
    response => {
      if (response.status !== 200) {
        // console.log("no paso el recurso 3");
        this.showToast('error', 'Error al Ingresar la Información del Perfil', response.message);
      } else if (response.status === 200) {
        this.showToast('default', 'La Información del espacio trabajo, se ha ingresado con exito', response.message);
        // Carga la tabla Nuevamente
        this.ListAllEspaciosTrabajo();
      }
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

 this._espaciostrabajoservice.getAllEspaciostrabajo().subscribe(
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
 }

 // FIN | perfilesTipoService
   /****************************************************************************
   * Funcion: validateTipoOganizacion(_grupoModel: any)
   * Object Number: 0005
   * Fecha: 22-01-2019
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

  fyByIdOrganizacion(idOrganizacion: number) {
    // Ejecutamos el Recurso del EndPoint
    this._espaciostrabajoservice.FindByIdEspacioTrabajo(idOrganizacion).subscribe(
      response => {
        if (response.status !== 200) {
          this.showToast('error', 'Error al Eliminar la Id Interna de la Planificacion del Proyecto', response.message);
        } else if (response.status === 200) {
          this.JsonReceptionListEspaciostrabajo = response.data;
          // instancia data con los perfiles;
          this.data4 = this.JsonReceptionListEspaciostrabajo;
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




}
