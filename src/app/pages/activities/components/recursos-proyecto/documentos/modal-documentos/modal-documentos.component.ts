/**
* @author Allan Madrid
* @returns Componente de Documentos
* @name linkComponent
* @alias _linkComponent
* @version 2.0.0
* @fecha 01-07-2019
*/

import { Component, OnInit, Input, ChangeDetectorRef, OnChanges } from '@angular/core';
import { ToasterConfig, ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import { ServicerecursosproyectoService } from '../../../../services/recursos-proyecto/service-recursos-proyecto.service';
import { NotificacionesService } from '../../../../../shared/services/notificaciones.service';
import { Router } from '@angular/router';
import { RecursosProyectoModel  } from '../../../../models/recursos-proyecto/recursos-proyecto.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-modal-documentos',
  templateUrl: './modal-documentos.component.html',
  styleUrls: ['./modal-documentos.component.scss'],
  providers: [ServicerecursosproyectoService, NotificacionesService],
})
export class ModalDocumentosComponent implements OnInit {
  @Input() idProyectoTab: number;
  @Input() idUsuarioTab: number;
  @Input() codigoProyectoTab: string;
 // se crea la variable receptora de la Informacion
 @Input() modalHeader;
 @Input() modaliddoc;

 public JsonReceptionFindbyActividadRecurso: any;
 public _linkmodal1: RecursosProyectoModel;
 data4: any;
 public JsonReceptionTipo: any;
 public JsonReceptionTipos: any;
 public JsonReceptionActividadRecurso: any;
 data1: any;
 arrayTipoPerfiles: any
 public JsonCategoria: any;
 data2: any;
 arrayCategoria: any;
 marked = false;
 theCheckbox = false;


 isNewestOnTop = true;
 isHideOnClick = true;
 isDuplicatesPrevented = false;
 isCloseButton = true;
 settings: any;
 public responsedata: any;
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
  constructor(private activeModal: NgbActiveModal, public _servicerecursosproyectoService: ServicerecursosproyectoService,
    protected _router: Router, private _notificacionesService: NotificacionesService) {
      this.responsedata = { 'error': false, 'msg': 'error campos solicitado' }
    }

    ngOnInit() {

      this._linkmodal1 = new RecursosProyectoModel(
        0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, true
      );
      this._linkmodal1.idActividadRecurso;
      this._linkmodal1.codigoActividadRecurso;
      this._linkmodal1.descripcion;
      this._linkmodal1.titulo;
      this._linkmodal1.nota;
      this._linkmodal1.urlActividadRecursoDocumento;
      this._linkmodal1.urlActividadRecursoLink;
      this._linkmodal1.Actividad;
      this._linkmodal1.TipoRecursos;
      this._linkmodal1.Usuario;
      this._linkmodal1.Tipo;
      this._linkmodal1.activo;

      this.findByIdActividadRecurso(this.modaliddoc);
      this.tipoService();
      this.tiposService();
      this.ListAllRecursoProyecto();
    }
    closeModal() {
      this.activeModal.close();
    }

    // FIN | closeModal

       /****************************************************************************
  * Funcion: findByIdActividadRecurso
  * Object Number: 00002
  * Fecha: 01-07-2019
  * Descripcion: Method findByIdActividadRecurso of the Class
  * Objetivo: findByIdActividadRecurso detalle de busqueda por Id del Recurso de Proyecto link llamando a la API
  * Autor: Allan Madrid
  ****************************************************************************/

    findByIdActividadRecurso(idActividadRecurso: number) {
      // Ejecutamos el Recurso del EndPoint
      this._servicerecursosproyectoService.FindByIdActividadRecurso(idActividadRecurso).subscribe(
        response => {
          if (response.status !== 200) {
            this._notificacionesService.showToast('error', 'Error al Buscar la Id del Recurso de Proyecto Consultado', response.message);
          } else if (response.status === 200) {
         ;
            this.JsonReceptionFindbyActividadRecurso = response.data;
            this.data4 = this.JsonReceptionFindbyActividadRecurso;
            this._linkmodal1.codigoActividadRecurso = this.data4.codigoActividadRecurso;
            this._linkmodal1.titulo = this.data4.titulo;
            this._linkmodal1.descripcion = this.data4.descripcion;
            this._linkmodal1.nota = this.data4.nota;
            this._linkmodal1.urlActividadRecursoDocumento = this.data4.urlActividadRecursoDocumento;
            this._linkmodal1.urlActividadRecursoLink = this.data4.urlActividadRecursoLink;
            // carga de los datos relacionales
            this._linkmodal1.Actividad = this.data4.idActividadRecurso.idActividadRecurso;
            this._linkmodal1.TipoRecursos = this.data4.idTipoRecursos.idTipoRecursos;
            this._linkmodal1.Usuario = this.data4.idUsuario.idUsuario;
            this._linkmodal1.Tipo = this.data4.idTipo.idTipo;
            this._linkmodal1.activo = this.data4.activo;
  
            // Verificamos que la Actividad Exista en la BD
          }
        },
        error => {
          this._notificacionesService.showToast('error', 'Ha ocurrido un Error al cargar el Recurso de Proyecto, por favor verifica que todo este bien!!', JSON.stringify(error.error.message));
          // Ocultamos el Loader la Funcion
        },
      );
    } // FIN | findByIdActividadRecurso

     /****************************************************************************
  * Funcion: tiposService
  * Object Number: 00003
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

     /****************************************************************************
  * Funcion: tipoService
  * Object Number: 00004
  * Fecha: 22-01-2019
  * Descripcion: Method estadoService of the Class
  * Objetivo: estadoService detalle de los estados del usuario llamando a la API
  * Autor: Edgar Ramirez
  ****************************************************************************/
  private tipoService() {
    this._servicerecursosproyectoService.getAllTipo().subscribe(
      response => {
        if (response.status !== 200) {
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
  } // FIN | tipoService

     /****************************************************************************
  * Funcion: UpdateLink
  * Object Number: 00005
  * Fecha: 03-07-2019
  * Descripcion: Method UpdateLink of the Class
  * Objetivo: UpdateLink actualiza la información del recurso de proyecto de Link llamando a la API
  * Autor: Allan Madrid
  ****************************************************************************/

  private UpdateLink() {
    this._linkmodal1.idTipoRecursos = { idTipoRecursos: this._linkmodal1.TipoRecursos };
    this._linkmodal1.idTipo = {idTipo: this._linkmodal1.Tipo};
    // Ejecutamos el Recurso del EndPoint
    this._servicerecursosproyectoService.LinkUpdate(this._linkmodal1, this.modaliddoc).subscribe(
      response => {
        if (response.status !== 200) {
          this._notificacionesService.showToast('error', 'Error al Ingresar la Información del Recurso de Proyecto', response.message);
        } else if (response.status === 200) {
          this._notificacionesService.showToast('default', 'se actualizo con exito la informacion del Recurso de Proyecto', response.message);
          this.activeModal.close();
          this.ListAllRecursoProyecto();
          this.ngOnInit();
        }
      },

    );
  } // FIN | UpdateLink

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
                this.data2 = this.JsonReceptionActividadRecurso;

            }
        },
        error => {
            // Redirecciona al Login
            alert('Error en la petición de la API ' + <any>error);
        },
    );
  } // FIN | ListAllRecursoProyecto
}
