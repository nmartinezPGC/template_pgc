import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../../../services/usuarios.service';
import { Router } from '@angular/router';
import { EspacioTrabajoModel } from '../../../models/usuario.espacio.model';
import { EspacioTrabajoUsuarioModel } from '../../../models/espacio.trabajo.usuario.model';
import { NotificacionesService } from '../../../../shared/services/notificaciones.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster'; // Servicio de Notificaciones
import { delay } from 'q';
import { VistaModalModel } from '../../../models/vista.modal.model';

@Component({
    selector: 'ngx-usuarios',
    templateUrl: './modal-modificar.component.html',
    styleUrls: ['./modal-modificar.component.scss'],
    providers: [UsuarioService, NotificacionesService],
})

export class ModalModificarComponent implements OnInit {
    @Input() modalidEspacioTrabajoUsuario;
    @Input() idUsuario;
    @Input() idEspacioTrabajo;
    @Input() idRol;
    public JsonReceptionEspaciosTrabajo: any;
    public JsonReceptionFyByEspacioTrabajo: any;
    public JsonReceptionFyByEspacioTrabajoUsuario: any;
    public _espacioTrabajoModel: EspacioTrabajoModel;
    public _espacioTrabajoUsuarioModel: EspacioTrabajoUsuarioModel;
    public JsonReceptionRolEspacio: any;
    public opcionSeleccionado: any;
    public secuenciaDeActividad: any;
    public rol1: any;
    public JsonIdEspacioUsuario = [];
    public JsonReceptionUserDetail: any;
    public findData: boolean;
    public codSec: any;
    verSeleccion: string = '';
    datos;


    data: any;
    data1: any;
    data2: any;
    data3: any;
    arrayEspaciosTrabajo: any
    marked = false;

    constructor(private activeModal: NgbActiveModal, public _usuariosService: UsuarioService,
        protected _router: Router, private _notificacionesService: NotificacionesService,
        private changeDetectorRef: ChangeDetectorRef) {
        this.datos = this.data2
    }


