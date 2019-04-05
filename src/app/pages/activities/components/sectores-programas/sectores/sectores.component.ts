/**
* @author Nahum Martinez
* @returns Sectores OCDE/CAD
* @name SectoresComponent
* @alias _sectoresComponent
* @version 1.0.0
* @date 2019-04-02
*/

import { Component, OnInit, ChangeDetectorRef, Input, OnChanges } from '@angular/core';
import { Tree, TreeNode, MessageService, MenuItem } from 'primeng/primeng';
import { ServiceSectoresService } from '../../../services/service-sectores.service';
import { ToasterConfig, Toast, BodyOutputType, ToasterService } from 'angular2-toaster';
import { delay } from 'q';

@Component({
  selector: 'ngx-sectores',
  templateUrl: './sectores.component.html',
  styleUrls: ['./sectores.component.scss'],
  providers: [ServiceSectoresService, MessageService, ToasterService],
})
export class SectoresComponent implements OnInit, OnChanges {
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
   * Configuracion del Dropdow List NMA
   */
  dropdownList = [];
  dropdownListPais = [];
  dropdownListEspacioTrabajo = [];
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
  public JsonSendSectoresOcdeCad: any = [];
  public JsonSendSectoresOcdeCadOpciones: any = [];

  // Json Recpetion de la Clase
  public JsonReceptionAllSectoresOcdeCad: any;
  public JsonReceptionSectorOcdeCad: any;
  public JsonReceptionSectorByNivelOcdeCad: any;
  public JsonReceptionSectorByNivelOcdeCad2: any;
  public JsonReceptionSectorByNivelOcdeCad3: any;
  public JsonReceptionSectorByNivelOcdeCad4: any;

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

  cities: any[];

  /**
   * constructor
   * @param _serviceSectoresService
   * @param messageService
   */
  constructor(private _serviceSectoresService: ServiceSectoresService,
    private messageService: MessageService,
    private changeDetectorRef: ChangeDetectorRef,
    private _toasterService: ToasterService) {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
  }

