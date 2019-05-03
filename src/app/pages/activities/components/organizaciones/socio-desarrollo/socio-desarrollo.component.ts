/**
* @author Nahum Martinez
* @returns Componente de Socio Desarrollo
* @name SocioDesarrolloComponent
* @alias _socioDesarrolloComponent
* @version 1.0.0
* @fecha 02-05-2019
*/

import { Component, OnInit, Input } from '@angular/core';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { SocioDesarrolloService } from '../../../services/organizaciones/socio-desarrollo.service';
import { SharedOrganizacionesService } from '../../../services/organizaciones/shared-organizaciones.service';

@Component({
  selector: 'ngx-socio-desarrollo',
  templateUrl: './socio-desarrollo.component.html',
  styleUrls: ['./socio-desarrollo.component.scss'],
  providers: [ToasterService, SocioDesarrolloService],
})
export class SocioDesarrolloComponent implements OnInit {
  // Variables entre Tabs | Components
  @Input() idProyectoTab: number;
  @Input() idUsuarioTab: number;
  @Input() codigoProyectoTab: string;

  /**
   * Configuracion del Dropdow List
   */
  dropdownListSocioDesarrollo = [];
  selectedItemsSocioDesarrollo = [];
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
  config: ToasterConfig;

  // Json de recpcion de Informacion
  public JsonReceptionAllSocioDesarrollo: any;

  // Json a enviar
  public JsonSendSociosDesarrollo: any = [];

  /**
   * Constructor de la Clase
   */
  constructor(private _toasterService: ToasterService,
    private _socioDesarrolloService: SocioDesarrolloService,
    private _sharedOrganizacionesService: SharedOrganizacionesService ) {
    // Codigo del Constructor
  }


  /**
   * Funcion Inicial de la clase
   */
  ngOnInit() {
    // Carga los Datos de Socio al Desarrollo
    this.getAllSocioDesarrolloService(1);

    // Inicio de las Configuraciones del DrowDown
    this.dropdownListSocioDesarrollo = [];

    this.dropdownSettings = {
      singleSelection: true,
      text: 'Seleccione una Opción',
      enableSearchFilter: true,
      searchPlaceholderText: 'Buscar Elemento',
      classes: 'comboSea',
      showCheckbox: false,
      lazyLoading: false,
    };
  }


  /****************************************************************************
  * Funcion: makeToast
  * Object Number: 001
  * Fecha: 16-08-2018
  * Descripcion: Method makeToast of the Class
  * Objetivo: makeToast in the method header API
  ****************************************************************************/
  makeToast() {
    this.showToast(this.type, this.title, this.content);
  } // FIN | makeToast


  /****************************************************************************
  * Funcion: showToast
  * Object Number: 001.1
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
  * Object Number: 001.2
  * Fecha: 16-08-2018
  * Descripcion: Method showToast of the Class
  * Objetivo: showToast in the method header API
  ****************************************************************************/
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      showCloseButton: { 'warning': true, 'error': true },
    }); // FIN | toasterconfig


  /****************************************************************************
  * Funcion: getAllSocioDesarrolloService
  * Object Number: 002
  * Fecha: 05-05-2019
  * Descripcion: Method getAllSocioDesarrolloService of the Class
  * Objetivo: getAllSocioDesarrolloService listados de los Socios al Desarrollo
  * del Formulario de Actividad llamando a la API
  * Params: { caseBoolean }
  ****************************************************************************/
  private getAllSocioDesarrolloService(caseOrg: number) {
    // Ejecuta el Servicio de invocar todos los Programa de Desarrollo
    this._sharedOrganizacionesService.getAllSociosDesarrollo(caseOrg).subscribe(
      result => {
        if (result.status !== 200) {
          this.showToast('error', 'Error al Obtener la Información de todos los Socios al Desarrollo', result.message);
          this.JsonReceptionAllSocioDesarrollo = [];
        } else if (result.status === 200) {
          this.JsonReceptionAllSocioDesarrollo = result.data;

          // Setea la Lista de los todos Socios al Desarrollo
          this.dropdownListSocioDesarrollo = this.JsonReceptionAllSocioDesarrollo.map((item) => {
            return {
              id: item.idOrganizacion,
              itemName: item.descOrganizacion,
            }
          })
        }
      },
      error => {
        this.showToast('error', 'Error al Obtener la Información de todos los Socios al Desarrollo', JSON.stringify(error.message));
      },
    );
  } // FIN | getAllSocioDesarrolloService


  /****************************************************************************
  * Funcion: OnItemDeSelectSocioDesarrollo
  * Object Number: 003
  * Fecha: 03-05-2019
  * Descripcion: Method para Seleccionar Items del Socio al Desarrollo
  * en la Insercion del Proyecto
  * Objetivo: enviar al Json de Proyectos el Id del Socio al Desarrollo
  * información que ocupa la API
  ****************************************************************************/
  OnItemDeSelectSocioDesarrollo(item: any) {
    const foundSocioDesarrollo = this.JsonSendSociosDesarrollo.find(function (element) {
      return element.name === item.itemName;
    });

    if (foundSocioDesarrollo !== undefined) {
      this.showToast('error', 'Error al seleccionar Socio al Desarrollo', 'Ya existe en el listado el Socio al Desarrollo seleccionado');
    } else {
      // Asignamos el Socio al Desarrollo seleccionado
      this.JsonSendSociosDesarrollo = [...this.JsonSendSociosDesarrollo, { name: item.itemName, code: item.id }];
    }
  } // FIN | OnItemDeSelectSocioDesarrollo

}
