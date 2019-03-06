/**
* @author Nahum Martinez
* @returns Ubicaciones de los Proyectos
* @name UbicacionComponent
* @alias _ubicacionComponent
* @version 1.0.0
* @fecha 2019-02-21
*/
import { Component, OnInit, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { CompleterService, CompleterData } from 'ng2-completer';
import { ListasComunesService } from '../../../common-list/services/listas-comunes.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { Router } from '@angular/router';
import { ServiceUbicacionService } from '../../services/service-ubicacion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivityUbicacionModel } from '../../models/model-ubicacion-activity';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeolocalizacionComponent } from '../geolocalizacion/geolocalizacion.component';

@Component({
  selector: 'ngx-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.scss'],
  providers: [ToasterService, ListasComunesService, ServiceUbicacionService],
})
export class UbicacionComponent implements OnInit, OnChanges {
  // Variables entre Tabs | Components
  @Input() idProyectoTab: number;
  @Input() idUsuarioTab: number;
  @Input() codigoProyectoTab: string;

  // variable del Json
  @Input() JsonPassData: any;

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

  // Loading data Loader
  public loadingData: boolean = true;
  public msgLoader;

  // Variables de Configuracion del Usuario
  public idTipoOrganizacionUsario: number;

  // Configuracion del Toaster-Notifications
  protected captain: string;

  redirectDelay: number = 0;

  protected dataService: CompleterData;

  config: ToasterConfig;

  public findData: boolean;

  // Total de Porcentaje de Participacion
  public totalParticipacion: number = 0;

  /**
   * Configuracion del Dropdow List
   */
  dropdownList = [];
  dropdownListPais = [];
  dropdownListEspacioTrabajo = [];
  selectedItems = [];
  selectedItemsPais = [];
  selectedItemsEspacioTrabajo = [];
  dropdownSettings = {};

  // Consfiguracion del Notificador
  position = 'toast-bottom-full-width';
  animationType = 'slideDown';
  title = 'Se ha grabado la Información! ';
  content = 'los cambios han sido grabados temporalmente, en la PGC!';
  timeout = 20000;
  toastsLimit = 5;
  type = 'default';

  isNewestOnTop = true;
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;

  page: number = 1;

  // Variables de los Json Recepcionadores de la Informacion
  public JsonReceptionNivelImplementacion: any;
  public JsonReceptionNivelUbicacionImplementacion: any;
  public JsonReceptionUbicacion: any;

  public JsonIdUbicacionesProyecto = [];

  public JsonUbicacionesImplements: any;

  // Modelo de la Clase
  public _activityUbicacionModel: ActivityUbicacionModel;

  // Variables de Captura
  public selectedIdUbicacionImpl: string;
  public nombreNivelUbicacionSeleted: string;
  public nombreNivelImplSelected: string;
  public nombreUbicacionSelected: any;

  /****************************************************************************
  * Funcion: constructor
  * Object Number: 001
  * Fecha: 16-08-2018
  * Descripcion: Method constructor of the Class
  * Objetivo: constructor in the method header API
  ****************************************************************************/
  constructor(private modalService: NgbModal,
    private _listasComunesService: ListasComunesService,
    // private service: SmartTableService,
    private changeDetectorRef: ChangeDetectorRef,
    // Inicializa el ToasterService
    private _toasterService: ToasterService,
    protected _router: Router,
    public _serviceUbicacionService: ServiceUbicacionService,
    private _spinner: NgxSpinnerService) {
    /* Llamado a la Funcion: 007, la cual obtiene el detalle da la Info.
     del Usuario */
    this.getListAllNivelImplementacionService();

  } // FIN | constructor