  /**
   * Inicializacion de la Clase
   */
  ngOnInit() {
    this.dropdownList = [
      { 'id': 1, 'itemName': 'India', 'category': 'asia' },
      { 'id': 2, 'itemName': 'Singapore', 'category': 'asia pacific' },
      { 'id': 3, 'itemName': 'Germany', 'category': 'Europe' },
      { 'id': 4, 'itemName': 'France', 'category': 'Europe' },
      { 'id': 5, 'itemName': 'South Korea', 'category': 'asia' },
      { 'id': 6, 'itemName': 'Sweden', 'category': 'Europe' },
    ];

    this.items = [
      { label: 'View', icon: 'fa fa-search', command: (event) => this.viewFile(this.selectedFile2) },
      { label: 'Unselect', icon: 'fa fa-close', command: (event) => this.unselectFile() },
    ];

    // Llenado del Treeview de la Tabla
    this._serviceSectoresService.getFiles().then(files => this.filesTree4 = files);

    // this.filesTree4 = this.JsonReceptionUbicacion;

    // Configuracion del Muliteselect
    this.dropdownSettings = {
      singleSelection: true,
      text: 'Seleccione una Opción',
      enableSearchFilter: true,
      searchPlaceholderText: 'Buscar Elemento',
      classes: 'comboSea',
      showCheckbox: false,
      lazyLoading: false,
      groupBy: 'category',
      // selectGroup: true,
    };

    // this.getAllSectoresOcdeCadService();
    this.getfindByIdNivelSectorService(1);
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
  unselectFile() {
    this.selectedFile2 = null;
  } // FIN | unselectFile


  /****************************************************************************
  * Funcion: nodeSelect
  * Object Number: 002
  * Fecha: 21-03-2019
  * Descripcion: Method nodeSelect of the Class
  * Objetivo: nodeSelect in the method selected item with Treeview
  ****************************************************************************/
  nodeSelect(event) {
    // Condicion de Agregar los Nodos
    if (event.node.children === undefined) { // Definicion de Items del Nivel 4
      this.JsonSendSectoresOcdeCadOpciones = [...this.JsonSendSectoresOcdeCadOpciones, { name: event.node.label, code: event.node.data }];
    } else if (event.node.children.length === 0) { // Definicion de Items del Nivel 3
      this.JsonSendSectoresOcdeCadOpciones = [...this.JsonSendSectoresOcdeCadOpciones, { name: event.node.label, code: event.node.data }];
    } else if (event.node.children.length !== 0) { // Definicion de Items del Nivel 2
      // Evaluar si el Nivel 2 o Nivel 3
      if (event.node.children.length !== 0 && event.node.parent !== undefined) {
        // Nodos del Nivel 2
        for (let index = 0; index < event.node.children.length; index++) {
          const element = event.node.children[index];
          this.JsonSendSectoresOcdeCadOpciones = [...this.JsonSendSectoresOcdeCadOpciones, { name: element.label, code: element.data }];
        }
      } else {
        // Nodos del Nivel 3
        for (let index = 0; index < event.node.children.length; index++) {
          const element = event.node.children[index];
          this.JsonSendSectoresOcdeCadOpciones = [...this.JsonSendSectoresOcdeCadOpciones, { name: element.label, code: element.data }];
        }
      }
    }
    this.JsonSendSectoresOcdeCadOpciones.sort();
    // console.log(this.JsonSendSectoresOcdeCadOpciones);
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
    // console.log(event);
    // Definicion de Items del Nivel 3
    if (event.node.children === undefined) {
      // console.log('Sin Nodos Nivel 1 ' + event.node.label + ' Data: ' + event.node.label);
      this.JsonSendSectoresOcdeCadOpciones = [...this.JsonSendSectoresOcdeCadOpciones.splice(1, 1)];
      // console.log(this.JsonSendSectoresOcdeCadOpciones);
      for (let index = 0; index < this.JsonSendSectoresOcdeCadOpciones.length; index++) {
        const element = this.JsonSendSectoresOcdeCadOpciones[index];
        // console.log(element);
      }
    } else if (event.node.children.length === 0) {
      this.JsonSendSectoresOcdeCadOpciones = [...this.JsonSendSectoresOcdeCadOpciones.splice(1, 1)];
    } else if (event.node.children !== undefined) {
      // Evaluar si el Nivel 2 o Nivel 3
      if (event.node.children !== undefined && event.node.parent !== undefined) {
        // Nodos del Nivel 2
        for (let index = 0; index < event.node.children.length; index++) {
          const element = event.node.children[index];
          // console.log('Con Nodos Nivel 2 ' + element.label + ' Data: ' + element.label);
          this.JsonSendSectoresOcdeCadOpciones = [...this.JsonSendSectoresOcdeCadOpciones, { name: element.label, code: element.data }];
        }
      } else {
        // Nodos del Nivel 3
        for (let index = 0; index < event.node.children.length; index++) {
          const element = event.node.children[index];
          // console.log('Con Nodos Nivel 3 ' + element.label + ' Data: ' + element.label);
          this.JsonSendSectoresOcdeCadOpciones = [...this.JsonSendSectoresOcdeCadOpciones, { name: element.label, code: element.data }];
        }
      }
    }
    // console.log(this.JsonSendSectoresOcdeCadOpciones);
  } // FIN | nodeUnselect


  /****************************************************************************
  * Funcion: getListUbicacionService
  * Object Number: 003
  * Fecha: 21-02-2019
  * Descripcion: Method getListUbicacionService of the Class
  * Objetivo: getListUbicacionService listados de los Niveles
  * de Ubicacion de Implementacion del Formulario de Actividad llamando a la API
  * Params: { }
  ****************************************************************************/
  private getAllSectoresOcdeCadService() {
    // Ejecuta el Servicio de invocar todos los Sectores de Desarrollo
    this._serviceSectoresService.getAllSectoresOcdeCad().subscribe(
      result => {
        if (result.status !== 200) {
          this.showToast('error', 'Error al Obtener la Información de todos los Sectores de Desarrollo', result.message);
          this.JsonReceptionAllSectoresOcdeCad = [];
        } else if (result.status === 200) {
          this.JsonReceptionAllSectoresOcdeCad = result.data;

          // Setea la Lista de los todos Sectores Ocde/Cad
          this.nodes = this.JsonReceptionAllSectoresOcdeCad.map((item) => {
            return {
              label: item.nombreSector,
              data: item.codigoSector,
              expandedIcon: 'fa fa-folder-open',
              collapsedIcon: 'fa fa-folder',
              children: [{
                label: item.idNivelSector.nombreNivelSector,
                data: item.codigoSector,
                expandedIcon: 'fa fa-folder-open',
                collapsedIcon: 'fa fa-folder',
              }],
            }
          })
        }
      },
      error => {
        this.showToast('error', 'Error al Obtener la Información de todos los Sectores de Desarrollo', JSON.stringify(error.message));
      },
    );
  } // FIN | getListUbicacionService



  /****************************************************************************
  * Funcion: getfindByIdSectorService
  * Object Number: 004
  * Fecha: 22-03-2019
  * Descripcion: Method getfindByIdSectorService of the Class
  * Objetivo: getfindByIdSectorService detalle del Sector OCDE/CAD, con el ID
  * Params: { idSector }
  ****************************************************************************/
  private getfindByIdSectorService(idSector: number) {

    // Ejecucion del EndPoint de Consulta de Sector, por ID
    this._serviceSectoresService.getfindByIdSector(idSector).subscribe(
      result => {
        if (result.status !== 200) {
          this.showToast('error', 'Error al Obtener la Información del Sector de Desarrollo', result.message);
          this.JsonReceptionSectorOcdeCad = [];
        } else if (result.status === 200) {
          this.JsonReceptionSectorOcdeCad = result.data;
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
    this._serviceSectoresService.getfindByIdNivelSector(idSNivelector).subscribe(
      result => {
        if (result.status !== 200) {
          this.showToast('error', 'Error al Obtener la Información de Sector Nivel 1', result.message);
          this.JsonReceptionSectorByNivelOcdeCad = [];
          this.nodes = [];
        } else if (result.status === 200) {
          this.JsonReceptionSectorByNivelOcdeCad = result.data;
          this.getSectorOcdeCadNivel2(this.JsonReceptionSectorByNivelOcdeCad);
        }
      },
      error => {
        this.showToast('error', 'Error al Obtener la Información de Secotores de Desarrollo', JSON.stringify(error.message));
      },
    );
  } // FIN | getfindByIdNivelSectorService



  /****************************************************************************
  * Funcion: getfindByIdNivelSectorService3
  * Object Number: 005
  * Fecha: 25-03-2019
  * Descripcion: Method getfindByIdNivelSectorService3 of the Class
  * Objetivo: getfindByIdNivelSectorService3 detalle del Sector OCDE/CAD, con el
  * Id Nivel de Sector
  * Params: { idSNivelector }
  ****************************************************************************/
  getSectorOcdeCadNivel2(array: any) {
    // Inicializacion del Arraeglo de Nivel 2
    this.JsonReceptionSectorByNivelOcdeCad2 = [];
    this.JsonReceptionSectorByNivelOcdeCad3 = [];
    this.JsonReceptionSectorByNivelOcdeCad4 = [];

    // Ejecucion del EndPoint de Consulta de Sector, por ID
    for (let n1 = 0; n1 < array.length; n1++) { // Ciclo del Nivel 1, definir el Nivel 2
      const element = array[n1];

      // Ejecutamos el servicio, para el Nivel 2
      this._serviceSectoresService.getfindByIdNivelSectorAndSectorPadreId(2, element.idSector).subscribe(
        result => {
          if (result.status !== 200) {
            this.showToast('error', 'Error al Obtener la Información de los Sectores Nivel 2', result.message);
            this.JsonReceptionSectorByNivelOcdeCad2 = [];
            this.arrayPush = [];
          } else if (result.status === 200) {
            this.JsonReceptionSectorByNivelOcdeCad2 = result.data;

            // Array para el Segundo Ciclo | Nivel 2
            const array2 = [];

            // Condicion de Jerarquia de Nivel 2
            if (this.JsonReceptionSectorByNivelOcdeCad2 !== undefined) {
              for (let n2 = 0; n2 < this.JsonReceptionSectorByNivelOcdeCad2.length; n2++) { // Ciclo del Nivel 2, definir el Nivel 3
                // Array para el segundo Ciclo | Nivel 3
                const array3 = [];

                const element2 = this.JsonReceptionSectorByNivelOcdeCad2[n2];

                // Ejecutamos el Sevicio, para el Nivel 3
                this._serviceSectoresService.getfindByIdNivelSectorAndSectorPadreId(3, element2.idSector).subscribe(
                  result2 => {
                    if (result2.status !== 200) {
                      this.showToast('error', 'Error al Obtener la Información del Sector Nivel 3', result2.message);
                      this.JsonReceptionSectorByNivelOcdeCad3 = [];
                    } else if (result2.status === 200) {
                      this.JsonReceptionSectorByNivelOcdeCad3 = result2.data;

                      // Condicion de Jerarquia de Nivel 3
                      if (this.JsonReceptionSectorByNivelOcdeCad3 !== undefined) {
                        for (let n3 = 0; n3 < this.JsonReceptionSectorByNivelOcdeCad3.length; n3++) { // Definir el Nivel 3
                          // Array para el segundo Ciclo | Nivel 4
                          const array4 = [];

                          const element3 = this.JsonReceptionSectorByNivelOcdeCad3[n3];

                          // Ejecutamos el Sevicio, para el Nivel 4
                          this._serviceSectoresService.getfindByIdNivelSectorAndSectorPadreId(4, element3.idSector).subscribe(
                            result3 => {
                              if (result3.status !== 200) {
                                this.showToast('error', 'Error al Obtener la Información del Sector Nivel 4', result3.message);
                                this.JsonReceptionSectorByNivelOcdeCad4 = [];
                              } else if (result3.status === 200) {
                                this.JsonReceptionSectorByNivelOcdeCad4 = result3.data;

                                // Condicion de Jerarquia de Nivel 4
                                if (this.JsonReceptionSectorByNivelOcdeCad4 !== undefined) {
                                  for (let n4 = 0; n4 < this.JsonReceptionSectorByNivelOcdeCad4.length; n4++) { // Definir el Nivel 3
                                    const element4 = this.JsonReceptionSectorByNivelOcdeCad4[n4];

                                    // Hacemos el push al Array Principal, para cargar los nodos de Nivel 4
                                    array4.push({
                                      'label': element4.nombreSector,
                                      'data': element4.idSector,
                                    });
                                  }
                                } else {
                                  // console.log('No hay Datos Nivel 4 ***********************************************');
                                }
                              }
                            },
                            error => {
                              this.showToast('error', 'Error al Obtener la Información de Sectores de Desarrollo', JSON.stringify(error.message));
                            },
                          );

                          // Hacemos el push al Array Principal, para cargar los nodos de Nivel 3
                          array3.push({
                            'label': element3.nombreSector,
                            'data': element3.idSector,
                            'expandedIcon': 'fa fa-folder-open',
                            'collapsedIcon': 'fa fa-folder',
                            'children': array4,
                          });
                        }
                      } else {
                        // console.log('No hay Datos Nivel 3 ***********************************************');
                      }
                    }
                  },
                  error => {
                    this.showToast('error', 'Error al Obtener la Información de Sectores de Desarrollo', JSON.stringify(error.message));
                  },
                );

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
            }
          } else {
            // console.log('No hay Datos Nivel 2 ***********************************************');
          }
        },
        error => {
          this.showToast('error', 'Error al Obtener la Información de Secotores de Desarrollo', JSON.stringify(error.message));
        },
      );
    }
  } // FIN | getSectorOcdeCadNivel2


  saveSectoresOcdeCad() {
    // console.log(this.JsonSendSectoresOcdeCadOpciones);
  }
}
