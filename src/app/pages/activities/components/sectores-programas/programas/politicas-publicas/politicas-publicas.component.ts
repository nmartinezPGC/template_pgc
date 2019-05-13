/**
* @author Allan Madrid
* @returns Componente de Vision de Pais
* @name PoliticasPublicasComponent
* @alias _PoliticasPublicasComponent
* @version 1.0.0
* @fecha 02-05-2019
*/
import { Component, OnInit, Input, ChangeDetectorRef} from '@angular/core';
import { TreeNode, MessageService, MenuItem } from 'primeng/primeng';
import { ToasterConfig, ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import { ListasComunesService } from '../../../../../common-list/services/listas-comunes.service';
import { ServicePoliticasPublicasService } from '../../../../services/programas/service-politicas-publicas.service';
import { ActivityPoliticasPublicasModel } from '../../../../models/programas/model-programa-politicas-publicas';
@Component({
  selector: 'ngx-politicaspublicas',
  templateUrl: './politicas-publicas.component.html',
  styleUrls: ['./politicas-publicas.component.scss'],
  providers: [ServicePoliticasPublicasService, MessageService, ToasterService, ListasComunesService],
})
export class PoliticasPublicasComponent implements OnInit {
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
public JsonSendProgramaPoliticasPublicas: any = [];
public JsonSendProgramaPoliticasPublicasOpciones: any = [];

// Json Reception de la Clase
public JsonReceptionAllProgramasPoliticasPublicas: any;
public JsonReceptionProgramaVisionPais: any;
public JsonReceptionProgramaByNivelPoliticasPublicas: any;
public JsonReceptionProgramaByNivelPoliticasPublicas2: any;
public JsonReceptionProgramaByNivelPoliticasPublicas3: any;
public JsonReceptionProgramaByNivelPoliticasPublicas4: any;

// Auditoria
public secuenciaDeActividad: any;

// Modelo de la Clase
public _activityProgramaPoliticasPublicas: ActivityPoliticasPublicasModel;

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
* @param _serviceVisionPaisService
* @param messageService
*/
constructor(private _servicePoliticasPublicasService: ServicePoliticasPublicasService,
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
 this._activityProgramaPoliticasPublicas = new ActivityPoliticasPublicasModel (
   0, null, // Datos Generales
   null, 0, // Relacionales
   null, 0, 0,
   true, null, null, // Auditoria
 );

 // Llenado del Treeview de la Tabla
 this._servicePoliticasPublicasService.getFiles().then(files => this.filesTree4 = files);

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
this.JsonSendProgramaPoliticasPublicasOpciones = [...this.JsonSendProgramaPoliticasPublicasOpciones, { name: event.node.label, code: event.node.data }];
} else if (event.node.children.length === 0) { // Definicion de Items del Nivel 3
this.JsonSendProgramaPoliticasPublicasOpciones = [...this.JsonSendProgramaPoliticasPublicasOpciones, { name: event.node.label, code: event.node.data }];
} else if (event.node.children.length !== 0) { // Definicion de Items del Nivel 2
// Evaluar si el Nivel 2 o Nivel 3
if (event.node.children.length !== 0 && event.node.parent !== undefined) {
 // Nodos del Nivel 2
 for (let index = 0; index < event.node.children.length; index++) {
   const element = event.node.children[index];
   const resultado = this.JsonSendProgramaPoliticasPublicasOpciones.findIndex(Programa => Programa.name === element.label);
   // Evalua que el Item no este dentro del Json
   if (resultado !== -1) {
     // No carga Item porque ya existe
   } else {
     this.JsonSendProgramaPoliticasPublicasOpciones = [...this.JsonSendProgramaPoliticasPublicasOpciones, { name: element.label, code: element.data }];
   }
 }
} else {
 // Nodos del Nivel 3
 for (let index = 0; index < event.node.children.length; index++) {
   const element = event.node.children[index];
   this.JsonSendProgramaPoliticasPublicasOpciones = [...this.JsonSendProgramaPoliticasPublicasOpciones, { name: element.label, code: element.data }];
 }
}
}
this.JsonSendProgramaPoliticasPublicasOpciones.sort();
// console.log(this.JsonSendProgramaPlanNacionOpciones);
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
const resultado = this.JsonSendProgramaPoliticasPublicasOpciones.findIndex(Programa => Programa.name !== itemNodeLabel);
this.JsonSendProgramaPoliticasPublicasOpciones.splice(Number(resultado))
this.JsonSendProgramaPoliticasPublicasOpciones = [...this.JsonSendProgramaPoliticasPublicasOpciones];
} else if (event.node.children !== undefined && event.node.children.length !== 0) {
for (let index = 0; index < event.node.children.length; index++) {
 const element = event.node.children[index];
 // Ejecucion del splice por el item de iteracion
 const resultado = this.JsonSendProgramaPoliticasPublicasOpciones.findIndex(Programa => Programa.name === element.label);
 this.JsonSendProgramaPoliticasPublicasOpciones.splice(Number(resultado), 1)
 this.JsonSendProgramaPoliticasPublicasOpciones = [...this.JsonSendProgramaPoliticasPublicasOpciones];
}
} else if (event.node.children !== undefined && event.node.children.length === 0) {
const itemNodeLabel = event.node.label;
// Ejecucion del splice del elemento
const resultado = this.JsonSendProgramaPoliticasPublicasOpciones.findIndex(Programa => Programa.name === itemNodeLabel);
this.JsonSendProgramaPoliticasPublicasOpciones.splice(Number(resultado), 1)
this.JsonSendProgramaPoliticasPublicasOpciones = [...this.JsonSendProgramaPoliticasPublicasOpciones];
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
private getAllProgramasVisionPaisService() {
// Ejecuta el Servicio de invocar todos los Objetivos Vision Pais
this._servicePoliticasPublicasService.getAllProgramasPoliticasPublicas().subscribe(
result => {
 if (result.status !== 200) {
   this.showToast('error', 'Error al Obtener la Información ', result.message);
   this.JsonReceptionAllProgramasPoliticasPublicas = [];
 } else if (result.status === 200) {
   this.JsonReceptionAllProgramasPoliticasPublicas = result.data;

   // Setea la Lista de los todos Objetivos de Vision Pais
   this.nodes = this.JsonReceptionAllProgramasPoliticasPublicas.map((item) => {
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
} // FIN | getAllProgramaVisionPaisService



/****************************************************************************
* Funcion: getfindByIdProgramaService
* Object Number: 004
* Fecha: 22-03-2019
* Descripcion: Method getfindByIdProgramaService of the Class
* Objetivo: getfindByIdProgramaService detalle de Vision Pais, con el ID
* Params: { idPrograma }
****************************************************************************/
private getfindByIdProgramaService(idPrograma: number) {

// Ejecucion del EndPoint de Consulta de Programa, por ID
this._servicePoliticasPublicasService.getfindByIdPrograma(idPrograma).subscribe(
result => {
 if (result.status !== 200) {
   this.showToast('error', 'Error al Obtener la Información del objetivo ', result.message);
   this.JsonReceptionProgramaVisionPais = [];
 } else if (result.status === 200) {
   this.JsonReceptionProgramaVisionPais = result.data;
 }
},
error => {
 this.showToast('error', 'Error al Obtener la Información del Objetivo de Vision Pais', JSON.stringify(error.message));
},
);
} // FIN | getfindByIdProgramaService


/****************************************************************************
* Funcion: getfindByIdNivelProgramaService
* Object Number: 005
* Fecha: 25-03-2019
* Descripcion: Method getfindByIdNivelProgramaService of the Class
* Objetivo: getfindByIdNivelProgramaService detalle del objetivo de Vision Pais
* Id Nivel de Programa
* Params: { idSNivelector }
****************************************************************************/
private getfindByIdNivelProgramaService(idSNivelector: number) {

// Ejecucion del EndPoint de Consulta de Programa, por ID
this._servicePoliticasPublicasService.getfindByIdNivelPrograma(idSNivelector).subscribe(
result => {
 if (result.status !== 200) {
   this.showToast('error', 'Error al Obtener la Información de Vision Pais del nivel 1 ', result.message);
   this.JsonReceptionProgramaByNivelPoliticasPublicas = [];
   this.nodes = [];
 } else if (result.status === 200) {
   this.JsonReceptionProgramaByNivelPoliticasPublicas = result.data;
   this.getProgramaVisionPaisNivel2(this.JsonReceptionProgramaByNivelPoliticasPublicas);
 }
},
error => {
 this.showToast('error', 'Error al Obtener la Información de Vision Pais', JSON.stringify(error.message));
},
);
} // FIN | getfindByIdNivelProgramaService



/****************************************************************************
* Funcion: getProgramaVisionPaisNivel2
* Object Number: 006
* Fecha: 25-03-2019
* Descripcion: Method getProgramaVisionPaisNivel2 of the Class
* Objetivo: getProgramaVisionPaisNivel2 de los Niveles inferiores objetivos de Vision Pais,
* con el Id Nivel 1 de Programa
* Params: { arrayN1 }
****************************************************************************/
getProgramaVisionPaisNivel2(array: any) {
// Inicializacion del Arraeglo de Nivel 2
this.JsonReceptionProgramaByNivelPoliticasPublicas2 = [];
this.JsonReceptionProgramaByNivelPoliticasPublicas3 = [];
this.JsonReceptionProgramaByNivelPoliticasPublicas4 = [];

// Ejecucion del EndPoint de Consulta de Programa, por ID
for (let n1 = 0; n1 < array.length; n1++) { // Ciclo del Nivel 1, definir el Nivel 2
const element = array[n1];

// Ejecutamos el servicio, para el Nivel 2
setTimeout(() => {
 this._servicePoliticasPublicasService.getfindByIdNivelProgramaAndProgramaPadreId(2, element.idPrograma).subscribe(
   result => {
     if (result.status !== 200) {
       this.showToast('error', 'Error al Obtener la Información de los Programa Nivel 2', result.message);
       this.JsonReceptionProgramaByNivelPoliticasPublicas2 = [];
       this.arrayPush = [];
       this.loading = false;
     } else if (result.status === 200 && result.data !== undefined) {
       this.JsonReceptionProgramaByNivelPoliticasPublicas2 = result.data;

       // Array para el Segundo Ciclo | Nivel 2
       const array2 = [];

       // Condicion de Jerarquia de Nivel 2
       if (this.JsonReceptionProgramaByNivelPoliticasPublicas2 !== undefined) {
         for (let n2 = 0; n2 < this.JsonReceptionProgramaByNivelPoliticasPublicas2.length; n2++) { // Ciclo del Nivel 2, definir el Nivel 3
           // Array para el segundo Ciclo | Nivel 3
           const array3 = [];

           const element2 = this.JsonReceptionProgramaByNivelPoliticasPublicas2[n2];

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
     this.showToast('error', 'Error al Obtener la Información de objetivos de Vision Pais', JSON.stringify(error.message));
   },
 );
}, 1000);
}
} // FIN | getProgramaVisionPaisNivel2


/****************************************************************************
* Funcion: saveProgramaVisionPais
* Object Number: 007
* Fecha: 15-04-2019
* Descripcion: Method saveProgramaVisionPais of the Class
* Objetivo: saveProgramaVisionPais Grabar listado Campo Transversal
* Params: { JsonSendProgramaPoliticasPublicasOpciones }
****************************************************************************/
saveProgramaPoliticasPublicas() {
// Seteo de los campos iniciales
this._activityProgramaPoliticasPublicas.idActividad = { idActividad: this.idProyectoTab };

// Validacion de Items seleccionados
if (this.JsonSendProgramaPoliticasPublicasOpciones.length > 0) {
// Recorre los items seleccionados del Treeview
for (let index = 0; index < this.JsonSendProgramaPoliticasPublicasOpciones.length; index++) {
 const element = this.JsonSendProgramaPoliticasPublicasOpciones[index];

 // Asignacion del Campo Transversal
 this._activityProgramaPoliticasPublicas.idProgramaPoliticasPublicas = { idPrograma: element.code };

 this._activityProgramaPoliticasPublicas.codigoActividad = this.codigoProyectoTab + '-APP-' + element.code;

 // Ejecucion del Campo Transversal
 this._servicePoliticasPublicasService.saveActividadProgramaPoliticasPublicas(this._activityProgramaPoliticasPublicas).subscribe(
   result => {
     if (result.status !== 200) {
       this.showToast('error', 'Error al Ingresar la Información Vision Pais asociado al Proyecto', JSON.stringify(result.message));
     } else if (result.status === 200) {
       // Evalua los resultados de la query
       if (result.findRecord === false) {
         this.showToast('error', 'Error al Ingresar la Información Vision Pais asociado al Proyecto', JSON.stringify(result.message));
       } else {
         this.showToast('success', 'Vision Pais asociado al Proyecto', JSON.stringify(result.message));
       }
     }
   },
   error => {
     this.showToast('error', 'Error al ingresar el Campo Transversal al Proyecto', JSON.stringify(error.message));
   },
 );
}
} else {
this.showToast('error', 'Error al ingresar la Información Objetivo de Vision Pais', 'Debes de seleccionar los Objetivos de Vision Pais, para continuar');
return -1;
}
} // FIN | saveProgramaPoliticasPublicas


/****************************************************************************
* Funcion: cleanProgramaPoliticasPublicas
* Object Number: 008
* Fecha: 16-04-2019
* Descripcion: Method cleanProgramaPoliticasPublicas of the Class
* Objetivo: cleanProgramaPoliticasPublicas Limpia listado de Vision Pais
* Params: { }
****************************************************************************/
cleanProgramaPoliticasPublicas() {
this._servicePoliticasPublicasService.getFiles().then(files => this.filesTree4 = files);
this.JsonSendProgramaPoliticasPublicasOpciones = [];
this.changeDetectorRef.detectChanges();
this.JsonSendProgramaPoliticasPublicasOpciones = [...this.JsonSendProgramaPoliticasPublicasOpciones];
} // FIN | cleanProgramaPoliticasPublicas

}

