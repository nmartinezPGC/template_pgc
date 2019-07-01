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
import { ActivityOrganizacionSocioDesarrolloModel } from '../../../models/organizaciones/model-socio-desarrollo';
import { NotificacionesService } from '../../../../shared/services/notificaciones.service';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'ngx-socio-desarrollo',
  templateUrl: './socio-desarrollo.component.html',
  styleUrls: ['./socio-desarrollo.component.scss'],
  providers: [NotificacionesService, SocioDesarrolloService, ConfirmationService],
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
  public JsonReceptionAllSocioDesarrolloByActividad: any;

  // Json a enviar
  public JsonSendSociosDesarrollo: any = [];
  changeDetectorRef: any;

  // Modelo de la Clase
  public _activityOrganizacionSocioDesarrolloModel: ActivityOrganizacionSocioDesarrolloModel;

  /**
   * Constructor de la Clase
   */
  constructor(private _notificacionesService: NotificacionesService,
    private _socioDesarrolloService: SocioDesarrolloService,
    private _sharedOrganizacionesService: SharedOrganizacionesService,
    private confirmationService: ConfirmationService) {
    // Codigo del Constructor
  }


  /**
   * Funcion Inicial de la clase
   */
  ngOnInit() {
    // inicializacion del Modelo
    this._activityOrganizacionSocioDesarrolloModel = new ActivityOrganizacionSocioDesarrolloModel(
      0, '', // datos Generales
      null, null, 0, // Relacionales
      true, null, null, // Auditoria
    );
    // Carga los Datos de Socio al Desarrollo
    this.getAllSocioDesarrolloService(1);

    // Carga de Socios al Desarrollo Registrados
    this.getAllSociosDesarrolloByActividadService(65);

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
  * Funcion: getAllSocioDesarrolloService
  * Object Number: FND-002
  * Fecha: 05-05-2019
  * Descripcion: Method getAllSocioDesarrolloService of the Class
  * Objetivo: Listados de los Socios al Desarrollo
  * del Formulario de Actividad llamando a la API
  * Params: { caseBoolean }
  ****************************************************************************/
  private getAllSocioDesarrolloService(caseOrg: number) {
    // Ejecuta el Servicio de invocar todos los Programa de Desarrollo
    this._sharedOrganizacionesService.getAllSociosDesarrollo(caseOrg).subscribe(
      result => {
        if (result.status !== 200) {
          this._notificacionesService.showToast('error', 'Error al Obtener la Información de todos los Socios al Desarrollo', result.message);
          this.JsonReceptionAllSocioDesarrollo = [];
        } else if (result.status === 200) {
          this.JsonReceptionAllSocioDesarrollo = result.data;

          // Setea la Lista de los todos Socios al Desarrollo
          this.dropdownListSocioDesarrollo = this.JsonReceptionAllSocioDesarrollo.map((item) => {
            return {
              id: item.idOrganizacion,
              itemName: item.descOrganizacion,
            }
          });
        }
      },
      error => {
        this._notificacionesService.showToast('error', 'Error al Obtener la Información de todos los Socios al Desarrollo', JSON.stringify(error.error.message));
      },
    );
  } // FIN | FND-002


  /****************************************************************************
  * Funcion: OnItemDeSelectSocioDesarrollo
  * Object Number: FND-003
  * Fecha: 03-05-2019
  * Descripcion: Method para Seleccionar Items del Socio al Desarrollo
  * en la Insercion del Proyecto
  * Objetivo: enviar al Json de Proyectos el Id del Socio al Desarrollo
  * información que ocupa la API
  ****************************************************************************/
  OnItemSelectSocioDesarrollo(item: any) {
    const foundSocioDesarrollo = this.JsonSendSociosDesarrollo.find(function (element) {
      return element.name === item.itemName;
    });

    if (foundSocioDesarrollo !== undefined) {
      this._notificacionesService.showToast('error', 'Error al seleccionar Socio al Desarrollo', 'Ya existe en el listado el Socio al Desarrollo seleccionado');
    } else {
      // Asignamos el Socio al Desarrollo seleccionado
      this.JsonSendSociosDesarrollo = [...this.JsonSendSociosDesarrollo, { name: item.itemName, code: item.id, otro: '' }];
    }
  } // FIN | FND-003


  /****************************************************************************
  * Funcion: saveSocioDesarrollo
  * Object Number: FND-004
  * Fecha: 03-05-2019
  * Descripcion: Method para Ingresar Items del Socio al Desarrollo
  * en la Insercion del Proyecto
  * Objetivo: enviar al Json del Socio al Desarrollo
  * información que ocupa la API
  ****************************************************************************/
  saveSocioDesarrollo() {
    this.calcularPercent();
    this.JsonSendSociosDesarrollo.forEach(element => {
      // Valida que se registre el % de participacion
      if (element.otro === '') {
        this._notificacionesService.showToast('error', 'Error al ingresar Socio al Desarrollo', 'No tiene el % de participación ingresado');
        return -1;
      } else {
        this._activityOrganizacionSocioDesarrolloModel.codigoActividad = this.codigoProyectoTab + '-ASD-' + element.code;
        this._activityOrganizacionSocioDesarrolloModel.idActividad = { idActividad: this.idProyectoTab };
        this._activityOrganizacionSocioDesarrolloModel.idOrganizacion = { idOrganizacion: element.code };
        this._activityOrganizacionSocioDesarrolloModel.porcentajePart = Number(element.otro);

        // Ejecuta el Servicio de invocar el registro de Socio al Desarrollo
        this._socioDesarrolloService.newActividadSociosDesarrollo(this._activityOrganizacionSocioDesarrolloModel).subscribe(
          result => {
            if (result.status !== 200) {
              this._notificacionesService.showToast('error', 'Error al Ingresar la Información de Socios al Desarrollo', result.message);
            } else if (result.status === 200) {
              if (result.findRecord === true) {
                this._notificacionesService.showToast('error', 'Error al Ingresar la Información de Socios al Desarrollo', result.message);
              } else {
                this._notificacionesService.showToast('default', 'Socio al Desarrollo', result.message);
              }
            }
          },
          error => {
            this._notificacionesService.showToast('error', 'Error al Ingresar la Información de Socios al Desarrollo', JSON.stringify(error.error.message));
          },
        );
      }
    });
  } // FIN | FND-004


  /****************************************************************************
  * Funcion: cleanSocioDesarrollo
  * Object Number: FND-005
  * Fecha: 13-05-2019
  * Descripcion: Method para Eliminar Item del Socio al Desarrollo
  * Objetivo: limpiar el Json de los Items seleccionados
  ****************************************************************************/
  cleanSocioDesarrollo(event: any) {
    for (let i = 0; i < this.JsonSendSociosDesarrollo.length; i++) {
      if (this.JsonSendSociosDesarrollo[i].code === event) {
        // Ejecuta el Servicio de invocar el registro de Socio al Desarrollo
        this._socioDesarrolloService.deleteActividadSociosDesarrollo(this.codigoProyectoTab + '-ASD-' + this.JsonSendSociosDesarrollo[i].code).subscribe(
          result => {
            if (result.status !== 200) {
              this._notificacionesService.showToast('error', 'Error al Borrar la Información de Socios al Desarrollo', result.message);
            } else if (result.status === 200) {
              if (result.findRecord === true) {
                this._notificacionesService.showToast('default', 'Socio al Desarrollo', result.message);
                this.ngOnInit();
              } else {
                this._notificacionesService.showToast('error', 'Error al Borrar la Información de Socios al Desarrollo', result.message);
              }
            }
          },
          error => {
            this._notificacionesService.showToast('error', 'Error al Borrar la Información de Socios al Desarrollo', JSON.stringify(error.error.message));
          },
        );
        // Borramos el Item del Json
        this.JsonSendSociosDesarrollo.splice(i, 1);
        // para el Bucle
        break;
      }
    }
    this.JsonSendSociosDesarrollo = [...this.JsonSendSociosDesarrollo];
  } // FIN | FND-005


  /****************************************************************************
  * Funcion: cleanAllSocioDesarrollo
  * Object Number: FND-005.1
  * Fecha: 13-05-2019
  * Descripcion: Method para limpiar Items del Socio al Desarrollo
  * en la Insercion del Proyecto
  * Objetivo: limpiar el Json de los Items seleccionados
  ****************************************************************************/
  cleanAllSocioDesarrollo() {
    this.JsonSendSociosDesarrollo = [];
    this.JsonSendSociosDesarrollo = [...this.JsonSendSociosDesarrollo];
  } // FIN | FND-005.1


  /****************************************************************************
  * Funcion: validaPercent
  * Object Number: FND-006
  * Fecha: 13-05-2019
  * Descripcion: Method para validar % Items del Socio al Desarrollo
  * en la Insercion del Proyecto
  * Objetivo: % el Json de los Items seleccionados
  ****************************************************************************/
  validaPercent(event: any, codeIn: number) {
    const otroIn = event.target.value;

    this.JsonSendSociosDesarrollo.map(function (dato) {
      if (dato.code === codeIn) {
        dato.otro = otroIn;
      }
      return dato;
    });
  } // FIN | FND-006


  /****************************************************************************
  * Funcion: calcularPercent
  * Object Number: FND-007
  * Fecha: 13-05-2019
  * Descripcion: Method para calcular % Items del Socio al Desarrollo
  * en la Insercion del Proyecto
  * Objetivo: calculo de % el Json de los Items seleccionados
  ****************************************************************************/
  calcularPercent() {
    const valorMax = (100 / this.JsonSendSociosDesarrollo.length);

    this.JsonSendSociosDesarrollo.map(function (dato) {
      dato.otro = valorMax.toFixed(2);
      return dato;
    });
  } // FIN | FND-007


  /****************************************************************************
  * Funcion: getAllSociosDesarrolloByActividadService
  * Object Number: FND-008
  * Fecha: 03-06-2019
  * Descripcion: Method getAllSociosDesarrolloByActividadService of the Class
  * Objetivo: getAllSociosDesarrolloByActividadService listados todos los Socios al Desarrollo
  * Params: { idActividad }
  ****************************************************************************/
  private getAllSociosDesarrolloByActividadService(idActividad: number) {
    // Ejecuta el Servicio de invocar todos los Socios al Desarrollo
    this._socioDesarrolloService.getAllSociosDesarrolloByIdActividad(idActividad).subscribe(
      result => {
        if (result.status !== 200) {
          this._notificacionesService.showToast('error', 'Error al Obtener la Información de todos Socios al Desarrollo', result.message);
          this.JsonReceptionAllSocioDesarrolloByActividad = [];
        } else if (result.status === 200) {
          this.JsonReceptionAllSocioDesarrolloByActividad = result.data;

          // Mapear los datos de los Socios al Desarrollo Registrados
          // console.log(this.JsonReceptionAllSocioDesarrolloByActividad);
          this.JsonSendSociosDesarrollo = this.JsonReceptionAllSocioDesarrolloByActividad.map((item) => {
            return {
              code: item.idOrganizacion.idOrganizacion,
              name: item.idOrganizacion.descOrganizacion,
              otro: item.porcentajePart,
            }
          });
        }
      },
      error => {
        this._notificacionesService.showToast('error', 'Error al Obtener la Información de todos Socios al Desarrollo', JSON.stringify(error.error.message));
      },
    );
  } // FIN | FND-008


  /****************************************************************************
  * Funcion: confirm
  * Object Number: FND-009
  * Fecha: 01-07-2019
  * Descripcion: Method confirm of the Class
  * Objetivo: Eliminar el Detalle de Financiamiento seleccionado
  * Params: { event }
  ****************************************************************************/
  confirm(event: any) {
    this.confirmationService.confirm({
      message: 'Estas seguro de Eliminar el Socio al Desarrollo, asegurate que no contenga relación con Financiamiento Detalle?',
      accept: () => {
        // Ejecuta la funcion de Eliminar el Socio al Desarrollo con Elementos relacionados
        this.cleanSocioDesarrollo(event);
      },
    });
  } // FIN | FND-009
}
