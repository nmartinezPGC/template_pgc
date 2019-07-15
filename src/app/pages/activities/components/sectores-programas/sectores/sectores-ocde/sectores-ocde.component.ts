/**
* @author Nahum Martinez
* @returns Componente de Sectores de Proyecto
* @name SectoresOcdeComponent
* @alias _sectoresOcdeComponent
* @version 1.0.0
* @fecha 2019-03-15
*/

import { Component, OnInit, Input, ChangeDetectorRef, OnChanges } from '@angular/core';
import { TreeNode, MessageService, MenuItem } from 'primeng/primeng';
import { ToasterConfig, ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import { ServiceSectoresService } from '../../../../services/service-sectores.service';
import { ServiceSectoresOcdeService } from '../../../../services/sectores/service-sectores-ocde.service';
import { ActivitySectoresOcdeModel } from '../../../../models/sectores/model-sectores-ocde';
import { NotificacionesService } from '../../../../../shared/services/notificaciones.service';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'ngx-sectores-ocde',
  templateUrl: './sectores-ocde.component.html',
  styleUrls: ['./sectores-ocde.component.scss'],
  providers: [ServiceSectoresService, MessageService, NotificacionesService],
})
export class SectoresOcdeComponent implements OnInit, OnChanges {
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
  public JsonSendSectoresOcdeCad: any = [];
  public JsonSendSectoresOcdeCadOpciones: any = [];
  public JsonReceptionSectorByIdActividad: any = [];

  // Json Recpetion de la Clase
  public JsonReceptionAllSectoresOcdeCad: any;
  public JsonReceptionAllSectoresOcdeCads: any;
  public JsonSector: any;
  public JsonReceptionSectorOcdeCad: any;
  public JsonReceptionSectorByNivelOcdeCad: any;
  public JsonReceptionSectorByNivelOcdeCad2: any;
  public JsonReceptionSectorByNivelOcdeCad3: any;
  public JsonReceptionSectorByNivelOcdeCad4: any;

  // Auditoria
  public secuenciaDeActividad: any;

  // Modelo de la Clase
  public _activitySectoresOcdeModel: ActivitySectoresOcdeModel

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
   * @param _serviceSectoresService
   * @param messageService
   */
  constructor(private _serviceSectoresService: ServiceSectoresOcdeService,
    private messageService: MessageService,
    private changeDetectorRef: ChangeDetectorRef,
    private confirmationService: ConfirmationService,
    private _notificacionesService: NotificacionesService) {
    // Codigo del Constructor
  }

  /**
   * Inicializacion de la Clase
   */
  ngOnInit() {
    // Cargando los Items del TreeView
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);

    // Inicializacion del Modelo
    this._activitySectoresOcdeModel = new ActivitySectoresOcdeModel(
      0, null, // Datos Generales
      null, 0, // Relacionales
      null, 0, 0,
      true, null, null, // Auditoria
    );

