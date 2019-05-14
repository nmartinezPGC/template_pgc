/**
* @author Nahum Martinez
* @returns Componente de Socio Desarrollo
* @name AdmonFinancieroComponent
* @alias _admonFinancieroComponent
* @version 1.0.0
* @fecha 14-05-2019
*/

import { Component, OnInit, Input } from '@angular/core';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { SharedOrganizacionesService } from '../../../services/organizaciones/shared-organizaciones.service';

@Component({
  selector: 'ngx-admon-financiero',
  templateUrl: './admon-financiero.component.html',
  styleUrls: ['./admon-financiero.component.scss'],
  providers: [ToasterService],
})
export class AdmonFinancieroComponent implements OnInit {
  // Variables entre Tabs | Components
  @Input() idProyectoTab: number;
  @Input() idUsuarioTab: number;
  @Input() codigoProyectoTab: string;

  /**
   * Configuracion del Dropdow List
   */
  dropdownListAdmonFinanciero = [];
  selectedItemsAdmonFinanciero = [];
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
  public JsonReceptionAllAdmonFinanciero: any;

  // Json a enviar
  public JsonSendAdmonFinanciero: any = [];
  changeDetectorRef: any;

  /**
   * Constructor de la Clase
   */
  constructor(private _toasterService: ToasterService,
    private _sharedOrganizacionesService: SharedOrganizacionesService) {
    // Codigo del Constructor
  }


  /**
   * Funcion Inicial de la clase
   */
  ngOnInit() {
    // Carga los Datos de Socio al Desarrollo
    this.getAllAdmonFinancieroService(1);

    // Inicio de las Configuraciones del DrowDown
    this.dropdownListAdmonFinanciero = [];

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
  * Funcion: getAllAdmonFinancieroService
  * Object Number: 002
  * Fecha: 05-05-2019
  * Descripcion: Method getAllAdmonFinancieroService of the Class
  * Objetivo: getAllAdmonFinancieroService listados de los Socios al Desarrollo
  * del Formulario de Actividad llamando a la API
  * Params: { caseBoolean }
  ****************************************************************************/
  private getAllAdmonFinancieroService(caseOrg: number) {
    // Ejecuta el Servicio de invocar todos los Programa de Desarrollo
    this._sharedOrganizacionesService.getAllSociosDesarrollo(caseOrg).subscribe(
      result => {
        if (result.status !== 200) {
          this.showToast('error', 'Error al Obtener la Información de todos los Socios al Desarrollo', result.message);
          this.JsonReceptionAllAdmonFinanciero = [];
        } else if (result.status === 200) {
          this.JsonReceptionAllAdmonFinanciero = result.data;

          // Setea la Lista de los todos Socios al Desarrollo
          this.dropdownListAdmonFinanciero = this.JsonReceptionAllAdmonFinanciero.map((item) => {
            return {
              id: item.idOrganizacion,
              itemName: item.descOrganizacion,
            }
          });
        }
      },
      error => {
        this.showToast('error', 'Error al Obtener la Información de todos los Socios al Desarrollo', JSON.stringify(error.message));
      },
    );
  } // FIN | getAllAdmonFinancieroService


  /****************************************************************************
  * Funcion: OnItemDeSelectAdmonFinanciero
  * Object Number: 003
  * Fecha: 03-05-2019
  * Descripcion: Method para Seleccionar Items del Socio al Desarrollo
  * en la Insercion del Proyecto
  * Objetivo: enviar al Json de Proyectos el Id del Socio al Desarrollo
  * información que ocupa la API
  ****************************************************************************/
  OnItemSelectAdmonFinanciero(item: any) {
    const foundAdmonFinanciero = this.JsonSendAdmonFinanciero.find(function (element) {
      return element.name === item.itemName;
    });

    if (foundAdmonFinanciero !== undefined) {
      this.showToast('error', 'Error al seleccionar Socio al Desarrollo', 'Ya existe en el listado el Socio al Desarrollo seleccionado');
    } else {
      // Asignamos el Socio al Desarrollo seleccionado
      this.JsonSendAdmonFinanciero = [...this.JsonSendAdmonFinanciero, { name: item.itemName, code: item.id, otro: '' }];
    }
  } // FIN | OnItemDeSelectAdmonFinanciero


  /****************************************************************************
  * Funcion: saveAdmonFinanciero
  * Object Number: 004
  * Fecha: 03-05-2019
  * Descripcion: Method para Ingresar Items del Socio al Desarrollo
  * en la Insercion del Proyecto
  * Objetivo: enviar al Json del Socio al Desarrollo
  * información que ocupa la API
  ****************************************************************************/
  saveAdmonFinanciero() {
    this.JsonSendAdmonFinanciero.forEach(element => {
      // console.log('Idx: ' + JSON.stringify(element));
    });
  } // FIN | saveAdmonFinanciero



  /****************************************************************************
  * Funcion: cleanAdmonFinanciero
  * Object Number: 005
  * Fecha: 13-05-2019
  * Descripcion: Method para limpiar Items del Socio al Desarrollo
  * en la Insercion del Proyecto
  * Objetivo: limpiar el Json de los Items seleccionados
  ****************************************************************************/
  cleanAdmonFinanciero() {
    this.JsonSendAdmonFinanciero = [];
    this.JsonSendAdmonFinanciero = [...this.JsonSendAdmonFinanciero];
  } // FIN | cleanAdmonFinanciero


  /****************************************************************************
  * Funcion: validaPercent
  * Object Number: 006
  * Fecha: 13-05-2019
  * Descripcion: Method para validar % Items del Socio al Desarrollo
  * en la Insercion del Proyecto
  * Objetivo: % el Json de los Items seleccionados
  ****************************************************************************/
  validaPercent(event: any, codeIn: number) {
    const otroIn = event.target.value;

    this.JsonSendAdmonFinanciero.map(function (dato) {
      if (dato.code === codeIn) {
        dato.otro = otroIn;
      }
      return dato;
    });
  } // FIN | validaPercent


  /****************************************************************************
  * Funcion: calcularPercent
  * Object Number: 007
  * Fecha: 13-05-2019
  * Descripcion: Method para calcular % Items del Socio al Desarrollo
  * en la Insercion del Proyecto
  * Objetivo: calculo de % el Json de los Items seleccionados
  ****************************************************************************/
  calcularPercent() {
    // console.log(this.JsonSendAdmonFinanciero.length);
    const valorMax = (100 / this.JsonSendAdmonFinanciero.length);

    this.JsonSendAdmonFinanciero.map(function (dato) {
      dato.otro = valorMax.toFixed(2);
      return dato;
    });
  } // FIN | calcularPercent

}
