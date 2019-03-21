import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
import { EspacioTrabajoModel } from '../../models/usuario.espacio.model';
import { EspacioTrabajoUsuarioModel } from '../../models/espacio.trabajo.usuario.model';

@Component({
    selector: 'ngx-usuarios',
    templateUrl: './usuario.modal.component.html',
    styleUrls: ['./usuario.modal.component.scss'],
    providers: [UsuarioService],
})

export class UsuarioModalComponent implements OnInit {
    @Input() idUsuario;
    @Input() idEspacioTrabajo;
    @Input() idRol;
    public JsonReceptionEspaciosTrabajo: any;
    public JsonReceptionFyByEspacioTrabajo: any;
    public _espacioTrabajoModel: EspacioTrabajoModel;
    public _espacioTrabajoUsuarioModel: EspacioTrabajoUsuarioModel;
    public JsonReceptionRolEspacio: any;
    public opcionSeleccionado: any;
    public JsonIdEspacioUsuario = [];
    public findData: boolean;
    verSeleccion: string = '';
    datos;


    data: any;
    data1: any;
    data2: any;
    arrayEspaciosTrabajo: any
    marked = false;

    constructor(private activeModal: NgbActiveModal, public _usuariosService: UsuarioService, protected _router: Router, private changeDetectorRef: ChangeDetectorRef) {
        this.datos = this.data2
    }

    closeModal() {
        this.activeModal.close();
    }

    ngOnInit() {
        // Inicializacion del Modelo de la Clase
        this._espacioTrabajoUsuarioModel = new EspacioTrabajoUsuarioModel(
            0, null,
            null, null, null, 0,
            true);

        this.ListAllEspaciosTrabajo();
        this.rolEspacioService();
    }

