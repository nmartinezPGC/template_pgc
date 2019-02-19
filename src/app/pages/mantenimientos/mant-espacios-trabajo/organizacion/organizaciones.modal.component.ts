import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrganizacionService } from '../../services/organizaciones.service';
import { OrganizacionModal } from '../../models/organizacion.modal';
import { Router } from '@angular/router';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { nullSafeIsEquivalent, THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'ngx-organizacion',
  templateUrl: './organizaciones.modal.component.html',
  styleUrls: ['./organizaciones.modal.component.scss'],
  // providers: [NgbActiveModal]
  providers: [OrganizacionService],
})
export class OrganizacionModalComponent implements OnInit {
  // @ ViewChild ( ' primaryColorSample ' );
  muestra: string = "hola";

  @Input() idOrganizacion;

  public JsonReceptionFyByOrganizaciones: any;
  public _OrganizacionModal1: OrganizacionModal;
  data4: any;
  public JsonReceptionTipoPerfiles: any;
  data1: any;
  arrayTipoPerfiles: any
  public JsonCategoria: any;
  data2: any;
  arrayCategoria: any;
  public JsonReceptionPaises: any;

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

  constructor(private activeModal: NgbActiveModal, public _OrganizacionService: OrganizacionService,
    protected _router: Router, private _toasterService: ToasterService) {


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
    this._toasterService.pop(toast);
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

    this._OrganizacionModal1 = new OrganizacionModal(null, null, null, null, null,
      null, null, null, null, null,
      null, null, null, null, null,
      null, null, null, null, null, null);
    this._OrganizacionModal1.codOrganizacionModal;
    this._OrganizacionModal1.inicalesOrganizacionModal;
    this._OrganizacionModal1.nombreOrganizacionModal;
    this._OrganizacionModal1.direccionFisicaOrganizacionModal;
    this._OrganizacionModal1.telefonoOrganizacionModal;
    this._OrganizacionModal1.emailOrganizacionModal;
    this._OrganizacionModal1.deptoReferenciaModal;
    this._OrganizacionModal1.contactoReferenciaModal;
    this._OrganizacionModal1.socioDesarrolloModal;
    this._OrganizacionModal1.agenciaBeneficiariaModadal;
    this._OrganizacionModal1.unidadEjecutoraModal;
    this._OrganizacionModal1.administradorFinancieroModal;
    this._OrganizacionModal1.webOrganizacionModal;
    this._OrganizacionModal1.idTipoOrganizacion1Modal;
    this._OrganizacionModal1.idCatOrganizacion1Modal;
    this._OrganizacionModal1.idPais;
    this._OrganizacionModal1.descPais;

    this.selectedItemsPais = [
    ];


    this.fyByIdOrganizacion(this.idOrganizacion);
    this.TipoOrganizacion();
    this.ListAllCategoria();
    this.paisesAllListService();
    this.onItemSlectPais(this.selectedItemsPais);
  }


  fyByIdOrganizacion(idOrganizacion: number) {
    // Ejecutamos el Recurso del EndPoint
    this._OrganizacionService.FindByIdOrganizacion(idOrganizacion).subscribe(
      response => {
        if (response.status !== 200) {
          this.showToast('error', 'Error al Eliminar la Id Interna de la Planificacion del Proyecto', response.message);
        } else if (response.status === 200) {
          this.JsonReceptionFyByOrganizaciones = response.data;
          // instancia data con los perfiles;
          this.data4 = this.JsonReceptionFyByOrganizaciones;
          this._OrganizacionModal1.codOrganizacionModal = this.data4.codOrganizacion;
          this._OrganizacionModal1.inicalesOrganizacionModal = this.data4.inicalesOrganizacion;
          this._OrganizacionModal1.nombreOrganizacionModal = this.data4.nombreOrganizacion;
          this._OrganizacionModal1.descOrganizacionModal = this.data4.descOrganizacion;
          this._OrganizacionModal1.direccionFisicaOrganizacionModal = this.data4.direccionFisicaOrganizacion;
          this._OrganizacionModal1.telefonoOrganizacionModal = this.data4.telefonoOrganizacion;
          this._OrganizacionModal1.emailOrganizacionModal = this.data4.emailOrganizacion;
          this._OrganizacionModal1.deptoReferenciaModal = this.data4.deptoReferencia;
          this._OrganizacionModal1.contactoReferenciaModal = this.data4.contactoReferencia;
          this._OrganizacionModal1.socioDesarrolloModal = this.data4.socioDesarrollo;
          this._OrganizacionModal1.agenciaBeneficiariaModadal = this.data4.agenciaBeneficiaria;
          this._OrganizacionModal1.unidadEjecutoraModal = this.data4.unidadEjecutora;
          this._OrganizacionModal1.administradorFinancieroModal = this.data4.administradorFinanciero;
          this._OrganizacionModal1.webOrganizacionModal = this.data4.webOrganizacion
          this._OrganizacionModal1.idTipoOrganizacion1Modal = this.data4.idTipoOrganizacion.idTipoOrganizacion
          this._OrganizacionModal1.idCatOrganizacion1Modal = this.data4.idCatOrganizacion.idCatOrganizacion;
          this._OrganizacionModal1.descPais = this.data4.idPaisOrganizacion.descPais;
          this._OrganizacionModal1.idPais = this.data4.idPaisOrganizacion.idPais;

          this.selectedItemsPais = [
            { "id": this._OrganizacionModal1.idPais, "itemName": this._OrganizacionModal1.descPais },
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
  private TipoOrganizacion() {
    this._OrganizacionService.listAllTipoOrganizaciones().subscribe(
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
 * Funcion: perfilesTipoService
 * Object Number: 004
 * Fecha: 08-01-2019
 * Descripcion: Method perfilesTipoService of the Class
 * Objetivo: perfilesTipoService detalle de los Tipos de Perfil llamando a la API
 ****************************************************************************/
  private ListAllCategoria() {
    this._OrganizacionService.listAllCategoria().subscribe(
      response => {
        if (response.status !== 200) {
        } else if (response.status === 200) {
          this.JsonCategoria = response.data;
          // instancia data con los perfiles;
          this.data2 = this.JsonCategoria;
          // Carga los Items para el List de la Smart table
          this.arrayCategoria = new Array();

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
    this._OrganizacionService.getAllPaises().subscribe(
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

  }

}
