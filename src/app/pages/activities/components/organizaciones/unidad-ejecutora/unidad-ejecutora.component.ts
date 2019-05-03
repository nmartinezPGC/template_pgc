/**
* @author Nahum Martinez
* @returns Componente de Socio Desarrollo
* @name UnidadEjecutoraComponent
* @alias _UnidadEjecutoraComponent
* @version 1.0.0
* @fecha 02-05-2019
*/

import { Component, OnInit, Input } from '@angular/core';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { SharedOrganizacionesService } from '../../../services/organizaciones/shared-organizaciones.service';
import { UnidadEjecutoraService } from '../../../services/organizaciones/unidad-ejecutora.service';

@Component({
  selector: 'ngx-unidad-ejecutora',
  templateUrl: './unidad-ejecutora.component.html',
  styleUrls: ['./unidad-ejecutora.component.scss'],
  providers: [ToasterService, UnidadEjecutoraService],
})
export class UnidadEjecutoraComponent implements OnInit {
  // Variables entre Tabs | Components
  @Input() idProyectoTab: number;
  @Input() idUsuarioTab: number;
  @Input() codigoProyectoTab: string;

  /**
   * Configuracion del Dropdow List
   */
  dropdownListUnidadEjecutora = [];
  selectedItemsUnidadEjecutora = [];
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
  public JsonReceptionAllUnidadEjecutora: any;

  /**
   * Constructor de la Clase
   */
  constructor(private _toasterService: ToasterService,
    private _unidadEjecutoraService: UnidadEjecutoraService,
    private _sharedOrganizacionesService: SharedOrganizacionesService, ) {
    // Codigo del Constructor
  }


  /**
   * Funcion Inicial de la clase
   */
  ngOnInit() {
    // Carga los Datos de Socio al Desarrollo
    this.getAllUnidadEjecutoraService(2);

    // Inicio de las Configuraciones del DrowDown
    this.dropdownListUnidadEjecutora = [];

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
  * Funcion: getAllUnidadEjecutoraService
  * Object Number: 002
  * Fecha: 05-05-2019
  * Descripcion: Method getAllUnidadEjecutoraService of the Class
  * Objetivo: getAllUnidadEjecutoraService listados de los Socios al Desarrollo
  * del Formulario de Actividad llamando a la API
  * Params: { caseBoolean }
  ****************************************************************************/
  private getAllUnidadEjecutoraService(caseOrg: number) {
    // Ejecuta el Servicio de invocar todos los Programa de Desarrollo
    this._sharedOrganizacionesService.getAllSociosDesarrollo(caseOrg).subscribe(
      result => {
        if (result.status !== 200) {
          this.showToast('error', 'Error al Obtener la Información de todos los Socios al Desarrollo', result.message);
          this.JsonReceptionAllUnidadEjecutora = [];
        } else if (result.status === 200) {
          this.JsonReceptionAllUnidadEjecutora = result.data;

          // Setea la Lista de los todos Socios al Desarrollo
          this.dropdownListUnidadEjecutora = this.JsonReceptionAllUnidadEjecutora.map((item) => {
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
  } // FIN | getAllUnidadEjecutoraService


  /****************************************************************************
  * Funcion: OnItemDeSelectUnidadEjecutora
  * Object Number: 003
  * Fecha: 03-05-2019
  * Descripcion: Method para Seleccionar Items del Socio al Desarrollo
  * en la Insercion del Proyecto
  * Objetivo: enviar al Json de Proyectos el Id del Socio al Desarrollo
  * información que ocupa la API
  ****************************************************************************/
  OnItemDeSelectEspacioTrabajo(item: any) {
    // Asignamos el Pais seleccionado
    // this..idEspacioTrabajo = item.id;
    // this.tipoEspacioTrabajo = item.tipoEspacioTrabajo;
  } // FIN | OnItemDeSelectUnidadEjecutora

}
