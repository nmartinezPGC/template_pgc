/**
* @author Allan Madrid
* @returns Componente de Documentos
* @name documentosComponent
* @alias _documentosComponent
* @version 2.0.0
* @fecha 11-0612019
*/

import { Component, OnInit, Input, ChangeDetectorRef, OnChanges } from '@angular/core';
import { ToasterConfig, ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import { Router } from '@angular/router';
import { ServicerecursosproyectoService } from '../../../services/recursos-proyecto/service-recursos-proyecto.service';
import { NotificacionesService } from '../../../../shared/services/notificaciones.service';
import { ModalDocumentosComponent } from '../../recursos-proyecto/documentos/modal-documentos/modal-documentos.component';
import { RecursosProyectoModel  } from '../../../models/recursos-proyecto/recursos-proyecto.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'ngx-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss'],
  providers: [ServicerecursosproyectoService, NotificacionesService],
})
export class DocumentosComponent implements OnInit, OnChanges {
   // Variables entre Tabs | Components
   @Input() idProyectoTab: number;
   @Input() idUsuarioTab: number;
   @Input() codigoProyectoTab: string;
   @Input() idActividadRecurso;
   // variable del Json
   @Input() JsonPassData: any;
   public _recursosproyectoModel: RecursosProyectoModel;
   public JsonReceptionTipo: any;
   public JsonReceptionActividadRecurso: any;
   public JsonReceptionTipos: any;
   data1: any;
   arrayTipoPerfiles: any
   data: any;
  arrayActividadRecurso: any
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
   // levanta la modal de mantenimineto de espacios de trabjo/consulta
  showLargeModal1(idActividadRecurso: number) {
  const activeModal = this.modalService.open(ModalDocumentosComponent, {
    size: 'lg',
    backdrop: 'static',
    container: 'nb-layout',
  });

  activeModal.componentInstance.modalHeader = 'Large Modal Parametro ';
  // Se cambia a un nombre que hace mencion de los parametros enviados por la Modal
  activeModal.componentInstance.modaliddoc = idActividadRecurso;
  // activeModal.componentInstance.idEspacioTrabajo = idEspacioTrabajo;

  // this.data3 = this.JsonReceptionEspaciotrabajo;
  // this.arrayEspaciostrabajo = new Array();

}
constructor(public _servicerecursosproyectoService: ServicerecursosproyectoService, protected _router: Router, private modalService: NgbModal,
  private _notificacionesService: NotificacionesService) { }

