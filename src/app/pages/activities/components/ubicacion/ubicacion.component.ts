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

@Component({
  selector: 'ngx-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.scss'],
  providers: [ToasterService, ListasComunesService, ServiceUbicacionService],
})
export class UbicacionComponent implements OnInit, OnChanges {
  // Variables entre Tabs | Components
  @Input() idProyectoTab: number;

  ngOnChanges(changes) {
    if (changes['idProyectoTab']) {
      // Aquí ya sabes que has recibido un nuevo dato desde cualquier componente.
      const nuevoDato = changes.idProyectoTab;
    }
  }

  // Variables de Configuracion del Usuario
  public idTipoOrganizacionUsario: number;

  // Configuracion del Toaster-Notifications
  protected captain: string;

  redirectDelay: number = 0;

  protected dataService: CompleterData;

  config: ToasterConfig;

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

  p: number = 1;

  // Variables de los Json Recepcionadores de la Informacion
  public JsonReceptionNivelImplementacion: any;
  public JsonReceptionNivelUbicacionImplementacion: any;

  // Modelo de la Clase
  public _activityUbicacionModel: ActivityUbicacionModel;

  /****************************************************************************
  * Funcion: constructor
  * Object Number: 001
  * Fecha: 16-08-2018
  * Descripcion: Method constructor of the Class
  * Objetivo: constructor in the method header API
  ****************************************************************************/
  constructor(private completerService: CompleterService,
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
    // Inicializacion del Modelo
    this._activityUbicacionModel = new ActivityUbicacionModel(
      0, null, // Nivel de Implementacion
      0, null, // Nivel de Ubicacion
    );
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
    // this.selectedIdOrganizacion = item ? item.id : '';
    // this.selectedDescOrganizacion = item ? item.itemName : '';
    // this.selectedDescTipoOrganizacion = item ? item.nombreTipoOrganizacion : '';
    // this.selectedPaisOrganizacion = item ? item.descPais : '';
    // this.inicialesOrganizacion = item ? item.inicialesOrganizacion : '';

    // // Setea al Model el valor de la Organizacion
    // this._activityModel.idOrganizacion = Number(this.selectedIdOrganizacion);
    // this._activityModel.descOrganizacion = this.selectedDescOrganizacion;
    // this._activityModel.descTipoOrganizacion = this.selectedDescTipoOrganizacion;
    // this._activityModel.descPaisOrganizacion = this.selectedPaisOrganizacion;
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
          // console.log(this.JsonReceptionNivelImplementacion);
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
  * Params: { idNivelUbicacion }
  ****************************************************************************/
  private getListNivelUbicacionByIdNivelImplementacionService(idNivelUbicacion: number) {
    this._serviceUbicacionService.getAllNivelesUbicacionImplementacion(idNivelUbicacion).subscribe(
      result => {
        if (result.status !== 200) {
          this.showToast('error', 'Error al Obtener la Información de los Niveles de Ubicacion de Implementacion', result.message);
          this.JsonReceptionNivelUbicacionImplementacion = [];
        } else if (result.status === 200) {
          this.JsonReceptionNivelUbicacionImplementacion = result.data;
          // console.log(this.JsonReceptionNivelUbicacionImplementacion);
        }
      },
      error => {
        this.showToast('error', 'Error al Obtener la Información de los Niveles de Ubicacion de Implementacion', JSON.stringify(error.message));
      },
    );
  } // FIN | getListNivelUbicacionByIdNivelImplementacionService
}
