/**
* @author Allan Madrid
* @returns Componente de Documentos
* @name linkComponent
* @alias _linkComponent
* @version 2.0.0
* @fecha 11-0612019
*/

import { Component, OnInit, Input, ChangeDetectorRef, OnChanges } from '@angular/core';
import { ToasterConfig, ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import { ServicerecursosproyectoService } from '../../../services/recursos-proyecto/service-recursos-proyecto.service';
import { NotificacionesService } from '../../../../shared/services/notificaciones.service';
import { RecursosProyectoModel  } from '../../../models/recursos-proyecto/recursos-proyecto.model';
@Component({
  selector: 'ngx-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent implements OnInit, OnChanges {
   // Variables entre Tabs | Components
   @Input() idProyectoTab: number;
   @Input() idUsuarioTab: number;
   @Input() codigoProyectoTab: string;
   // variable del Json
   @Input() JsonPassData: any;
   public _recursosproyectoModel: RecursosProyectoModel;
   public JsonReceptionTipo: any;
   data1: any;
   arrayTipoPerfiles: any
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

  constructor(public _servicerecursosproyectoService: ServicerecursosproyectoService) { }

  ngOnInit() {
    this._recursosproyectoModel = new RecursosProyectoModel(
      null, null,
    );
    this.tipoService();
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
} // FIN | estadoService
}
