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
import { ActivityOrganizacionUnidadEjecutoraModel } from '../../../models/organizaciones/model-unidad-ejecutora';
import { NotificacionesService } from '../../../../shared/services/notificaciones.service';
@Component({
  selector: 'ngx-unidad-ejecutora',
  templateUrl: './unidad-ejecutora.component.html',
  styleUrls: ['./unidad-ejecutora.component.scss'],
  providers: [NotificacionesService, UnidadEjecutoraService],
})
export class UnidadEjecutoraComponent implements OnInit {
  // Variables entre Tabs | Components
  @Input() idProyectoTab: number;
  @Input() idUsuarioTab: number;
  @Input() codigoProyectoTab: string;
  @Input() idActividadUnidadEjecutora;

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
  public responsedata: any;

  // Json de recpcion de Informacion
  public JsonReceptionAllUnidadEjecutora: any;
  // Json a enviar
  public JsonSendUnidadEjecutora: any = [];
  changeDetectorRef: any;

  // Modelo de la Clase
  public _activityOrganizacionUnidadEjecutoraModel: ActivityOrganizacionUnidadEjecutoraModel;

  /**
   * Constructor de la Clase
   */
  constructor(private _notificacionesService: NotificacionesService,
    private _unidadEjecutoraService: UnidadEjecutoraService,
    private _sharedOrganizacionesService: SharedOrganizacionesService ) {
    // Codigo del Constructor
  }