    ngOnInit() {
        // Inicializacion del Modelo de la Clase
        this._espacioTrabajoUsuarioModel = new EspacioTrabajoUsuarioModel(
            0, null, null,  null, null, null, null, null, true);
            this._espacioTrabajoUsuarioModel.idRol1;
            this._espacioTrabajoUsuarioModel.idEspacio;
            this._espacioTrabajoUsuarioModel.idUsuario;

        this.ListAllEspaciosTrabajo();
        this.rolEspacioService();
        this.fyByIdEspacioUsuario(this.modalidEspacioTrabajoUsuario);
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
    private ListAllEspaciosTrabajo() {
        this._usuariosService.getAllEspacioUsuarios().subscribe(
            response => {
                if (response.status !== 200) {
                } else if (response.status === 200) {
                    this.JsonReceptionEspaciosTrabajo = response.data;
                    // instancia data con los espacios de trabajo;
                    this.data = this.JsonReceptionEspaciosTrabajo;
                    // Carga los Items para el List de la Smart table
                    this.arrayEspaciosTrabajo = new Array();

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




 


    /****************************************************************************
 * Funcion: rolEspacioService
 * Object Number: 004
 * Fecha: 22-01-2019
 * Descripcion: Method rolEspacioService of the Class
 * Objetivo: rolEspacioService detalle de los roles de los espacios de trabajo llamando a la API
 * Autor: Edgar Ramirez
 ****************************************************************************/
    private rolEspacioService() {
        const idGrupoSen: number = 4;
        this._usuariosService.fyByIdRolEspacio(idGrupoSen).subscribe(
            response => {
                if (response.status !== 200) {

                } else if (response.status === 200) {

                    this.JsonReceptionRolEspacio = response.data;
                    this.data2 = this.JsonReceptionRolEspacio;
                    // console.log(this.data2);
                    // Carga los Items para el List de la Smart table
                    //   this.arrayEstados = new Array();

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
    } // FIN | rolEspacioService



    /****************************************************************************
* Funcion: saveUbicaciones
* Object Number: 007
* Fecha: 21-03-2019
* Descripcion: Method Save Ubicaciones, en BD por llamado a la API
* Objetivo: Salvar Ubicaciones de Proyectos, en BD por llamado a EndPoint de
* la API | /mant-actividades/ubicaciones/new

****************************************************************************/
    async  saveEspaciosTrabajoUsuario() {
        this.getSecuenciaListService('NEW-ACT');

        await delay(100);

        // Actualizamos la Siguiente Secuencia
        // this.updateSecuenciaService(this.JsonReceptionUserDetail.idUsuario, 1);

        /* spinner starts on Start Function */


        // Seteo de los Campo Relacionales
         this._espacioTrabajoUsuarioModel.idRolEspacioTrabajo = { idRol: this.idRol };
         this._espacioTrabajoUsuarioModel.idEspacioTrabajo =  this.idEspacioTrabajo;
        this._espacioTrabajoUsuarioModel.idUsuarioEspacioTrabajo = { idUsuario: this.idUsuario };
        this._espacioTrabajoUsuarioModel.codEspacioTrabajoUsuario = this.codSec;

        this.JsonIdEspacioUsuario.forEach(element => {
        this._espacioTrabajoUsuarioModel.idRol1 = element.idRol;
        this._espacioTrabajoUsuarioModel.idRolEspacioTrabajo = { idRol: this._espacioTrabajoUsuarioModel.idRol1 };
       this._espacioTrabajoUsuarioModel.idEspacio = element.idEspacio;
       this.idEspacioTrabajo = element.idEspacioTrabajo;
        this._espacioTrabajoUsuarioModel.idEspacioTrabajo = { idEspacioTrabajo: this.idEspacioTrabajo };
             this._espacioTrabajoUsuarioModel.idEspacioTrabajo = element.idEspacioTrabajo;
             (this._espacioTrabajoUsuarioModel);

            this._usuariosService.newEspacioTrabajoUsuario(this._espacioTrabajoUsuarioModel).subscribe(
                response => {
                    (this._espacioTrabajoModel);
                    if (response.status !== 200) {

                        // console.log('error al ingresar el espacio de trabajo de usuario');
                        this._notificacionesService.showToast('error', 'Error al Ingresar la Información del Usuario', response.message);
                    } else if (response.status === 200) {
                        // console.log('ingreso con exito el espacio de trabajo de usuario');
                       // (this.idUsuario + ' id usuario');
                        this._notificacionesService.showToast('default', 'La Información del Usuario, se ha ingresado con exito', response.message);
                    }
                },
            );
        });

    } // FIN saveUbicaciones


    /*****************************************************
    * Funcion: FND-00008
    * Fecha: 22-03-2019
    * Descripcion: Funcion que Obtiene la Secuencia del
    * Proyecto o Actividad
    * Params: codSecuencia
    ******************************************************/
    protected getSecuenciaListService(codSecuencia: string) {
        // Envia la Secuencia a Buscar
        this._usuariosService.getSecuenciaActividad(codSecuencia).subscribe(
            result => {
                if (result.status !== 200) {
                    this._notificacionesService.showToast('error', 'Error al Obtener la Información de la Secuencia', JSON.stringify(result.message));
                } else if (result.status === 200) {
                    this.secuenciaDeActividad = result.data;

                    // Componemos la Secuencia a Generar
                    const prefixHND: string = 'NEW-ESP-TRAB-USER-';
                    this._espacioTrabajoUsuarioModel.codEspacioTrabajoUsuario = prefixHND + (Number(this.secuenciaDeActividad.valor2));
                    this.codSec = this._espacioTrabajoUsuarioModel.codEspacioTrabajoUsuario;
                }
            },
            error => {
                this._notificacionesService.showToast('error', 'Error al Obtener la Información de la Secuencia', JSON.stringify(error.message));
            },
        );
    } // FIN | FND-00008

    closeModal() {
        this.activeModal.close();
    }
    fyByIdEspacioUsuario(idUsuarioEspacioTrabajo: number) {
        // Ejecutamos el Recurso del EndPoint
        this._usuariosService.fyByIdEspacioTrabajoUsuario(idUsuarioEspacioTrabajo).subscribe(
          response => {// console.log("id espacios"+ this.fyByIdEspaciostrabajo);
            if (response.status !== 200) {
                this._notificacionesService.showToast('error', 'Error al Eliminar la Id Interna de la Planificacion del Proyecto', response.message);
            } else if (response.status === 200) {
              this.JsonReceptionFyByEspacioTrabajoUsuario = response.data;
              // instancia data con los perfiles;
              this.data3 = this.JsonReceptionFyByEspacioTrabajoUsuario;
              this._espacioTrabajoUsuarioModel.idEspacioTrabajo = this.data3.idEspacioTrabajo.idEspacio;
              this._espacioTrabajoUsuarioModel.idUsuarioEspacioTrabajo = this.data3.idUsuarioEspacioTrabajo.idUsuario;
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
      } // FIN | deleteActividadIdInterna


}
