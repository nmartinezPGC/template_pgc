/**
* @author Nahum Martinez
* @returns Componente de Plan de Nacion
* @name PlanNacionComponent
* @alias _planNacionComponent
* @version 1.0.0
* @fecha 16-04-2019
*/

import { Component, OnInit, Input, ChangeDetectorRef, OnChanges } from '@angular/core';
import { TreeNode, MessageService, MenuItem } from 'primeng/primeng';
import { ToasterConfig, ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import { ListasComunesService } from '../../../../../common-list/services/listas-comunes.service';
import { ServicePlanNacionService } from '../../../../services/programas/service-plan-nacion.service';
import { ActivityProgramaPlanNacionModel } from '../../../../models/programas/model-programa-plan-nacion';

@Component({
  selector: 'ngx-plan-nacion',
  templateUrl: './plan-nacion.component.html',
  styleUrls: ['./plan-nacion.component.scss'],
  providers: [ServicePlanNacionService, MessageService, ToasterService, ListasComunesService],
})
export class PlanNacionComponent implements OnInit, OnChanges {
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

  // Json, de cargado de Programa
  public JsonSendProgramaPlanNacion: any = [];
  public JsonSendProgramaPlanNacionOpciones: any = [];

  // Json Recpetion de la Clase
  public JsonReceptionAllProgramasPlanNacion: any;
  public JsonReceptionProgramaPlanNacion: any;
  public JsonReceptionProgramaByNivelPlanNacion: any;
  public JsonReceptionProgramaByNivelPlanNacion2: any;
  public JsonReceptionProgramaByNivelPlanNacion3: any;
  public JsonReceptionProgramaByNivelPlanNacion4: any;

  // Auditoria
  public secuenciaDeActividad: any;

  // Modelo de la Clase
  public _activityProgramaPlanNacion: ActivityProgramaPlanNacionModel;

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
   * @param _servicePlanNacionService
   * @param messageService
   */
  constructor(private _servicePlanNacionService: ServicePlanNacionService,
    private messageService: MessageService,
    private changeDetectorRef: ChangeDetectorRef,
    private _toasterService: ToasterService,) {
    // Codigo del Constructor
  }

  /**
   * Inicializacion de la Clase
   */
  ngOnInit() {
    // Cargando los Items del TreeView
    this.loading = true;

    // Inicializacion del Modelo
    this._activityProgramaPlanNacion = new ActivityProgramaPlanNacionModel(
      0, null, // Datos Generales
      null, 0, // Relacionales
      null, 0, 0,
      true, null, null, // Auditoria
    );

    // Llenado del Treeview de la Tabla
    this._servicePlanNacionService.getFiles().then(files => this.filesTree4 = files);

    this.getfindByIdNivelProgramaService(1);
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
      this.JsonSendProgramaPlanNacionOpciones = [...this.JsonSendProgramaPlanNacionOpciones, { name: event.node.label, code: event.node.data }];
    } else if (event.node.children.length === 0) { // Definicion de Items del Nivel 3
      this.JsonSendProgramaPlanNacionOpciones = [...this.JsonSendProgramaPlanNacionOpciones, { name: event.node.label, code: event.node.data }];
    } else if (event.node.children.length !== 0) { // Definicion de Items del Nivel 2
      // Evaluar si el Nivel 2 o Nivel 3
      if (event.node.children.length !== 0 && event.node.parent !== undefined) {
        // Nodos del Nivel 2
        for (let index = 0; index < event.node.children.length; index++) {
          const element = event.node.children[index];
          const resultado = this.JsonSendProgramaPlanNacionOpciones.findIndex(Programa => Programa.name === element.label);
          // Evalua que el Item no este dentro del Json
          if (resultado !== -1) {
            // No carga Item porque ya existe
          } else {
            this.JsonSendProgramaPlanNacionOpciones = [...this.JsonSendProgramaPlanNacionOpciones, { name: element.label, code: element.data }];
          }
        }
      } else {
        // Nodos del Nivel 3
        for (let index = 0; index < event.node.children.length; index++) {
          const element = event.node.children[index];
          this.JsonSendProgramaPlanNacionOpciones = [...this.JsonSendProgramaPlanNacionOpciones, { name: element.label, code: element.data }];
        }
      }
    }
    this.JsonSendProgramaPlanNacionOpciones.sort();
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
      const resultado = this.JsonSendProgramaPlanNacionOpciones.findIndex(Programa => Programa.name === itemNodeLabel);
      this.JsonSendProgramaPlanNacionOpciones.splice(Number(resultado), 1)
      this.JsonSendProgramaPlanNacionOpciones = [...this.JsonSendProgramaPlanNacionOpciones];
    } else if (event.node.children !== undefined && event.node.children.length !== 0) {
      for (let index = 0; index < event.node.children.length; index++) {
        const element = event.node.children[index];
        // Ejecucion del splice por el item de iteracion
        const resultado = this.JsonSendProgramaPlanNacionOpciones.findIndex(Programa => Programa.name === element.label);
        this.JsonSendProgramaPlanNacionOpciones.splice(Number(resultado), 1)
        this.JsonSendProgramaPlanNacionOpciones = [...this.JsonSendProgramaPlanNacionOpciones];
      }
    } else if (event.node.children !== undefined && event.node.children.length === 0) {
      const itemNodeLabel = event.node.label;
      // Ejecucion del splice del elemento
      const resultado = this.JsonSendProgramaPlanNacionOpciones.findIndex(Programa => Programa.name === itemNodeLabel);
      this.JsonSendProgramaPlanNacionOpciones.splice(Number(resultado), 1)
      this.JsonSendProgramaPlanNacionOpciones = [...this.JsonSendProgramaPlanNacionOpciones];
    }
  } // FIN | nodeUnselect


  /****************************************************************************
  * Funcion: getAllProgramaCampoTransversalService
  * Object Number: 003
  * Fecha: 21-02-2019
  * Descripcion: Method getAllProgramaCampoTransversalService of the Class
  * Objetivo: getAllProgramaCampoTransversalService listados de los Niveles
  * de Ubicacion de Implementacion del Formulario de Actividad llamando a la API
  * Params: { }
  ****************************************************************************/
  private getAllProgramaCampoTransversalService() {
    // Ejecuta el Servicio de invocar todos los Programa de Desarrollo
    this._servicePlanNacionService.getAllProgramasPlanNacion().subscribe(
      result => {
        if (result.status !== 200) {
          this.showToast('error', 'Error al Obtener la Información de todos los Programa de Desarrollo', result.message);
          this.JsonReceptionAllProgramasPlanNacion = [];
        } else if (result.status === 200) {
          this.JsonReceptionAllProgramasPlanNacion = result.data;

          // Setea la Lista de los todos Programa Ocde/Cad
          this.nodes = this.JsonReceptionAllProgramasPlanNacion.map((item) => {
            return {
              label: item.nombrePrograma,
              data: item.codigoPrograma,
              expandedIcon: 'fa fa-folder-open',
              collapsedIcon: 'fa fa-folder',
              children: [{
                label: item.idNivelPrograma.nombreNivelPrograma,
                data: item.codigoPrograma,
                expandedIcon: 'fa fa-folder-open',
                collapsedIcon: 'fa fa-fold*er',
              }],
            }
          })
        }
      },
      error => {
        this.showToast('error', 'Error al Obtener la Información de todos los Programa de Desarrollo', JSON.stringify(error.message));
      },
    );
  } // FIN | getAllProgramaCampoTransversalService



  /****************************************************************************
  * Funcion: getfindByIdProgramaService
  * Object Number: 004
  * Fecha: 22-03-2019
  * Descripcion: Method getfindByIdProgramaService of the Class
  * Objetivo: getfindByIdProgramaService detalle del Plan de Nacion, con el ID
  * Params: { idPrograma }
  ****************************************************************************/
  private getfindByIdProgramaService(idPrograma: number) {

    // Ejecucion del EndPoint de Consulta de Programa, por ID
    this._servicePlanNacionService.getfindByIdPrograma(idPrograma).subscribe(
      result => {
        if (result.status !== 200) {
          this.showToast('error', 'Error al Obtener la Información del Programa de Desarrollo', result.message);
          this.JsonReceptionProgramaPlanNacion = [];
        } else if (result.status === 200) {
          this.JsonReceptionProgramaPlanNacion = result.data;
        }
      },
      error => {
        this.showToast('error', 'Error al Obtener la Información del Programa de Desarrollo', JSON.stringify(error.message));
      },
    );
  } // FIN | getfindByIdProgramaService


  /****************************************************************************
  * Funcion: getfindByIdNivelProgramaService
  * Object Number: 005
  * Fecha: 25-03-2019
  * Descripcion: Method getfindByIdNivelProgramaService of the Class
  * Objetivo: getfindByIdNivelProgramaService detalle del Programa OCDE/CAD, con el
  * Id Nivel de Programa
  * Params: { idSNivelector }
  ****************************************************************************/
  private getfindByIdNivelProgramaService(idSNivelector: number) {

    // Ejecucion del EndPoint de Consulta de Programa, por ID
    this._servicePlanNacionService.getfindByIdNivelPrograma(idSNivelector).subscribe(
      result => {
        if (result.status !== 200) {
          this.showToast('error', 'Error al Obtener la Información de Programa Nivel 1', result.message);
          this.JsonReceptionProgramaByNivelPlanNacion = [];
          this.nodes = [];
        } else if (result.status === 200) {
          this.JsonReceptionProgramaByNivelPlanNacion = result.data;
          this.getProgramaPlanNacionNivel2(this.JsonReceptionProgramaByNivelPlanNacion);
        }
      },
      error => {
        this.showToast('error', 'Error al Obtener la Información de Secotores de Desarrollo', JSON.stringify(error.message));
      },
    );
  } // FIN | getfindByIdNivelProgramaService



  /****************************************************************************
  * Funcion: getProgramaPlanNacionNivel2
  * Object Number: 006
  * Fecha: 25-03-2019
  * Descripcion: Method getProgramaPlanNacionNivel2 of the Class
  * Objetivo: getProgramaPlanNacionNivel2 de los Niveles inferiores Programa OCDE/CAD,
  * con el Id Nivel 1 de Programa
  * Params: { arrayN1 }
  ****************************************************************************/
  getProgramaPlanNacionNivel2(array: any) {
    // Inicializacion del Arraeglo de Nivel 2
    this.JsonReceptionProgramaByNivelPlanNacion2 = [];
    this.JsonReceptionProgramaByNivelPlanNacion3 = [];
    this.JsonReceptionProgramaByNivelPlanNacion4 = [];

    // Ejecucion del EndPoint de Consulta de Programa, por ID
    for (let n1 = 0; n1 < array.length; n1++) { // Ciclo del Nivel 1, definir el Nivel 2
      const element = array[n1];

      // Ejecutamos el servicio, para el Nivel 2
      setTimeout(() => {
        this._servicePlanNacionService.getfindByIdNivelProgramaAndProgramaPadreId(2, element.idPrograma).subscribe(
          result => {
            if (result.status !== 200) {
              this.showToast('error', 'Error al Obtener la Información de los Programa Nivel 2', result.message);
              this.JsonReceptionProgramaByNivelPlanNacion2 = [];
              this.arrayPush = [];
              this.loading = false;
            } else if (result.status === 200 && result.data !== undefined) {
              this.JsonReceptionProgramaByNivelPlanNacion2 = result.data;

              // Array para el Segundo Ciclo | Nivel 2
              const array2 = [];

              // Condicion de Jerarquia de Nivel 2
              if (this.JsonReceptionProgramaByNivelPlanNacion2 !== undefined) {
                for (let n2 = 0; n2 < this.JsonReceptionProgramaByNivelPlanNacion2.length; n2++) { // Ciclo del Nivel 2, definir el Nivel 3
                  // Array para el segundo Ciclo | Nivel 3
                  const array3 = [];

                  const element2 = this.JsonReceptionProgramaByNivelPlanNacion2[n2];

                  // Hacemos el push al Array Principal, para cargar los nodos de Nivel 2
                  array2.push({
                    'label': element2.nombrePrograma,
                    'data': element2.idPrograma,
                    'expandedIcon': 'fa fa-folder-open',
                    'collapsedIcon': 'fa fa-folder',
                    'children': array3,
                  });
                }

                // Hacemos el push al Array Principal, para cargar los nodos de Nivel 1
                this.arrayPush.push({
                  'label': element.nombrePrograma,
                  'data': element.idPrograma,
                  'expandedIcon': 'fa fa-folder-open',
                  'collapsedIcon': 'fa fa-folder',
                  'children': array2,
                });
                this.loading = false;
              }
            } else {
              // Hacemos el push al Array Principal, para cargar los nodos de Nivel 1
              this.arrayPush.push({
                'label': element.nombrePrograma,
                'data': element.idPrograma,
              });
              this.loading = false;
              // console.log('No hay Datos Nivel 2 ***********************************************');
            }
          },
          error => {
            this.showToast('error', 'Error al Obtener la Información de Secotores de Desarrollo', JSON.stringify(error.message));
          },
        );
      }, 1000);
    }
  } // FIN | getProgramaPlanNacionNivel2


  /****************************************************************************
  * Funcion: saveProgramaVidaMejor
  * Object Number: 007
  * Fecha: 15-04-2019
  * Descripcion: Method saveProgramaVidaMejor of the Class
  * Objetivo: saveProgramaVidaMejor Grabar listado Campo Transversal
  * Params: { JsonSendProgramaPlanNacionOpciones }
  ****************************************************************************/
  saveProgramaVidaMejor() {
    // Seteo de los campos iniciales
    this._activityProgramaPlanNacion.idActividad = { idActividad: this.idProyectoTab };

    // Validacion de Items seleccionados
    if (this.JsonSendProgramaPlanNacionOpciones.length > 0) {
      // Recorre los items seleccionados del Treeview
      for (let index = 0; index < this.JsonSendProgramaPlanNacionOpciones.length; index++) {
        const element = this.JsonSendProgramaPlanNacionOpciones[index];

        // Asignacion del Campo Transversal
        this._activityProgramaPlanNacion.idProgramaPlanNacion = { idPrograma: element.code };

        this._activityProgramaPlanNacion.codigoActividad = this.codigoProyectoTab + '-APP-' + element.code;

        // Ejecucion del Campo Transversal
        this._servicePlanNacionService.saveActividadProgramaPlanNacion(this._activityProgramaPlanNacion).subscribe(
          result => {
            if (result.status !== 200) {
              this.showToast('error', 'Error al Ingresar la Información del Campo Transversal asociado al Proyecto', JSON.stringify(result.message));
            } else if (result.status === 200) {
              // Evalua los resultados de la query
              if (result.findRecord === false) {
                this.showToast('error', 'Error al Ingresar la Información del Campo Transversal asociado al Proyecto', JSON.stringify(result.message));
              } else {
                this.showToast('success', 'Campo Transversal asociado al Proyecto', JSON.stringify(result.message));
              }
            }
          },
          error => {
            this.showToast('error', 'Error al ingresar el Campo Transversal al Proyecto', JSON.stringify(error.message));
          },
        );
      }
    } else {
      this.showToast('error', 'Error al ingresar la Información Programa de Gobierno', 'Debes de seleccionar los Programa de Gobierno, para continuar');
      return -1;
    }
  } // FIN | saveProgramaVidaMejor


  /****************************************************************************
  * Funcion: cleanProgramaCamposTransversales
  * Object Number: 008
  * Fecha: 16-04-2019
  * Descripcion: Method cleanProgramaCamposTransversales of the Class
  * Objetivo: cleanProgramaCamposTransversales Limpia listado Campo Transversal
  * Params: { }
  ****************************************************************************/
  cleanProgramaPlanNacion() {
    this.JsonSendProgramaPlanNacionOpciones = [];
    this.changeDetectorRef.detectChanges();
    this.JsonSendProgramaPlanNacionOpciones = [...this.JsonSendProgramaPlanNacionOpciones];
  } // FIN | cleanProgramaCamposTransversales
}