  /**
   * Funcion Inicial de la clase
   */
  ngOnInit() {
    // inicializacion del Modelo
       this._activityOrganizacionUnidadEjecutoraModel = new ActivityOrganizacionUnidadEjecutoraModel(
      0, '', // datos Generales
      null, null, 0, // Relacionales
      true, null, null, // Auditoria
    );
    // Carga los Datos de Socio al Desarrollo
    this.getAllUnidadEjecutoraService(3);

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
     this._notificacionesService.showToast(this.type, this.title, this.content);
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
          this._notificacionesService.showToast('error', 'Error al Obtener la Información de todos los Socios al Desarrollo', result.message);
          this.JsonReceptionAllUnidadEjecutora = [];
        } else if (result.status === 200) {
          this.JsonReceptionAllUnidadEjecutora = result.data;

          // Setea la Lista de los todos Socios al Desarrollo
          this.dropdownListUnidadEjecutora = this.JsonReceptionAllUnidadEjecutora.map((item) => {
            return {
              id: item.idOrganizacion,
              itemName: item.descOrganizacion,
            }
          });
        }
      },
      error => {
        this._notificacionesService.showToast('error', 'Error al Obtener la Información de todas las Unidad Ejecutoras', JSON.stringify(error.message));
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
 OnItemSelectUnidadEjecutora(item: any) {const foundUnidadEjecutora = this.JsonSendUnidadEjecutora.find(function (element) {
    return element.name === item.itemName;
  });

  if (foundUnidadEjecutora !== undefined) {
    this._notificacionesService.showToast('error', 'Error al seleccionar Unidad Ejecutora', 'Ya existe en el listado la Unidad Ejecutora seleccionado');
  } else {
    // Asignamos la Unidad Ejecutora seleccionado
    this.JsonSendUnidadEjecutora = [...this.JsonSendUnidadEjecutora, { name: item.itemName, code: item.id, otro: '' }];
  }
  } // FIN | OnItemDeSelectUnidadEjecutora
  /****************************************************************************
  * Funcion: saveUnidadEjecutora
  * Object Number: 004
  * Fecha: 28-05-2019
  * Descripcion: Method para Ingresar Items de la Unidad Ejecutora
  * en la Insercion del Proyecto
  * Objetivo: enviar al Json de la Unidad Ejecutora
  * información que ocupa la API
  ****************************************************************************/
 saveUnidadEjecutora() {
   this.calcularPercent();
  this.JsonSendUnidadEjecutora.forEach(element => {
    // Valida que se registre el % de participacion
    if (element.otro === '') {
      this._notificacionesService.showToast('error', 'Error al ingresar la Unidad Ejecutora', 'No tiene el % de participación ingresado');
      return -1;
    } else {
      this._activityOrganizacionUnidadEjecutoraModel.codigoActividad = this.codigoProyectoTab + '-AUE-' + element.code;
      this._activityOrganizacionUnidadEjecutoraModel.idActividad = { idActividad: this.idProyectoTab };
      this._activityOrganizacionUnidadEjecutoraModel.idOrganizacion = { idOrganizacion: element.code };
      this._activityOrganizacionUnidadEjecutoraModel.porcentajePart = Number(element.otro);
      // Ejecuta el Servicio de invocar el registro de Socio al Desarrollo
      this._unidadEjecutoraService.newActividadUnidadEjecutora(this._activityOrganizacionUnidadEjecutoraModel).subscribe(
        result => {
          if (result.status !== 200) {
            this._notificacionesService.showToast('error', 'Error al Ingresar la Información de la Unidad Ejecutora', result.message);
          } else if (result.status === 200) {
            if (result.findRecord === true) {
              this._notificacionesService.showToast('error', 'Error al Ingresar la Información de la Unidad Ejecutora', result.message);
            } else {
              this._notificacionesService.showToast('default', 'Unidad Ejecutora', result.message);
            }
          }
        },
        error => {
          this._notificacionesService.showToast('error', 'Error al Ingresar la Información de la Unidad Ejecutora', JSON.stringify(error.error.message));
        },
      );
    }
  })
} // FIN | saveUnidadEjecutora
/****************************************************************************
  * Funcion: cleanUnidadEjecutora
  * Object Number: 005
  * Fecha: 28-05-2019
  * Descripcion: Method para limpiar Item de la Unidad Ejecutora
  * en la Insercion del Proyecto
  * Objetivo: limpiar el Json de los Items seleccionados
  ****************************************************************************/
 cleanUnidadEjecutora(event: any) {
  for (let i = 0; i < this.JsonSendUnidadEjecutora.length; i++) {
    if (this.JsonSendUnidadEjecutora[i].code === event) {
      // Ejecuta el Servicio de invocar el registro de Socio al Desarrollo
      this._unidadEjecutoraService.deleteActividadUnidadEjecutora(this.codigoProyectoTab + '-AUE-' + this.JsonSendUnidadEjecutora[i].code).subscribe(
        result => {
          if (result.status !== 200) {
            this._notificacionesService.showToast('error', 'Error al Borrar la Información de Unidad Ejecutora', result.message);
          } else if (result.status === 200) {
            if (result.findRecord === true) {
              this._notificacionesService.showToast('error', 'Error al Borrar la Información de Unidad Ejecutora', result.message);
            } else {
              this._notificacionesService.showToast('default', 'Unidad Ejecutora', result.message);
              this.ngOnInit();
            }
          }
        },
        error => {
          this._notificacionesService.showToast('error', 'Error al Borrar la Información de Unidad Ejecutora', JSON.stringify(error.error.message));
        },
      );
      // Borramos el Item del Json
      this.JsonSendUnidadEjecutora.splice(i, 1);
      // para el Bucle
      break;
    }
  }
  this.JsonSendUnidadEjecutora = [...this.JsonSendUnidadEjecutora];
} // FIN | cleanSocioDesarrollo


/****************************************************************************
* Funcion: cleanSocioDesarrollo
* Object Number: 005.1
* Fecha: 13-05-2019
* Descripcion: Method para limpiar Items del Socio al Desarrollo
* en la Insercion del Proyecto
* Objetivo: limpiar el Json de los Items seleccionados
****************************************************************************/
cleanAllUnidadEjecutora() {
  this.JsonSendUnidadEjecutora = [];
  this.JsonSendUnidadEjecutora = [...this.JsonSendUnidadEjecutora];
} // FIN | cleanUnidadEjecutora
/****************************************************************************
  * Funcion: UpdateUnidadEjecutora
  * Object Number: 006
  * Fecha: 30-05-2019
  * Descripcion: Method para actualizar datos de la  de Unidad Ejecutora
  * Objetivo: Actualizar datos de la Unidad Ejecutora
  ****************************************************************************/
private UpdateUnidadEjecutora() {
  this._activityOrganizacionUnidadEjecutoraModel.idActividadUnidadEjecutora

  // this.validateUsuarios(this._usuarioModel);
  const responsedataExt: any = this.responsedata;

  if (responsedataExt.error === true) {
    this._notificacionesService.showToast('error', 'Error al ingresar los datos', responsedataExt.msg);
    return -1;
  }
  // Ejecutamos el Recurso del EndPoint
  this._unidadEjecutoraService.OrganizacionUpdate(this._activityOrganizacionUnidadEjecutoraModel, this.idActividadUnidadEjecutora).subscribe(
    response => {
      if (response.status !== 200) {
        this._notificacionesService.showToast('error', 'Error al Ingresar los datos', response.message);
      } else if (response.status === 200) {
        this._notificacionesService.showToast('default', 'se actualizo con exito la informacion de la organizacion', response.message);
      }
    },
  );
}
/****************************************************************************
  * Funcion: validaPercent
  * Object Number: 006
  * Fecha: 13-05-2019
  * Descripcion: Method para validar % Items de Unidad Ejecutora
  * en la Insercion del Proyecto
  * Objetivo: % el Json de los Items seleccionados
  ****************************************************************************/
 validaPercent(event: any, codeIn: number) {
  const otroIn = event.target.value;

  this.JsonSendUnidadEjecutora.map(function (dato) {
    if (dato.code === codeIn) {
      dato.otro = otroIn;
    }
    return dato;
  });
} // FIN | validaPercent


/****************************************************************************
* Funcion: calcularPercent
* Object Number: 007
* Fecha: 28-05-2019
* Descripcion: Method para calcular % Items de la Unidad Ejecutora
* en la Insercion del Proyecto
* Objetivo: calculo de % el Json de los Items seleccionados
****************************************************************************/
calcularPercent() {
  const valorMax = (100 / this.JsonSendUnidadEjecutora.length);

  this.JsonSendUnidadEjecutora.map(function (dato) {
    dato.otro = valorMax.toFixed(2);
    return dato;
  });
} // FIN | calcularPercent
}
