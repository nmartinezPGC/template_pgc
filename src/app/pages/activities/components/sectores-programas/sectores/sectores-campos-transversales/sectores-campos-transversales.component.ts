/**
* @author Nahum Martinez
* @returns Componente de Campos Transversales
* @name SectoresCamposTransversalesComponent
* @alias _sectoresCamposTransversalesComponent
* @version 1.0.0
* @fecha 16-04-2019
*/

import { Component, OnInit, Input, ChangeDetectorRef, OnChanges } from '@angular/core';
import { TreeNode, MessageService, MenuItem } from 'primeng/primeng';
import { ToasterConfig, ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import { ListasComunesService } from '../../../../../common-list/services/listas-comunes.service';
import { ActivitySectoresCampoTransversalModel } from '../../../../models/sectores/model-sectores-campo-transversal';
import { ServiceSectoresCampoTransversalService } from '../../../../services/sectores/service-sectores-campo-transversal.service';
import { NotificacionesService } from '../../../../../shared/services/notificaciones.service';

@Component({
  selector: 'ngx-sectores-campos-transversales',
  templateUrl: './sectores-campos-transversales.component.html',
  styleUrls: ['./sectores-campos-transversales.component.scss'],
  providers: [ServiceSectoresCampoTransversalService, MessageService, NotificacionesService, ListasComunesService],
})
export class SectoresCamposTransversalesComponent implements OnInit, OnChanges {
  // Variables entre Tabs | Components
  @Input() idProyectoTab: number;
  @Input() idUsuarioTab: number;
  @Input() codigoProyectoTab: string;

  // variable del Json
  @Input() JsonPassData: any;

  // Variable del Pipe Filter
  queryString = '';

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

  /**
   * Configuracion Lazy Load de TreeView
   */
  loading: boolean;

  /**
   * Configuracion del Dropdow List NMA
   */
  dropdownList = [];
  selectedItems = [];
  selectedItemsPais = [];
  selectedItemsEspacioTrabajo = [];
  dropdownSettings = {};

  // Propieades de los Nodos del Tree
  filesTree4: TreeNode[];
  selectedFiles2: TreeNode[];
  items: MenuItem[];
  selectedFile2: TreeNode;
  nodes: TreeNode[];
  nodes2: TreeNode[];
  nodes3: TreeNode[];
  public arrayPush = [];
  public arrayPush2 = [];

  // Json, de cargado de Sectores
  public JsonSendSectoresCampoTransversal: any = [];
  public JsonSendSectoresCampoTransversalOpciones: any = [];

  // Json Recpetion de la Clase
  public JsonReceptionAllSectoresCampoTransversal: any;
  public JsonReceptionSectorCampoTransversal: any;
  public JsonReceptionSectorByNivelCampoTransversal: any;
  public JsonReceptionSectorByNivelCampoTransversal2: any;
  public JsonReceptionSectorByNivelCampoTransversal3: any;
  public JsonReceptionSectorByNivelCampoTransversal4: any;

  // Auditoria
  public secuenciaDeActividad: any;

  // Modelo de la Clase
  public _activitySectoresCampoTransversal: ActivitySectoresCampoTransversalModel;

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

  /**
   * constructor
   * @param _serviceSectoresCampoTransversalService
   * @param messageService
   */
  constructor(private _serviceSectoresCampoTransversalService: ServiceSectoresCampoTransversalService,
    private messageService: MessageService,
    private changeDetectorRef: ChangeDetectorRef,
    private _notificacionesService: NotificacionesService,
    private _listasComunesService: ListasComunesService) {
    // Codigo del Constructor
  }

  /**
   * Inicializacion de la Clase
   */
  ngOnInit() {
    // Cargando los Items del TreeView
    this.loading = true;

    // Inicializacion del Modelo
    this._activitySectoresCampoTransversal = new ActivitySectoresCampoTransversalModel(
      0, null, // Datos Generales
      null, 0, // Relacionales
      null, 0, 0,
      true, null, null, // Auditoria
    );

    // Llenado del Treeview de la Tabla
    this._serviceSectoresCampoTransversalService.getFiles().then(files => this.filesTree4 = files);

    // this.getfindByIdNivelSectorService(1);
  }


  /****************************************************************************
  * Funcion: makeToast
  * Object Number: 003
  * Fecha: 16-08-2018
  * Descripcion: Method makeToast of the Class
  * Objetivo: makeToast in the method header API
  ****************************************************************************/
  makeToast() {
    this._notificacionesService.showToast(this.type, this.title, this.content);
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
  * Funcion: viewFile
  * Object Number: 001
  * Fecha: 21-03-2019
  * Descripcion: Method viewFile of the Class
  * Objetivo: viewFile in the method selected item with Treeview
  ****************************************************************************/
  viewFile(file: TreeNode) {
    this.messageService.add({ severity: 'info', summary: 'Node Selected with Right Click', detail: file.label });
  } // FIN | viewFile


  /****************************************************************************
  * Funcion: unselectFile
  * Object Number: 002
  * Fecha: 21-03-2019
  * Descripcion: Method unselectFile of the Class
  * Objetivo: unselectFile in the method selected item with Treeview
  ****************************************************************************/
  unselectFile() {
    this.filesTree4 = null;
  } // FIN | unselectFile


  /****************************************************************************
  * Funcion: nodeSelect
  * Object Number: 002
  * Fecha: 21-03-2019
  * Descripcion: Method nodeSelect of the Class
  * Objetivo: nodeSelect in the method selected item with Treeview
  ****************************************************************************/
  nodeSelect(event) {
    // console.log(event);
    // Condicion de Agregar los Nodos
    if (event.node.children === undefined) { // Definicion de Items del Nivel 4
      this.JsonSendSectoresCampoTransversalOpciones = [...this.JsonSendSectoresCampoTransversalOpciones, { name: event.node.label, code: event.node.data }];
    } else if (event.node.children.length === 0) { // Definicion de Items del Nivel 3
      this.JsonSendSectoresCampoTransversalOpciones = [...this.JsonSendSectoresCampoTransversalOpciones, { name: event.node.label, code: event.node.data }];
    } else if (event.node.children.length !== 0) { // Definicion de Items del Nivel 2
      // Evaluar si el Nivel 2 o Nivel 3
      if (event.node.children.length !== 0 && event.node.parent !== undefined) {
        // Nodos del Nivel 2
        for (let index = 0; index < event.node.children.length; index++) {
          const element = event.node.children[index];
          const resultado = this.JsonSendSectoresCampoTransversalOpciones.findIndex(sector => sector.name === element.label);
          // Evalua que el Item no este dentro del Json
          if (resultado !== -1) {
            // No carga Item porque ya existe
          } else {
            this.JsonSendSectoresCampoTransversalOpciones = [...this.JsonSendSectoresCampoTransversalOpciones, { name: element.label, code: element.data }];
          }
        }
      } else {
        // Nodos del Nivel 3
        for (let index = 0; index < event.node.children.length; index++) {
          const element = event.node.children[index];
          this.JsonSendSectoresCampoTransversalOpciones = [...this.JsonSendSectoresCampoTransversalOpciones, { name: element.label, code: element.data }];
        }
      }
    }
    this.JsonSendSectoresCampoTransversalOpciones.sort();
    // console.log(this.JsonSendSectoresCampoTransversalOpciones);
  } // FIN | nodeSelects


  /****************************************************************************
  * Funcion: nodeUnselect
  * Object Number: 002
  * Fecha: 21-03-2019
  * Descripcion: Method nodeUnselect of the Class
  * Objetivo: nodeUnselect in the method selected item with Treeview
  ****************************************************************************/
  nodeUnselect(event) {
    // Condicion de Agregar los Nodos
    if (event.node !== undefined) {
      const itemNodeLabel = event.node.label;
      // Ejecucion del splice del elemento
      const resultado = this.JsonSendSectoresCampoTransversalOpciones.findIndex(sector => sector.name === itemNodeLabel);
      this.JsonSendSectoresCampoTransversalOpciones.splice(Number(resultado), 1)
      this.JsonSendSectoresCampoTransversalOpciones = [...this.JsonSendSectoresCampoTransversalOpciones];
    } else if (event.node.children !== undefined && event.node.children.length !== 0) {
      for (let index = 0; index < event.node.children.length; index++) {
        const element = event.node.children[index];
        // Ejecucion del splice por el item de iteracion
        const resultado = this.JsonSendSectoresCampoTransversalOpciones.findIndex(sector => sector.name === element.label);
        this.JsonSendSectoresCampoTransversalOpciones.splice(Number(resultado), 1)
        this.JsonSendSectoresCampoTransversalOpciones = [...this.JsonSendSectoresCampoTransversalOpciones];
      }
    } else if (event.node.children !== undefined && event.node.children.length === 0) {
      const itemNodeLabel = event.node.label;
      // Ejecucion del splice del elemento
      const resultado = this.JsonSendSectoresCampoTransversalOpciones.findIndex(sector => sector.name === itemNodeLabel);
      this.JsonSendSectoresCampoTransversalOpciones.splice(Number(resultado), 1)
      this.JsonSendSectoresCampoTransversalOpciones = [...this.JsonSendSectoresCampoTransversalOpciones];
    }
  } // FIN | nodeUnselect


  /****************************************************************************
  * Funcion: getAllSectoresCampoTransversalService
  * Object Number: 003
  * Fecha: 21-02-2019
  * Descripcion: Method getAllSectoresCampoTransversalService of the Class
  * Objetivo: getAllSectoresCampoTransversalService listados de los Niveles
  * de Ubicacion de Implementacion del Formulario de Actividad llamando a la API
  * Params: { }
  ****************************************************************************/
  private getAllSectoresCampoTransversalService() {
    // Ejecuta el Servicio de invocar todos los Sectores de Desarrollo
    this._serviceSectoresCampoTransversalService.getAllSectoresCamposTransversales().subscribe(
      result => {
        if (result.status !== 200) {
          this._notificacionesService.showToast('error', 'Error al Obtener la Información de todos los Sectores de Desarrollo', result.message);
          this.JsonReceptionAllSectoresCampoTransversal = [];
        } else if (result.status === 200) {
          this.JsonReceptionAllSectoresCampoTransversal = result.data;

          // Setea la Lista de los todos Sectores Campos Transversales
          this.nodes = this.JsonReceptionAllSectoresCampoTransversal.map((item) => {
            return {
              label: item.nombreSector,
              data: item.codigoSector,
              expandedIcon: 'fa fa-folder-open',
              collapsedIcon: 'fa fa-folder',
              children: [{
                label: item.idNivelSector.nombreNivelSector,
                data: item.codigoSector,
                expandedIcon: 'fa fa-folder-open',
                collapsedIcon: 'fa fa-fold*er',
              }],
            }
          })
        }
      },
      error => {
        this._notificacionesService.showToast('error', 'Error al Obtener la Información de todos los Sectores de Desarrollo', JSON.stringify(error.message));
      },
    );
  } // FIN | getAllSectoresCampoTransversalService



  /****************************************************************************
  * Funcion: getfindByIdSectorService
  * Object Number: 004
  * Fecha: 22-03-2019
  * Descripcion: Method getfindByIdSectorService of the Class
  * Objetivo: getfindByIdSectorService detalle del Sector Gobierno, con el ID
  * Params: { idSector }
  ****************************************************************************/
  private getfindByIdSectorService(idSector: number) {

    // Ejecucion del EndPoint de Consulta de Sector, por ID
    this._serviceSectoresCampoTransversalService.getfindByIdSector(idSector).subscribe(
      result => {
        if (result.status !== 200) {
          this._notificacionesService.showToast('error', 'Error al Obtener la Información del Sector de Desarrollo', result.message);
          this.JsonReceptionSectorCampoTransversal = [];
        } else if (result.status === 200) {
          this.JsonReceptionSectorCampoTransversal = result.data;
        }
      },
      error => {
        this._notificacionesService.showToast('error', 'Error al Obtener la Información del Sector de Desarrollo', JSON.stringify(error.message));
      },
    );
  } // FIN | getfindByIdSectorService


  /****************************************************************************
  * Funcion: getfindByIdNivelSectorService
  * Object Number: 005
  * Fecha: 25-03-2019
  * Descripcion: Method getfindByIdNivelSectorService of the Class
  * Objetivo: getfindByIdNivelSectorService detalle del Sector Campos Transversales, con el
  * Id Nivel de Sector
  * Params: { idSNivelector }
  ****************************************************************************/
  private getfindByIdNivelSectorService(idSNivelector: number) {

    // Ejecucion del EndPoint de Consulta de Sector, por ID
    this._serviceSectoresCampoTransversalService.getfindByIdNivelSector(idSNivelector).subscribe(
      result => {
        if (result.status !== 200) {
          this._notificacionesService.showToast('error', 'Error al Obtener la Información de Sector Nivel 1', result.message);
          this.JsonReceptionSectorByNivelCampoTransversal = [];
          this.nodes = [];
        } else if (result.status === 200) {
          this.JsonReceptionSectorByNivelCampoTransversal = result.data;
          this.getSectorOcdeCadNivel2(this.JsonReceptionSectorByNivelCampoTransversal);
        }
      },
      error => {
        this._notificacionesService.showToast('error', 'Error al Obtener la Información de Secotores de Desarrollo', JSON.stringify(error.message));
      },
    );
  } // FIN | getfindByIdNivelSectorService



  /****************************************************************************
  * Funcion: getSectorOcdeCadNivel2
  * Object Number: 006
  * Fecha: 25-03-2019
  * Descripcion: Method getSectorOcdeCadNivel2 of the Class
  * Objetivo: getSectorOcdeCadNivel2 de los Niveles inferiores Sector Campos Transversales,
  * con el Id Nivel 1 de Sector
  * Params: { arrayN1 }
  ****************************************************************************/
  getSectorOcdeCadNivel2(array: any) {
    // Inicializacion del Arraeglo de Nivel 2
    this.JsonReceptionSectorByNivelCampoTransversal2 = [];
    this.JsonReceptionSectorByNivelCampoTransversal3 = [];
    this.JsonReceptionSectorByNivelCampoTransversal4 = [];

    // Ejecucion del EndPoint de Consulta de Sector, por ID
    for (let n1 = 0; n1 < array.length; n1++) { // Ciclo del Nivel 1, definir el Nivel 2
      const element = array[n1];

      // Ejecutamos el servicio, para el Nivel 2
      setTimeout(() => {
        // Hacemos el push al Array Principal, para cargar los nodos de Nivel 1
        this.arrayPush.push({
          'label': element.nombreSector,
          'data': element.idSector,
        });
        this.loading = false;
      }, 1000);
    }
  } // FIN | getSectorOcdeCadNivel2


  /****************************************************************************
  * Funcion: saveSectoresCampoTransversal
  * Object Number: 007
  * Fecha: 15-04-2019
  * Descripcion: Method saveSectoresCampoTransversal of the Class
  * Objetivo: saveSectoresCampoTransversal Grabar listado Campo Transversal
  * Params: { JsonSendSectoresCampoTransversalOpciones }
  ****************************************************************************/
  saveSectoresCampoTransversal() {
    // Seteo de los campos iniciales
    this._activitySectoresCampoTransversal.idActividad = { idActividad: this.idProyectoTab };

    // Validacion de Items seleccionados
    if (this.JsonSendSectoresCampoTransversalOpciones.length > 0) {
      // Recorre los items seleccionados del Treeview
      for (let index = 0; index < this.JsonSendSectoresCampoTransversalOpciones.length; index++) {
        const element = this.JsonSendSectoresCampoTransversalOpciones[index];

        // Asignacion del Campo Transversal
        this._activitySectoresCampoTransversal.idSectorCampo = { idSector: element.code };

        this._activitySectoresCampoTransversal.codigoActividad = this.codigoProyectoTab + '-ASC-' + element.code;
        // console.log(this._activitySectoresCampoTransversalModel);
        // Ejecucion del Campo Transversal
        this._serviceSectoresCampoTransversalService.saveActividadSectorCampoTransversal(this._activitySectoresCampoTransversal).subscribe(
          result => {
            if (result.status !== 200) {
              this._notificacionesService.showToast('error', 'Error al Ingresar la Información del Campo Transversal asociado al Proyecto', JSON.stringify(result.message));
            } else if (result.status === 200) {
              // Evalua los resultados de la query
              if (result.findRecord === false) {
                this._notificacionesService.showToast('error', 'Error al Ingresar la Información del Campo Transversal asociado al Proyecto', JSON.stringify(result.message));
              } else {
                this._notificacionesService.showToast('success', 'Campo Transversal asociado al Proyecto', JSON.stringify(result.message));
              }
            }
          },
          error => {
            this._notificacionesService.showToast('error', 'Error al ingresar el Campo Transversal al Proyecto', JSON.stringify(error.message));
          },
        );
      }
    } else {
      this._notificacionesService.showToast('error', 'Error al ingresar la Información Campos Transversales', 'Debes de seleccionar los Campos Transversales, para continuar');
      return -1;
    }
  } // FIN | saveSectoresCampoTransversal


  /****************************************************************************
  * Funcion: cleanSectoresCamposTransversales
  * Object Number: 008
  * Fecha: 16-04-2019
  * Descripcion: Method cleanSectoresCamposTransversales of the Class
  * Objetivo: cleanSectoresCamposTransversales Limpia listado Campo Transversal
  * Params: { }
  ****************************************************************************/
  cleanSectoresCamposTransversales() {
    this._serviceSectoresCampoTransversalService.getFiles().then(files => this.filesTree4 = files);
    this.JsonSendSectoresCampoTransversalOpciones = [];
    this.changeDetectorRef.detectChanges();
    this.JsonSendSectoresCampoTransversalOpciones = [...this.JsonSendSectoresCampoTransversalOpciones];
    // console.log(this.JsonSendSectoresCampoTransversalOpciones);
  } // FIN | cleanSectoresCamposTransversales

}
