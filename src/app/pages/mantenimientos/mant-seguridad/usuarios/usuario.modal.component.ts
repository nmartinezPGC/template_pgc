import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
import { EspacioTrabajoModel } from '../../models/usuario.espacio.model';

@Component({
  selector: 'ngx-usuarios',
  templateUrl: './usuario.modal.component.html',
  styleUrls: ['./usuario.modal.component.scss'],
  providers: [UsuarioService],
})

export class usuarioModalComponent implements OnInit {
  @Input() idUsuario;
  @Input() idEspacioTrabajo;
  public JsonReceptionEspaciosTrabajo: any;
  public JsonReceptionFyByEspacioTrabajo: any;
  public _espacioTrabajoModel: EspacioTrabajoModel;

  data: any;
  data1: any;
  arrayEspaciosTrabajo: any
  marked = false;

  constructor(private activeModal: NgbActiveModal, public _usuariosService: UsuarioService, protected _router: Router) { }

  closeModal() {
    this.activeModal.close();
  }

  ngOnInit() {

    this.ListAllEspaciosTrabajo();
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


      // console.log(this._usuarioModel.asignarEspacioTrabajo);
      // this.showLargeModal(this.idUsuario)
    } else {

      // this._usuarioModel.asignarEspacioTrabajo = false
      // console.log(this._usuarioModel.asignarEspacioTrabajo);

    }
  }

}