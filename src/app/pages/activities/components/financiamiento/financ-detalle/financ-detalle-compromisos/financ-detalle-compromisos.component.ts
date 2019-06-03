/**
* @author Nahum Martinez
* @returns Componente de Financ Detalle Compromisos
* @name FinancDetalleCompromisosComponent
* @alias _financDetalleCompromisosComponent
* @version 1.0.0
* @fecha 16-05-2019
*/

import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToasterService } from 'angular2-toaster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Form } from '@angular/forms';
import { FinancDetalleCompromisosFormComponent } from './financ-detalle-compromisos-form/financ-detalle-compromisos-form.component';

@Component({
  selector: 'ngx-financ-detalle-compromisos',
  templateUrl: './financ-detalle-compromisos.component.html',
  styleUrls: ['./financ-detalle-compromisos.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class FinancDetalleCompromisosComponent implements OnInit {
  // Variables entre Tabs | Components
  @Input() idProyectoTab: number;
  @Input() idUsuarioTab: number;
  @Input() codigoProyectoTab: string;

  /**
   * Constructor de la Clase
   * @param messageService
   * @param changeDetectorRef
   * @param _toasterService
   * @param modalService
   * @param confirmationService
   * Fecha: 2019-05-29
   */
  constructor(private _messageService: MessageService,
    private _toasterService: ToasterService,
    private modalService: NgbModal,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
  }


  /**
   * Funcion de mostrar el Modal con Parametros enviados
   * Autor: Nahum Martinez
   * Fecha: 2019-04-22
   * Formulario de Compromisos
   */
  showCompromisoModal(nombreSector: string, idSector: number, imagenSector: string) {
    const activeModal = this.modalService.open(FinancDetalleCompromisosFormComponent, {
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