  /****************************************************************************
  * Funcion: ngOnInit
  * Object Number: 002
  * Fecha: 21-02-2019
  * Descripcion: Method ngOnInit of the Class
  * Objetivo: ngOnInit in the method header API
  ****************************************************************************/
  ngOnInit() {
    // console.log('Datos del Form de Actividad ' + JSON.stringify(this.JsonPassData));
    // Inicializacion del Modelo
    this._activityUbicacionModel = new ActivityUbicacionModel(
      0, null, // Nivel de Implementacion
      0, null, // Nivel de Ubicacion
      0, null, null, // Ubicacion de Implementacion
      null, 0, null, 0, null, 0, null, 0, // Ubicaciones a Ingresar
      0, null, null, 0, 0, // Datos de la Actividad con Ubicaciones
      null, // Datos de Usuario
    );

    // Configuracion del Muliteselect
    this.dropdownSettings = {
      singleSelection: true,
      text: 'Seleccione una Opción',
      enableSearchFilter: true,
      searchPlaceholderText: 'Buscar Elemento',
      classes: 'comboSea',
      showCheckbox: false,
      lazyLoading: false,
    };
  } // ngOnInit


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
      showCloseButton: { 'warning': true, 'error': true },
    }); // FIN | toasterconfig


  /****************************************************************************
  * Funcion: onItemSelect
  * Object Number: 005
  * Fecha: 09-01-2019
  * Descripcion: Method para Seleccionar Items de Organizacion para usarlo en Id
  * Internas
  * Objetivo: enviar al Json de ID'Intermas la información que ocupa la API
  ****************************************************************************/
  onItemSelect(item: any) {
    // Envia la Organizacion seleccionada
    this.selectedIdUbicacionImpl = item ? item.id : '';
    this.nombreUbicacionSelected = item ? item.itemName : '';
    this.nombreNivelImplSelected = item ? item.nombreNivelImpl : '';
    this.nombreNivelUbicacionSeleted = item ? item.nombreNivelUbicacion : '';
    // this.selectedPaisOrganizacion = item ? item.descPais : '';
    // this.inicialesOrganizacion = item ? item.inicialesOrganizacion : '';

    // // Setea al Model el valor de la Organizacion
    this._activityUbicacionModel.idUbicacionImpl = { idUbicacionImplementacion: Number(this.selectedIdUbicacionImpl) };
    this._activityUbicacionModel.nombreNivelImpl = this.nombreNivelImplSelected;
    this._activityUbicacionModel.nombreNivelUbicacion = this.nombreNivelUbicacionSeleted;
    this._activityUbicacionModel.nombreUbicacionImpl = this.nombreUbicacionSelected;
    // this._activityModel.idNivelUbicacion = this.selectedDescOrganizacion;
    // this._activityModel.idUbicacion = this.selectedDescTipoOrganizacion;
  } // FIN | onItemSelect


  /****************************************************************************
  * Funcion: getListAllNivelImplementacionService
  * Object Number: 001
  * Fecha: 21-02-2019
  * Descripcion: Method getListAllNivelImplementacionService of the Class
  * Objetivo: getListAllNivelImplementacionService listados de los Niveles de
  * Implementacion del Formulario de Actividad llamando a la API
  ****************************************************************************/
  private getListAllNivelImplementacionService() {
    this._serviceUbicacionService.getAllNivelesImplementacion().subscribe(
      result => {
        if (result.status !== 200) {
          this.showToast('error', 'Error al Obtener la Información de los Niveles de Implementacion', result.message);
        } else if (result.status === 200) {
          this.JsonReceptionNivelImplementacion = result.data;
        }
      },
      error => {
        this.showToast('error', 'Error al Obtener la Información de los Niveles de Implementacion', JSON.stringify(error.message));
      },
    );
  } // FIN | getListAllNivelImplementacionService


  /****************************************************************************
  * Funcion: getListNivelUbicacionByIdNivelImplementacionService
  * Object Number: 002
  * Fecha: 21-02-2019
  * Descripcion: Method getListNivelUbicacionByIdNivelImplementacionService of the Class
  * Objetivo: getListNivelUbicacionByIdNivelImplementacionService listados de los Niveles
  * de Ubicacion de Implementacion del Formulario de Actividad llamando a la API
  * Params: { idNivelImplementacion }
  ****************************************************************************/
  private getListNivelUbicacionByIdNivelImplementacionService(idNivelImplementacion: number) {
    // Inicializa el Filtro de Ubicaciones
    this.selectedItems = [];
    this.dropdownList = [];

    this._serviceUbicacionService.getAllNivelesUbicacionImplementacion(idNivelImplementacion).subscribe(
      result => {
        if (result.status !== 200) {
          this.showToast('error', 'Error al Obtener la Información de los Niveles de Ubicacion de Implementacion', result.message);
          this.JsonReceptionNivelUbicacionImplementacion = [];
          this.selectedItems = [];
          this.dropdownList = [];
        } else if (result.status === 200) {
          this.JsonReceptionNivelUbicacionImplementacion = result.data;
        }
      },
      error => {
        this.showToast('error', 'Error al Obtener la Información de los Niveles de Ubicacion de Implementacion', JSON.stringify(error.message));
      },
    );
  } // FIN | getListNivelUbicacionByIdNivelImplementacionService



  /****************************************************************************
  * Funcion: getListUbicacionService
  * Object Number: 002
  * Fecha: 21-02-2019
  * Descripcion: Method getListUbicacionService of the Class
  * Objetivo: getListUbicacionService listados de los Niveles
  * de Ubicacion de Implementacion del Formulario de Actividad llamando a la API
  * Params: {idNivelUbicacion }
  ****************************************************************************/
  private getListUbicacionService(idNivelUbicacion: number) {
    // Inicializa el Filtro
    this.selectedItems = [];

    this._serviceUbicacionService.getUbicacionesByIdNivelUbicacion(idNivelUbicacion).subscribe(
      result => {
        if (result.status !== 200) {
          this.showToast('error', 'Error al Obtener la Información de las Ubicaciones', result.message);
          this.JsonReceptionUbicacion = [];
          this.selectedItems = [];
        } else if (result.status === 200) {
          this.JsonReceptionUbicacion = result.data;

          // Setea la Lista del Dropdown List
          this.dropdownList = this.JsonReceptionUbicacion.map((item) => {
            return {
              id: item.idUbicacionImplementacion,
              itemName: item.nombreUbicacionImpl,
              nombreNivelImpl: item.idNivelImplementacion.nombreNivelImpl,
              nombreNivelUbicacion: item.idNivelUbicacion.nombreNivelUbicacion,
            }
          })
        }
      },
      error => {
        this.showToast('error', 'Error al Obtener la Información de las Ubicaciones', JSON.stringify(error.message));
      },
    );
  } // FIN | getListUbicacionService


  /****************************************************************************
  * Funcion: pushJsonIdUbicacion
  * Object Number: 003
  * Fecha: 25-02-2019
  * Descripcion: Method Creacion de nuevo Item de Ubicacion
  * Objetivo: Creacion de nuevo File input listados de las Ubicaciones
  * del Formulario de Actividad llamando a la API
  ****************************************************************************/
  private pushJsonIdUbicacion() {
    // Validamos que se ha Seleccionado los Filtros Previos a la Seleccion de la Ubicacion
    if (this._activityUbicacionModel.idNivel === 0 || this._activityUbicacionModel.idNivel === null) {
      this.showToast('error', 'Error al Ingresar la Información de la Ubicación del Proyecto', 'Debes Seleccionar el Nivel de Implementación, para continuar');
      return -1;
    } else if (this._activityUbicacionModel.idNivelUbicacion === 0 || this._activityUbicacionModel.idNivelUbicacion === null) {
      this.showToast('error', 'Error al Ingresar la Información de la Ubicación del Proyecto', 'Debes Seleccionar el Nivel de Ubicación, para continuar');
      return -1;
    } else if (this._activityUbicacionModel.idUbicacionImpl === null) {
      this.showToast('error', 'Error al Ingresar la Información de la Ubicación del Proyecto', 'Debes Seleccionar la Ubicación donde se realizara el Proyecto, para continuar');
      return -1;
    }

    // Primer Registro del Json
    if (this.JsonIdUbicacionesProyecto.length === 0) {
      // Ingresa el primer Item del json
      this.JsonIdUbicacionesProyecto.push({
        'idNivel': this._activityUbicacionModel.idNivel,
        'idNivelUbicacion': this._activityUbicacionModel.idNivelUbicacion,
        'idUbicacionImpl': this._activityUbicacionModel.idUbicacionImpl,
        'idActividad': this.idProyectoTab,
        'porcentajeUbicacion': this._activityUbicacionModel.porcentajeUbicacion,
        'nombreNivelImpl': this._activityUbicacionModel.nombreNivelImpl,
        'nombreNivelUbicacion': this._activityUbicacionModel.nombreNivelUbicacion,
        'nombreUbicacionImpl': this._activityUbicacionModel.nombreUbicacionImpl,
      });
      this.findData = false;
    } else {
      this.findData = false;
      // Buscar Item Repetido
      this.JsonIdUbicacionesProyecto.forEach(element => {
        if (element.nombreUbicacionImpl === this._activityUbicacionModel.nombreUbicacionImpl) {
          this.findData = true;
          this.showToast('error', 'Error al Ingresar la Información de la Ubicación del Proyecto', 'Ya existe una Ubicación seleccionada para este Proyecto, ingresa una distinta para continuar');
        } else if ((element.nombreUbicacionImpl !== this._activityUbicacionModel.nombreUbicacionImpl) && (this.findData == false)) {
          this.findData = false;
        }
      });

      if (this.findData === false) {
        // Ingresa Item del json
        this.JsonIdUbicacionesProyecto.push({
          'idNivel': this._activityUbicacionModel.idNivel,
          'idNivelUbicacion': this._activityUbicacionModel.idNivelUbicacion,
          'idUbicacionImpl': this._activityUbicacionModel.idUbicacionImpl,
          'idActividad': this.idProyectoTab,
          'porcentajeUbicacion': this._activityUbicacionModel.porcentajeUbicacion,
          'nombreNivelImpl': this._activityUbicacionModel.nombreNivelImpl,
          'nombreNivelUbicacion': this._activityUbicacionModel.nombreNivelUbicacion,
          'nombreUbicacionImpl': this._activityUbicacionModel.nombreUbicacionImpl,
        });
      }
    }
    // this._activityModel.idInterna = '';
    // this.data = this.JsonIdInternaOrganizacion;
    // this.showToast('success', 'Ubicación Ingresada', 'Se ha Ingresado la Ubicación, al Proyecto seleccionado');
  } // FIN | pushJsonIdUbicacion


  /****************************************************************************
  * Funcion: deleteRowHomeForm
  * Object Number: 004
  * Fecha: 27-02-2019
  * Descripcion: Method Delete de nuevo File input, en Tabla
  * Objetivo: Delete de nuevo File input, en Tabla listados de las Ubicaciones
  * del Formulario de Actividad llamando a la API
  ****************************************************************************/
  deleteRowHomeForm(homeFormIndex: number, nombreUbicacionImpl: string, idUbicacionImplementacion: number, idActividad: number) {
    // Confirmar que se desea borrar ?
    const deletedItem = confirm('Esta seguro de borrar el Item de Ubicación Seleccionado ? ');

    if (deletedItem === true) {
      // Borra el Elemento al Json
      this.JsonIdUbicacionesProyecto.forEach(function (element, index) {
        if (element.nombreUbicacionImpl === nombreUbicacionImpl) {
          homeFormIndex = index;
        }
      });
      this.JsonIdUbicacionesProyecto.splice(homeFormIndex, 1);

      // Borramos la Id Interna de la BD
      if (idActividad !== 0) {
        this.deletedUbicaciones(idUbicacionImplementacion, idActividad);
      }

      this.changeDetectorRef.detectChanges();
    }
  } // FIN deleteRowHomeForm


  /****************************************************************************
  * Funcion: calcPorcForm
  * Object Number: 005
  * Fecha: 27-02-2019
  * Descripcion: Method Calculate Porcentajes, en Tabla
  * Objetivo: Calcular porcentajes de Ubicaciones, en Tabla listados de las Ubicaciones
  ****************************************************************************/
  calcPorcForm() {
    // Confirmar que se desea borrar ?
    const deletedItem = confirm('Esta seguro de calular automaticamente las de Ubicaciones ? ');

    if (deletedItem === true) {
      // Calula Porcentaje del Elemento al Json
      const percentEqual: number = (100 / this.JsonIdUbicacionesProyecto.length);
      this._activityUbicacionModel.porcentajeUbicacion = percentEqual;

      this.JsonIdUbicacionesProyecto.forEach(function (element, index) {
        element.porcentajeUbicacion = percentEqual;
      });

      this.changeDetectorRef.detectChanges();
    }
  } // FIN calcPorcForm


  /****************************************************************************
  * Funcion: saveUbicaciones
  * Object Number: 006
  * Fecha: 28-02-2019
  * Descripcion: Method Save Ubicaciones, en BD por llamado a la API
  * Objetivo: Salvar Ubicaciones de Proyectos, en BD por llamado a EndPoint de
  * la API | /mant-actividades/ubicaciones/new
  * @param jsonUbicacionActivity
  ****************************************************************************/
  saveUbicaciones() {
    /** spinner starts on Start Function */
    this.msgLoader = 'Guardando la Información de Ubicación del Proyecto';
    this._spinner.show();

    // Seteo de los Campo Relacionales
    this._activityUbicacionModel.idActividad = { idActividad: this.idProyectoTab };
    this._activityUbicacionModel.codigoActividad = this.codigoProyectoTab;
    this._activityUbicacionModel.idUsuarioCreador = { idUsuario: this.idUsuarioTab };

    // Valida que los Campos de relacion Existan
    if (this.idProyectoTab === 0 || this._activityUbicacionModel.codigoActividad === null) {
      this.showToast('error', 'Error al ingresar la Información de las Ubicaciones', 'Debes Ingresar la Información General del Proyecto primero para continuar.');
      return -1;
    }

    // Ciclo de Ingresos de Ubicaciones
    this.JsonIdUbicacionesProyecto.forEach(element => {
      this._activityUbicacionModel.idUbicacionImpl = { idUbicacionImplementacion: element.idUbicacionImpl.idUbicacionImplementacion };

      // End Point de Nueva Ubicacion
      this._serviceUbicacionService.newUbicacionProyecto(this._activityUbicacionModel).subscribe(
        result => {
          if (result.status !== 200) {
            this.showToast('error', 'Error al ingresar la Información de las Ubicaciones', result.message);

            // Ocultamos el Loader la Funcion
            setTimeout(() => {
              this._spinner.hide();
            }, 2000);
          } else if (result.status === 200) {
            // this.JsonReceptionUbicacion = result.data;
            this.showToast('default', 'La Información de las Ubicaciones, se ha ingresado con exito.', result.message);

            // Ocultamos el Loader la Funcion
            setTimeout(() => {
              this._spinner.hide();
            }, 2000);
          }
        },
        error => {
          this.showToast('error', 'Error al ingresar la Información de las Ubicaciones', JSON.stringify(error.message));
          // Ocultamos el Loader la Funcion
          setTimeout(() => {
            this._spinner.hide();
          }, 2000);
        },
      );
    });
  } // FIN saveUbicaciones


  /****************************************************************************
  * Funcion: deleteUbicaciones
  * Object Number: 007
  * Fecha: 01-01-2019
  * Descripcion: Method que Elimina la Ubicacion de la Actividad
  * Objetivo: Eliminar la Ubicacion del Proyecto
  * @param { idUbicacionImpl }
  * @param { idActividad }
  ****************************************************************************/
  deletedUbicaciones(idUbicacionImpl: number, idActividad: number) {
    /** spinner starts on Start Function */
    this.msgLoader = 'Eliminando la Información de Ubicación del Proyecto';
    this._spinner.show();

    // Ejecutamos el Recurso del EndPoint
    this._serviceUbicacionService.deletedActivityUbicacion(idUbicacionImpl, idActividad).subscribe(
      response => {
        if (response.status !== 200) {
          this.showToast('error', 'Error al Eliminar la Ubicación del Proyecto', response.message);

          // Ocultamos el Loader la Funcion
          setTimeout(() => {
            this._spinner.hide();
          }, 2000);
        } else if (response.status === 200) {
          // Verificamos que la Actividad no Exista en la BD
          this.showToast('default', 'La Información de la Ubicación del Proyecto, se ha eliminado con exito', response.message);

          // Ocultamos el Loader la Funcion
          setTimeout(() => {
            this._spinner.hide();
          }, 2000);
        }
      },
      error => {
        // Informacion del Error que se capturo de la Ubicacion a Borrar
        this.showToast('error', 'Ha ocurrido un Error al Eliminar la información de Ubicación del Proyecto, por favor verifica que todo este bien!!', JSON.stringify(error.error.message));
        // Ocultamos el Loader la Funcion
        setTimeout(() => {
          this._spinner.hide();
        }, 2000);
      },
    );
    // Return
  } // FIN | deleteUbicaciones


  showLargeModal() {
    const activeModal = this.modalService.open(GeolocalizacionComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = 'Large Modal';
  }

  showStaticModal() {
    const activeModal = this.modalService.open(GeolocalizacionComponent, {
      size: 'lg',
      backdrop: 'static',
      container: 'nb-layout',
    });

    activeModal.componentInstance.idProyectoTab = this.idProyectoTab;
    activeModal.componentInstance.modalHeader = 'Establecer Geolocalización de Localidad para Proyecto | PGC';
    activeModal.componentInstance.modalContent = `This is static modal, backdrop click
                                                    will not close it. Click × or confirmation button to close modal.`;
  }
}
