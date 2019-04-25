/**
* @author Nahum Martinez
* @returns Permite el registro de las Metas de los ODS
* @name OdsModalMetasComponent
* @alias _odsModalMetasComponent
* @version 1.0.0
* @date 22-04-2019
*/

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceOdsService } from '../../../../../../services/sectores/service-ods.service';
import { ToasterConfig, ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import { ActivitySectoresOdsModel } from '../../../../../../models/sectores/model-sector-ods';
import 'style-loader!angular2-toaster/toaster.css';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'ngx-ods-modal-metas',
  templateUrl: './ods-modal-metas.component.html',
  styleUrls: ['./ods-modal-metas.component.scss'],
  providers: [ServiceOdsService, ToasterService, ConfirmationService],
})
export class OdsModalMetasComponent implements OnInit {
  // Variables primitivas
  modalHeader: string;
  modalHeaderId: number;
  modalHeaderCodigoActividad: string;
  modalHeaderIdActividad: number;
  modalHeaderImagenSector: string;

  // Loaders
  loader: boolean = true;

  selectedSectores: string[];

  // Niveles de ODS
  public sectoresOds: any;
  public sectoresOdsN2: any;

  // JsonReceptions
  public JsonReceptionSectorByNivelOds: any = [];
  public JsonReceptionSectorByNivelOdsN2: any = [];

  // Modelo de la Clase
  public _activitySectoresOdsModel: ActivitySectoresOdsModel;

  // Consfiguracion del Notificador
  position = 'toast-top-right';
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
  msgLoader: string;


  /**
   * Constructor de la Clase
   * @param activeModal
   * @param _serviceOdsService
   */
  constructor(private activeModal: NgbActiveModal,
    private _serviceOdsService: ServiceOdsService,
    private _toasterService: ToasterService,
    private confirmationService: ConfirmationService) { }


  /**
   * Funcion Inicial del Componente
   * Nahum Martinez
   * 2019-04-22
   */
  ngOnInit() {
    /** spinner starts on init */
    // this.msgLoader = 'Cargando';
    // this._spinner.show();
    // Inicializa el Modelo de la Clase
    this._activitySectoresOdsModel = new ActivitySectoresOdsModel(
      0, null, // Datos Generales
      null, 0, null, 0, 0, // Relacionales
      true, null, null, // Auditoria
    );

    // Carga segun los Parametros enviados
    this.getfindByIdNivelSectorService(2, this.modalHeaderId);
  }


  /****************************************************************************
  * Funcion: makeToast
  * Object Number: 001
  * Fecha: 16-08-2018
  * Descripcion: Method makeToast of the Class
  * Objetivo: makeToast in the method header API
  ****************************************************************************/
  makeToast() {
    this.showToast(this.type, this.title, this.content);
  } // FIN | makeToast


