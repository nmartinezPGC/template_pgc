/**
* @author Nahum Martinez
* @returns Componente de Plan de Nacion
* @name VidaMejorComponent
* @alias _vidaMejorComponent
* @version 1.0.0
* @fecha 17-04-2019
*/

import { Component, OnInit, Input, ChangeDetectorRef, OnChanges } from '@angular/core';
import { TreeNode, MessageService, MenuItem } from 'primeng/primeng';
import { ToasterConfig, ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import { ListasComunesService } from '../../../../../common-list/services/listas-comunes.service';
import { ServiceVidaMejorService } from '../../../../services/programas/service-vida-mejor.service';
import { ActivityProgramaVidaMejorModel } from '../../../../models/programas/model-programa-vida-mejor';
import { NotificacionesService } from '../../../../../shared/services/notificaciones.service';

@Component({
  selector: 'ngx-vida-mejor',
  templateUrl: './vida-mejor.component.html',
  styleUrls: ['./vida-mejor.component.scss'],
  providers: [ServiceVidaMejorService, MessageService, NotificacionesService, ListasComunesService],
})
export class VidaMejorComponent implements OnInit, OnChanges {
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
  public JsonSendProgramaVidaMejor: any = [];
  public JsonSendProgramaVidaMejorOpciones: any = [];

  // Json Recpetion de la Clase
  public JsonReceptionAllProgramasVidaMejor: any;
  public JsonReceptionProgramaVidaMejor: any;
  public JsonReceptionProgramaByNivelVidaMejor: any;
  public JsonReceptionProgramaByNivelVidaMejor2: any;
  public JsonReceptionProgramaByNivelVidaMejor3: any;
  public JsonReceptionProgramaByNivelVidaMejor4: any;

  // Auditoria
  public secuenciaDeActividad: any;

  // Modelo de la Clase
  public _activityProgramaVidaMejorModel: ActivityProgramaVidaMejorModel;

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
   * @param _serviceVidaMejorService
   * @param messageService
   */
  constructor(private _serviceVidaMejorService: ServiceVidaMejorService,
    private messageService: MessageService,
    private changeDetectorRef: ChangeDetectorRef,
    private _notificacionesService: NotificacionesService) {
    // Codigo del Constructor
  }

  /**
   * Inicializacion de la Clase
   */
  ngOnInit() {
    // Cargando los Items del TreeView
    this.loading = true;

    // Inicializacion del Modelo
    this._activityProgramaVidaMejorModel = new ActivityProgramaVidaMejorModel(
      0, null, // Datos Generales
      null, 0, // Relacionales
      null, 0, 0,
      true, null, null, // Auditoria
    );

    // Llenado del Treeview de la Tabla
    this._serviceVidaMejorService.getFiles().then(files => this.filesTree4 = files);

    // this.getfindByIdNivelProgramaService(1);
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
    // Condicion de Agregar los Nodos
    if (event.node.children === undefined) { // Definicion de Items del Nivel 4
      this.JsonSendProgramaVidaMejorOpciones = [...this.JsonSendProgramaVidaMejorOpciones, { name: event.node.label, code: event.node.data }];
    } else if (event.node.children.length === 0) { // Definicion de Items del Nivel 3
      this.JsonSendProgramaVidaMejorOpciones = [...this.JsonSendProgramaVidaMejorOpciones, { name: event.node.label, code: event.node.data }];
    } else if (event.node.children.length !== 0) { // Definicion de Items del Nivel 2
      // Evaluar si el Nivel 2 o Nivel 3
      if (event.node.children.length !== 0 && event.node.parent !== undefined) {
        // Nodos del Nivel 2
        for (let index = 0; index < event.node.children.length; index++) {
          const element = event.node.children[index];
          const resultado = this.JsonSendProgramaVidaMejorOpciones.findIndex(Programa => Programa.name === element.label);
          // Evalua que el Item no este dentro del Json
          if (resultado !== -1) {
            // No carga Item porque ya existe
          } else {
            this.JsonSendProgramaVidaMejorOpciones = [...this.JsonSendProgramaVidaMejorOpciones, { name: element.label, code: element.data }];
          }
        }
      } else {
        // Nodos del Nivel 3
        for (let index = 0; index < event.node.children.length; index++) {
          const element = event.node.children[index];
          this.JsonSendProgramaVidaMejorOpciones = [...this.JsonSendProgramaVidaMejorOpciones, { name: element.label, code: element.data }];
        }
      }
    }
    this.JsonSendProgramaVidaMejorOpciones.sort();
    // console.log(this.JsonSendProgramaVidaMejorOpciones);
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
      const resultado = this.JsonSendProgramaVidaMejorOpciones.findIndex(Programa => Programa.name === itemNodeLabel);
      this.JsonSendProgramaVidaMejorOpciones.splice(Number(resultado), 1)
      this.JsonSendProgramaVidaMejorOpciones = [...this.JsonSendProgramaVidaMejorOpciones];
    } else if (event.node.children !== undefined && event.node.children.length !== 0) {
      for (let index = 0; index < event.node.children.length; index++) {
        const element = event.node.children[index];
        // Ejecucion del splice por el item de iteracion
        const resultado = this.JsonSendProgramaVidaMejorOpciones.findIndex(Programa => Programa.name === element.label);
        this.JsonSendProgramaVidaMejorOpciones.splice(Number(resultado), 1)
        this.JsonSendProgramaVidaMejorOpciones = [...this.JsonSendProgramaVidaMejorOpciones];
      }
    } else if (event.node.children !== undefined && event.node.children.length === 0) {
      const itemNodeLabel = event.node.label;
      // Ejecucion del splice del elemento
      const resultado = this.JsonSendProgramaVidaMejorOpciones.findIndex(Programa => Programa.name === itemNodeLabel);
      this.JsonSendProgramaVidaMejorOpciones.splice(Number(resultado), 1)
      this.JsonSendProgramaVidaMejorOpciones = [...this.JsonSendProgramaVidaMejorOpciones];
    }
  } // FIN | nodeUnselect


  /****************************************************************************
  * Funcion: getAllProgramaVidaMejorService
  * Object Number: 003
  * Fecha: 21-02-2019
  * Descripcion: Method getAllProgramaVidaMejorService of the Class
  * Objetivo: getAllProgramaVidaMejorService listados de los Niveles
  * de Ubicacion de Implementacion del Formulario de Actividad llamando a la API
  * Params: { }
  ****************************************************************************/
  private getAllProgramaVidaMejorService() {
    // Ejecuta el Servicio de invocar todos los Programa Vida Mejor
    this._serviceVidaMejorService.getAllProgramasVidaMejor().subscribe(
      result => {
        if (result.status !== 200) {
          this._notificacionesService.showToast('error', 'Error al Obtener la Información de todos los Programa Vida Mejor', result.message);
          this.JsonReceptionAllProgramasVidaMejor = [];
        } else if (result.status === 200) {
          this.JsonReceptionAllProgramasVidaMejor = result.data;

          // Setea la Lista de los todos Programa Vida Mejor
          this.nodes = this.JsonReceptionAllProgramasVidaMejor.map((item) => {
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
        this._notificacionesService.showToast('error', 'Error al Obtener la Información de todos los Programa Vida Mejor', JSON.stringify(error.error.message));
      },
    );
  } // FIN | getAllProgramaVidaMejorService



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
    this._serviceVidaMejorService.getfindByIdPrograma(idPrograma).subscribe(
      result => {
        if (result.status !== 200) {
          this._notificacionesService.showToast('error', 'Error al Obtener la Información del Programa Vida Mejor', result.message);
          this.JsonReceptionProgramaVidaMejor = [];
        } else if (result.status === 200) {
          this.JsonReceptionProgramaVidaMejor = result.data;
        }
      },
      error => {
        this._notificacionesService.showToast('error', 'Error al Obtener la Información del Programa de Vida Mejor', JSON.stringify(error.error.message));
      },
    );
  } // FIN | getfindByIdProgramaService


  /****************************************************************************
  * Funcion: getfindByIdNivelProgramaService
  * Object Number: 005
  * Fecha: 25-03-2019
  * Descripcion: Method getfindByIdNivelProgramaService of the Class
  * Objetivo: getfindByIdNivelProgramaService detalle del Programa Vida Mejor, con el
  * Id Nivel de Programa
  * Params: { idSNivelector }
  ****************************************************************************/
  private getfindByIdNivelProgramaService(idSNivelector: number) {

    // Ejecucion del EndPoint de Consulta de Programa, por ID
    this._serviceVidaMejorService.getfindByIdNivelPrograma(idSNivelector).subscribe(
      result => {
        if (result.status !== 200) {
          this._notificacionesService.showToast('error', 'Error al Obtener la Información de Programa Nivel 1', result.message);
          this.JsonReceptionProgramaByNivelVidaMejor = [];
          this.nodes = [];
        } else if (result.status === 200) {
          this.JsonReceptionProgramaByNivelVidaMejor = result.data;
          this.getProgramaVidaMejorNivel2(this.JsonReceptionProgramaByNivelVidaMejor);
        }
      },
      error => {
        this._notificacionesService.showToast('error', 'Error al Obtener la Información de Secotores Vida Mejor', JSON.stringify(error.error.message));
      },
    );
  } // FIN | getfindByIdNivelProgramaService



  /****************************************************************************
  * Funcion: getProgramaVidaMejorNivel2
  * Object Number: 006
  * Fecha: 25-03-2019
  * Descripcion: Method getProgramaVidaMejorNivel2 of the Class
  * Objetivo: getProgramaVidaMejorNivel2 de los Niveles inferiores Programa Vida Mejor,
  * con el Id Nivel 1 de Programa
  * Params: { arrayN1 }
  ****************************************************************************/
  getProgramaVidaMejorNivel2(array: any) {
    // Ejecucion del EndPoint de Consulta de Programa, por ID
    for (let n1 = 0; n1 < array.length; n1++) { // Ciclo del Nivel 1, definir el Nivel 2
      const element = array[n1];

      // Ejecutamos el servicio, para el Nivel 2
      setTimeout(() => {
        // Hacemos el push al Array Principal, para cargar los nodos de Nivel 1
        this.arrayPush.push({
          'label': element.nombrePrograma,
          'data': element.idPrograma,
        });
        this.loading = false;
      }, 1000);
    }
  } // FIN | getProgramaVidaMejorNivel2


  /****************************************************************************
  * Funcion: saveProgramaVidaMejor
  * Object Number: 007
  * Fecha: 15-04-2019
  * Descripcion: Method saveProgramaVidaMejor of the Class
  * Objetivo: saveProgramaVidaMejor Grabar listado Vida Mejor
  * Params: { JsonSendProgramaVidaMejorOpciones }
  ****************************************************************************/
  saveProgramaVidaMejor() {
    // Seteo de los campos iniciales
    this._activityProgramaVidaMejorModel.idActividad = { idActividad: this.idProyectoTab };

    // Validacion de Items seleccionados
    if (this.JsonSendProgramaVidaMejorOpciones.length > 0) {
      // Recorre los items seleccionados del Treeview
      for (let index = 0; index < this.JsonSendProgramaVidaMejorOpciones.length; index++) {
        const element = this.JsonSendProgramaVidaMejorOpciones[index];

        // Asignacion del Vida Mejor
        this._activityProgramaVidaMejorModel.idProgramaVidaMejor = { idPrograma: element.code };

        this._activityProgramaVidaMejorModel.codigoActividad = this.codigoProyectoTab + '-APP-' + element.code;

        // Ejecucion del Vida Mejor
        this._serviceVidaMejorService.saveActividadProgramaVidaMejor(this._activityProgramaVidaMejorModel).subscribe(
          result => {
            if (result.status !== 200) {
              this._notificacionesService.showToast('error', 'Error al Ingresar la Información del Vida Mejor asociado al Proyecto', JSON.stringify(result.message));
            } else if (result.status === 200) {
              // Evalua los resultados de la query
              if (result.findRecord === false) {
                this._notificacionesService.showToast('error', 'Error al Ingresar la Información del Vida Mejor asociado al Proyecto', JSON.stringify(result.message));
              } else {
                this._notificacionesService.showToast('success', 'Vida Mejor asociado al Proyecto', JSON.stringify(result.message));
              }
            }
          },
          error => {
            this._notificacionesService.showToast('error', 'Error al ingresar el Vida Mejor al Proyecto', JSON.stringify(error.error.message));
          },
        );
      }
    } else {
      this._notificacionesService.showToast('error', 'Error al ingresar la Información Vida Mejor', 'Debes de seleccionar los Programa de Vida Mejor, para continuar');
      return -1;
    }
  } // FIN | saveProgramaVidaMejor


  /****************************************************************************
  * Funcion: cleanProgramaVidaMejor
  * Object Number: 008
  * Fecha: 16-04-2019
  * Descripcion: Method cleanProgramaVidaMejor of the Class
  * Objetivo: cleanProgramaVidaMejor Limpia listado Vida Mejor
  * Params: { }
  ****************************************************************************/
  cleanProgramaVidaMejor() {
    this._serviceVidaMejorService.getFiles().then(files => this.filesTree4 = files);
    this.JsonSendProgramaVidaMejorOpciones = [];
    this.changeDetectorRef.detectChanges();
    this.JsonSendProgramaVidaMejorOpciones = [...this.JsonSendProgramaVidaMejorOpciones];
  } // FIN | cleanProgramaVidaMejor
}
