/**
* @author Nahum Martinez
* @returns Componente de Sectores de ODS
* @name OdsComponent
* @alias _odsComponent
* @version 1.0.0
* @fecha 19-04-2019
*/

import { Component, OnInit, Input, ChangeDetectorRef, OnChanges } from '@angular/core';
import { TreeNode, MessageService, MenuItem, ConfirmationService, Message } from 'primeng/primeng';
import { ToasterConfig, ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import { ServiceOdsService } from '../../../../services/sectores/service-ods.service';
import { ActivitySectoresOdsModel } from '../../../../models/sectores/model-sector-ods';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OdsModalMetasComponent } from './modals/ods-modal-metas/ods-modal-metas.component';

@Component({
  selector: 'ngx-ods',
  templateUrl: './ods.component.html',
  styleUrls: ['./ods.component.scss'],
  providers: [ServiceOdsService, MessageService, ToasterService, ConfirmationService],
})
export class OdsComponent implements OnInit, OnChanges {
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
  public JsonSendSectoresOds: any = [];
  public JsonSendSectoresOdsOpciones: any = [];

  // Json Recpetion de la Clase
  public JsonReceptionAllSectoresOcdeCad: any;
  public JsonReceptionSectorOcdeCad: any;
  public JsonReceptionSectorByNivelOds: any;
  public JsonReceptionSectorByNivelOds2: any;
  public JsonReceptionSectorByNivelOds3: any;
  public JsonReceptionSectorByNivelOds4: any;

  // Auditoria
  public secuenciaDeActividad: any;

  // Modelo de la Clase
  public _activitySectoresOdsModel: ActivitySectoresOdsModel

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

  msgs: Message[] = [];

  /**
   * constructor
   * @param _serviceOdsService
   * @param messageService
   */
  constructor(private _serviceOdsService: ServiceOdsService,
    private messageService: MessageService,
    private changeDetectorRef: ChangeDetectorRef,
    private _toasterService: ToasterService,
    private modalService: NgbModal,
    private confirmationService: ConfirmationService ) {
    // Codigo del Constructor
  }