  /****************************************************************************
  * Funcion: showToast
  * Object Number: 002
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
  * Object Number: 003
  * Fecha: 16-08-2018
  * Descripcion: Method showToast of the Class
  * Objetivo: showToast in the method header API
  ****************************************************************************/
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      showCloseButton: { 'warning': true, 'error': true },
    }); // FIN | toasterconfig


  /****************************************************************************
   * Funcion: closeModal
   * Object Number: 001
   * Fecha: 22-04-2019
   * Descripcion: Method closeModal of the Class
   * Objetivo: closeModal cerrar la ventana Modal
   * Params: { }
   ****************************************************************************/
  closeModal() {
    this.activeModal.close();
  } // FIN | closeModal


  /****************************************************************************
   * Funcion: saveMetasOds
   * Object Number: 002
   * Fecha: 22-04-2019
   * Descripcion: Method saveMetasOds of the Class
   * Objetivo: saveMetasOds Registrar el Sector ODS, con el ID de Proyecto y
   * Metas selecionadas
   * Params: { _activitySectoresOdsModel }
   ****************************************************************************/
  saveMetasOds() {
    this.confirmationService.confirm({
      message: '¿Estas seguro de registrar las metas seleccionadas?',
      header: 'Ingreso de información',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loader = true;

        // Validacion de la Información enviada
        if (this.selectedSectores === undefined || this.selectedSectores.length === 0) {
          this.showToast('error', 'Error al registrar la Información de las Metas', 'Debes de seleccionar las metas , del ODS: ' + this.modalHeader + ' para continuar');
          return -1;
        }

        // Setea los valores del Json a enviar
        this._activitySectoresOdsModel.idActividad = { idActividad: this.modalHeaderIdActividad };

        for (let index = 0; index < this.selectedSectores.length; index++) {
          const element = this.selectedSectores[index];

          this._activitySectoresOdsModel.codigoActividad = this.modalHeaderCodigoActividad + '-ODS/M-' + element['code'];
          this._activitySectoresOdsModel.idSectorOds = { idSector: Number(element['code']) };

          this._serviceOdsService.saveActividadSectorOds(this._activitySectoresOdsModel).subscribe(
            result => {
              if (result.status !== 200) {
                this.showToast('error', 'Error al Ingresar la Información de la Meta', JSON.stringify(result.message));
                this.loader = false;
              } else if (result.status === 200) {
                // Evalua los resuktados de la query
                if (result.findRecord === false) {
                  this.showToast('error', 'Error al Ingresar la Información del ODS', JSON.stringify(result.message));
                } else {
                  this.showToast('success', 'Meta del ODS asociado al Proyecto', JSON.stringify(result.message));
                  this.loader = false;
                }
              }
            },
            error => {
              this.showToast('error', 'Error al ingresar la Meta del ODS al Proyecto', JSON.stringify(error.message));
            },
          );
        }
      },
      reject: () => {
        // Nada
      },
    });
  } // FIN | saveMetasOds


  /****************************************************************************
   * Funcion: getfindByIdNivelSectorService
   * Object Number: 003
   * Fecha: 25-03-2019
   * Descripcion: Method getfindByIdNivelSectorService of the Class
   * Objetivo: getfindByIdNivelSectorService detalle del Sector ODS, con el
   * Id Nivel de Sector
   * Params: { idNivelector, sectorPadreId }
   ****************************************************************************/
  private getfindByIdNivelSectorService(idNivelector: number, sectorPadreId: number) {

    // Ejecucion del EndPoint de Consulta de Sector, por ID
    this._serviceOdsService.getfindByIdNivelSectorAndSectorPadreId(idNivelector, sectorPadreId).subscribe(
      result => {
        if (result.status !== 200) {
          // this.showToast('error', 'Error al Obtener la Información de Sector Nivel 1', result.message);
          this.JsonReceptionSectorByNivelOds = [];
        } else if (result.status === 200) {
          this.JsonReceptionSectorByNivelOds = result.data;

          // this.JsonReceptionSectorByNivelOds.forEach(element => {
          //   console.log(element[0]);
          //   // this.sectoresOds.push({
          //   //   code: element[0],
          //   //   name: element[1],
          //   // });
          //   this.getSectorOdsNivel2(3, element[0]);
          // });
          // Asignacion de los Valores del Json al Select
          this.sectoresOds = this.JsonReceptionSectorByNivelOds.map((item) => {
            return {
              code: item[0],
              name: item[1],
            }
          });
          // Apaga el Loader
          this.loader = false;
        }
      },
      error => {
        this.showToast('error', 'Error al Obtener la Información de Secotores de Desarrollo', JSON.stringify(error.message));
      },
    );
  } // FIN | getfindByIdNivelSectorService



  /****************************************************************************
   * Funcion: getSectorOdsNivel2
   * Object Number: 004
   * Fecha: 24-04-2019
   * Descripcion: Method getSectorOdsNivel2 of the Class
   * Objetivo: getSectorOdsNivel2 detalle del Sector ODS, con el
   * Id Nivel de Sector
   * Params: { idNivelector, sectorPadreId }
   ****************************************************************************/
  getSectorOdsNivel2(idNivelector: number, sectorPadreId: number) {
    // Ejecucion del EndPoint de Consulta de Sector, por ID
    this._serviceOdsService.getfindByIdNivelSectorAndSectorPadreId(idNivelector, sectorPadreId).subscribe(
      result => {
        if (result.status !== 200) {
          // this.showToast('error', 'Error al Obtener la Información de Sector Nivel 1', result.message);
          this.JsonReceptionSectorByNivelOdsN2 = [];
        } else if (result.status === 200 && result.find === true) {
          this.JsonReceptionSectorByNivelOdsN2 = result.data;
          // Asignacion de los Valores del Json al Select
          // this.sectoresOdsN2 = this.JsonReceptionSectorByNivelOdsN2.map((item) => {
          //   return {
          //     code: item[0],
          //     name: '------> ' + item[1],
          //   }
          // });
          this.JsonReceptionSectorByNivelOdsN2.forEach(element => {
            this.sectoresOds.push({
              code: element[0],
              name: element[1],
            });
          });
          // Apaga el Loader
          this.loader = false;
        }
      },
      error => {
        this.showToast('error', 'Error al Obtener la Información de Sectores de Desarrollo', JSON.stringify(error.message));
      },
    );
  } // FIN | getSectorOdsNivel2

}
