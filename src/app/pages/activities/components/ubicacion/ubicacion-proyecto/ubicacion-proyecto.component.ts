/**
* @author Nahum Martinez
* @returns Ubicaciones de los Proyectos
* @name UbicacionProyectoComponent
* @alias _ubicacionProyectoComponent
* @version 1.0.0
* @fecha 2019-02-21
*/
import { Component, OnInit, Input, OnChanges, ChangeDetectorRef } from '@angular/core';

import * as L from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';

import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/leaflet.css';

import { icon, latLng, marker, polyline, tileLayer } from 'leaflet';
import { ActivityUbicacionModel } from '../../../models/model-ubicacion-activity';
import { ServiceUbicacionService } from '../../../services/service-ubicacion.service';
import { CompleterData } from 'ng2-completer';
import { NotificacionesService } from '../../../../shared/services/notificaciones.service';
import { ToasterService } from 'angular2-toaster';
import { ListasComunesService } from '../../../../common-list/services/listas-comunes.service';
import { ConfirmationService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ngx-ubicacion-proyecto',
  templateUrl: './ubicacion-proyecto.component.html',
  styleUrls: ['./ubicacion-proyecto.component.scss'],
  providers: [ToasterService, ListasComunesService, ServiceUbicacionService, NotificacionesService, ConfirmationService],
})
export class UbicacionProyectoComponent implements OnInit, OnChanges {
  // Variables entre Tabs | Components
  @Input() idProyectoTab: number;
  @Input() idUsuarioTab: number;
  @Input() codigoProyectoTab: string;

  // variable del Json
  @Input() JsonPassData: any;
  changeDetectorRef: any;