  /**
   * Inicializacion de la Clase
   */
  ngOnInit() {
    // Cargando los Items del TreeView
    this.loading = true;

    // Inicializacion del Modelo
    this._activitySectoresOdsModel = new ActivitySectoresOdsModel(
      0, null, // Datos Generales
      null, 0, // Relacionales
      null, 0, 0,
      true, null, null, // Auditoria
    );

    // Llenado del Treeview de la Tabla
    // this._serviceOdsService.getFiles().then(files => this.filesTree4 = files);

    // Carga de Nivel 1
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
      this.JsonSendSectoresOdsOpciones = [...this.JsonSendSectoresOdsOpciones, { name: event.node.label, code: event.node.data }];
    } else if (event.node.children.length === 0) { // Definicion de Items del Nivel 3
      this.JsonSendSectoresOdsOpciones = [...this.JsonSendSectoresOdsOpciones, { name: event.node.label, code: event.node.data }];
    } else if (event.node.children.length !== 0) { // Definicion de Items del Nivel 2
      // Evaluar si el Nivel 2 o Nivel 3
      if (event.node.children.length !== 0 && event.node.parent !== undefined) {
        // Nodos del Nivel 2
        for (let index = 0; index < event.node.children.length; index++) {
          const element = event.node.children[index];
          const resultado = this.JsonSendSectoresOdsOpciones.findIndex(sector => sector.name === element.label);
          // Evalua que el Item no este dentro del Json
          if (resultado !== -1) {
            // No carga Item porque ya existe
          } else {
            this.JsonSendSectoresOdsOpciones = [...this.JsonSendSectoresOdsOpciones, { name: element.label, code: element.data }];
          }
        }
      } else {
        // Nodos del Nivel 3
        for (let index = 0; index < event.node.children.length; index++) {
          const element = event.node.children[index];
          this.JsonSendSectoresOdsOpciones = [...this.JsonSendSectoresOdsOpciones, { name: element.label, code: element.data }];
        }
      }
    }
    this.JsonSendSectoresOdsOpciones.sort();
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
    if (event.node.children !== undefined) {
      const itemNodeLabel = event.node.label;
      // Ejecucion del splice del elemento
      const resultado = this.JsonSendSectoresOdsOpciones.findIndex(sector => sector.name === itemNodeLabel);
      this.JsonSendSectoresOdsOpciones.splice(Number(resultado), 1)
      this.JsonSendSectoresOdsOpciones = [...this.JsonSendSectoresOdsOpciones];
    } else if (event.node.children !== undefined && event.node.children.length !== 0) {
      for (let index = 0; index < event.node.children.length; index++) {
        const element = event.node.children[index];
        // Ejecucion del splice por el item de iteracion
        const resultado = this.JsonSendSectoresOdsOpciones.findIndex(sector => sector.name === element.label);
        this.JsonSendSectoresOdsOpciones.splice(Number(resultado), 1)
        this.JsonSendSectoresOdsOpciones = [...this.JsonSendSectoresOdsOpciones];
      }
    } else if (event.node.children !== undefined && event.node.children.length === 0) {
      const itemNodeLabel = event.node.label;
      // Ejecucion del splice del elemento
      const resultado = this.JsonSendSectoresOdsOpciones.findIndex(sector => sector.name === itemNodeLabel);
      this.JsonSendSectoresOdsOpciones.splice(Number(resultado), 1)
      this.JsonSendSectoresOdsOpciones = [...this.JsonSendSectoresOdsOpciones];
    }
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
    this._serviceOdsService.getAllSectoresOds().subscribe(
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
    this._serviceOdsService.getfindByIdSector(idSector).subscribe(
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
    this._serviceOdsService.getfindByIdNivelSector(idSNivelector).subscribe(
      result => {
        if (result.status !== 200) {
          this.showToast('error', 'Error al Obtener la Información de Sector Nivel 1', result.message);
          this.JsonReceptionSectorByNivelOds = [];
          this.nodes = [];
        } else if (result.status === 200) {
          this.JsonReceptionSectorByNivelOds = result.data;
          // this.getSectorOcdeCadNivel2(this.JsonReceptionSectorByNivelOds);
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
    this.JsonReceptionSectorByNivelOds2 = [];
    this.JsonReceptionSectorByNivelOds3 = [];
    this.JsonReceptionSectorByNivelOds4 = [];

    // Ejecucion del EndPoint de Consulta de Sector, por ID
    for (let n1 = 0; n1 < array.length; n1++) { // Ciclo del Nivel 1, definir el Nivel 2
      const element = array[n1];

      // Ejecutamos el servicio, para el Nivel 2
      setTimeout(() => {
        this._serviceOdsService.getfindByIdNivelSectorAndSectorPadreId(2, element.idSector).subscribe(
          result => {
            if (result.status !== 200) {
              this.showToast('error', 'Error al Obtener la Información de los Sectores Nivel 2', result.message);
              this.JsonReceptionSectorByNivelOds2 = [];
              this.arrayPush = [];
            } else if (result.status === 200) {
              this.JsonReceptionSectorByNivelOds2 = result.data;

              // Array para el Segundo Ciclo | Nivel 2
              const array2 = [];

              // Condicion de Jerarquia de Nivel 2
              if (this.JsonReceptionSectorByNivelOds2 !== undefined) {
                for (let n2 = 0; n2 < this.JsonReceptionSectorByNivelOds2.length; n2++) { // Ciclo del Nivel 2, definir el Nivel 3
                  // Array para el segundo Ciclo | Nivel 3
                  const array3 = [];

                  const element2 = this.JsonReceptionSectorByNivelOds2[n2];

                  // Ejecutamos el Sevicio, para el Nivel 3
                  setTimeout(() => {
                    this._serviceOdsService.getfindByIdNivelSectorAndSectorPadreId(3, element2[0]).subscribe(
                      result2 => {
                        if (result2.status !== 200) {
                          this.showToast('error', 'Error al Obtener la Información del Sector Nivel 3', result2.message);
                          this.JsonReceptionSectorByNivelOds3 = [];
                        } else if (result2.status === 200) {
                          this.JsonReceptionSectorByNivelOds3 = result2.data;

                          // Condicion de Jerarquia de Nivel 3
                          if (this.JsonReceptionSectorByNivelOds3 !== undefined) {
                            for (let n3 = 0; n3 < this.JsonReceptionSectorByNivelOds3.length; n3++) { // Definir el Nivel 3
                              // Array para el segundo Ciclo | Nivel 4
                              const array4 = [];

                              const element3 = this.JsonReceptionSectorByNivelOds3[n3];

                              // Ejecutamos el Sevicio, para el Nivel 4
                              this._serviceOdsService.getfindByIdNivelSectorAndSectorPadreId(4, element3[0]).subscribe(
                                result3 => {
                                  if (result3.status !== 200) {
                                    this.showToast('error', 'Error al Obtener la Información del Sector Nivel 4', result3.message);
                                    this.JsonReceptionSectorByNivelOds4 = [];
                                  } else if (result3.status === 200) {
                                    this.JsonReceptionSectorByNivelOds4 = result3.data;

                                    // Condicion de Jerarquia de Nivel 4
                                    if (this.JsonReceptionSectorByNivelOds4 !== undefined) {
                                      for (let n4 = 0; n4 < this.JsonReceptionSectorByNivelOds4.length; n4++) { // Definir el Nivel 3
                                        const element4 = this.JsonReceptionSectorByNivelOds4[n4];

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
                                  this.showToast('error', 'Error al Obtener la Información de Sectores de Desarrollo', JSON.stringify(error.message));
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
                        this.showToast('error', 'Error al Obtener la Información de Sectores de Desarrollo', JSON.stringify(error.message));
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
            this.showToast('error', 'Error al Obtener la Información de Secotores de Desarrollo', JSON.stringify(error.message));
          },
        );
      }, 4000);
    }
  } // FIN | getSectorOcdeCadNivel2


  /****************************************************************************
  * Funcion: saveSectoresOds
  * Object Number: 007
  * Fecha: 25-03-2019
  * Descripcion: Method saveSectoresOds of the Class
  * Objetivo: saveSectoresOds Grabar listado Sector OCDE/CAD
  * Params: { idSectorOds }
  ****************************************************************************/
  saveSectoresOds(idSectorOds: number) {
    // Verificacion de la Informacion
    this.confirmationService.confirm({
      message: '¿Estas seguro de registrar el ODS seleccionado?',
      header: 'Ingreso de Información',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
        // Seteo de los campos iniciales
        this._activitySectoresOdsModel.idActividad = { idActividad: this.idProyectoTab };

        // Asignacion del Sector Ocde/Cad
        this._activitySectoresOdsModel.idSectorOds = { idSector: idSectorOds };

        this._activitySectoresOdsModel.codigoActividad = this.codigoProyectoTab + '-ODS-' + idSectorOds;

        this._serviceOdsService.saveActividadSectorOds(this._activitySectoresOdsModel).subscribe(
          result => {
            if (result.status !== 200) {
              this.showToast('error', 'Error al Ingresar la Información del ODS asociado al Proyecto', JSON.stringify(result.message));
            } else if (result.status === 200) {
              // Evalua los resuktados de la query
              if (result.findRecord === false) {
                this.showToast('error', 'Error al Ingresar la Información del ODS asociado al Proyecto', JSON.stringify(result.message));
              } else {
                this.showToast('success', 'ODS asociado al Proyecto', JSON.stringify(result.message));
              }
              // this.updateSecuenciaService(9, 3);
            }
          },
          error => {
            this.showToast('error', 'Error al ingresar el ODS al Proyecto', JSON.stringify(error.message));
          },
        );
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      },
    });
  } // FIN | saveSectoresOds


  /****************************************************************************
  * Funcion: cleanSectoresOds
  * Object Number: 008
  * Fecha: 13-04-2019
  * Descripcion: Method cleanSectoresOds of the Class
  * Objetivo: cleanSectoresOcdeCad Limpia listado Sector OCDE/CAD
  * Params: { }
  ****************************************************************************/
  cleanSectoresOds() {
    this.JsonSendSectoresOdsOpciones = [];
    this.changeDetectorRef.detectChanges();
    this.JsonSendSectoresOdsOpciones = [...this.JsonSendSectoresOdsOpciones];
  } // FIN | cleanSectoresOds


  /**
   * Funcion de mostrar el Modal con Parametros enviados
   * Autor: Nahum Martinez
   * Fecha: 2019-04-22
   */
  showStaticModal(nombreSector: string, idSector: number, imagenSector: string) {
    const activeModal = this.modalService.open(OdsModalMetasComponent, {
      size: 'lg',
      backdrop: 'static',
      container: 'nb-layout',
    });

    // Valores de parametros a enviar
    activeModal.componentInstance.modalHeader = nombreSector;
    activeModal.componentInstance.modalHeaderId = idSector;
    activeModal.componentInstance.modalHeaderCodigoActividad = this.codigoProyectoTab;
    activeModal.componentInstance.modalHeaderIdActividad = this.idProyectoTab;
    activeModal.componentInstance.modalHeaderImagenSector = imagenSector;
  } // FIN | showStaticModal
}
