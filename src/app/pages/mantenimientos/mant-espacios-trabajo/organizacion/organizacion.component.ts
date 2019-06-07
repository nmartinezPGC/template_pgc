/** @author David Pavon
 * @returns mantenimiento de organizacion.
 * @name OrganizacionComponent
 * @alias OrganizacionComponent
 * @version 1.0.0
 *
 */

import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { OrganizacionModalComponent } from './organizaciones.modal.component';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster'; // Servicio de Notificaciones
import { Router } from '@angular/router';
import { OrganizacionModel } from '../../models/organizacion.model';
import { OrganizacionService } from '../../services/organizaciones.service';
import { delay } from 'q';
import { templateJitUrl } from '@angular/compiler';
@Component({
  selector: 'ngx-organizacion',
  templateUrl: './organizacion.component.html',
  styleUrls: ['./organizacion.component.scss'],
  providers: [OrganizacionService, ToasterService],
})


export class OrganizacionComponent implements OnInit {
  @Input() idOrganizacion;



  public _OrganizacionModel: OrganizacionModel;
  public JsonReceptionPrefiles: any;
  public JsonReceptionTipoPerfiles: any;
  public JsonCategoria: any;
  public JsonReceptionPaises: any;
  public JsonReceptionOrganizaciones: any;
  public JsonReceptionFyByOrganizaciones: any;
  public secuenciaDeActividad: any;
   // Audotoria
   public JsonReceptionUserDetail: any;

  data2: any;
  data: any;
  config: ToasterConfig;
  data1: any;
  arrayTipoPerfiles: any
  arrayCategoria: any;
  marked = false;
  theCheckbox = false;
  data3: any;
  arrayOrganizacion: any;
  data4: any;

  /**
   * Configuracion del Dropdow List
   * Autor: Edgar Ramirez
   * Fecha: 23/01/2019
   */
  dropdownList = [];
  dropdownListPais = [];
  selectedItems = [];
  selectedItemsPais = [];
  dropdownSettings = {};

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
  public responsedata: any;


