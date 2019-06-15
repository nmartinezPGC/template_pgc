/**
* @author Nahum Martinez
* @returns Componente de Agencia Beneficiaria
* @name AgenciaBeneficiariaComponent
* @alias _agenciaBeneficiariaComponent
* @version 1.0.0
* @fecha 14-05-2019
*/

import { Component, OnInit, Input } from '@angular/core';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { SharedOrganizacionesService } from '../../../services/organizaciones/shared-organizaciones.service';
import { AgenciaBeneficiariaService } from '../../../services/organizaciones/agencia-beneficiaria.service';
import { ActivityOrganizacionAgenciaBeneficiariaModel } from '../../../models/organizaciones/model-agencia-beneficiaria';
import { NotificacionesService } from '../../../../shared/services/notificaciones.service';


@Component({
  selector: 'ngx-agencia-beneficiaria',
  templateUrl: './agencia-beneficiaria.component.html',
  styleUrls: ['./agencia-beneficiaria.component.scss'],
  providers: [NotificacionesService],
})
export class AgenciaBeneficiariaComponent implements OnInit {
  // Variables entre Tabs | Components
  @Input() idProyectoTab: number;
  @Input() idUsuarioTab: number;
  @Input() codigoProyectoTab: string;

  /**
   * Configuracion del Dropdow List
   */
  dropdownListAgenciaBeneficiaria = [];
  selectedItemsAgenciaBeneficiaria = [];
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
  public JsonReceptionAllAgenciaBeneficiaria: any;

  // Json a enviar
  public JsonSendAgenciaBeneficiaria: any = [];
  changeDetectorRef: any;
// definicio de la variable del modelo
  public _activityOrganizacionAgenciaBeneficiariaModel: ActivityOrganizacionAgenciaBeneficiariaModel;


  /**
   * Constructor de la Clase
   */
  constructor(private _notificacionesService: NotificacionesService,
    private _agenciaBeneficiariaService: AgenciaBeneficiariaService,
    private _sharedOrganizacionesService: SharedOrganizacionesService) {
    // Codigo del Constructor
  }



