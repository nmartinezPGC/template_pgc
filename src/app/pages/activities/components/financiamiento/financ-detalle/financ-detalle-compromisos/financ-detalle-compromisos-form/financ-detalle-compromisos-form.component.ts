/**
* @author Nahum Martinez
* @returns Formulario de Ingreso de Comprimisos
* @name FinancDetalleCompromisosFormComponent
* @alias _financDetalleCompromisosFormComponent
* @version 1.0.0
* @date 2019-05-29
*/

import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'ngx-financ-detalle-compromisos-form',
  templateUrl: './financ-detalle-compromisos-form.component.html',
  styleUrls: ['./financ-detalle-compromisos-form.component.scss'],
  providers: [ConfirmationService],
})
export class FinancDetalleCompromisosFormComponent implements OnInit {
  // Variables primitivas
  modalHeader: string;
  modalHeaderId: number;
  modalHeaderCodigoActividad: string;
  modalHeaderIdActividad: number;
  modalHeaderImagenSector: string;

  // JsonReceptions
  public JsonReceptionFinancDetCompromisos: any = [];

  // Loaders
  loader: boolean = true;

  // Ventana Modal de Fecha
  display: boolean = false;

  /**
   * Constructor de la Clase
   * @param activeModal
   * @param _toasterService
   * @param confirmationService
   * Fecha: 2019-05-29
   */
  constructor(private activeModal: NgbActiveModal,
    private _toasterService: ToasterService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
  }


  /****************************************************************************
   * Funcion: closeModal
   * Object Number: 001
   * Fecha: 29-05-2019
   * Descripcion: Method closeModal of the Class
   * Objetivo: closeModal cerrar la ventana Modal
   * Params: { }
   ****************************************************************************/
  closeModal() {
    this.activeModal.close();
  } // FIN | closeModal

  /****************************************************************************
  * Funcion: showDialog y closeDialog
  * Object Number: 001
  * Fecha: 21-05-2019
  * Descripcion: Method que Genera las fechas de Transaccion y las asigan al
  * Modelo de la Clase
  * Objetivo: Generar las Fechas de Transaccion al Modelo
  * @param event
  ****************************************************************************/
  showDialog() {
    this.display = true;
  }

  closeDialog() {
    this.display = false;
    // Asignacion de Fecha de Transaccion
    // this._activityFinanciamientoEncModel.fechaTransaccion = this.date6;
  }

}