  ngOnInit() {
    this._recursosproyectoModel = new RecursosProyectoModel(
      0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, true
    );
    this.tiposService();
    this.tipoService();
    this.ListAllRecursoProyecto();
  }
 /****************************************************************************
* Funcion: estadoService
* Object Number: 007
* Fecha: 22-01-2019
* Descripcion: Method estadoService of the Class
* Objetivo: estadoService detalle de los estados del usuario llamando a la API
* Autor: Edgar Ramirez
****************************************************************************/
private tipoService() {
  this._servicerecursosproyectoService.getAllTipo().subscribe(
    response => {
      // console.log(this.data3)
      if (response.status !== 200) {
        // console.log(response.status);
      } else if (response.status === 200) {
        this.JsonReceptionTipo = response.data;
        this.data1 = this.JsonReceptionTipo;
        this.arrayTipoPerfiles = new Array();
      }
    },
    error => {
      // Redirecciona al Login
      alert('Error en la petición de la API ' + <any>error);

    },
  );
} // FIN | estadoService
 /****************************************************************************
  
* Funcion: ListAllRecursoProyecto
  * Object Number: 001
  * Fecha: 25-06-2019
  * Descripcion: Method ListAllRecursoProyecto of the Class
  * Objetivo: ListAllRecursoProyecto detalle de los Recursos de Proyecto llamando a la API
  ****************************************************************************/
    private ListAllRecursoProyecto() {
        this._servicerecursosproyectoService.findAllrecursosproyecto().subscribe(
            response => {
                if (response.status !== 200) {
                } else if (response.status === 200) {
                    this.JsonReceptionActividadRecurso = response.data;
                    this.data = this.JsonReceptionActividadRecurso;
                    // Carga los Items para el List de la Smart table
                    this.arrayActividadRecurso = new Array();
                }
            },
            error => {
                // Redirecciona al Login
                alert('Error en la petición de la API ' + <any>error);
            },
        );
    } // FIN | ListAllRecursoProyecto
    /*
* Funcion: deleteEspacioTrabajo
  * Object Number: 00008
  * Fecha:19-06-2019
  * Descripcion: Method tIPO DE Espacio Trabajo
  * Objetivo:deshabilitar un Recurso de Proyecto
  * Autor: Allan Madrid
*/
private deleteActividadRecurso(idActividadRecurso: number) {

  // Ejecutamos el Recurso del EndPoint
  this._servicerecursosproyectoService.ActividadRecursoDelete(idActividadRecurso).subscribe(
    response => {
      if (response.status !== 200) {
        this._notificacionesService.showToast('error', 'Error al desahabilitar el Recurso de Proyecto', response.message);
      } else if (response.status === 200) {
        this._notificacionesService.showToast('default', 'se deshabilito el Recurso de Proyecto de forma exitosa', response.message);
        // this.ListAllCategoria();
      }
      this.ngOnInit();
      this.ListAllRecursoProyecto();
    },
  );
} // FIN | deleteEspacioTrabajo

/****************************************************************************
 * Funcion: newDocService
 * Object Number: 00003
 * Fecha: 26-06-2019
 * Descripcion: Method newDocService
 * Objetivo: crear nuevo Recurso de Proyecto de link.
 ****************************************************************************/
private newDocService() {
  // Seteo de las variables del Model al json de Java
  this._recursosproyectoModel.idActividad = { idActividad: this.idProyectoTab };
  this._recursosproyectoModel.idUsuario = { idUsuario: this.idUsuarioTab };
  this._recursosproyectoModel.codigoActividadRecurso = this.codigoProyectoTab;
  this._recursosproyectoModel.idTipoRecursos = { idTipoRecursos: this._recursosproyectoModel.TipoRecursos };
  this._recursosproyectoModel.idTipo = {idTipo: this._recursosproyectoModel.Tipo};
  // Ejecutamos el Recurso del EndPoint
  this._servicerecursosproyectoService.newrecurso(this._recursosproyectoModel).subscribe(
    response => {
      if (response.status !== 200) {
        // console.log(response.status);
        // console.log(response.message);
        this._notificacionesService.showToast('error', 'Error al Ingresar la Información del Recurso de Proyecto', response.message);
      } else if (response.status === 200) {
        // console.log(result.status);
        this._notificacionesService.showToast('default', 'El Recurso de Proyecto, se ha ingresado con exito', response.message);
        // Carga la tabla Nuevamente
        this.ListAllRecursoProyecto();
        this.ngOnInit();
      }
    },
    error => {
      // Redirecciona al Login
      this._notificacionesService.showToast('error' , 'Error en la petición de la API' , <any>error.message.message);
    },
  );
} // FIN | newDocService

cleandoc() {
  this.ngOnInit();

};
/****************************************************************************
* Funcion: tiposService
* Object Number: 00004
* Fecha: 01-07-2019
* Descripcion: Method tiposService of the Class
* Objetivo: tiposService detalle de los tipos llamando a la API
* Autor: Allan Madrid
****************************************************************************/
private tiposService() {
  const idTipoSen: number = 6;
  this._servicerecursosproyectoService.getAllTipos(idTipoSen).subscribe(
    response => {
      if (response.status !== 200) {
      } else if (response.status === 200) {
        this.JsonReceptionTipos = response.data;
        this.data1 = this.JsonReceptionTipos;
        this.arrayTipoPerfiles = new Array();
      }
    },
    error => {
      // Redirecciona al Login
      alert('Error en la petición de la API ' + <any>error);

    },
  );
} // FIN | tiposService
}
