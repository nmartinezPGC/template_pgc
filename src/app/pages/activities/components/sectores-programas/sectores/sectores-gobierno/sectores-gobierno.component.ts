/**
* @author Nahum Martinez
* @returns Componente de Sectores de Gobierno
* @name SectoresGobiernoComponent
* @alias _sectoresGobiernoComponent
* @version 1.0.0
* @fecha 2019-04-15
*/

import { Component, OnInit, Input, ChangeDetectorRef, OnChanges } from '@angular/core';
import { Tree, TreeNode, MessageService, MenuItem } from 'primeng/primeng';
import { ToasterConfig, ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import { ListasComunesService } from '../../../../../common-list/services/listas-comunes.service';
import { ActivitySectoresOcdeModel } from '../../../../models/sectores/model-sectores-ocde';
import { ActivitySectoresGobiernoModel } from '../../../../models/sectores/model-sectores-gobierno';
import { ServiceSectoresGobiernoService } from '../../../../services/sectores/service-sectores-gobierno.service';

@Component({
  selector: 'ngx-sectores-gobierno',
  templateUrl: './sectores-gobierno.component.html',
  styleUrls: ['./sectores-gobierno.component.scss'],
  providers: [ServiceSectoresGobiernoService, MessageService, ToasterService, ListasComunesService],
})
export class SectoresGobiernoComponent implements OnInit, OnChanges {
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
  public JsonSendSectoresGobierno: any = [];
  public JsonSendSectoresGobiernoOpciones: any = [];

  // Json Recpetion de la Clase
  public JsonReceptionAllSectoresGobierno: any;
  public JsonReceptionSectorGobierno: any;
  public JsonReceptionSectorByNivelGobierno: any;
  public JsonReceptionSectorByNivelGobierno2: any;
  public JsonReceptionSectorByNivelGobierno3: any;
  public JsonReceptionSectorByNivelGobierno4: any;

  // Auditoria
  public secuenciaDeActividad: any;

  // Modelo de la Clase
  public _activitySectoresGobiernoModel: ActivitySectoresGobiernoModel;

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
   * @param _serviceSectoresGobiernoService
   * @param messageService
   */
  constructor(private _serviceSectoresGobiernoService: ServiceSectoresGobiernoService,
    private messageService: MessageService,
    private changeDetectorRef: ChangeDetectorRef,
    private _toasterService: ToasterService,
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
    this._activitySectoresGobiernoModel = new ActivitySectoresGobiernoModel(
      0, null, // Datos Generales
      null, 0, // Relacionales
      null, 0, 0,
      true, null, null, // Auditoria
    );

    // Llenado del Treeview de la Tabla
    this._serviceSectoresGobiernoService.getFiles().then(files => this.filesTree4 = files);

    // this.getAllSectoresGobiernoService();
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
  // FIN | unselectFile


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
      this.JsonSendSectoresGobiernoOpciones = [...this.JsonSendSectoresGobiernoOpciones, { name: event.node.label, code: event.node.data }];
    } else if (event.node.children.length === 0 ) { // Definicion de Items del Nivel 3
      this.JsonSendSectoresGobiernoOpciones = [...this.JsonSendSectoresGobiernoOpciones, { name: event.node.label, code: event.node.data }];
    } else if (event.node.children.length !== 0) { // Definicion de Items del Nivel 2
      // Evaluar si el Nivel 2 o Nivel 3
      if (event.node.children.length !== 0 && event.node.children.parent !== undefined) {
        // Nodos del Nivel 2
        for (let index = 0; index < event.node.children; index++) {
          const element = event.node.children[index];
          const resultado = this.JsonSendSectoresGobiernoOpciones.findIndex(sector => sector.name === element.label);
          // Evalua que el Item no este dentro del Json
          if (resultado !== -1) {
            // No carga Item porque ya existe
          } else {
            this.JsonSendSectoresGobiernoOpciones = [...this.JsonSendSectoresGobiernoOpciones, { name: element.label, code: element.data }];
          }
        }
      } else {
        // Nodos del Nivel 3
        for (let index = 0; index < event.node.children.length; index++) {
          const element = event.node.children[index];
          this.JsonSendSectoresGobiernoOpciones = [...this.JsonSendSectoresGobiernoOpciones, { name: element.label, code: element.data }];
        }
      }
    }
    this.JsonSendSectoresGobiernoOpciones.sort();
    // console.log(this.JsonSendSectoresGobiernoOpciones);
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
      const resultado = this.JsonSendSectoresGobiernoOpciones.findIndex(sector => sector.name !== itemNodeLabel);
      this.JsonSendSectoresGobiernoOpciones.splice(Number(resultado))
      this.JsonSendSectoresGobiernoOpciones = [...this.JsonSendSectoresGobiernoOpciones];
    }
     else if (event.node !== 0 ) {
      const itemNodeLabel = event.node.label;
      // Ejecucion del splice del elemento
      const resultado = this.JsonSendSectoresGobiernoOpciones.findIndex(sector => sector.name !== itemNodeLabel);
      this.JsonSendSectoresGobiernoOpciones.splice(Number(resultado), 1)
      this.JsonSendSectoresGobiernoOpciones = [...this.JsonSendSectoresGobiernoOpciones];
    }
  } // FIN | nodeUnselect


  /****************************************************************************
  * Funcion: getAllSectoresGobiernoService
  * Object Number: 003
  * Fecha: 21-02-2019
  * Descripcion: Method getAllSectoresGobiernoService of the Class
  * Objetivo: getAllSectoresGobiernoService listados de los Niveles
  * de Ubicacion de Implementacion del Formulario de Actividad llamando a la API
  * Params: { }
  ****************************************************************************/
  private getAllSectoresGobiernoService() {
    // Ejecuta el Servicio de invocar todos los Sectores de Desarrollo
    this._serviceSectoresGobiernoService.getAllSectoresGobierno().subscribe(
      result => {
        if (result.status !== 200) {
          this.showToast('error', 'Error al Obtener la Información de todos los Sectores de Desarrollo', result.message);
          this.JsonReceptionAllSectoresGobierno = [];
        } else if (result.status === 200) {
          this.JsonReceptionAllSectoresGobierno = result.data;

          // Setea la Lista de los todos Sectores Ocde/Cad
          this.nodes = this.JsonReceptionAllSectoresGobierno.map((item) => {
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
        this.showToast('error', 'Error al Obtener la Información de todos los Sectores de Desarrollo', JSON.stringify(error.message));
      },
    );
  } // FIN | getAllSectoresGobiernoService



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
    this._serviceSectoresGobiernoService.getfindByIdSector(idSector).subscribe(
      result => {
        if (result.status !== 200) {
          this.showToast('error', 'Error al Obtener la Información del Sector de Desarrollo', result.message);
          this.JsonReceptionSectorGobierno = [];
        } else if (result.status === 200) {
          this.JsonReceptionSectorGobierno = result.data;
        }
      },
      error => {
        this.showToast('error', 'Error al Obtener la Información del Sector de Desarrollo', JSON.stringify(error.message));
      },
    );
  } // FIN | getfindByIdSectorService


  /****************************************************************************
  * Funcion: getfindByIdNivelSectorService
  * Object Number: 005
  * Fecha: 25-03-2019
  * Descripcion: Method getfindByIdNivelSectorService of the Class
  * Objetivo: getfindByIdNivelSectorService detalle del Sector OCDE/CAD, con el
  * Id Nivel de Sector
  * Params: { idSNivelector }
  ****************************************************************************/
  private getfindByIdNivelSectorService(idSNivelector: number) {

    // Ejecucion del EndPoint de Consulta de Sector, por ID
    this._serviceSectoresGobiernoService.getfindByIdNivelSector(idSNivelector).subscribe(
      result => {
        if (result.status !== 200) {
          this.showToast('error', 'Error al Obtener la Información de Sector Nivel 1', result.message);
          this.JsonReceptionSectorByNivelGobierno = [];
          this.nodes = [];
        } else if (result.status === 200) {
          this.JsonReceptionSectorByNivelGobierno = result.data;
          this.getSectorOcdeCadNivel2(this.JsonReceptionSectorByNivelGobierno);
        }
      },
      error => {
        this.showToast('error', 'Error al Obtener la Información de Secotores de Desarrollo', JSON.stringify(error.message));
      },
    );
  } // FIN | getfindByIdNivelSectorService



  /****************************************************************************
  * Funcion: getSectorOcdeCadNivel2
  * Object Number: 006
  * Fecha: 25-03-2019
  * Descripcion: Method getSectorOcdeCadNivel2 of the Class
  * Objetivo: getSectorOcdeCadNivel2 de los Niveles inferiores Sector OCDE/CAD,
  * con el Id Nivel 1 de Sector
  * Params: { arrayN1 }
  ****************************************************************************/
  getSectorOcdeCadNivel2(array: any) {
    // Inicializacion del Arraeglo de Nivel 2
    this.JsonReceptionSectorByNivelGobierno2 = [];

    // Ejecucion del EndPoint de Consulta de Sector, por ID
    for (let n1 = 0; n1 < array.length; n1++) { // Ciclo del Nivel 1, definir el Nivel 2
      const element = array[n1];

      // Ejecutamos el servicio, para el Nivel 2
      setTimeout(() => {
        this._serviceSectoresGobiernoService.getfindByIdNivelSectorAndSectorPadreId(2, element.idSector).subscribe(
          result => {
            if (result.status !== 200) {
              this.showToast('error', 'Error al Obtener la Información de los Sectores Nivel 2', result.message);
              this.JsonReceptionSectorByNivelGobierno2 = [];
              this.arrayPush = [];
            } else if (result.status === 200) {
              this.JsonReceptionSectorByNivelGobierno2 = result.data;

              // Array para el Segundo Ciclo | Nivel 2
              const array2 = [];

              // Condicion de Jerarquia de Nivel 2
              if (this.JsonReceptionSectorByNivelGobierno2 !== undefined) {
                for (let n2 = 0; n2 < this.JsonReceptionSectorByNivelGobierno2.length; n2++) { // Ciclo del Nivel 2, definir el Nivel 3
                  // Array para el segundo Ciclo | Nivel 3
                  const array3 = [];

                  const element2 = this.JsonReceptionSectorByNivelGobierno2[n2];

                  // Hacemos el push al Array Principal, para cargar los nodos de Nivel 2
                  array2.push({
                    'label': element2.nombreSector,
                    'data': element2.idSector,
                    'expandedIcon': 'fa fa-folder-open',
                    'collapsedIcon': 'fa fa-folder',
                    'children': array3,
                  });
                }

                // Hacemos el push al Array Principal, para cargar los nodos de Nivel 1
                this.arrayPush.push({
                  'label': element.nombreSector,
                  'data': element.idSector,
                  'expandedIcon': 'fa fa-folder-open',
                  'collapsedIcon': 'fa fa-folder',
                  'children': array2,
                });
                this.loading = false;
              }
            } else {
              // console.log('No hay Datos Nivel 2 ***********************************************');
            }
          },
          error => {
            this.showToast('error', 'Error al Obtener la Información de Secotores de Desarrollo', JSON.stringify(error.message));
          },
        );
      }, 3000);
    }
  } // FIN | getSectorOcdeCadNivel2


  /****************************************************************************
  * Funcion: saveSectoresGobierno
  * Object Number: 007
  * Fecha: 15-04-2019
  * Descripcion: Method saveSectoresGobierno of the Class
  * Objetivo: saveSectoresGobierno Grabar listado Sector de Gobierno
  * Params: { JsonSendSectoresGobiernoOpciones }
  ****************************************************************************/
  saveSectoresGobierno() {
    // Seteo de los campos iniciales
    this._activitySectoresGobiernoModel.idActividad = { idActividad: this.idProyectoTab };

    // Validacion de Items seleccionados
    if (this.JsonSendSectoresGobiernoOpciones.length > 0) {
      // Recorre los items seleccionados del Treeview
      for (let index = 0; index < this.JsonSendSectoresGobiernoOpciones.length; index++) {
        const element = this.JsonSendSectoresGobiernoOpciones[index];

        // Asignacion del Sector de Gobierno
        this._activitySectoresGobiernoModel.idSectorGobierno = { idSector: element.code };

        this._activitySectoresGobiernoModel.codigoActividad = this.codigoProyectoTab + '-ASG-' + element.code;

        // Ejecucion del Sector de Gobierno
        this._serviceSectoresGobiernoService.saveActividadSectorGobierno(this._activitySectoresGobiernoModel).subscribe(
          result => {
            if (result.status !== 200) {
              this.showToast('error', 'Error al Ingresar la Información del Sector de Gobierno asociado al Proyecto', JSON.stringify(result.message));
            } else if (result.status === 200) {
              // Evalua los resultados de la query
              if (result.findRecord === false) {
                this.showToast('error', 'Error al Ingresar la Información del Sector de Gobierno asociado al Proyecto', JSON.stringify(result.message));
              } else {
                this.showToast('success', 'Sector de Gobierno asociado al Proyecto', JSON.stringify(result.message));
              }
            }
          },
          error => {
            this.showToast('error', 'Error al ingresar el Sector de Gobierno al Proyecto', JSON.stringify(error.message));
          },
        );
      }
    } else {
      this.showToast('error', 'Error al ingresar la Información Sectores de Gobierno', 'Debes de seleccionar los sectores de Gobierno, para continuar');
      return -1;
    }
  } // FIN | saveSectoresGobierno


  /****************************************************************************
  * Funcion: cleanSectoresGobierno
  * Object Number: 008
  * Fecha: 15-04-2019
  * Descripcion: Method cleanSectoresGobierno of the Class
  * Objetivo: cleanSectoresGobierno Limpia listado Sector de Gobierno
  * Params: { }
  ****************************************************************************/

  cleanSectoresGobierno() {
    this._serviceSectoresGobiernoService.getFiles().then(files => this.filesTree4 = files);
    this.JsonSendSectoresGobiernoOpciones = [];
    this.changeDetectorRef.detectChanges();
    this.JsonSendSectoresGobiernoOpciones = [...this.JsonSendSectoresGobiernoOpciones];
       // console.log(this.JsonSendSectoresGobiernoOpciones);
      } // FIN | cleanSectoresGobierno

}