  /**
   * Funcion Inicial de la clase
   */
  ngOnInit() {
    // inicializacion del Modelo
    this._activityOrganizacionAgenciaBeneficiariaModel = new ActivityOrganizacionAgenciaBeneficiariaModel(
      0, '', // datos Generales
      null, null, 0, // Relacionales
      true, null, null, // Auditoria
    );
    // Carga los Datos de agencia beneficiaria

    this.getAllAgenciaBeneficiariaService(3);

    // Inicio de las Configuraciones del DrowDown
    this.dropdownListAgenciaBeneficiaria = [];

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
  * Funcion: getAllAgenciaBeneficiariaService
  * Object Number: 002
  * Fecha: 05-05-2019
  * Descripcion: Method getAllAgenciaBeneficiariaService of the Class
  * Objetivo: getAllAgenciaBeneficiariaService listados de los Socios al Desarrollo
  * del Formulario de Actividad llamando a la API
  * Params: { caseBoolean }
  ****************************************************************************/
  private getAllAgenciaBeneficiariaService(caseOrg: number) {
    // Ejecuta el Servicio de invocar todos los Programa de Desarrollo
    this._sharedOrganizacionesService.getAllSociosDesarrollo(caseOrg).subscribe(
      result => {
        if (result.status !== 200) {
          this._notificacionesService.showToast('error', 'Error al Obtener la Información de todos los Socios al Desarrollo', result.message);
          this.JsonReceptionAllAgenciaBeneficiaria = [];
        } else if (result.status === 200) {
          this.JsonReceptionAllAgenciaBeneficiaria = result.data;

          // Setea la Lista de los todos Socios al Desarrollo
          this.dropdownListAgenciaBeneficiaria = this.JsonReceptionAllAgenciaBeneficiaria.map((item) => {
            return {
              id: item.idOrganizacion,
              itemName: item.descOrganizacion,
            }
          });
        }
      },
      error => {
        this._notificacionesService.showToast('error', 'Error al Obtener la Información de todos los Socios al Desarrollo', JSON.stringify(error.message));
      },
    );
  } // FIN | getAllAgenciaBeneficiariaService


  /****************************************************************************
  * Funcion: OnItemDeSelectAgenciaBeneficiaria
  * Object Number: 003
  * Fecha: 03-05-2019
  * Descripcion: Method para Seleccionar Items del Agencia Beneficiaria
  * en la Insercion del Proyecto
  * Objetivo: enviar al Json de Proyectos el Id del Agencia Beneficiaria
  * información que ocupa la API
  ****************************************************************************/
  OnItemSelectAgenciaBeneficiaria(item: any) {
    const foundAgenciaBeneficiaria = this.JsonSendAgenciaBeneficiaria.find(function (element) {
      return element.name === item.itemName;
    });

    if (foundAgenciaBeneficiaria !== undefined) {
      this._notificacionesService.showToast('error', 'Error al seleccionar Socio al Desarrollo', 'Ya existe en el listado el Socio al Desarrollo seleccionado');
    } else {
      // Asignamos la Agencia Beneficiaria seleccionado
      this.JsonSendAgenciaBeneficiaria = [...this.JsonSendAgenciaBeneficiaria, { name: item.itemName, code: item.id, otro: '' }];
    }
  } // FIN | OnItemDeSelectAgenciaBeneficiaria


  /****************************************************************************
  * Funcion: saveAgenciaBeneficiaria
  * Object Number: 004
  * Fecha: 03-05-2019
  * Descripcion: Method para Ingresar Items del Socio al Desarrollo
  * en la Insercion del Proyecto
  * Objetivo: enviar al Json del Socio al Desarrollo
  * información que ocupa la API
  ****************************************************************************/
 saveAgenciaBeneficiaria() {
   this.calcularPercent();

  this.JsonSendAgenciaBeneficiaria.forEach(element => {
    // Valida que se registre el % de participacion
    if (element.otro === '') {
      this._notificacionesService.showToast('error', 'Error al ingresar Agencia Beneficiaria', 'No tiene el % de participación ingresado');
      return -1;
    } else {
      this._activityOrganizacionAgenciaBeneficiariaModel.codigoActividad = this.codigoProyectoTab + '-AAB-' + element.code;
      this._activityOrganizacionAgenciaBeneficiariaModel.idActividad = { idActividad: this.idProyectoTab };
      this._activityOrganizacionAgenciaBeneficiariaModel.idOrganizacion = { idOrganizacion: element.code };
      this._activityOrganizacionAgenciaBeneficiariaModel.porcentajePart = Number(element.otro);

      // Ejecuta el Servicio de invocar el registro de Socio al Desarrollo
      this._agenciaBeneficiariaService.newActividadAgenciaBeneficiaria(this._activityOrganizacionAgenciaBeneficiariaModel).subscribe(
        result => {
          if (result.status !== 200) {
            this._notificacionesService.showToast('error', 'Error al Ingresar la Información de Agencia Beneficiaria', result.message);
          } else if (result.status === 200) {
            if (result.findRecord === true) {
              this._notificacionesService.showToast('error', 'Error al Ingresar la Información de Agencia Beneficiaria', result.message);
            } else {
              this._notificacionesService.showToast('default', 'Agencia Beneficiaria', result.message);
            }if (result.status === 200) {
              this.UpdateAgenciaBeneficiaria();
              this._notificacionesService.showToast('error', 'error al actualizar el registro', result.message);
            }
          }
        },
        error => {
          this._notificacionesService.showToast('error', 'Error al Ingresar la Información de Agencia Beneficiaria', JSON.stringify(error.error.message));
        },
      );
    }
  });
} // FIN | saveAgenciaBeneficiaria
/****************************************************************************
 * Funcion: upTipoOrganzacion()
 * Object Number: 0003
 * Fecha: 21-01-2019
 * Descripcion: Method updateTipoOganizacion
 * Objetivo: actualizar los Tipo de organizacion existentes perfiles.
 ****************************************************************************/
private UpdateAgenciaBeneficiaria() {
  // Seteo de las variables del Model al json de Java

  this._activityOrganizacionAgenciaBeneficiariaModel.idActividadAgenciaBeneficiaria; // = { idActividad: this._activityOrganizacionAgenciaBeneficiariaModel.porcentajePart };

  // this.validateUsuarios(this._usuarioModel);
  const responsedataExt: any = this.responsedata;

  if (responsedataExt.error === true) {
    this._notificacionesService.showToast('error', 'Error al ingresar los datos', responsedataExt.msg);
    return -1;
  }
  // Ejecutamos el Recurso del EndPoint
  this._agenciaBeneficiariaService.AgenciaBeneficiariaUpdate(this._activityOrganizacionAgenciaBeneficiariaModel.idActividadAgenciaBeneficiaria).subscribe(
    response => {
      if (response.status !== 200) {
        this._notificacionesService.showToast('error', 'Error al Ingresar la Información del Usuario', response.message);
      } else if (response.status === 200) {
        this._notificacionesService.showToast('default', 'se actualizo con exito la informacion de la organizacion', response.message);

      }
    },
  );
} // FIN | newUsuarioService



  /****************************************************************************
  * Funcion: cleanAgenciaBeneficiaria
  * Object Number: 005
  * Fecha: 13-05-2019
  * Descripcion: Method para limpiar Item del Agencia Beneficiaria
  * en la Insercion del Proyecto
  * Objetivo: limpiar el Json de los Items seleccionados
  ****************************************************************************/
 cleanAgenciaBeneficiaria(event: any) {
  for (let i = 0; i < this.JsonSendAgenciaBeneficiaria.length; i++) {
    if (this.JsonSendAgenciaBeneficiaria[i].code === event) {
      // Ejecuta el Servicio de invocar el registro de Agencia Beneficiaria
      this._agenciaBeneficiariaService.deleteActividadAgenciaBeneficiaria(this.codigoProyectoTab + '-AAB-' + this.JsonSendAgenciaBeneficiaria[i].code).subscribe(
        result => {
          if (result.status !== 200) {
            this._notificacionesService.showToast('error', 'Error al Borrar la Información de Agencia Beneficiaria', result.message);
          } else if (result.status === 200) {
            if (result.findRecord === true) {
              this._notificacionesService.showToast('error', 'Error al Borrar la Información de Agencia Beneficiaria', result.message);
            } else {
              this._notificacionesService.showToast('default', 'Agencia Beneficiaria', result.message);
              this.ngOnInit();
            }
          }
        },
        error => {
          this._notificacionesService.showToast('error', 'Error al Borrar la Información de Socios al Desarrollo', JSON.stringify(error.error.message));
        },
      );
      // Borramos el Item del Json
      this.JsonSendAgenciaBeneficiaria.splice(i, 1);
      // para el Bucle
      break;
    }
  }
  this.JsonSendAgenciaBeneficiaria = [...this.JsonSendAgenciaBeneficiaria];
} // FIN | cleanAgencia Beneficiaria


/****************************************************************************
* Funcion: cleanAllAgenciaBeneficiaria
* Object Number: 005.1
* Fecha: 13-05-2019
* Descripcion: Method para limpiar Items del agencia beneficiaria
* en la Insercion del Proyecto
* Objetivo: limpiar el Json de los Items seleccionados
****************************************************************************/
cleanAllAgenciaBeneficiaria() {
  this.JsonSendAgenciaBeneficiaria = [];
  this.JsonSendAgenciaBeneficiaria = [...this.JsonSendAgenciaBeneficiaria];
} // FIN | cleanAllAgenciaBeneficiaria

/****************************************************************************
  * Funcion: validaPercent
  * Object Number: 006
  * Fecha: 13-05-2019
  * Descripcion: Method para validar % Items del agencia beneficiaria
  * en la Insercion del Proyecto
  * Objetivo: % el Json de los Items seleccionados
  ****************************************************************************/
  validaPercent(event: any, codeIn: number) {
    const otroIn = event.target.value;

    this.JsonSendAgenciaBeneficiaria.map(function (dato) {
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
  * Descripcion: Method para calcular % Items del agencia beneficiraia
  * en la Insercion del Proyecto
  * Objetivo: calculo de % el Json de los Items seleccionados
  ****************************************************************************/
  calcularPercent() {
    // console.log(this.JsonSendSociosDesarrollo.length);
    const valorMax = (100 / this.JsonSendAgenciaBeneficiaria.length);

    this.JsonSendAgenciaBeneficiaria.map(function (dato) {
      dato.otro = valorMax.toFixed(2);
      return dato;
    });
  } // FIN | calcularPercent

}
