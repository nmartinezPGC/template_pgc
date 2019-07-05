import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../../../services/usuarios.service';
import { Router } from '@angular/router';
import { VistaModalModel } from '../../../models/vista.modal.model';
import { NotificacionesService } from '../../../../shared/services/notificaciones.service';
import {  ToasterConfig  } from 'angular2-toaster'; // Servicio de Notificaciones


@Component({
    selector: 'ngx-usuarios',
    templateUrl: './modal-vista.component.html',
    styleUrls: ['./modal-vista.component.scss'],
    providers: [UsuarioService, NotificacionesService],
})

export class ModalVistaComponent implements OnInit {
    @Input() modalidEspacioTrabajoUsuario;
    public JsonReceptionEspaciosTrabajoUsuario: any;
    public JsonReceptionfindByIdEspacioTrabajoUsuario: any;
    public _espacioTrabajoUsuarioModel: VistaModalModel;
    public JsonReceptionRolEspacio: any;
    public codSec: any;
    verSeleccion: string = '';
    datos;


    data: any;
    data1: any;
    data2: any;
    data3: any;
    arrayEspaciosTrabajoUsuario: any

    constructor(private activeModal: NgbActiveModal, public _usuariosService: UsuarioService,
        protected _router: Router, private _notificacionesService: NotificacionesService,
        private changeDetectorRef: ChangeDetectorRef) {
        this.datos = this.data2
    }


    ngOnInit() {
        // Inicializacion del Modelo de la Clase
        this._espacioTrabajoUsuarioModel = new VistaModalModel(
            0, null, null,  0, null, 0, null, 0, true);
            this._espacioTrabajoUsuarioModel.idEspacio;
            this._espacioTrabajoUsuarioModel.idUsuario;
            this._espacioTrabajoUsuarioModel.idRolIN;


        this.ListAllEspaciosTrabajoUsuario();
        this.findByIdEspacioTrabajoUsuario(this.modalidEspacioTrabajoUsuario);

    }
    config: ToasterConfig;

    position = 'toast-bottom-full-width';
    animationType = 'slideDown';
    title = 'Se ha grabado la Información! ';
    content = 'los cambios han sido grabados temporalmente, en la PGC!';
    timeout = 10000;
    toastsLimit = 5;
    type = 'default';
    isNewestOnTop = true;
    isHideOnClick = true;
    isDuplicatesPrevented = false;
    isCloseButton = true;
    settings: any;
    escapeClose: false;
    clickClose: false;
    public resultdata: any;
    public tipoEspacioTrabajo: number;
    makeToast() {
        this._notificacionesService.showToast(this.type, this.title, this.content);
      } // FIN | makeToast
    /****************************************************************************
  * Funcion: ListAllEspaciosTrabajo
  * Object Number: 001
  * Fecha: 22-03-2019
  * Descripcion: Method ListAllEspaciosTrabajo of the Class
  * Objetivo: ListAllEspaciosTrabajo detalle de los espacios de trabajo llamando a la API
  ****************************************************************************/
    private ListAllEspaciosTrabajoUsuario() {
        this._usuariosService.getAllEspacioUsuarios().subscribe(
            response => {
                if (response.status !== 200) {
                } else if (response.status === 200) {
                    this.JsonReceptionEspaciosTrabajoUsuario = response.data;
                    this.data = this.JsonReceptionEspaciosTrabajoUsuario;
                    // Carga los Items para el List de la Smart table
                    this.arrayEspaciosTrabajoUsuario = new Array();
                }
            },
            error => {
                // Redirecciona al Login
                alert('Error en la petición de la API ' + <any>error);

                // Borramos los datos del LocalStorage
                localStorage.removeItem('auth_app_token');
                localStorage.removeItem('identity');

                const redirect = '/auth/login';
                setTimeout(() => {
                    // Iniciativa Temporal
                    location.reload();
                    return this._router.navigateByUrl(redirect);
                }, 2000);
            },
        );
    } // FIN | ListAllEspaciosTrabajo

     findByIdEspacioTrabajoUsuario(idEspaciosTrabajoUsuarios: number) {
        // Ejecutamos el Recurso del EndPoint
        this._usuariosService.findByIdEspacioTrabajoUsuario(idEspaciosTrabajoUsuarios).subscribe(
          response => {
            if (response.status !== 200) {
                this._notificacionesService.showToast('error', 'Error al Eliminar la Id Interna de la Planificacion del Proyecto', response.message);
            } else if (response.status === 200) {
              this.JsonReceptionfindByIdEspacioTrabajoUsuario = response.data;
              this.data3 = this.JsonReceptionfindByIdEspacioTrabajoUsuario;
              this._espacioTrabajoUsuarioModel.idEspacioTrabajo = this.data3.idEspacioTrabajo.idEspacio;
              this._espacioTrabajoUsuarioModel.idRolEspacioTrabajo = this.data3.idRolEspacioTrabajo.idRol1;
            }
          },
          error => {
            // Informacion del Error que se capturo de la Secuencia
            this._notificacionesService.showToast('error', 'Ha ocurrido un Error al cargar un dato, por favor verifica que todo este bien!!', JSON.stringify(error.error.message));
            // Ocultamos el Loader la Funcion
          },
        );
        // Return
      } // FIN | findByIdEspacioTrabajoUsuario





    closeModal() {
        this.activeModal.close();
    }


}
