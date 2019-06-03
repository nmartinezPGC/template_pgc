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
import { AdmonFinancieroService} from '../../../services/organizaciones/admon-financiero.service';
import { ActivityOrganizacionAdmonFinancieroModel } from '../../../models/organizaciones/model-Admon-Financiero';

@Component({
  selector: 'ngx-admon-financiero',
  templateUrl: './admon-financiero.component.html',
  styleUrls: ['./admon-financiero.component.scss'],
  providers: [ToasterService, AdmonFinancieroService],
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

  // definicion del modelo de la clase
  public _activityOrganizacionAdmonFinancieroModel: ActivityOrganizacionAdmonFinancieroModel;


  // Json a enviar
  public JsonSendAdmonFinanciero: any = [];
  changeDetectorRef: any;

  /**
   * Constructor de la Clase
   */
  constructor( private _toasterService: ToasterService,
    private _sharedOrganizacionesService: SharedOrganizacionesService,
    private _admonFinancieroService: AdmonFinancieroService ) {
    // Codigo del Constructor
  }


  /**
   * Funcion Inicial de la clase
   */
  ngOnInit() {

     // inicializacion del Modelo
     this._activityOrganizacionAdmonFinancieroModel = new ActivityOrganizacionAdmonFinancieroModel(
      0, '', // datos Generales
      null, null, 0, // Relacionales
      true, null, null, // Auditoria
    );

    // Carga los Datos de Admon Financiero
    this.getAllAdmonFinancieroService(4);

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
    // Ejecuta el Servicio de invocar todos los Programa de Admon Financiero
    this._sharedOrganizacionesService.getAllAdmonFinanciero(caseOrg).subscribe(
      result => {
        if (result.status !== 200) {
          this.showToast('error', 'Error al Obtener la Información de todos los datos de Admon Financiero', result.message);
          this.JsonReceptionAllAdmonFinanciero = [];
        } else if (result.status === 200) {
          this.JsonReceptionAllAdmonFinanciero = result.data;

          // Setea la Lista de todos los datos de Admon Financiero
          this.dropdownListAdmonFinanciero = this.JsonReceptionAllAdmonFinanciero.map((item) => {
            return {
              id: item.idOrganizacion,
              itemName: item.descOrganizacion,
            }
          });
        }
      },
      error => {
        this.showToast('error', 'Error al Obtener la Información de todos los datos de Admon Financiero', JSON.stringify(error.message));
      },
    );
  } // FIN | getAllAdmonFinancieroService


  /****************************************************************************
  * Funcion: OnItemDeSelectAdmonFinanciero
  * Object Number: 003
  * Fecha: 03-05-2019
  * Descripcion: Method para Seleccionar Items de Admon Financiero
  * en la Insercion del Proyecto
  * Objetivo: enviar al Json de Proyectos el Id de Admon Financiero
  * información que ocupa la API
  ****************************************************************************/
  OnItemSelectAdmonFinanciero(item: any) {
    const foundAdmonFinanciero = this.JsonSendAdmonFinanciero.find(function (element) {
      return element.name === item.itemName;
    });

    if (foundAdmonFinanciero !== undefined) {
      this.showToast('error', 'Error al seleccionar Admon Financiero', 'Ya existe en el listado de Admon Financiero seleccionado');
    } else {
      // Asignamos el Socio al Desarrollo seleccionado
      this.JsonSendAdmonFinanciero = [...this.JsonSendAdmonFinanciero, { name: item.itemName, code: item.id, otro: '' }];
    }
  } // FIN | OnItemDeSelectAdmonFinanciero


  /****************************************************************************
  * Funcion: saveAdmonFinanciero
  * Object Number: 004
  * Fecha: 03-05-2019
  * Descripcion: Method para Ingresar Items de Admon Financiero
  * en la Insercion del Proyecto
  * Objetivo: enviar al Json de Admon Financiero
  * información que ocupa la API
  ****************************************************************************/
 saveAdmonFinanciero() {
  this.JsonSendAdmonFinanciero.forEach(element => {
    // Valida que se registre el % de participacion
    if (element.otro === '') {
      this.showToast('error', 'Error al ingresar Socio al Desarrollo', 'No tiene el % de participación ingresado');
      return -1;
    } else {
      this._activityOrganizacionAdmonFinancieroModel.codigoActividad = this.codigoProyectoTab + '-AAF-' + element.code;
      this._activityOrganizacionAdmonFinancieroModel.idActividad = { idActividad: this.idProyectoTab };
      this._activityOrganizacionAdmonFinancieroModel.idOrganizacion = { idOrganizacion: element.code };
      this._activityOrganizacionAdmonFinancieroModel.porcentajePart = Number(element.otro);

      // Ejecuta el Servicio de invocar el registro de Admon Financiero
      this._admonFinancieroService.newActividadAdmonFinanciero(this._activityOrganizacionAdmonFinancieroModel).subscribe(
        result => {
          if (result.status !== 200) {
            this.showToast('error', 'Error al Ingresar la Información de Admon Financiero', result.message);
          } else if (result.status === 200) {
            if (result.findRecord === true) {
              this.showToast('error', 'Error al Ingresar la Información de Admon Financiero', result.message);
            } else {
              this.showToast('default', 'Admon Financiero', result.message);
            }
          }
        },
        error => {
          this.showToast('error', 'Error al Ingresar la Informacións de Admon Financiero', JSON.stringify(error.error.message));
        },
      );
    }
  });
} // FIN | saveAdmonFinanciero



  /****************************************************************************
  * Funcion: cleanAdmonFinanciero
  * Object Number: 005
  * Fecha: 13-05-2019
  * Descripcion: Method para limpiar Items de Admon Financiero
  * en la Insercion del Proyecto
  * Objetivo: limpiar el Json de los Items seleccionados
  ****************************************************************************/
 cleanAdmonFinanciero(event: any) {
  for (let i = 0; i < this.JsonSendAdmonFinanciero.length; i++) {
    if (this.JsonSendAdmonFinanciero[i].code === event) {
      // Ejecuta el Servicio de invocar el registro de Socio al Desarrollo
      this._admonFinancieroService.deleteActividadAdmonFinanciero(this.codigoProyectoTab + '-AAF-' + this.JsonSendAdmonFinanciero[i].code).subscribe(
        result => {
          if (result.status !== 200) {
            this.showToast('error', 'Error al Borrar la Información de Admon Financiero', result.message);
          } else if (result.status === 200) {
            if (result.findRecord === true) {
              this.showToast('error', 'Error al Borrar la Información de Admon Financiero', result.message);
            } else {
              this.showToast('default', 'Admon Financiero', result.message);
            }
          }
        },
        error => {
          this.showToast('error', 'Error al Borrar la Información de Admon financiero', JSON.stringify(error.error.message));
        },
      );
      // Borramos el Item del Json
      this.JsonSendAdmonFinanciero.splice(i, 1);
      // para el Bucle
      break;
    }
  }
  this.JsonSendAdmonFinanciero = [...this.JsonSendAdmonFinanciero];
} // FIN | cleanAdmonFinanciero

cleanAllAdmonFinanciero() {
  this.JsonSendAdmonFinanciero = [];
  this.JsonSendAdmonFinanciero = [...this.JsonSendAdmonFinanciero];

} // FIN | cleanAdmonFinanciero


  /****************************************************************************
  * Funcion: validaPercent
  * Object Number: 006
  * Fecha: 13-05-2019
  * Descripcion: Method para validar % Items de Admon Financiero
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
  * Descripcion: Method para calcular % Items de Admon Financiero
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