   // levanta la modal de mantenimineto de organizacion/consulta
  showLargeModal(idOrganizacion: number) {
    const activeModal = this.modalService.open(OrganizacionModalComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Large Modal Parametro ';
    activeModal.componentInstance.idOrganizacion = idOrganizacion;


    activeModal.componentInstance.JsonReceptionFyByOrganizaciones = this.JsonReceptionFyByOrganizaciones;

    this.data3 = this.JsonReceptionOrganizaciones;
    this.arrayOrganizacion = new Array();

  }


  constructor(private modalService: NgbModal, protected _router: Router,
    private _toasterService: ToasterService, public _OrganizacionService: OrganizacionService) {
    this.responsedata = { 'error': false, 'msg': 'error campos solicitado' };
  }

/****************************************************************************
* Funcion: makeToast
* Object Number: 003
* Fecha: 16-08-2018
* Descripcion: Method makeToast of the Class
* Objetivo: makeToast in the method header API
****************************************************************************/
  makeToast() {
    this.showToast(this.type, this.title, this.content);
  } // FIN | makeToast

  /****************************************************************************
    * Funcion: showToast
    * Object Number: 004
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
    this._toasterService.pop(toast);
  } // FIN | showToast


  ngOnInit() {
    /**
    * Configuracion Inicial del Dropdown List
    * Autor: Edgar RAmirez
    * Fecha: 23/01/2019
    */
    this.selectedItems = [
    ];

    this.selectedItemsPais = [
    ];

    this.dropdownSettings = {
      singleSelection: true,
      text: 'Seleccione una Opción',
      enableSearchFilter: true,
      searchPlaceholderText: 'Buscar Elemento',
      classes: 'comboSea',
      showCheckbox: false,
      lazyLoading: false,
    };

    this._OrganizacionModel = new OrganizacionModel(
      true, 0, null, null, null, null, null, null, null, null, false, false, false, false, null, null,
      null, 1, // relaciones de tipo de organizacion
      null, 1, // pais de la organiacion
      null, 1, // categoria de la organizacion
    );
    this.TipoOrganizacion();
    this.ListAllCategoria();
    this.paisesAllListService();
    this.ListAllOranizacion();
  }
  /****************************************************************************
* Funcion: TipoOrganizacion()
* Object Number: 004
* Fecha: 08-01-2019
* Descripcion: Method perfilesTipoService of the Class
* Objetivo: perfilesTipoService detalle de los Tipos de Perfil llamando a la API
****************************************************************************/
  private TipoOrganizacion() {
    this._OrganizacionService.listAllTipoOrganizaciones().subscribe(
      response => {
        if (response.status !== 200) {
        } else if (response.status === 200) {
          this.JsonReceptionTipoPerfiles = response.data;
          // instancia data con los perfiles;
          this.data1 = this.JsonReceptionTipoPerfiles;
          // Carga los Items para el List de la Smart table
          this.arrayTipoPerfiles = new Array();
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


  /****************************************************************************
 * Funcion: perfilesTipoService
 * Object Number: 004
 * Fecha: 08-01-2019
 * Descripcion: Method perfilesTipoService of the Class
 * Objetivo: perfilesTipoService detalle de los Tipos de Perfil llamando a la API
 ****************************************************************************/
  private ListAllCategoria() {
    this._OrganizacionService.listAllCategoria().subscribe(
      response => {
        if (response.status !== 200) {
        } else if (response.status === 200) {
          this.JsonCategoria = response.data;
          // instancia data con los perfiles;
          this.data2 = this.JsonCategoria;
          // Carga los Items para el List de la Smart table
          this.arrayCategoria = new Array();
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

  /****************************************************************************
  * Funcion: paisesAllListService
  * Object Number: 008
  * Fecha: 23-01-2019
  * Descripcion: Method paisesAllListService of the Class
  * Objetivo: paisesAllListService listados de los Paises
  * del Formulario de Actividad llamando a la API
  * Autor: Edgar Ramirez
  ****************************************************************************/
  private paisesAllListService() {
    this._OrganizacionService.getAllPaises().subscribe(
      result => {
        if (result.status !== 200) {
          this.showToast('error', 'Error al Obtener la Información de los Paises', result.message);
        } else if (result.status === 200) {
          this.JsonReceptionPaises = result.data;

          // Setea la Lista del Dropdown List
          this.dropdownListPais = this.JsonReceptionPaises.map((item) => {
            return {
              id: item.idPais,
              itemName: item.descPais,
              iniciales: item.inicialesPais,
            }
          })
        }
      },
      error => {
        this.showToast('error', 'Error al Obtener la Información de los Paises', error);
      },
    );
  } // FIN | paisesAllListService

  /****************************************************************************
  * Funcion: newUsuarioService
  * Object Number: 005
  * Fecha: 21-01-2019
  * Descripcion: Method newUsuarioService
  * Objetivo: crear nuevos usuarios.
  * Autor: Edgar Ramirez
  ****************************************************************************/
  async  newOrganizacion() {

    this.getSecuenciaListService('NEW-ORG');

    await delay(100);
    this.validateOrganizacion(this._OrganizacionModel);

    // await delay(100);
    // this.updateSecuenciaService(this.JsonReceptionUserDetail.idUsuarioMod, 1);

    await delay(100);
    const responsedataExt: any = this.responsedata;

    if (responsedataExt.error === true) {
      this.showToast('error', 'Error al ingresar los datos', responsedataExt.msg);
      return -1;
    }


    // Seteo de las variables del Model al json de Java
    this._OrganizacionModel.idCatOrganizacion = { idCatOrganizacion: this._OrganizacionModel.idCatOrganizacion1 };
    this._OrganizacionModel.idPaisOrganizacion = { idPais: this._OrganizacionModel.idPais };
    this._OrganizacionModel.idTipoOrganizacion = { idTipoOrganizacion: this._OrganizacionModel.idTipoOrganizacion1 };

    if (responsedataExt.error === true) {
      this.showToast('error', 'Error al ingresar los datos', responsedataExt.msg);
      return -1;
    }
    // Ejecutamos el Recurso del EndPoint
    this._OrganizacionService.newOrganizacion(this._OrganizacionModel).subscribe(
      response => {
        if (response.status !== 200) {
          this.showToast('error', 'Error al Ingresar la Información del Usuario', response.message);
        } else if (response.status === 200) {
          this.showToast('default', 'La Información de la Organizacion, se ha ingresado con exito', response.message);
        //  this.ListAllCategoria();
        }
        this.ListAllOranizacion();
        this.ngOnInit();
      },
    );
  } // FIN | newUsuarioService

  onItemSlectPais(item: any) {
    this._OrganizacionModel.idPais = item.id;
  }

  /****************************************************************************
  * Funcion: toggleVisibility1
  * Object Number: 004
  * Fecha:13-02-2019
  * Descripcion: Method tIPO DE ORGANIZACION
  * Objetivo:asignar si es alguna unidad ejecutora en los chekcbox
  * Autor: David Ricardo Pavon
  ****************************************************************************/
  toggleVisibility1(e) {
    if (this.marked = e.target.checked) {
      this._OrganizacionModel.agenciaBeneficiaria = true;
    } else {
      this._OrganizacionModel.agenciaBeneficiaria = false;
    }
  }
  toggleVisibility(e) {
    if (this.marked = e.target.checked) {
      this._OrganizacionModel.socioDesarrollo = true;
    } else {
      this._OrganizacionModel.socioDesarrollo = false;
    }
  }
  toggleVisibilit2(e) {
    if (this.marked = e.target.checked) {
      this._OrganizacionModel.unidadEjecutora = true;
    } else {
      this._OrganizacionModel.unidadEjecutora = false;
    }
  }
  toggleVisibilit3(e) {
    if (this.marked = e.target.checked) {
      this._OrganizacionModel.administradorFinanciero = true;
    } else {
      this._OrganizacionModel.administradorFinanciero = false;
    }
  }// fin de toggleVisibilit

  /****************************************************************************
   * Funcion: perfilesTipoService
   * Object Number: 004
   * Fecha: 08-01-2019
   * Descripcion: Method perfilesTipoService of the Class
   * Objetivo: perfilesTipoService detalle de los Tipos de Perfil llamando a la API
   ****************************************************************************/
  private ListAllOranizacion() {
    this._OrganizacionService.getAllOrganizacion().subscribe(
      response => {
        if (response.status !== 200) {
        } else if (response.status === 200) {
          this.JsonReceptionOrganizaciones = response.data;
          // instancia data con los perfiles;
          this.data3 = this.JsonReceptionOrganizaciones;
          // Carga los Items para el List de la Smart table
          this.arrayOrganizacion = new Array();
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

  fyByIdOrganizacion(idOrganizacion: number) {
    // Ejecutamos el Recurso del EndPoint
    this._OrganizacionService.FindByIdOrganizacion(idOrganizacion).subscribe(
      response => {
        if (response.status !== 200) {
          this.showToast('error', 'Error al Eliminar la Id Interna de la Planificacion del Proyecto', response.message);
        } else if (response.status === 200) {
          this.JsonReceptionFyByOrganizaciones = response.data;
          // instancia data con los perfiles;
          this.data4 = this.JsonReceptionFyByOrganizaciones;
          // Verificamos que la Actividad no Exista en la BD
        }
      },
      error => {
        // Informacion del Error que se capturo de la Secuencia
        this.showToast('error', 'Ha ocurrido un Error al cargar de orgnizacion, por favor verifica que todo este bien!!', JSON.stringify(error.error.message));
        // Ocultamos el Loader la Funcion
      },
    );
    // Return
  } // FIN | deleteActividadIdInterna

  private deleteOrganizacion(idOrganizacion: number) {

    const responsedataExt: any = this.responsedata;

    if (responsedataExt.error === true) {
      this.showToast('error', 'Error al ingresar los datos', responsedataExt.msg);
      return -1;
    }
    // Ejecutamos el Recurso del EndPoint
    this._OrganizacionService.organizacionDelete(idOrganizacion).subscribe(
      response => {
        if (response.status !== 200) {
          this.showToast('error', 'Error al desahabilitar la organizacion con exito', response.message);
        } else if (response.status === 200) {
          this.showToast('default', 'se deshabilito la organizacion de forma exitosa', response.message);
         // this.ListAllCategoria();
        }
        this.ListAllOranizacion();
      },
    );
  } // FIN | newUsuarioService

  /****************************************************************************
   * Funcion: validateTipoOganizacion(_grupoModel: any)
   * Object Number: 0005
   * Fecha: 22-01-2019
   * Descripcion: Method para validar que los campos esten llenos
   * Objetivo: validatePerfiles  procurar que llegue a la base de datos toda la informacion de tipo de organizacion.
   ****************************************************************************/
  private validateOrganizacion(_OrganizacionModel: any) {
    // seteo el modelo para que los campos sean verificados
    this.responsedata.error = false;
    if (_OrganizacionModel.inicalesOrganizacion === '' || _OrganizacionModel.inicalesOrganizacion === null) {
      this.responsedata.msg = 'Por favor ingresa las inciales de la organizacion';
      this.responsedata.error = true;
    } if (_OrganizacionModel.codOrganizacion === '' || _OrganizacionModel.codOrganizacion === null) {
      this.responsedata.msg = 'Por favor ingrese el codigo de la organizacion';
      this.responsedata.error = true;
    } if (_OrganizacionModel.nombreOrganizacion === '' || _OrganizacionModel.nombreOrganizacion === null) {
      this.responsedata.msg = 'Por favor ingrese el nombre de la organizacion';
      this.responsedata.error = true;
    } if (_OrganizacionModel.descOrganizacion === '' || _OrganizacionModel.descOrganizacion === null) {
      this.responsedata.msg = 'Por favor ingrese una descripcion de la organizacion';
      this.responsedata.error = true;
    } if (_OrganizacionModel.telefonoOrganizacion === '' || _OrganizacionModel.telefonoOrganizacion === null) {
      this.responsedata.msg = 'Por favor ingrese un numero de la organizacion';
      this.responsedata.error = true;
    } if (_OrganizacionModel.emailOrganizacion === '' || _OrganizacionModel.emailOrganizacion === null) {
      this.responsedata.msg = 'Por favor ingrese un email de la organizacion';
      this.responsedata.error = true;
    } if (_OrganizacionModel.socioDesarrollo === '' || _OrganizacionModel.socioDesarrollo === null ||
      _OrganizacionModel.agenciaBeneficiaria === '' || _OrganizacionModel.agenciaBeneficiaria === null ||
      _OrganizacionModel.unidadEjecutora === '' || _OrganizacionModel.unidadEjecutora === null ||
      _OrganizacionModel.administradorFinanciero === '' || _OrganizacionModel.administradorFinanciero === null) {
      this.responsedata.msg = 'Por favor ingrese por lo menos un tipo de organifacion';
      this.responsedata.error = true;
    }
    return this.responsedata;
  } // FIN

  /*****************************************************
    * Funcion: FND-00001
    * Fecha: 21-01-2019
    * Descripcion: Funcion que Obtiene la Secuencia del
    * Proyecto o Actividad
    * Params: codSecuencia
    ******************************************************/
  protected getSecuenciaListService(codSecuencia: string) {
    // Envia la Secuencia a Buscar
    this._OrganizacionService.getSecuenciaActividad(codSecuencia).subscribe(
      result => {
        if (result.status !== 200) {
          this.showToast('error', 'Error al Obtener la Información de la Secuencia', JSON.stringify(result.message));
        } else if (result.status === 200) {
          this.secuenciaDeActividad = result.data;

          // Componemos la Secuencia a Generar
          const prefixHND: string = 'ORG-';
          this._OrganizacionModel.codOrganizacion = prefixHND + (Number(this.secuenciaDeActividad.valor + 1));
        }
      },
      error => {
        this.showToast('error', 'Error al Obtener la Información de la Secuencia', JSON.stringify(error.message));
      },
    );
  } // FIN | FND-00001

  /*****************************************************
  * Funcion: FND-00001.1
  * Fecha: 21-01-2019
  * Descripcion: Funcion que Actuaiza la Secuencia del
  * Proyecto o Actividad
  * Params: { jsonSecuencia, idSecuencia }
  ******************************************************/
 protected updateSecuenciaService(idUsuarioMod: number, idSecuencia: number) {
  // Envia la Secuencia a Buscar
  const jsonSecuencia = {
    'idUsuarioMod': {
      'idUsuario': idUsuarioMod,
    },
  };

  this._OrganizacionService.updateSecuence(idSecuencia).subscribe(
    result => {
      if (result.status !== 200) {
        this.showToast('error', 'Error al Actualizar la Información de la Secuencia', JSON.stringify(result.message));
      } else if (result.status === 200) {
        // Result success
      }
    },
    error => {
      this.showToast('error', 'Error al Actualizar la Información de la Secuencia', JSON.stringify(error.message));
    },
  );
} // FIN | FND-00001.1

protected cleanOrganizacione() {

this.ngOnInit();
}
;

}
