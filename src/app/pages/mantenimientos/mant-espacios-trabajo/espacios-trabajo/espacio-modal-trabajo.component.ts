import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { EspaciosTrabajoService } from '../../services/espacio-trabajo.service';
import { EspaciosTrabajoModel } from '../../models/espacio.trabajo.model';



@Component({
  selector: 'ngx-espacio-modal-trabajo',
  templateUrl: './espacio-modal-trabajo.component.html',
  styleUrls: ['./espacio-modal-trabajo.component.scss'],
  providers: [EspaciosTrabajoService],
})
export class EspacioModalTrabajoComponent implements OnInit {
  @Input() modalHeader;
  // se crea la variable receptora de la Informacion
  @Input() modalidEspacioTrabajo;

  public JsonReceptionFyByEspacioTrabajo: any;
  public _Espaciotrabajomodal1: EspaciosTrabajoModel;
  data4: any;
  public JsonReceptionTipoPerfiles: any;
  data1: any;
  arrayTipoPerfiles: any
  public JsonCategoria: any;
  data2: any;
  arrayCategoria: any;
  public JsonReceptionPaises: any;
  public JsonReceptionEstados: any;
  public JsonReceptionTipo: any
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



  constructor(private activeModal: NgbActiveModal, public _EspaciotrabajoService: EspaciosTrabajoService,
    protected _router: Router, private _toasterService: ToasterService) {
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
  * Autor: Edgar RAmirez
  * Fecha: 23/01/2019
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

    this._Espaciotrabajomodal1 = new EspaciosTrabajoModel(
      0, null, // datos generales
      null, null, null, null, // datos de la tabla
      null, 0, null, 0, null, 0, // datos relacionados con la tabla principal

    );
    this._Espaciotrabajomodal1.codEspacioTrabajo;
    this._Espaciotrabajomodal1.nombreEspacioTrabajo;
    this._Espaciotrabajomodal1.descripcionEspacioTrabajo;
    this._Espaciotrabajomodal1.idTipoIN;
    this._Espaciotrabajomodal1.idEstadoIN;
    this._Espaciotrabajomodal1.idPaisIN;

    this.selectedItemsPais = [
    ];


    this.estadoService();
    this.tipoService();
    this.paisesAllListService();
    this.UpdateEspaciostrabajo();
    this.onItemSlectPais(this.selectedItemsPais);
    this.fyByIdEspaciostrabajo(this.modalidEspacioTrabajo);

  }
  fyByIdEspaciostrabajo(idEspacioTrabajo: number) {
    // Ejecutamos el Recurso del EndPoint
    this._EspaciotrabajoService.FindByIdEspacioTrabajo(idEspacioTrabajo).subscribe(
      response => {// console.log("id espacios"+ this.fyByIdEspaciostrabajo);
        if (response.status !== 200) {
          this.showToast('error', 'Error al Eliminar la Id Interna de la Planificacion del Proyecto', response.message);
        } else if (response.status === 200) {
          this.JsonReceptionFyByEspacioTrabajo = response.data;
          // instancia data con los perfiles;
          this.data4 = this.JsonReceptionFyByEspacioTrabajo;
          this._Espaciotrabajomodal1.codEspacioTrabajo = this.data4.codEspacioTrabajo;
          this._Espaciotrabajomodal1.nombreEspacioTrabajo = this.data4.nombreEspacioTrabajo;
          this._Espaciotrabajomodal1.descripcionEspacioTrabajo = this.data4.descripcionEspacioTrabajo;
          this._Espaciotrabajomodal1.idEstadoEspacioTrabajo = this.data4.idEstadoEspacioTrabajo.idEstadoIN;
          this._Espaciotrabajomodal1.idPais = this.data4.idPais.idPaisIN;
          this._Espaciotrabajomodal1.idTipoEspacioTrabajo = this.data4.idTipoEspacioTrabajo.idTipoIN;


          this.selectedItemsPais = [
            { 'id': this._Espaciotrabajomodal1.idPaisIN, 'itemName': this._Espaciotrabajomodal1.idPaisIN },
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
 * Funcion: perfilesTipoService
 * Object Number: 004
 * Fecha: 08-01-2019
 * Descripcion: Method perfilesTipoService of the Class
 * Objetivo: perfilesTipoService detalle de los Tipos de Perfil llamando a la API
 ****************************************************************************/
  private Espaciostrabajo() {
    this._EspaciotrabajoService.getAllEspaciostrabajo().subscribe(
      response => {
        if (response.status !== 200) {
        } else if (response.status === 200) {
          this.JsonReceptionTipoPerfiles = response.data;
          // instancia data con los perfiles;
          this.data1 = this.JsonReceptionTipoPerfiles;
          // Carga los Items para el List de la Smart table
          this.arrayTipoPerfiles = new Array();
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
  } // FIN | perfilesTipoService


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

    this._EspaciotrabajoService.getAllPaises2().subscribe(
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
    this._Espaciotrabajomodal1.idPaisIN = item.id;
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
    this._EspaciotrabajoService.getAllEspaciostrabajo().subscribe(
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
    this._EspaciotrabajoService.getAllEspaciostrabajo().subscribe(
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
 * Funcion: upTipoOrganzacion()
 * Object Number: 0003
 * Fecha: 21-01-2019
 * Descripcion: Method updateTipoOganizacion
 * Objetivo: actualizar los Tipo de organizacion existentes perfiles.
 ****************************************************************************/
  private UpdateEspaciostrabajo() {
    this.validateEspaciotrabajo(this._Espaciotrabajomodal1);
    // Seteo de las variables del Model al json de Java
    this._Espaciotrabajomodal1.idPais = { idPais: this._Espaciotrabajomodal1.idPaisIN };
    this._Espaciotrabajomodal1.idTipoEspacioTrabajo = { idTipo: this._Espaciotrabajomodal1.idTipoIN };
    this._Espaciotrabajomodal1.idEstadoEspacioTrabajo = { idEstado: this._Espaciotrabajomodal1.idEstadoIN };

    // this.validateUsuarios(this._usuarioModel);
    const responsedataExt: any = this.responsedata;

    if (responsedataExt.error === true) {
      this.showToast('error', 'Error al ingresar los datos', responsedataExt.msg);
      return -1;
    }
    // Ejecutamos el Recurso del EndPoint
    this._EspaciotrabajoService.EspaciostrabajoUpdate(this._Espaciotrabajomodal1, this.modalidEspacioTrabajo).subscribe(
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


  /****************************************************************************
  * Funcion: validateTipoOganizacion(_grupoModel: any)
  * Object Number: 0005
  * Fecha: 22-01-2019
  * Descripcion: Method para validar que los campos esten llenos
  * Objetivo: validatePerfiles  procurar que llegue a la base de datos toda la informacion de tipo de organizacion.
  ****************************************************************************/
  private validateEspaciotrabajo(_espaciostrabajoModel1: any) {
    // seteo el modelo para que los campos sean verificados
    // this.responsedata.error = false;
    if (_espaciostrabajoModel1.codEspacioTrabajo === null || _espaciostrabajoModel1.codEspacioTrabajo === '') {
      this.responsedata.msg = 'Debes ingresar el codigo espacio trabajo';
      this.responsedata.error = true;
    } else if (_espaciostrabajoModel1.nombreEspacioTrabajo === null || _espaciostrabajoModel1.nombreEspacioTrabajo === '') {
      this.responsedata.msg = 'Desbes ingresar un nombre espacio trabajo';
      this.responsedata.error = true;
    } else if (_espaciostrabajoModel1.descripcionEspacioTrabajo === null || _espaciostrabajoModel1.descripcionEspacioTrabajo === '') {
      this.responsedata.msg = 'Debes de ingresar una descripcion espacio trabajo';
      this.responsedata.error = true;
    }
    return this.responsedata;
  } // FIN | validateTipoOganizacion(_grupoModel: any)

}