    // Llenado del Treeview de la Tabla
    this.getAllSectoresOcdeCadService();
    this._serviceSectoresService.getFiles().then(files => this.filesTree4 = files);

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
          const resultado = this.JsonSendSectoresOcdeCadOpciones.findIndex(sector => sector.name === element.label);
          // Evalua que el Item no este dentro del Json
          if (resultado !== -1) {
            // No carga Item porque ya existe
          } else {
            this.JsonSendSectoresOcdeCadOpciones = [...this.JsonSendSectoresOcdeCadOpciones, { name: element.label, code: element.data }];
          }
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
    if (event.node !== undefined) {
      const itemNodeLabel = event.node.label;
      // Ejecucion del splice del elemento
      const resultado = this.JsonSendSectoresOcdeCadOpciones.findIndex(sector => sector.name !== itemNodeLabel);
      this.JsonSendSectoresOcdeCadOpciones.splice(Number(resultado))
      this.JsonSendSectoresOcdeCadOpciones = [...this.JsonSendSectoresOcdeCadOpciones];
    } else if (event.node.children !== undefined && event.node.children.length !== 0) {
      for (let index = 0; index < event.node.children.length; index++) {
        const element = event.node.children[index];
        // Ejecucion del splice por el item de iteracion
        const resultado = this.JsonSendSectoresOcdeCadOpciones.findIndex(sector => sector.name === element.label);
        this.JsonSendSectoresOcdeCadOpciones.splice(Number(resultado), 1)
        this.JsonSendSectoresOcdeCadOpciones = [...this.JsonSendSectoresOcdeCadOpciones];
      }
    } else if (event.node.children !== undefined && event.node.children.length === 0) {
      const itemNodeLabel = event.node.label;
      // Ejecucion del splice del elemento
      const resultado = this.JsonSendSectoresOcdeCadOpciones.findIndex(sector => sector.name === itemNodeLabel);
      this.JsonSendSectoresOcdeCadOpciones.splice(Number(resultado), 1)
      this.JsonSendSectoresOcdeCadOpciones = [...this.JsonSendSectoresOcdeCadOpciones];
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
          this._notificacionesService.showToast('error', 'Error al Obtener la Información de todos los Sectores Ocde', result.message);
          this.JsonReceptionAllSectoresOcdeCad = [];
        } else if (result.status === 200) {
          this.JsonReceptionAllSectoresOcdeCad = result.data;

          // Setea la Lista de los todos Sectores Ocde/Cad
          this.JsonSendSectoresOcdeCadOpciones = this.JsonReceptionAllSectoresOcdeCad.map((item) => {
            return {
              code: item.idSectorOcde.idSector,
              name: item.idSectorOcde.nombreSector,
              otro: item.porcentajePart,
            }
          });
        }
      },
      error => {
        this._notificacionesService.showToast('error', 'Error al Obtener la Información de todos los Sectores de Desarrollo', JSON.stringify(error.message));
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
          this._notificacionesService.showToast('error', 'Error al Obtener la Información del Sector de Desarrollo', result.message);
          this.JsonReceptionSectorOcdeCad = [];
        } else if (result.status === 200) {
          this.JsonReceptionSectorOcdeCad = result.data;
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
  * Objetivo: getfindByIdNivelSectorService detalle del Sector OCDE/CAD, con el
  * Id Nivel de Sector
  * Params: { idSNivelector }
  ****************************************************************************/
  private getfindByIdNivelSectorService(idSNivelector: number) {

    // Ejecucion del EndPoint de Consulta de Sector, por ID
    this._serviceSectoresService.getfindByIdNivelSector(idSNivelector).subscribe(
      result => {
        if (result.status !== 200) {
          this._notificacionesService.showToast('error', 'Error al Obtener la Información de Sector Nivel 1', result.message);
          this.JsonReceptionSectorByNivelOcdeCad = [];
          this.nodes = [];
        } else if (result.status === 200) {
          this.JsonReceptionSectorByNivelOcdeCad = result.data;
          // this.getSectorOcdeCadNivel2(this.JsonReceptionSectorByNivelOcdeCad);
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
  * Objetivo: getSectorOcdeCadNivel2 de los Niveles inferiores Sector OCDE/CAD,
  * con el Id Nivel 1 de Sector
  * Params: { arrayN1 }
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
      setTimeout(() => {
        this._serviceSectoresService.getfindByIdNivelSectorAndSectorPadreId(2, element.idSector).subscribe(
          result => {
            if (result.status !== 200) {
              this._notificacionesService.showToast('error', 'Error al Obtener la Información de los Sectores Nivel 2', result.message);
              this.JsonReceptionSectorByNivelOcdeCad2 = [];
              this.arrayPush = [];
            } else if (result.status === 200) {
              this.JsonReceptionSectorByNivelOcdeCad2 = result.data;
              // console.log(this.JsonReceptionSectorByNivelOcdeCad2);

              // Array para el Segundo Ciclo | Nivel 2
              const array2 = [];

              // Condicion de Jerarquia de Nivel 2
              if (this.JsonReceptionSectorByNivelOcdeCad2 !== undefined) {
                for (let n2 = 0; n2 < this.JsonReceptionSectorByNivelOcdeCad2.length; n2++) { // Ciclo del Nivel 2, definir el Nivel 3
                  // Array para el segundo Ciclo | Nivel 3
                  const array3 = [];

                  const element2 = this.JsonReceptionSectorByNivelOcdeCad2[n2];

                  // Ejecutamos el Sevicio, para el Nivel 3
                  setTimeout(() => {

                    // console.log(element2[0]);
                    this._serviceSectoresService.getfindByIdNivelSectorAndSectorPadreId(3, element2[0]).subscribe(
                      result2 => {
                        if (result2.status !== 200) {
                          this._notificacionesService.showToast('error', 'Error al Obtener la Información del Sector Nivel 3', result2.message);
                          this.JsonReceptionSectorByNivelOcdeCad3 = [];
                        } else if (result2.status === 200 && result2.find === true) {
                          this.JsonReceptionSectorByNivelOcdeCad3 = result2.data;

                          // Condicion de Jerarquia de Nivel 3
                          if (this.JsonReceptionSectorByNivelOcdeCad3 !== undefined) {
                            for (let n3 = 0; n3 < this.JsonReceptionSectorByNivelOcdeCad3.length; n3++) { // Definir el Nivel 3
                              // Array para el segundo Ciclo | Nivel 4
                              const array4 = [];

                              const element3 = this.JsonReceptionSectorByNivelOcdeCad3[n3];

                              // Ejecutamos el Sevicio, para el Nivel 4
                              this._serviceSectoresService.getfindByIdNivelSectorAndSectorPadreId(4, element3[0]).subscribe(
                                result3 => {
                                  if (result3.status !== 200) {
                                    this._notificacionesService.showToast('error', 'Error al Obtener la Información del Sector Nivel 4', result3.message);
                                    this.JsonReceptionSectorByNivelOcdeCad4 = [];
                                  } else if (result3.status === 200 && result3.find === true) {
                                    this.JsonReceptionSectorByNivelOcdeCad4 = result3.data;

                                    // Condicion de Jerarquia de Nivel 4
                                    if (this.JsonReceptionSectorByNivelOcdeCad4 !== undefined) {
                                      for (let n4 = 0; n4 < this.JsonReceptionSectorByNivelOcdeCad4.length; n4++) { // Definir el Nivel 4
                                        const element4 = this.JsonReceptionSectorByNivelOcdeCad4[n4];

                                        // Hacemos el push al Array Principal, para cargar los nodos de Nivel 4
                                        array4.push({
                                          'label': element4[1],
                                          'data': element4[0],
                                        });
                                      }
                                    } else {
                                      // console.log('No hay Datos Nivel 4 ***********************************************');
                                    }
                                  }
                                },
                                error => {
                                  this._notificacionesService.showToast('error', 'Error al Obtener la Información de Sectores de Desarrollo', JSON.stringify(error.message));
                                },
                              );

                              // Hacemos el push al Array Principal, para cargar los nodos de Nivel 3
                              array3.push({
                                'label': element3[1],
                                'data': element3[0],
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
                        this._notificacionesService.showToast('error', 'Error al Obtener la Información de Sectores de Desarrollo', JSON.stringify(error.message));
                      },
                    );
                  }, 100);

                  // Hacemos el push al Array Principal, para cargar los nodos de Nivel 2
                  array2.push({
                    'label': element2[1],
                    'data': element2[0],
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
            this._notificacionesService.showToast('error', 'Error al Obtener la Información de Secotores de Desarrollo', JSON.stringify(error.message));
          },
        );
      }, 1000);
    }
    // console.log(this.arrayPush);
  } // FIN | getSectorOcdeCadNivel2


  /****************************************************************************
  * Funcion: saveSectoresOcdeCad
  * Object Number: 007
  * Fecha: 25-03-2019
  * Descripcion: Method saveSectoresOcdeCad of the Class
  * Objetivo: saveSectoresOcdeCad Grabar listado Sector OCDE/CAD
  * Params: { JsonSendSectoresOcdeCadOpciones }
  ****************************************************************************/
  async saveSectoresOcdeCad() {
    this.calcularPercent();
    // Seteo de los campos iniciales
    this._activitySectoresOcdeModel.idActividad = { idActividad: this.idProyectoTab };

    // Validacion de Items seleccionados
    if (this.JsonSendSectoresOcdeCadOpciones.length > 0) {
      // Recorre los items seleccionados del Treeview
      for (let index = 0; index < this.JsonSendSectoresOcdeCadOpciones.length; index++) {
        const element = this.JsonSendSectoresOcdeCadOpciones[index];
        this._activitySectoresOcdeModel.porcentajePart = Number(element.otro);
        // Creacion del Codigo de la Actividad con Sector Ocde/Cad | 3 = NEW-ASO
        // this.getSecuenciaListService('NEW-ASO');

        // await delay(100);
        // Asignacion del Sector Ocde/Cad
        this._activitySectoresOcdeModel.idSectorOcde = { idSector: element.code };

        this._activitySectoresOcdeModel.codigoActividad = this.codigoProyectoTab + '-ASO-' + element.code;

        this._serviceSectoresService.saveActividadSectorOcde(this._activitySectoresOcdeModel).subscribe(
          result => {
            if (result.status !== 200) {
              this._notificacionesService.showToast('error', 'Error al Ingresar la Información del Sector Ocde/Cad asociado al Proyecto', JSON.stringify(result.message));
            } else if (result.status === 200) {
              // Evalua los resuktados de la query
              if (result.findRecord === false) {
                this._notificacionesService.showToast('error', 'Error al Ingresar la Información del Sector Ocde/Cad asociado al Proyecto', JSON.stringify(result.message));
              } else {
                this._notificacionesService.showToast('success', 'Sector Ocde/Cad asociado al Proyecto', JSON.stringify(result.message));
              }
              // this.updateSecuenciaService(9, 3);
            }
          },
          error => {
            this._notificacionesService.showToast('error', 'Error al ingresar el Sector Ocde/Cad al Proyecto', JSON.stringify(error.message));
          },
        );

        // this.updateSecuenciaService(9, 3);
      }
    } else {
      this._notificacionesService.showToast('error', 'Error al ingresar la Información Sectores OCDE/CAD', 'Debes de seleccionar los sectores OCDE/CAD, para continuar');
      return -1;
    }
  } // FIN | saveSectoresOcdeCad


  /****************************************************************************
  * Funcion: cleanSectoresOcdeCad
  * Object Number: 008
  * Fecha: 13-04-2019
  * Descripcion: Method cleanSectoresOcdeCad of the Class
  * Objetivo: cleanSectoresOcdeCad Limpia listado Sector OCDE/CAD
  * Params: { }
  ****************************************************************************/
  cleanSectoresOcdeCad() {
    this._serviceSectoresService.getFiles().then(files => this.filesTree4 = files);
    this.JsonSendSectoresOcdeCadOpciones = [];
    this.changeDetectorRef.detectChanges();
    this.JsonSendSectoresOcdeCadOpciones = [...this.JsonSendSectoresOcdeCadOpciones];
  } // FIN | cleanSectoresOcdeCad


  /****************************************************************************
   * Funcion: calcularPercent
   * Object Number: FND-007
   * Fecha: 13-05-2019
   * Descripcion: Method para calcular % Items del Socio al Desarrollo
   * en la Insercion del Proyecto
   * Objetivo: calculo de % el Json de los Items seleccionados
   ****************************************************************************/
  calcularPercent() {
    const valorMax = (100 / this.JsonSendSectoresOcdeCadOpciones.length);

    this.JsonSendSectoresOcdeCadOpciones.map(function (dato) {
      dato.otro = valorMax.toFixed(2);
      return dato;
    });
  } // FIN | FND-007
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

    this.JsonSendSectoresOcdeCadOpciones.map(function (dato) {
      if (dato.code === codeIn) {
        dato.otro = otroIn;
      }
      return dato;
    });
  } // FIN | FND-006

  /****************************************************************************
    * Funcion: confirm
    * Object Number: FND-009
    * Fecha: 01-07-2019
    * Descripcion: Method confirm of the Class
    * Objetivo: Eliminar el Detalle de Financiamiento seleccionado
    * Params: { event }
    ****************************************************************************/
  private confirmocde(event: any) {
    this.confirmationService.confirm({
      message: 'Estas seguro de Eliminar del el Sector Ocde?',
      accept: () => {
        // Ejecuta la funcion de Eliminar el Socio al Desarrollo con Elementos relacionados
        this.cleanOcde(event);
      },
    });
  } // FIN | FND-009
  /****************************************************************************
    * Funcion: cleanSocioDesarrollo
    * Object Number: FND-005
    * Fecha: 13-05-2019
    * Descripcion: Method para Eliminar Item del Socio al Desarrollo
    * Objetivo: limpiar el Json de los Items seleccionados
    ****************************************************************************/
  private cleanOcde(event: any) {
    for (let i = 0; i < this.JsonSendSectoresOcdeCadOpciones.length; i++) {
      if (this.JsonSendSectoresOcdeCadOpciones[i].code === event) {
        // Ejecuta el Servicio de invocar el registro de Socio al Desarrollo
        this._serviceSectoresService.deleteOcde(this.codigoProyectoTab + '-ASO-' + this.JsonSendSectoresOcdeCadOpciones[i].code).subscribe(
          result => {
            if (result.status !== 200) {
              this._notificacionesService.showToast('error', 'Error al Borrar la Información Sector OCDE/CAD', result.message);
            } else if (result.status === 200) {
              if (result.findRecord === true) {
                this._notificacionesService.showToast('error', 'Error al Borrar la Información de Sector de OCDE/CAD', result.message);
                this.ngOnInit();
              } else {
                this._notificacionesService.showToast('default', 'Sector OCDE/CAD', result.message);
                this.ngOnInit();
              }
            }
          },
          error => {
            this._notificacionesService.showToast('error', 'Error al Borrar la Información de Sector OCDE/CAD', JSON.stringify(error.error.message));
          },
        );
        // Borramos el Item del Json
        this.JsonSendSectoresOcdeCadOpciones.splice(i, 1);
        // para el Bucle
        break;
      }
    }
    this.JsonSendSectoresOcdeCadOpciones = [...this.JsonSendSectoresOcdeCadOpciones];
  } // FIN | FND-005


  /****************************************************************************
   @author Nahum Martinez
   @name getfindByIdActividadOcdeCad
   @function FND001
   @fecha 03-07-2019
   @description Buscar los Sectores OCDE de la Actividad
   @param { idActividad }
   @copyright SRECI-2019
  ****************************************************************************/
  private getfindByIdActividadOcdeCadService(idActividad: number) {

    // Ejecucion del EndPoint de Consulta de Sectores por Actividad, por ID
    this._serviceSectoresService.getfindByIdActividadOcdeCad(idActividad).subscribe(
      result => {
        if (result.status !== 200) {
          this._notificacionesService.showToast('error', 'Error al Obtener la Información de Sector Nivel 1', result.message);
          this.JsonReceptionSectorByIdActividad = [];
          this.nodes = [];
        } else if (result.status === 200) {
          if (result.findRecords === true) {
            this.JsonReceptionSectorByIdActividad = result.data;

            // Mapeo del Json de Carga de Sectores
            for (let index = 0; index < this.JsonReceptionSectorByIdActividad.length; index++) {
              const element = this.JsonReceptionSectorByIdActividad[index];
              this.JsonSendSectoresOcdeCadOpciones = [...this.JsonSendSectoresOcdeCadOpciones, { name: element.nombreSector, code: element.idSector }];
            }
          } else {
            this._notificacionesService.showToast('error', 'Error al Obtener la Información', result.message);
          }
          // this.getSectorOcdeCadNivel2(this.JsonReceptionSectorByIdActividad);
        }
      },
      error => {
        this._notificacionesService.showToast('error', 'Error al Obtener la Información de Secotores de Desarrollo', JSON.stringify(error.message));
      },
    );
  } // FIN | FND001
}