  ngOnChanges(changes) {
    // if (changes['idProyectoTab']) {
    //   // Aquí ya sabes que has recibido un nuevo dato desde cualquier componente.
    //   const nuevoDato = changes.idProyectoTab;
    // }

    // if (changes['idUsuarioTab']) {
    //   // Aquí ya sabes que has recibido un nuevo dato desde cualquier componente.
    //   const nuevoDato = changes.idUsuarioTab;
    // }

    // if (changes['codigoProyectoTab']) {
    //   // Aquí ya sabes que has recibido un nuevo dato desde cualquier componente.
    //   const nuevoDato = changes.idUsuarioTab;
    // }

    // if (changes['JsonPassData']) {
    //   // Aquí ya sabes que has recibido un nuevo dato desde cualquier componente.
    //   const nuevoDato = changes.JsonPassData;
    // }
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
  selectedItemsUbicacion = [];
  selectedItemsEspacioTrabajo = [];
  dropdownSettings = {};

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
  public latitudUbicacionSelected: any;
  public longitudbicacionSelected: any;
  public JsonSendDataUbicacion = [];

  // Variables de loader
  public loadingdata: boolean = false;


  /****************************************************************************
  * @author Nahum Martinez
  * @name ConfigMap
  * @function _configMap
  * @fecha 30-06-2019
  * @description Configuraciones principales del Mapa
  * @param { }
  * @copyright SRECI-2019
  ****************************************************************************/
  // Variables Globales del Mapa
  datos = [];
  public marker1;
  layers = this.datos;

  mapCenter;

  // Definicion de Opciones del Mapa
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Creado por: Nahum Martínez' }),
    ],
    zoom: 7,
    detectRetina: true,
    center: latLng(14.520611, -87.136183),
  };

  // Capas del Mapa
  layersControl = {
    baseLayers: {
      'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      'Open Cycle Map': tileLayer('http://{s}.tile.opencyclemap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
    },
    overlays: {
      'Tegucigalpa': L.circle([14.072275, -87.192139], { radius: 10000 }),
      'San Pedro Sula': L.circle([15.505230, -88.024971], { radius: 10000 }),
      // 'San Pedro Sula': L.polygon([[46.8, -121.55], [46.9, -121.55], [46.9, -121.7], [46.8, -121.7]])
    },
  }
  // FIN | _configMap

  borrarMarcador(latlng) {
    // console.log('sdsd');
  }


  /****************************************************************************
  * Funcion: constructor
  * Object Number: FND-001
  * Fecha: 06-03-2019
  * Descripcion: Method constructor of the Class
  * Objetivo: constructor in the method header API
  ****************************************************************************/
  constructor(public _serviceUbicacionService: ServiceUbicacionService,
    private _notificacionesService: NotificacionesService,
    private confirmationService: ConfirmationService,
    private _spinner: NgxSpinnerService) {
    // Codigo de constructor
  } // FIN | FND-001


  /****************************************************************************
  * Funcion: ngOnInit
  * Object Number: FND-002
  * Fecha: 06-03-2019
  * Descripcion: Method constructor of the Class
  * Objetivo: ngOnInit in the method header API
  ****************************************************************************/
  ngOnInit() {
    // this.pointsVal();
    // Inicializacion del Modelo
    this._activityUbicacionModel = new ActivityUbicacionModel(
      0, null, // Nivel de Implementacion
      0, null, // Nivel de Ubicacion
      0, null, null, // Ubicacion de Implementacion
      null, 0, null, 0, null, 0, null, 0, // Ubicaciones a Ingresar
      0, null, null, 0, 0, // Datos de la Actividad con Ubicaciones
      null, // Datos de Usuario
    );

    // Carga de Nivel de implementacion
    this.getListAllNivelImplementacionService();

    // Configuracion de Dorpdown select
    this.dropdownSettings = {
      singleSelection: true,
      text: 'Selecciona la Ubicación',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      badgeShowLimit: 1,
    };

    // this.pointsRecsources();
    this.getUbicacionesByIdActividadService(this.idProyectoTab);
  } // FIN | FND-002


  /**
   * closeModal
   * Cerrar ventana Modal desde el boton
   */
  closeModal() {
    // this.activeModal.close();
  }

  /****************************************************************************
  * Funcion: pointsRecsources
  * Object Number: FND-003
  * Fecha: 06-03-2019
  * Descripcion: Method constructor of the Class
  * Objetivo: ngOnInit in the method header API
  ****************************************************************************/
  pointsRecsources() {
    // const element = array[index];
    let lat = 15.505230;
    let long = -88.224971;

    for (let index = 0; index < 10; index++) {
      this.datos.push(
        L.marker([lat, long], {
          icon: icon({
            iconUrl: 'assets/icons/forms/map_24.png',
            shadowUrl: 'assets/icons/forms/map_24.png',
          }),
          draggable: true,
          riseOnHover: true,
        }).bindPopup('<h1>Coordenada ? ' + ' ' + lat + '  -  ' + long + ' </h1>'),
      )

      lat = lat + 0.1;
      long = long - 0.1;
    }
  } // FIN | FND-003


  /****************************************************************************
  * Funcion: onMapReady
  * Object Number: FND-004
  * Fecha: 06-03-2019
  * Descripcion: Method Configuracion Inicial del Mapa of the Class
  * Objetivo: onMapReady in the method header API
  ****************************************************************************/
  onMapReady(map: L.Map) {
    // Deshabilita el Zoom con dblClick
    map.doubleClickZoom.disable();

    // var sidebar = L.control.sidebar({
    //   autopan: false,       // whether to maintain the centered map point when opening the sidebar
    //   closeButton: true,    // whether t add a close button to the panes
    //   container: 'sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
    //   position: 'left',     // left or right
    // }).addTo(map);

    // Funcion que carga datos al Abrir el Modal Popup
    map.on('popupopen', function <LeafletMouseEvent>(event) {
      // console.log('prueba' + event.latlng);
    });

    // map.on('dblclick', function <LeafletMouseEvent>(event) {
    map.on('dblclick', function <LeafletMouseEvent>(event) {
      // Coordenadas Geograficas capturadas
      const lat: number = event.latlng.lat;
      const lng: number = event.latlng.lng;

      // create popup contents
      const customPopup = '<div> ' +
        '<form> <h4> Ingreso de Localidad </h4> <hr> ' +
        '<input class="form-control" type = "text" placeholder="Nombre de Localidad"/> <br> ' +
        '<textarea id="text" class="form-control" type = "text" placeholder = "Descripción de Localidad"></textarea> </form>  ' +
        '<hr> <p id="paF"><strong>Latitud: </strong>' + ' ' + lat + ' <strong>Longitud: </strong>' + lng + ' </p>' +
        ' <button id="btnPopup" class="btn btn-primary botonSave with-margins" (click)="alert()" > Guardar</button> </div>';

      // specify popup options
      const customOptions = {
        'maxWidth': 400,
        'width': 200,
      }

      // Crea el Nuevo marcador
      this.marker1 = new L.Marker([lat, lng], {
        icon: icon({
          iconUrl: 'assets/icons/forms/map_24.png',
          shadowUrl: 'assets/icons/forms/map_24.png',
        }),
      });
      map.addLayer(this.marker1);

      // Despliega el PopUp de Localidad
      this.marker1.bindPopup(customPopup, customOptions).openPopup();

      const domi = L.DomUtil.get('btnPopup');
      // console.log(domi );

      L.DomEvent.addListener(domi, 'click', function (e) {
        // console.log('Mapa ' + domi.textContent);
      });
    });

    // Remover marcadores del Mapa
    map.on('click', function (event) {
      // map.removeLayer(this);
      // Coordenadas Geograficas capturadas
      // const lat: number = event.latlng.lat;
      // const lng: number = event.latlng.lng;

      // const marka = marker([lat, lng]);
      // console.log('Coordenadas a Borrar ' + this.marker1);
      // map.removeLayer(marka)
    });
  } // FIN | FND-004

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  /****************************************************************************
  * Funcion: onItemSelect
  * Object Number: FND-005
  * Fecha: 09-01-2019
  * Descripcion: Method para Seleccionar Items de Organizacion para usarlo en Id
  * Internas
  * Objetivo: enviar al Json de ID'Intermas la información que ocupa la API
  ****************************************************************************/
  onItemSelect(item: any) {
    // Carga el loader
    this.loadingdata = true;

    // Envia la Organizacion seleccionada
    this.selectedIdUbicacionImpl = item ? item.id : '';
    this.nombreUbicacionSelected = item ? item.itemName : '';
    this.nombreNivelImplSelected = item ? item.nombreNivelImpl : '';
    this.nombreNivelUbicacionSeleted = item ? item.nombreNivelUbicacion : '';

    // Setea al Model el valor de la Ubicacion
    this._activityUbicacionModel.idUbicacionImplementacion = { idUbicacionImplementacion: Number(this.selectedIdUbicacionImpl) };
    this._activityUbicacionModel.nombreNivelImpl = this.nombreNivelImplSelected;
    this._activityUbicacionModel.nombreNivelUbicacion = this.nombreNivelUbicacionSeleted;
    this._activityUbicacionModel.nombreUbicacionImpl = this.nombreUbicacionSelected;
    // this._activityModel.idNivelUbicacion = this.selectedDescOrganizacion;
    // this._activityModel.idUbicacion = this.selectedDescTipoOrganizacion;

    const foundUbicacion = this.selectedItemsUbicacion.find(function (element) {
      return element.nombreUbicacionImpl === item.itemName;
    });

    if (foundUbicacion !== undefined) {
      this._notificacionesService.showToast('error', 'Error al seleccionar La Ubicación', 'Ya existe en el listado');
      // Oculta el loader
      this.loadingdata = false;
    } else {
      // Asignamos la Ubicacion seleccionada
      this.selectedItemsUbicacion.push({
        idUbicacionImplementacion: item.id,
        nombreNivelImpl: this.nombreNivelImplSelected,
        nombreNivelUbicacion: this.nombreNivelUbicacionSeleted,
        nombreUbicacionImpl: this.nombreUbicacionSelected,
        idActividad: item.idActividad,
        latitudUbicacion: item.latitudUbicacion,
        longitudUbicacion: item.longitudUbicacion,
      });

      // Array de Markers del Mapa
      this.datos.push(
        L.marker([item.latitudUbicacion, item.longitudUbicacion], {
          icon: icon({
            iconUrl: 'assets/icons/forms/map_24.png',
            shadowUrl: 'assets/icons/forms/map_24.png',
          }),
          draggable: false,
          riseOnHover: true,
        }).bindPopup('<p><strong>Nivel de Implementación</strong>: ' + this.nombreNivelImplSelected +
          ' <br><strong>Nivel de Ubicación: </strong>' + this.nombreNivelUbicacionSeleted +
          ' <br><strong>Ubicación: </strong>' + this.nombreUbicacionSelected +
          ' <br>Coordenadas: [' + item.latitudUbicacion + ',' + item.longitudUbicacion + '] </p>'),
      )
      // Oculta el loader
      this.loadingdata = false;
      // console.log(this.selectedItemsUbicacion);

    }
  } // FIN | FND-005


  /****************************************************************************
  * Funcion: getListAllNivelImplementacionService
  * Object Number: FND-006
  * Fecha: 21-02-2019
  * Descripcion: Method getListAllNivelImplementacionService of the Class
  * Objetivo: Listados de los Niveles de
  * Implementacion del Formulario de Actividad llamando a la API
  ****************************************************************************/
  private getListAllNivelImplementacionService() {
    this._serviceUbicacionService.getAllNivelesImplementacion().subscribe(
      result => {
        if (result.status !== 200) {
          this._notificacionesService.showToast('error', 'Error al Obtener la Información de los Niveles de Implementacion', result.message);
        } else if (result.status === 200) {
          this.JsonReceptionNivelImplementacion = result.data;
        }
      },
      error => {
        this._notificacionesService.showToast('error', 'Error al Obtener la Información de los Niveles de Implementacion', JSON.stringify(error.message));
      },
    );
  } // FIN | FND-006


  /****************************************************************************
  * Funcion: getListNivelUbicacionByIdNivelImplementacionService
  * Object Number: FND-007
  * Fecha: 21-02-2019
  * Descripcion: Method getListNivelUbicacionByIdNivelImplementacionService of the Class
  * Objetivo: listados de los Niveles
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
          this._notificacionesService.showToast('error', 'Error al Obtener la Información de los Niveles de Ubicacion de Implementacion', result.message);
          this.JsonReceptionNivelUbicacionImplementacion = [];
          this.selectedItems = [];
          this.dropdownList = [];
        } else if (result.status === 200) {
          this.JsonReceptionNivelUbicacionImplementacion = result.data;
        }
      },
      error => {
        this._notificacionesService.showToast('error', 'Error al Obtener la Información de los Niveles de Ubicacion de Implementacion', JSON.stringify(error.message));
      },
    );
  } // FIN | FND-007


  /****************************************************************************
  * Funcion: getListUbicacionService
  * Object Number: FND-008
  * Fecha: 21-02-2019
  * Descripcion: Method getListUbicacionService of the Class
  * Objetivo: listados de los Niveles
  * de Ubicacion de Implementacion del Formulario de Actividad llamando a la API
  * Params: {idNivelUbicacion }
  ****************************************************************************/
  private getListUbicacionService(idNivelUbicacion: number) {
    // Inicializa el Filtro
    this.selectedItems = [];

    this._serviceUbicacionService.getUbicacionesByIdNivelUbicacion(idNivelUbicacion).subscribe(
      result => {
        if (result.status !== 200) {
          this._notificacionesService.showToast('error', 'Error al Obtener la Información de las Ubicaciones', result.message);
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
              idNivelImpl: item.idNivelImplementacion.idNivel,
              nombreNivelUbicacion: item.idNivelUbicacion.nombreNivelUbicacion,
              idNivelUbicacion: item.idNivelUbicacion.idNivelUbicacion,
              latitudUbicacion: item.latitudUbicacion,
              longitudUbicacion: item.longitudUbicacion,
              idActividad: this.idProyectoTab,
            }
          })
        }
      },
      error => {
        this._notificacionesService.showToast('error', 'Error al Obtener la Información de las Ubicaciones', JSON.stringify(error.message));
      },
    );
  } // FIN | FND-008


  /****************************************************************************
  * Funcion: pushJsonIdUbicacion
  * Object Number: FND-010
  * Fecha: 25-02-2019
  * Descripcion: Method Creacion de nuevo Item de Ubicacion
  * Objetivo: Creacion de nuevo File input listados de las Ubicaciones
  * del Formulario de Actividad llamando a la API
  ****************************************************************************/
  private pushJsonIdUbicacion() {
    // Validamos que se ha Seleccionado los Filtros Previos a la Seleccion de la Ubicacion
    if (this._activityUbicacionModel.idNivel === 0 || this._activityUbicacionModel.idNivel === null) {
      this._notificacionesService.showToast('error', 'Error al Ingresar la Información de la Ubicación del Proyecto', 'Debes Seleccionar el Nivel de Implementación, para continuar');
      return -1;
    } else if (this._activityUbicacionModel.idNivelUbicacion === 0 || this._activityUbicacionModel.idNivelUbicacion === null) {
      this._notificacionesService.showToast('error', 'Error al Ingresar la Información de la Ubicación del Proyecto', 'Debes Seleccionar el Nivel de Ubicación, para continuar');
      return -1;
    } else if (this._activityUbicacionModel.idUbicacionImplementacion === null) {
      this._notificacionesService.showToast('error', 'Error al Ingresar la Información de la Ubicación del Proyecto', 'Debes Seleccionar la Ubicación donde se realizara el Proyecto, para continuar');
      return -1;
    }

    // Primer Registro del Json
    if (this.JsonIdUbicacionesProyecto.length === 0) {
      // Ingresa el primer Item del json
      this.JsonIdUbicacionesProyecto.push({
        'idNivel': this._activityUbicacionModel.idNivel,
        'idNivelUbicacion': this._activityUbicacionModel.idNivelUbicacion,
        'idUbicacionImpl': this._activityUbicacionModel.idUbicacionImplementacion,
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
          this._notificacionesService.showToast('error', 'Error al Ingresar la Información de la Ubicación del Proyecto', 'Ya existe una Ubicación seleccionada para este Proyecto, ingresa una distinta para continuar');
        } else if ((element.nombreUbicacionImpl !== this._activityUbicacionModel.nombreUbicacionImpl) && (this.findData === false)) {
          this.findData = false;
        }
      });

      if (this.findData === false) {
        // Ingresa Item del json
        this.JsonIdUbicacionesProyecto.push({
          'idNivel': this._activityUbicacionModel.idNivel,
          'idNivelUbicacion': this._activityUbicacionModel.idNivelUbicacion,
          'idUbicacionImpl': this._activityUbicacionModel.idUbicacionImplementacion,
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
  } // FIN | FND-010


  /****************************************************************************
  * Funcion: deleteRowHomeForm
  * Object Number: FND-011
  * Fecha: 27-02-2019
  * Descripcion: Method Delete, en Tabla
  * Objetivo: Delete de nuevo, en Tabla listados de las Ubicaciones
  * del Formulario de Actividad llamando a la API
  ****************************************************************************/
  deleteRowHomeForm(homeFormIndex: number, nombreUbicacionImpl: string, idUbicacionImplementacion: number, idActividad: number) {
    // Confirmar que se desea borrar ?
    // const deletedItem = confirm('Esta seguro de borrar el Item de Ubicación Seleccionado ? ');

    // if (deletedItem === true) {
    // Borra el Elemento al Json
    // this.JsonIdUbicacionesProyecto.forEach(function (element, index) {
    this.selectedItemsUbicacion.forEach(function (element, index) {
      if (element.nombreUbicacionImpl === nombreUbicacionImpl) {
        homeFormIndex = index;
      }
    });
    // this.JsonIdUbicacionesProyecto.splice(homeFormIndex, 1);
    this.selectedItemsUbicacion.splice(homeFormIndex, 1);
    this.datos.splice(homeFormIndex, 1);

    // Borramos la Id Interna de la BD
    if (idActividad !== 0) {
      this.deletedUbicaciones(idUbicacionImplementacion, idActividad);
    }

    // this.changeDetectorRef.detectChanges();
    // }
  } // FIN | FND-011


  /****************************************************************************
  * Funcion: calcPorcForm
  * Object Number: FND-012
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
  } // FIN | FND-012


  /****************************************************************************
  * Funcion: saveUbicaciones
  * Object Number: FND-013
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
    this._activityUbicacionModel.idUsuario = { idUsuario: this.idUsuarioTab };

    // Valida que los Campos de relacion Existan
    if (this.idProyectoTab === 0 || this._activityUbicacionModel.codigoActividad === null) {
      this._notificacionesService.showToast('error', 'Error al ingresar la Información de las Ubicaciones', 'Debes Ingresar la Información General del Proyecto primero para continuar.');
      return -1;
    }

    // Ciclo de Ingresos de Ubicaciones
    // this.JsonIdUbicacionesProyecto.forEach(element => {
    this.selectedItemsUbicacion.forEach(element => {
      this._activityUbicacionModel.idUbicacionImplementacion = { idUbicacionImplementacion: element.idUbicacionImplementacion };

      // End Point de Nueva Ubicacion
      this._serviceUbicacionService.newUbicacionProyecto(this._activityUbicacionModel).subscribe(
        result => {
          if (result.status !== 200) {
            this._notificacionesService.showToast('error', 'Error al ingresar la Información de las Ubicaciones', result.message);

            // Ocultamos el Loader la Funcion
            setTimeout(() => {
              this._spinner.hide();
            }, 1000);
          } else if (result.status === 200) {
            if (result.findRecord) {
              this._notificacionesService.showToast('error', 'Error al ingresar la Información de las Ubicaciones', result.message);
            } else {
              // this.JsonReceptionUbicacion = result.data;
              this._notificacionesService.showToast('default', 'La Información de las Ubicaciones, se ha ingresado con exito.', result.message);
            }

            // Ocultamos el Loader la Funcion
            setTimeout(() => {
              this._spinner.hide();
            }, 1000);
          }
        },
        error => {
          this._notificacionesService.showToast('error', 'Error al ingresar la Información de las Ubicaciones', JSON.stringify(error.message));
          // Ocultamos el Loader la Funcion
          setTimeout(() => {
            this._spinner.hide();
          }, 1000);
        },
      );
    });
  } // FIN | FND-013


  /****************************************************************************
  * Funcion: deleteUbicaciones
  * Object Number: FND-014
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
          this._notificacionesService.showToast('error', 'Error al Eliminar la Ubicación del Proyecto', response.message);

          // Ocultamos el Loader la Funcion
          setTimeout(() => {
            this._spinner.hide();
          }, 1000);
        } else if (response.status === 200) {
          // Verificamos que la Actividad no Exista en la BD
          this._notificacionesService.showToast('default', 'La Información de la Ubicación del Proyecto, se ha eliminado con exito', response.message);

          // Ocultamos el Loader la Funcion
          setTimeout(() => {
            this._spinner.hide();
          }, 1000);
        }
      },
      error => {
        // Informacion del Error que se capturo de la Ubicacion a Borrar
        this._notificacionesService.showToast('error', 'Ha ocurrido un Error al Eliminar la información de Ubicación del Proyecto, por favor verifica que todo este bien!!', JSON.stringify(error.error.message));
        // Ocultamos el Loader la Funcion
        setTimeout(() => {
          this._spinner.hide();
        }, 1000);
      },
    );
    // Return
  } // FIN | FND-014


  /****************************************************************************
  * Funcion: confirm
  * Object Number: FND-015
  * Fecha: 11-06-2019
  * Descripcion: Method confirm of the Class
  * Objetivo: Eliminar la Ubicacion seleccionada
  * Params: { homeFormIndex, nombreUbicacionImpl, idUbicacionImplementacion, idActividad }
  ****************************************************************************/
  confirm(homeFormIndex: number, nombreUbicacionImpl: string, idUbicacionImplementacion: number, idActividad: number) {
    this.confirmationService.confirm({
      message: 'Estas seguro de Eliminar Ubicación?',
      accept: () => {
        // Ejecuta la funcion de Eliminar la Ubicación
        this.deleteRowHomeForm(homeFormIndex, nombreUbicacionImpl, idUbicacionImplementacion, idActividad);
      },
    });
  } // FIN | FND-015


  /****************************************************************************
  * Funcion: getUbicacionesByIdActividadService
  * Object Number: FND-016
  * Fecha: 21-02-2019
  * Descripcion: Method getListUbicacionService of the Class
  * Objetivo: listados de las Ubicaciones
  * Params: { idActividad }
  ****************************************************************************/
  private getUbicacionesByIdActividadService(idActividad: number) {
    // Inicializa el Filtro
    // this.selectedItems = [];

    this._serviceUbicacionService.getUbicacionesByIdActividad(idActividad).subscribe(
      result => {
        if (result.status !== 200) {
          this._notificacionesService.showToast('error', 'Error al Obtener la Información de las Ubicaciones', result.message);
          // this.JsonUbicacionesImplements = [];
          // this.selectedItems = [];
        } else if (result.status === 200) {
          this.JsonUbicacionesImplements = result.data;

          // Asignamos la Ubicacion seleccionada
          this.JsonUbicacionesImplements.forEach(element => {
            this.selectedItemsUbicacion.push({
              idUbicacionImplementacion: element.idUbicacionImplementacion,
              // nombreNivelImpl: element.nombreUbicacionImpl,
              // nombreNivelUbicacion: element,
              nombreUbicacionImpl: element.nombreUbicacionImpl,
              idActividad: element.idActividad,
              latitudUbicacion: element.latitudUbicacion,
              longitudUbicacion: element.longitudUbicacion,
            });

            // Array de Markers del Mapa
            this.datos.push(
              L.marker([element.latitudUbicacion, element.longitudUbicacion], {
                icon: icon({
                  iconUrl: 'assets/icons/forms/map_24.png',
                  shadowUrl: 'assets/icons/forms/map_24.png',
                }),
                draggable: false,
                riseOnHover: true,
              }).bindPopup('<p><strong>Nivel de Implementación</strong>: ' + element.nombreUbicacionImpl +
                ' <br><strong>Nivel de Ubicación: </strong>' + element.nombreUbicacionImpl +
                ' <br><strong>Ubicación: </strong>' + element.nombreUbicacionImpl +
                ' <br>Coordenadas: [' + element.latitudUbicacion + ',' + element.longitudUbicacion + '] </p>'),
            )
          });
          // console.log(this.JsonUbicacionesImplements);
        }
      },
      error => {
        this._notificacionesService.showToast('error', 'Error al Obtener la Información de las Ubicaciones', JSON.stringify(error.message));
      },
    );
  } // FIN | FND-016

}