    /****************************************************************************
  * Funcion: perfilesTipoService
  * Object Number: 004
  * Fecha: 08-01-2019
  * Descripcion: Method perfilesTipoService of the Class
  * Objetivo: perfilesTipoService detalle de los Tipos de Perfil llamando a la API
  ****************************************************************************/
    private ListAllEspaciosTrabajo() {
        this._usuariosService.getAllEspaciosTrabajo().subscribe(
            response => {
                if (response.status !== 200) {
                } else if (response.status === 200) {
                    this.JsonReceptionEspaciosTrabajo = response.data;
                    // instancia data con los perfiles;
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
    } // FIN | perfilesTipoService

    getIdEspacioTrabajo(idEspacioTrabajo1: number) {
        // Ejecutamos el Recurso del EndPoint
        this._usuariosService.fyByIdEspacioTrabajo(idEspacioTrabajo1).subscribe(
            response => {

                if (response.status !== 200) {

                } else if (response.status === 200) {
                    this.JsonReceptionFyByEspacioTrabajo = response.data;

                    // instancia data con los perfiles;
                    this.data1 = this.JsonReceptionFyByEspacioTrabajo;

                    // Verificamos que la Actividad no Exista en la BD
                }
            },
            error => {
                // Informacion del Error que se capturo de la Secuencia
                // this.showToast('error', 'Ha ocurrido un Error al cargar de orgnizacion, por favor verifica que todo este bien!!', JSON.stringify(error.error.message));
                // Ocultamos el Loader la Funcion
            },
        );
        // Return
    } // FIN |


    /****************************************************************************
  * Funcion: toggleVisibility
  * Object Number: 004
  * Fecha:26-02-2019
  * Descripcion: Method Asiganar espacio de trabajo
  * Objetivo:asignar si es alguna unidad ejecutora en los chekcbox
  * Autor: Edgar Ramirez
  ****************************************************************************/
    toggleVisibilit(e, idEspacioTrabajo) {

        if (this.marked = e.target.checked) {
            this.idEspacioTrabajo = idEspacioTrabajo;
            // console.log(idEspacioTrabajo + ' id Espacio');
            this.pushJsonIdEspacioUsuario();
            // console.log(this._usuarioModel.asignarEspacioTrabajo);
            // this.showLargeModal(this.idUsuario)
        } else {
            this.deleteRowHomeForm(0, idEspacioTrabajo)
            // this.deleteJson();
            // this._usuarioModel.asignarEspacioTrabajo = false
            // console.log(this._usuarioModel.asignarEspacioTrabajo);

        }
    }


    /****************************************************************************
 * Funcion: rolEspacioService
 * Object Number: 007
 * Fecha: 22-01-2019
 * Descripcion: Method rolEspacioService of the Class
 * Objetivo: rolEspacioService detalle de los roles de los espacios de trabajo llamando a la API
 * Autor: Edgar Ramirez
 ****************************************************************************/
    private rolEspacioService() {
        const idGroupSen: number = 4;
        this._usuariosService.fyByIdRolEspacio(idGroupSen).subscribe(
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
    } // FIN | estadoService


    capturar(idRol) {
        // Pasamos el valor seleccionado a la variable verSeleccion
        this.verSeleccion = idRol;
        this.idRol = this.verSeleccion;
        // console.log(idRol + ' id rol');
    }


    /****************************************************************************
* Funcion: pushJsonIdEspacioUsuario
* Object Number: 019
* Fecha: 15-03-2019
* Descripcion: Method que valida si un Codigo de Organizacion para Id Interna
* Existe, y no permitir su ingreso nuevamente
* Objetivo: Validacion de Id Interna por Codigo
****************************************************************************/
    private pushJsonIdEspacioUsuario() {
        // Condicion para evaluar que opcion se pulsa

        // Ingresa el primer Item del json
        this.JsonIdEspacioUsuario.push({
            'idUsuario': this.idUsuario,
            'idEspacioTrabajo': this.idEspacioTrabajo,
            'idRol': this.idRol,

        });

        // console.log(this.JsonIdEspacioUsuario)



    } // FIN | pushJsonIdEspacioUsuario


    deleteRowHomeForm(homeFormIndex: number, idEspacioTrabajo: number) {

        const deletedItem = confirm('Esta seguro de borrar el Item');

        if (deletedItem === true) {
            // console.log('hola');
            this.JsonIdEspacioUsuario.forEach(function (element, index) {
                // console.log('hola 2');
                // console.log(this.JsonIdEspacioUsuario);

                if (element.idEspacioTrabajo === idEspacioTrabajo) {
                    homeFormIndex = index
                }
            });
            this.JsonIdEspacioUsuario.splice(homeFormIndex, 1);
            // console.log(this.JsonIdEspacioUsuario);


            this.changeDetectorRef.detectChanges();
        }

    }


    /****************************************************************************
* Funcion: saveUbicaciones
* Object Number: 006
* Fecha: 28-02-2019
* Descripcion: Method Save Ubicaciones, en BD por llamado a la API
* Objetivo: Salvar Ubicaciones de Proyectos, en BD por llamado a EndPoint de
* la API | /mant-actividades/ubicaciones/new
* @param jsonUbicacionActivity
****************************************************************************/
    saveEspaciosTrabajoUsuario() {
        /** spinner starts on Start Function */


        // Seteo de los Campo Relacionales
        // this._espacioTrabajoUsuarioModel.idRolEspacioTrabajo = { idRol: this.idRol };
        // this._espacioTrabajoUsuarioModel.idEspacioTrabajo =  this.idEspacioTrabajo;
        this._espacioTrabajoUsuarioModel.idUsuarioEspacioTrabajo = { idUsuario: this.idUsuario };
        this._espacioTrabajoUsuarioModel.codEspacioTrabajoUsuario = '00010';
        this._espacioTrabajoUsuarioModel.idEspacioTrabajo = { idEspacio: 6 }

        this.JsonIdEspacioUsuario.forEach(element => {
            this._espacioTrabajoUsuarioModel.idRol = 6;
            this._espacioTrabajoUsuarioModel.idEspacioTrabajo = element.idEspacioTrabajo;
            // console.log(this._espacioTrabajoUsuarioModel);

            // console.log('paso 1');
            this._usuariosService.newEspacioTrabajoUsuario(this._espacioTrabajoUsuarioModel).subscribe(
                response => {
                    // console.log('paso 2');
                    // console.log(this._espacioTrabajoModel);
                    if (response.status !== 200) {

                        // console.log('error al ingresar el espacio de trabajo de usuario');
                        // this.showToast('error', 'Error al Ingresar la Información del Usuario', response.message);
                    } else if (response.status === 200) {
                        // console.log('ingreso con exito el espacio de trabajo de usuario');
                        // console.log(this.idUsuario + ' id usuario');
                        // this.showToast('default', 'La Información del Usuario, se ha ingresado con exito', response.message);

                    }
                },
            );
        });

    } // FIN saveUbicaciones


}
